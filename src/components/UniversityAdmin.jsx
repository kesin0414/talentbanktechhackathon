import { useMemo, useState } from 'react'

// ── Data ────────────────────────────────────────────────────────────────────
const TRAJECTORIES = [
  {
    id: 'java-cloud',
    from: 'Enterprise Java Developers',
    to: 'Cloud & AI Architects',
    change: 45,
    count: 312,
    topEmployers: ['AWS Malaysia', 'Microsoft', 'Petronas Digital'],
    avgSalaryDelta: '+RM 4,200 / mo',
    completion: 91,
  },
  {
    id: 'fe-fs',
    from: 'Frontend Devs',
    to: 'Full-Stack Engineers',
    change: 22,
    count: 487,
    topEmployers: ['Grab', 'Shopee', 'TikTok'],
    avgSalaryDelta: '+RM 1,800 / mo',
    completion: 84,
  },
  {
    id: 'qa-devops',
    from: 'QA Analysts',
    to: 'DevOps Engineers',
    change: 18,
    count: 156,
    topEmployers: ['CIMB', 'Maybank', 'AirAsia Digital'],
    avgSalaryDelta: '+RM 1,500 / mo',
    completion: 78,
  },
  {
    id: 'net-cloud',
    from: 'Network Admins',
    to: 'Cloud Security Specialists',
    change: 31,
    count: 89,
    topEmployers: ['BAE Systems', 'Ernst & Young', 'PwC'],
    avgSalaryDelta: '+RM 2,600 / mo',
    completion: 88,
  },
]

const NUDGE_LOG = [
  {
    id: 1,
    type: 'Skill Gap',
    severity: 'warning',
    message:
      'Jakarta EE. System automatically emailed 45 alumni in legacy banking roles with free access to our weekend micro-credential course.',
    time: '2 hours ago',
    impact: '45 alumni',
  },
  {
    id: 2,
    type: 'Career Plateau',
    severity: 'error',
    message:
      'Identified 12 alumni stagnant in QA roles for 4+ years. Upskill nudge for Automated Testing with Cypress deployed.',
    time: 'Yesterday',
    impact: '12 alumni',
  },
  {
    id: 3,
    type: 'Industry Shift',
    severity: 'primary',
    message:
      'Cloud migration demand up 38% in Johor. Triggered Azure Fundamentals pathway for 28 final-year students in FSKTM.',
    time: '2 days ago',
    impact: '28 students',
  },
  {
    id: 4,
    type: 'Employer Demand',
    severity: 'success',
    message:
      'Grab posted 6 new backend roles requiring Spring Boot Security. Auto-enrolled 19 matching students in weekend module.',
    time: '3 days ago',
    impact: '19 students',
  },
]

const PAGE_SIZE = 3

// ── Tier colors (mirrors StudentDashboard skillColor / matchColor) ──────────
const SEVERITY_COLORS = {
  success: '#34c759',
  primary: '#0066cc',
  warning: '#ff9500',
  error: '#ff3b30',
}

// Stronger trajectory shift → "hotter" tier, same banding logic as student page
const trajectoryColor = (change) => {
  if (change >= 30) return SEVERITY_COLORS.success
  if (change >= 20) return SEVERITY_COLORS.primary
  if (change >= 10) return SEVERITY_COLORS.warning
  return SEVERITY_COLORS.error
}

