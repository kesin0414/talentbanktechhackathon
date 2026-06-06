import { useState, useMemo } from 'react'

const INITIAL_CANDIDATES = [
  {
    id: 1,
    name: 'Ahmad T.',
    year: 3,
    availability: 'Available June',
    status: 'Active',
    cgpa: 3.85,
    capabilities: ['Spring Boot Security', 'PostgreSQL Migration'],
    faculty: 'FSKTM',
  },
  {
    id: 2,
    name: 'Sarah L.',
    year: 4,
    availability: 'Available Now',
    status: 'Active',
    cgpa: 3.6,
    capabilities: ['Angular', 'RESTful API Design', 'CI/CD Pipeline'],
    faculty: 'FKEE',
  },
  {
    id: 3,
    name: 'Wei Ming C.',
    year: 3,
    availability: 'Available July',
    status: 'Active',
    cgpa: 3.72,
    capabilities: ['React', 'Node.js', 'MongoDB'],
    faculty: 'FSKTM',
  },
  {
    id: 4,
    name: 'Nurul H.',
    year: 4,
    availability: 'Available Now',
    status: 'Interviewing',
    cgpa: 3.91,
    capabilities: ['Python', 'Machine Learning', 'TensorFlow'],
    faculty: 'FPTV',
  },
  {
    id: 5,
    name: 'Raj K.',
    year: 2,
    availability: 'Available Dec 2026',
    status: 'Active',
    cgpa: 3.45,
    capabilities: ['Java', 'Spring Boot', 'MySQL'],
    faculty: 'FKMP',
  },
  {
    id: 6,
    name: 'Farah A.',
    year: 4,
    availability: 'Available Now',
    status: 'Active',
    cgpa: 3.78,
    capabilities: ['Flutter', 'Firebase', 'UI/UX Design'],
    faculty: 'FSKTM',
  },
]

