const TRAJECTORIES = [
  {
    from: 'Enterprise Java Developers',
    to: 'Cloud & AI Architects',
    change: 45,
    count: 312,
  },
  {
    from: 'Frontend Devs',
    to: 'Full-Stack Engineers',
    change: 22,
    count: 487,
  },
  {
    from: 'QA Analysts',
    to: 'DevOps Engineers',
    change: 18,
    count: 156,
  },
  {
    from: 'Network Admins',
    to: 'Cloud Security Specialists',
    change: 31,
    count: 89,
  },
]

const NUDGE_LOG = [
  {
    id: 1,
    type: 'Skill Gap Detected',
    message:
      'Jakarta EE. System automatically emailed 45 alumni in legacy banking roles with free access to our weekend micro-credential course.',
    time: '2 hours ago',
    impact: '45 alumni',
  },
  {
    id: 2,
    type: 'Career Plateau Detected',
    message:
      'Identified 12 alumni stagnant in QA roles for 4+ years. Upskill nudge for Automated Testing with Cypress deployed.',
    time: 'Yesterday',
    impact: '12 alumni',
  },
  {
    id: 3,
    type: 'Industry Shift Alert',
    message:
      'Cloud migration demand up 38% in Johor. Triggered Azure Fundamentals pathway for 28 final-year students in FSKTM.',
    time: '2 days ago',
    impact: '28 students',
  },
  {
    id: 4,
    type: 'Employer Demand Signal',
    message:
      'Grab posted 6 new backend roles requiring Spring Boot Security. Auto-enrolled 19 matching students in weekend module.',
    time: '3 days ago',
    impact: '19 students',
  },
]

function MetricCard({ label, value, subtext }) {
  return (
    <div className="utility-card flex flex-col justify-between">
      <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
        {label}
      </p>
      <p className="mt-3 text-[34px] font-semibold tabular-nums tracking-display text-ink sm:text-[40px]">
        {value}
      </p>
      {subtext && (
        <p className="mt-2 text-[12px] text-ink-muted-48">{subtext}</p>
      )}
    </div>
  )
}

function TrajectoryBar({ from, to, change, count }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[14px] font-semibold text-ink">
          {from}{' '}
          <span className="font-normal text-ink-muted-48">→</span> {to}
        </p>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[12px] font-semibold text-primary">
          +{change}%
        </span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-parchment">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary/80 transition-all duration-700"
          style={{ width: `${Math.min(change * 2, 100)}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-700"
          style={{ width: `${Math.min(change, 100)}%` }}
        />
      </div>
      <p className="text-[12px] text-ink-muted-48">
        {count.toLocaleString()} alumni tracked on this path (5-year window)
      </p>
    </div>
  )
}

export default function UniversityAdmin() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-[34px] font-semibold tracking-display text-ink sm:text-[40px]">
          Institutional Outcomes Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-[17px] text-ink-muted-48">
          Track alumni career trajectories, detect skill gaps, and trigger
          automated upskilling — closing the loop between graduation and
          lifelong employability.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <MetricCard
          label="Active Alumni Tracked"
          value="4,208"
          subtext="+127 new this quarter"
        />
        <MetricCard
          label="Industry Shift Rate (5 Yrs)"
          value="38%"
          subtext="Roles changed sector or stack"
        />
        <MetricCard
          label="Automated Upskills Triggered"
          value="142"
          subtext="This month · 89% completion rate"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="utility-card">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-[21px] font-semibold tracking-tight text-ink">
                Alumni Trajectory Tree
              </h2>
              <p className="mt-1 text-[12px] text-ink-muted-48">
                Structural career transitions · 2019–2026 cohort
              </p>
            </div>
            <button type="button" className="btn-secondary-pill text-[12px]">
              Export CSV
            </button>
          </div>
          <div className="space-y-6">
            {TRAJECTORIES.map((t) => (
              <TrajectoryBar key={t.from} {...t} />
            ))}
          </div>
        </div>

        <div className="utility-card">
          <div className="mb-6">
            <h2 className="text-[21px] font-semibold tracking-tight text-ink">
              Automated Nudge Log
            </h2>
            <p className="mt-1 text-[12px] text-ink-muted-48">
              Background analysis actions · Real-time feed
            </p>
          </div>
          <div className="space-y-0 divide-y divide-hairline">
            {NUDGE_LOG.map((entry) => (
              <article key={entry.id} className="py-5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-semibold text-white">
                    {entry.type}
                  </span>
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
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 utility-card bg-parchment">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[17px] font-semibold text-ink">
              Faculty Integration Status
            </h3>
            <p className="mt-1 text-[14px] text-ink-muted-48">
              6 of 8 faculties connected · FSKTM, FKEE, FPTV, FKMP, FKAAS, FPTP
            </p>
          </div>
          <button type="button" className="btn-primary shrink-0">
            Configure Pathways
          </button>
        </div>
      </div>
    </div>
  )
}
