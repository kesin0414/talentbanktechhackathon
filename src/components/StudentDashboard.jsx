import { useState } from 'react'

const INITIAL_SKILLS = [
  { name: 'Frontend (Angular)', level: 85, verified: true },
  { name: 'Backend (Spring Boot)', level: 60, verified: true },
  { name: 'Database (PostgreSQL)', level: 90, verified: true },
  { name: 'DevOps (Docker)', level: 45, verified: false },
  { name: 'Mobile (Flutter)', level: 30, verified: false },
]

// Apple system color tiers for skill proficiency
const SKILL_TIERS = [
  { label: 'Expert (80%+)', color: '#34c759', min: 80 },
  { label: 'Proficient (60–79%)', color: '#0066cc', min: 60 },
  { label: 'Developing (40–59%)', color: '#ff9500', min: 40 },
  { label: 'Beginner (<40%)', color: '#ff3b30', min: 0 },
]

const skillColor = (level) => SKILL_TIERS.find((t) => level >= t.min).color

// Apple system color tiers for opportunity match
const matchColor = (score) => {
  if (score >= 80) return '#34c759'
  if (score >= 60) return '#0066cc'
  if (score >= 40) return '#ff9500'
  return '#ff3b30'
}

const OPPORTUNITIES = [
  {
    id: 'meta-kl',
    title: 'Software Engineering Intern',
    company: 'Meta',
    location: 'Kuala Lumpur',
    matchScore: 90,
    salary: 'RM 3,500 / month',
    duration: '12 weeks · Jun–Aug 2026',
    criteria: [
      { label: 'CGPA 3.5+', met: true, detail: 'Current: 3.8' },
      { label: 'Java / OOP', met: true },
      { label: 'Database Management', met: true },
      { label: 'RESTful API Design', met: true },
    ],
    missing: 'Spring Boot Security',
    applyMatch: 60,
    upskillMatch: 95,
    upskillModule: 'Spring Boot Security',
  },
  {
    id: 'grab-penang',
    title: 'Backend Engineer Intern',
    company: 'Grab',
    location: 'Penang',
    matchScore: 78,
    salary: 'RM 3,200 / month',
    duration: '10 weeks · Jul–Sep 2026',
    criteria: [
      { label: 'CGPA 3.2+', met: true, detail: 'Current: 3.8' },
      { label: 'Spring Boot', met: true },
      { label: 'PostgreSQL', met: true },
    ],
    missing: 'Kafka / Event Streaming',
    applyMatch: 72,
    upskillMatch: 88,
    upskillModule: 'Event-Driven Architecture',
  },
  {
    id: 'tiktok-kl',
    title: 'Frontend Engineer Intern',
    company: 'TikTok',
    location: 'Kuala Lumpur',
    matchScore: 85,
    salary: 'RM 3,800 / month',
    duration: '12 weeks · Jun–Aug 2026',
    criteria: [
      { label: 'CGPA 3.0+', met: true, detail: 'Current: 3.8' },
      { label: 'Angular / React', met: true },
      { label: 'RESTful API integration', met: true },
    ],
    missing: 'TypeScript Advanced Patterns',
    applyMatch: 80,
    upskillMatch: 93,
    upskillModule: 'TypeScript Advanced',
  },
  {
    id: 'shopee-pj',
    title: 'Full-Stack Developer Intern',
    company: 'Shopee',
    location: 'Petaling Jaya',
    matchScore: 72,
    salary: 'RM 3,000 / month',
    duration: '10 weeks · Jul–Sep 2026',
    criteria: [
      { label: 'CGPA 3.2+', met: true, detail: 'Current: 3.8' },
      { label: 'React or Angular', met: true },
      { label: 'Node.js or Spring Boot', met: true },
    ],
    missing: 'Redis / Caching Strategies',
    applyMatch: 68,
    upskillMatch: 85,
    upskillModule: 'Distributed Caching',
  },
  {
    id: 'airasia-klia',
    title: 'DevOps Engineer Intern',
    company: 'AirAsia Digital',
    location: 'KLIA Sepang',
    matchScore: 55,
    salary: 'RM 2,800 / month',
    duration: '8 weeks · Aug–Sep 2026',
    criteria: [
      { label: 'CGPA 3.0+', met: true, detail: 'Current: 3.8' },
      { label: 'Linux fundamentals', met: true },
    ],
    missing: 'Kubernetes & Docker Orchestration',
    applyMatch: 50,
    upskillMatch: 78,
    upskillModule: 'Kubernetes Fundamentals',
  },
  {
    id: 'petronas-kl',
    title: 'Data Engineering Intern',
    company: 'Petronas Digital',
    location: 'Kuala Lumpur',
    matchScore: 68,
    salary: 'RM 3,100 / month',
    duration: '12 weeks · Jun–Aug 2026',
    criteria: [
      { label: 'CGPA 3.3+', met: true, detail: 'Current: 3.8' },
      { label: 'SQL / PostgreSQL', met: true },
      { label: 'Python basics', met: true },
    ],
    missing: 'Apache Spark / Big Data',
    applyMatch: 63,
    upskillMatch: 82,
    upskillModule: 'Big Data with Spark',
  },
]