// ── Iconography (matches StudentDashboard set) ──────────────────────────────
function ChevronIcon({ expanded }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 shrink-0 text-primary transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TrendIcon({ direction = 'up' }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
      <path
        d={direction === 'up' ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Metric card with colored trend delta ────────────────────────────────────
function MetricCard({ label, value, delta, deltaTone = 'success', subtext }) {
  const color = SEVERITY_COLORS[deltaTone] || SEVERITY_COLORS.success
  return (
    <div className="utility-card flex flex-col">
      <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
        {label}
      </p>
      <div className="mt-3 flex items-baseline gap-3">
        <p className="text-[34px] font-semibold tabular-nums tracking-display text-ink sm:text-[40px]">
          {value}
        </p>
        {delta && (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-semibold"
            style={{
              background: `color-mix(in srgb, ${color} 12%, transparent)`,
              color,
            }}
          >
            <TrendIcon direction={deltaTone === 'error' ? 'down' : 'up'} />
            {delta}
          </span>
        )}
      </div>
      {subtext && <p className="mt-2 text-[12px] text-ink-muted-48">{subtext}</p>}
    </div>
  )
}

// ── Trajectory card (expandable, colored tier bar) ──────────────────────────
function TrajectoryCard({ trajectory }) {
  const [expanded, setExpanded] = useState(false)
  const color = trajectoryColor(trajectory.change)

  return (
    <div className="rounded-[18px] border border-hairline bg-canvas p-5 transition-all">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between gap-4 text-left"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
            {trajectory.count.toLocaleString()} alumni · 5-year window
          </p>
          <h3 className="mt-1 truncate text-[17px] font-semibold tracking-tight text-ink">
            {trajectory.from}{' '}
            <span className="font-normal text-ink-muted-48">→</span>{' '}
            {trajectory.to}
          </h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="rounded-full px-3 py-1 text-[12px] font-semibold"
            style={{
              background: `color-mix(in srgb, ${color} 12%, transparent)`,
              color,
            }}
          >
            +{trajectory.change}% shift
          </span>
          <ChevronIcon expanded={expanded} />
        </div>
      </button>

      <div className="mt-4">
        <div
          className="relative h-2 overflow-hidden rounded-full"
          style={{ background: 'color-mix(in srgb, #e0e0e0 60%, transparent)' }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
            style={{ width: `${Math.min(trajectory.change * 2, 100)}%`, background: color }}
          />
        </div>
      </div>

      {expanded && (
        <div className="animate-expand mt-5 border-t border-hairline pt-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
                Avg. Salary Uplift
              </p>
              <p className="mt-1 text-[17px] font-semibold text-ink">
                {trajectory.avgSalaryDelta}
              </p>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
                Pathway Completion
              </p>
              <p className="mt-1 text-[17px] font-semibold text-ink">
                {trajectory.completion}%
              </p>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
                Top Employers
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {trajectory.topEmployers.map((e) => (
                  <span key={e} className="tag-pill">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TrajectoryLegend() {
  const tiers = [
    { label: 'High shift (30%+)', color: SEVERITY_COLORS.success },
    { label: 'Moderate (20–29%)', color: SEVERITY_COLORS.primary },
    { label: 'Emerging (10–19%)', color: SEVERITY_COLORS.warning },
    { label: 'Stagnant (<10%)', color: SEVERITY_COLORS.error },
  ]
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
      {tiers.map((t) => (
        <span key={t.label} className="flex items-center gap-1.5 text-[12px] text-ink-muted-48">
          <span className="h-2 w-2 rounded-full" style={{ background: t.color }} aria-hidden="true" />
          {t.label}
        </span>
      ))}
    </div>
  )
}

// ── Nudge filter chips + colored type badges ────────────────────────────────
const NUDGE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'Skill Gap', label: 'Skill Gap' },
  { key: 'Career Plateau', label: 'Plateau' },
  { key: 'Industry Shift', label: 'Industry' },
  { key: 'Employer Demand', label: 'Demand' },
]

function NudgeTypeBadge({ type, severity }) {
  const color = SEVERITY_COLORS[severity] || SEVERITY_COLORS.primary
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[12px] font-semibold"
      style={{
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
        color,
      }}
    >
      {type}
    </span>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────
// 'idle' | 'loading' | 'done'
function useExportCSV() {
  const [csvState, setCsvState] = useState('idle')
  const trigger = () => {
    if (csvState !== 'idle') return
    setCsvState('loading')
    // Simulate async export (replace with real fetch/blob logic)
    setTimeout(() => {
      setCsvState('done')
      setTimeout(() => setCsvState('idle'), 2500)
    }, 900)
  }
  return { csvState, trigger }
}

export default function UniversityAdmin() {
  const [page, setPage] = useState(1)
  const [nudgeFilter, setNudgeFilter] = useState('all')
  const { csvState, trigger: triggerCSV } = useExportCSV()

  const totalPages = Math.ceil(TRAJECTORIES.length / PAGE_SIZE)
  const pageTrajectories = useMemo(
    () => TRAJECTORIES.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page]
  )
  const filteredNudges = useMemo(
    () => (nudgeFilter === 'all' ? NUDGE_LOG : NUDGE_LOG.filter((n) => n.type === nudgeFilter)),
    [nudgeFilter]
  )

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-8">
      {/* Zone 1 — KPI strip with colored deltas */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <MetricCard
          label="Active Alumni Tracked"
          value="4,208"
          delta="+127"
          deltaTone="success"
          subtext="New this quarter"
        />
        <MetricCard
          label="Industry Shift Rate · 5 Yrs"
          value="38%"
          delta="+6%"
          deltaTone="primary"
          subtext="Roles changed sector or stack"
        />
        <MetricCard
          label="Automated Upskills Triggered"
          value="142"
          delta="89% completion"
          deltaTone="success"
          subtext="This month"
        />
      </div>

      {/* Zone 2 — main two-column work area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Trajectories */}
        <div className="utility-card lg:col-span-3">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-[21px] font-semibold tracking-tight text-ink">
                Alumni Trajectory Tree
              </h2>
              <p className="mt-1 text-[12px] text-ink-muted-48">
                Structural career transitions · 2019–2026 cohort
              </p>
            </div>
            <button
              type="button"
              onClick={triggerCSV}
              disabled={csvState !== 'idle'}
              className={`btn-primary-sm inline-flex items-center gap-1.5 transition-all ${
                csvState === 'done' ? 'bg-success' : ''
              } disabled:cursor-default`}
            >
              {csvState === 'loading' && (
                <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" />
                </svg>
              )}
              {csvState === 'done' && (
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {csvState === 'idle' && 'Export CSV'}
              {csvState === 'loading' && 'Exporting…'}
              {csvState === 'done' && 'Exported!'}
            </button>
          </div>

          <div className="space-y-3">
            {pageTrajectories.map((t) => (
              <TrajectoryCard key={t.id} trajectory={t} />
            ))}
          </div>

          {/* Pagination — same pattern as StudentDashboard */}
          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-[14px] font-normal text-primary disabled:cursor-not-allowed disabled:text-ink-muted-48"
              >
                ← Prev
              </button>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    aria-label={`Page ${p}${p === page ? ' (current)' : ''}`}
                    aria-current={p === page ? 'page' : undefined}
                    className={`h-2 rounded-full transition-all ${
                      p === page ? 'w-5 bg-primary' : 'w-2 bg-hairline hover:bg-ink-muted-48'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-[14px] font-normal text-primary disabled:cursor-not-allowed disabled:text-ink-muted-48"
              >
                Next →
              </button>
            </div>
          )}

          <TrajectoryLegend />
        </div>

        {/* Nudges */}
        <div className="utility-card lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-[21px] font-semibold tracking-tight text-ink">
              Automated Nudge Log
            </h2>
            <p className="mt-1 text-[12px] text-ink-muted-48">
              Background analysis actions · Real-time feed
            </p>
          </div>

          {/* Filter chips */}
          <div className="mb-2 flex flex-wrap gap-1.5">
            {NUDGE_FILTERS.map((f) => {
              const active = nudgeFilter === f.key
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setNudgeFilter(f.key)}
                  className={`rounded-full px-2.5 py-1 text-[12px] font-semibold transition-colors ${
                    active
                      ? 'bg-primary text-white'
                      : 'border border-hairline bg-canvas text-ink-muted-80 hover:bg-parchment'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>

          <div className="divide-y divide-hairline">
            {filteredNudges.length === 0 ? (
              <p className="py-6 text-center text-[14px] text-ink-muted-48">
                No nudges match this filter.
              </p>
            ) : (
              filteredNudges.map((entry) => (
                <article key={entry.id} className="py-4 first:pt-4 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <NudgeTypeBadge type={entry.type} severity={entry.severity} />
                    <time className="shrink-0 text-[12px] text-ink-muted-48">
                      {entry.time}
                    </time>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.47] text-ink-muted-80">
                    {entry.message}
                  </p>
                  <p className="mt-2 text-[12px] font-semibold text-primary">
                    Impact: {entry.impact}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>


    </div>
  )
}