function PortfolioModal({ candidate, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-4 sm:items-center animate-fade-in">
      <div className="w-full max-w-lg rounded-lg bg-canvas p-6 sm:rounded-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[21px] font-semibold text-ink">
              {candidate.name} — Portfolio
            </h2>
            <p className="text-[14px] text-ink-muted-48">
              {candidate.faculty} · Year {candidate.year} · CGPA{' '}
              {candidate.cgpa.toFixed(2)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-parchment text-ink-muted-48 active:scale-95"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <div>
            <p className="text-[12px] font-semibold uppercase text-ink-muted-48">
              Verified Capabilities
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {candidate.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="rounded-full border border-hairline bg-parchment px-3 py-1 text-[12px] font-semibold text-ink"
                >
                  [{cap}]
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-md bg-parchment p-4">
            <p className="text-[14px] font-semibold text-ink">Featured Project</p>
            <p className="mt-1 text-[14px] text-ink-muted-80">
              Campus Event Management System — Full-stack app with Spring Boot +
              Angular, deployed on AWS with CI/CD pipeline.
            </p>
          </div>
          <div className="flex gap-3">
            <button type="button" className="btn-primary flex-1">
              Schedule Interview
            </button>
            <button type="button" onClick={onClose} className="btn-secondary-pill">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function UploadChallengeModal({ onClose, onUpload }) {
  const [title, setTitle] = useState('')
  const [skill, setSkill] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() && skill.trim()) {
      onUpload({ title: title.trim(), skill: skill.trim() })
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-4 sm:items-center animate-fade-in">
      <div className="w-full max-w-md rounded-lg bg-canvas p-6 sm:rounded-2xl">
        <h2 className="text-[21px] font-semibold text-ink">
          Upload Mock Challenge
        </h2>
        <p className="mt-2 text-[14px] text-ink-muted-48">
          Create a skill-verification challenge for candidates to complete.
        </p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-[12px] font-semibold text-ink-muted-80">
              Challenge Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build a REST API with JWT Auth"
              className="mt-1 w-full rounded-full border border-black/10 px-5 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary-focus"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-ink-muted-80">
              Skill Tag
            </label>
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g. Spring Boot Security"
              className="mt-1 w-full rounded-full border border-black/10 px-5 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary-focus"
            />
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="btn-secondary-pill">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Publish Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function EmployerHub({ state, setState }) {
  const { sortDesc, challenges, viewedPortfolios } = state
  const [portfolioCandidate, setPortfolioCandidate] = useState(null)
  const [showUpload, setShowUpload] = useState(false)

  const sortedCandidates = useMemo(() => {
    return [...INITIAL_CANDIDATES].sort((a, b) =>
      sortDesc ? b.cgpa - a.cgpa : a.cgpa - b.cgpa,
    )
  }, [sortDesc])

  const toggleSort = () => {
    setState((prev) => ({ ...prev, sortDesc: !prev.sortDesc }))
  }

  const handleUpload = (challenge) => {
    setState((prev) => ({
      ...prev,
      challenges: [...prev.challenges, { ...challenge, id: Date.now() }],
    }))
    setShowUpload(false)
  }

  const handleViewPortfolio = (candidate) => {
    setPortfolioCandidate(candidate)
    setState((prev) => ({
      ...prev,
      viewedPortfolios: prev.viewedPortfolios.includes(candidate.id)
        ? prev.viewedPortfolios
        : [...prev.viewedPortfolios, candidate.id],
    }))
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-ink sm:text-[34px]">
            Talent Discovery: Filter by CGPA, verify by actual capability
          </h1>
          <p className="mt-2 max-w-xl text-[14px] text-ink-muted-48">
            {INITIAL_CANDIDATES.length} verified candidates · Last synced 14 min
            ago · UTHM Career OS Network
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowUpload(true)}
          className="btn-primary shrink-0"
        >
          + Upload Mock Challenge
        </button>
      </div>

      {challenges.length > 0 && (
        <div className="mb-6 utility-card border-primary/20 bg-primary/5">
          <p className="text-[12px] font-semibold uppercase text-primary">
            Your Published Challenges
          </p>
          <ul className="mt-3 space-y-2">
            {challenges.map((c) => (
              <li key={c.id} className="text-[14px] text-ink-muted-80">
                <strong className="text-ink">{c.title}</strong> — [{c.skill}]
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="utility-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-hairline bg-parchment">
                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
                  Candidate Name / Status
                </th>
                <th className="px-6 py-4">
                  <button
                    type="button"
                    onClick={toggleSort}
                    className="flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wide text-primary active:scale-95"
                  >
                    CGPA
                    <span aria-hidden="true">{sortDesc ? '↓' : '↑'}</span>
                  </button>
                </th>
                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
                  Verified Capabilities
                </th>
                <th className="px-6 py-4 text-right text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {sortedCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="transition-colors hover:bg-parchment/50"
                >
                  <td className="px-6 py-4">
                    <p className="text-[14px] font-semibold text-ink">
                      {candidate.name}{' '}
                      <span className="font-normal text-ink-muted-48">
                        (Year {candidate.year} · {candidate.availability})
                      </span>
                    </p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        candidate.status === 'Interviewing'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[14px] tabular-nums text-ink">
                    {candidate.cgpa.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="rounded-full border border-hairline bg-canvas px-2.5 py-0.5 text-[11px] font-semibold text-ink-muted-80"
                        >
                          [{cap}]
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleViewPortfolio(candidate)}
                      className={`text-[14px] font-normal active:scale-95 ${
                        viewedPortfolios.includes(candidate.id)
                          ? 'text-ink-muted-48'
                          : 'text-primary'
                      }`}
                    >
                      View Portfolio →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {portfolioCandidate && (
        <PortfolioModal
          candidate={portfolioCandidate}
          onClose={() => setPortfolioCandidate(null)}
        />
      )}

      {showUpload && (
        <UploadChallengeModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  )
}