const PAGE_SIZE = 3

// ── Iconography (inline SVG, single weight, Apple-style)
function CheckIcon({ className = 'h-4 w-4', color = '#34c759' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill={color} />
      <path d="M4.5 8.2l2.2 2.2L11.5 5.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossIcon({ className = 'h-4 w-4', color = '#ff3b30' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill={color} />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

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

function ApplyModal({ opportunity, onCancel, onApply }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-4 sm:items-center animate-fade-in">
      <div
        className="w-full max-w-md rounded-lg bg-canvas p-6 sm:rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
      >
        <h2
          id="apply-modal-title"
          className="text-[17px] font-semibold tracking-tight text-ink"
        >
          Confirm Application
        </h2>
        <p className="mt-3 text-[14px] leading-[1.47] text-ink-muted-80">
          Applying now puts you at a{' '}
          <strong className="font-semibold text-ink">
            {opportunity.applyMatch}% match
          </strong>{' '}
          based on verified skills. Completing the recommended university module
          for{' '}
          <strong className="font-semibold text-primary">
            {opportunity.upskillModule}
          </strong>{' '}
          will increase your chance to{' '}
          <strong className="font-semibold text-ink">
            {opportunity.upskillMatch}%
          </strong>
          .
        </p>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="btn-secondary-pill-sm">
            Cancel
          </button>
          <button type="button" onClick={onApply} className="btn-primary-sm">
            Apply Anyway
          </button>
        </div>
      </div>
    </div>
  )
}

function SkillBar({ name, level, verified }) {
  const color = skillColor(level)
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
          {name}
          {verified && <CheckIcon className="h-3.5 w-3.5" color="#0066cc" />}
        </span>
        <span className="text-[14px] tabular-nums text-ink-muted-48">
          {level}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-parchment">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${level}%`, background: color }}
        />
      </div>
    </div>
  )
}

function SkillLegend() {
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
      {SKILL_TIERS.map((tier) => (
        <span
          key={tier.label}
          className="flex items-center gap-1.5 text-[12px] text-ink-muted-48"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: tier.color }}
            aria-hidden="true"
          />
          {tier.label}
        </span>
      ))}
    </div>
  )
}

