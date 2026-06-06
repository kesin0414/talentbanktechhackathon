import { useState } from 'react'

const INITIAL_SKILLS = [
  { name: 'Frontend (Angular)', level: 85, verified: true },
  { name: 'Backend (Spring Boot)', level: 60, verified: true },
  { name: 'Database (PostgreSQL)', level: 90, verified: true },
  { name: 'DevOps (Docker)', level: 45, verified: false },
  { name: 'Mobile (Flutter)', level: 30, verified: false },
]

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
]

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
          className="text-[21px] font-semibold tracking-tight text-ink"
        >
          Confirm Application
        </h2>
        <p className="mt-4 text-[17px] leading-[1.47] text-ink-muted-80">
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
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="btn-secondary-pill">
            Cancel
          </button>
          <button type="button" onClick={onApply} className="btn-primary">
            Apply Anyway
          </button>
        </div>
      </div>
    </div>
  )
}

function SkillBar({ name, level, verified }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-semibold text-ink">{name}</span>
        <div className="flex items-center gap-2">
          {verified && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              Verified
            </span>
          )}
          <span className="text-[14px] tabular-nums text-ink-muted-48">
            {level}%
          </span>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-parchment">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

function OpportunityCard({ opportunity, applied, onApply }) {
  const [expanded, setExpanded] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleApply = () => {
    setShowModal(false)
    onApply(opportunity.id)
  }

  return (
    <>
      <div className="utility-card overflow-hidden transition-all">
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
          <div className="flex flex-col items-end gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-700">
              {opportunity.matchScore}% Match Score
            </span>
            <span className="text-[12px] text-primary">
              {expanded ? 'Collapse ▲' : 'View criteria ▼'}
            </span>
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
                  <span className="text-emerald-600">✅</span>
                  {c.label}
                  {c.detail && (
                    <span className="text-ink-muted-48">({c.detail})</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-md bg-red-50 px-4 py-3">
              <p className="text-[14px] font-semibold text-red-800">
                ❌ Missing: {opportunity.missing}
              </p>
              <p className="mt-1 text-[12px] text-red-600">
                Complete the {opportunity.upskillModule} micro-credential to
                unlock full eligibility.
              </p>
            </div>

            <div className="mt-5">
              {applied ? (
                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-full bg-emerald-600 px-[22px] py-[11px] text-[17px] text-white opacity-90 sm:w-auto"
                >
                  Applied ✓
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="btn-primary w-full sm:w-auto"
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
      <div className="mb-8">
        <h1 className="text-[34px] font-semibold tracking-display text-ink sm:text-[40px]">
          Your Career Readiness
        </h1>
        <p className="mt-2 max-w-2xl text-[17px] text-ink-muted-48">
          Real-time skill verification linked to faculty modules, GitHub
          activity, and project submissions — so employers see capability, not
          just CGPA.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column — 1/3 */}
        <div className="space-y-6 lg:col-span-1">
          <div className="utility-card">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[22px] font-semibold text-primary">
                AD
              </div>
              <div>
                <h2 className="text-[17px] font-semibold text-ink">
                  Alex Developer
                </h2>
                <p className="text-[14px] text-ink-muted-48">
                  BSc Software Engineering
                </p>
                <p className="text-[14px] text-ink-muted-48">Year 3 · CGPA 3.8</p>
                <p className="mt-1 text-[12px] text-ink-muted-48">
                  Faculty of Electrical & Electronic Engineering · UTHM
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleGithubConnect}
                className="btn-pearl flex items-center justify-center gap-2"
              >
                {githubConnected ? 'GitHub Connected' : 'Connect GitHub'}
                <span
                  className={`h-2 w-2 rounded-full ${
                    githubConnected ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  aria-label={
                    githubConnected ? 'Connected' : 'Not connected'
                  }
                />
              </button>
              <button
                type="button"
                onClick={handlePdfUpload}
                className="btn-pearl flex items-center justify-center gap-2"
              >
                {pdfUploaded ? 'Project PDF Uploaded ✓' : 'Upload Project PDF'}
                {pdfUploaded ? (
                  <span className="text-emerald-600">↑</span>
                ) : (
                  <span className="text-ink-muted-48">↑</span>
                )}
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-hairline pt-5">
              <div className="text-center">
                <p className="text-[21px] font-semibold tabular-nums text-ink">
                  12
                </p>
                <p className="text-[10px] text-ink-muted-48">Verified Skills</p>
              </div>
              <div className="text-center">
                <p className="text-[21px] font-semibold tabular-nums text-ink">
                  4
                </p>
                <p className="text-[10px] text-ink-muted-48">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-[21px] font-semibold tabular-nums text-ink">
                  86%
                </p>
                <p className="text-[10px] text-ink-muted-48">Readiness</p>
              </div>
            </div>
          </div>

          <div className="utility-card">
            <h3 className="text-[17px] font-semibold tracking-tight text-ink">
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
          </div>

          <div className="utility-card bg-parchment">
            <h3 className="text-[14px] font-semibold text-ink">
              Recommended Upskill
            </h3>
            <p className="mt-2 text-[14px] text-ink-muted-80">
              Spring Boot Security — Weekend Micro-credential (8 hrs)
            </p>
            <button type="button" className="btn-secondary-pill mt-4 text-[12px]">
              Enroll Free →
            </button>
          </div>
        </div>

        {/* Right column — 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[21px] font-semibold tracking-tight text-ink">
                Target Opportunities
              </h2>
              <span className="text-[12px] text-ink-muted-48">
                {OPPORTUNITIES.length} matches · Updated today
              </span>
            </div>
            <div className="space-y-4">
              {OPPORTUNITIES.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  applied={appliedOpportunities.includes(opp.id)}
                  onApply={handleApply}
                />
              ))}
            </div>
          </div>

          <div className="utility-card">
            <h3 className="text-[17px] font-semibold text-ink">
              Recent Activity
            </h3>
            <ul className="mt-4 divide-y divide-hairline">
              {[
                {
                  time: '2 hours ago',
                  text: 'GitHub repo "uthm-career-api" synced — +3 verified commits',
                },
                {
                  time: 'Yesterday',
                  text: 'Completed PostgreSQL Advanced module — skill level updated to 90%',
                },
                {
                  time: '3 days ago',
                  text: 'Profile viewed by Petronas Digital Talent Scout',
                },
              ].map((item) => (
                <li
                  key={item.text}
                  className="flex items-start justify-between gap-4 py-3"
                >
                  <span className="text-[14px] text-ink-muted-80">
                    {item.text}
                  </span>
                  <span className="shrink-0 text-[12px] text-ink-muted-48">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