function OpportunityCard({ opportunity, applied, onApply }) {
  const [expanded, setExpanded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const color = matchColor(opportunity.matchScore)

  const handleApply = () => {
    setShowModal(false)
    onApply(opportunity.id)
  }

  return (
    <>
      <div className="rounded-[18px] border border-hairline bg-canvas p-5 transition-all">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-start justify-between gap-4 text-left"
          aria-expanded={expanded}
        >
          <div className="flex-1">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
              {opportunity.company} · {opportunity.location}
            </p>
            <h3 className="mt-1 text-[17px] font-semibold tracking-tight text-ink">
              {opportunity.title}
            </h3>
            <p className="mt-1 text-[14px] text-ink-muted-48">
              {opportunity.duration} · {opportunity.salary}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-[12px] font-semibold"
              style={{
                background: `color-mix(in srgb, ${color} 12%, transparent)`,
                color: color,
              }}
            >
              {opportunity.matchScore}% Match
            </span>
            {applied && (
              <span className="rounded-full px-3 py-1 text-[12px] font-semibold" style={{ background: '#e5e5ea', color: '#6e6e73' }}>
                Applied
              </span>
            )}
            <ChevronIcon expanded={expanded} />
          </div>
        </button>

        {expanded && (
          <div className="animate-expand mt-5 border-t border-hairline pt-5">
            <p className="mb-3 text-[14px] font-semibold text-ink">
              Matching Criteria
            </p>
            <ul className="space-y-2">
              {opportunity.criteria.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center gap-2 text-[14px] text-ink-muted-80"
                >
                  <CheckIcon className="h-3.5 w-3.5" color="#34c759" />
                  {c.label}
                  {c.detail && (
                    <span className="text-ink-muted-48">({c.detail})</span>
                  )}
                </li>
              ))}
              <li className="flex items-center gap-2 text-[14px] text-ink-muted-80">
                <CrossIcon className="h-3.5 w-3.5" color="#ff3b30" />
                <span className="font-semibold text-ink">{opportunity.missing}</span>
              </li>
            </ul>

            <div className="mt-5">
              {!applied && (
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="btn-primary-sm w-full sm:w-auto"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <ApplyModal
          opportunity={opportunity}
          onCancel={() => setShowModal(false)}
          onApply={handleApply}
        />
      )}
    </>
  )
}

export default function StudentDashboard({ state, setState }) {
  const { githubConnected, pdfUploaded, appliedOpportunities } = state
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(OPPORTUNITIES.length / PAGE_SIZE)
  const pagedOpps = OPPORTUNITIES.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleGithubConnect = () => {
    setState((prev) => ({
      ...prev,
      githubConnected: !prev.githubConnected,
    }))
  }

  const handlePdfUpload = () => {
    setState((prev) => ({
      ...prev,
      pdfUploaded: true,
    }))
  }

  const handleApply = (oppId) => {
    setState((prev) => ({
      ...prev,
      appliedOpportunities: [...prev.appliedOpportunities, oppId],
    }))
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-8">

      {/* ── Zone 1: Horizontal profile strip ── */}
      <div className="utility-card mb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">

          {/* Avatar + identity */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[20px] font-semibold text-primary">
              AD
            </div>
            <div>
              <h2 className="text-[17px] font-semibold text-ink">Alex Developer</h2>
              <p className="text-[14px] text-ink-muted-48">BSc Software Engineering · Year 3 · CGPA 3.8</p>
              <p className="text-[12px] text-ink-muted-48">Faculty of Electrical & Electronic Engineering · UTHM</p>
            </div>
          </div>

          {/* Stats — divider on left at sm+ */}
          <div className="flex items-center gap-6 border-hairline sm:border-l sm:pl-6">
            <div className="text-center">
              <p className="text-[17px] font-semibold tabular-nums text-ink">12</p>
              <p className="text-[12px] text-ink-muted-48">Verified Skills</p>
            </div>
            <div className="text-center">
              <p className="text-[17px] font-semibold tabular-nums text-ink">4</p>
              <p className="text-[12px] text-ink-muted-48">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-[17px] font-semibold tabular-nums text-ink">86%</p>
              <p className="text-[12px] text-ink-muted-48">Readiness</p>
            </div>
          </div>

          {/* Action buttons — pushed to far right on desktop */}
          <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
            <button
              type="button"
              onClick={handleGithubConnect}
              className="btn-pearl flex items-center gap-2"
            >
              {githubConnected ? 'GitHub Connected' : 'Connect GitHub'}
              <span
                className={`h-2 w-2 rounded-full ${githubConnected ? 'bg-success' : 'bg-error'}`}
                aria-label={githubConnected ? 'Connected' : 'Not connected'}
              />
            </button>
            <button
              type="button"
              onClick={handlePdfUpload}
              className="btn-pearl"
            >
              {pdfUploaded ? 'Project PDF Uploaded ✓' : 'Upload Project PDF'}
            </button>
          </div>

        </div>
      </div>

      {/* ── Zone 2 & 3: Opportunities (3/5) + Skills/Upskill (2/5) ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

        {/* Left — Target Opportunities (3/5) */}
        <div className="lg:col-span-3">
          <div className="utility-card">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[21px] font-semibold tracking-tight text-ink">
                Target Opportunities
              </h2>
              <span className="text-[12px] text-ink-muted-48">
                {OPPORTUNITIES.length} matches · Updated today
              </span>
            </div>
            <div className="space-y-4">
              {pagedOpps.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  applied={appliedOpportunities.includes(opp.id)}
                  onApply={handleApply}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-[14px] text-primary disabled:opacity-30 active:scale-95 transition-transform"
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
                  className="text-[14px] text-primary disabled:opacity-30 active:scale-95 transition-transform"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right — Skills Matrix + Recommended Upskill (2/5) */}
        <div className="space-y-6 lg:col-span-2">

          <div className="utility-card">
            <h3 className="text-[21px] font-semibold tracking-tight text-ink">
              Verified Skills Matrix
            </h3>
            <p className="mt-1 text-[12px] text-ink-muted-48">
              Faculty-verified via assessments & GitHub commits
            </p>
            <div className="mt-5 space-y-5">
              {INITIAL_SKILLS.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
            <SkillLegend />
          </div>

          <div className="utility-card">
            <h3 className="text-[21px] font-semibold tracking-tight text-ink">
              Recommended Upskill
            </h3>
            <p className="mt-2 text-[14px] text-ink-muted-48">
              Spring Boot Security — Weekend Micro-credential (8 hrs)
            </p>
            <button type="button" className="btn-primary-sm mt-4">
              Enroll Free
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

