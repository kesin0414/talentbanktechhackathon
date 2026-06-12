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
    program: 'Software Engineering',
  },
  {
    id: 2,
    name: 'Sarah L.',
    year: 4,
    availability: 'Available Now',
    status: 'Active',
    cgpa: 3.6,
    capabilities: ['Angular', 'RESTful API Design', 'CI/CD Pipeline'],
    program: 'Computer Engineering',
  },
  {
    id: 3,
    name: 'Wei Ming C.',
    year: 3,
    availability: 'Available July',
    status: 'Active',
    cgpa: 3.72,
    capabilities: ['React', 'Node.js', 'MongoDB'],
    program: 'Computer Science',
  },
  {
    id: 4,
    name: 'Nurul H.',
    year: 4,
    availability: 'Available Now',
    status: 'Interviewing',
    cgpa: 3.91,
    capabilities: ['Python', 'Machine Learning', 'TensorFlow'],
    program: 'Data Science',
  },
  {
    id: 5,
    name: 'Raj K.',
    year: 2,
    availability: 'Available Dec 2026',
    status: 'Active',
    cgpa: 3.45,
    capabilities: ['Java', 'Spring Boot', 'MySQL'],
    program: 'Information Technology',
  },
  {
    id: 6,
    name: 'Farah A.',
    year: 4,
    availability: 'Available Now',
    status: 'Active',
    cgpa: 3.78,
    capabilities: ['Flutter', 'Firebase', 'UI/UX Design'],
    program: 'Software Engineering',
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
              {candidate.program} · Year {candidate.year} · CGPA{' '}
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
                  className="tag-soft"
                >
                  {cap}
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
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState([])

  const addSkill = () => {
    const value = skillInput.trim()
    if (value && !skills.includes(value)) {
      setSkills((prev) => [...prev, value])
    }
    setSkillInput('')
  }

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkill()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() && skills.length > 0) {
      onUpload({ title: title.trim(), skills })
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
            <label
              htmlFor="challenge-title"
              className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48"
            >
              Challenge Title
            </label>
            <input
              id="challenge-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build a REST API with JWT Auth"
              className="mt-1 w-full rounded-full border border-black/10 px-5 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary-focus"
            />
          </div>
          <div>
            <label
              htmlFor="challenge-skill"
              className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48"
            >
              Skill Tags
            </label>
            <p className="mt-0.5 text-[12px] text-ink-muted-48">
              Add skills one at a time — press Enter to create a separate tag.
            </p>
            <div className="mt-1 flex gap-2">
              <input
                id="challenge-skill"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="e.g. Spring Boot Security"
                className="w-full rounded-full border border-black/10 px-5 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary-focus"
              />
              <button
                type="button"
                onClick={addSkill}
                className="btn-secondary-pill shrink-0"
              >
                Add
              </button>
            </div>
            {skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-full bg-parchment px-2.5 py-1 text-[12px] font-medium text-ink-muted-80"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-ink-muted-48 active:scale-95"
                      aria-label={`Remove ${skill}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="btn-secondary-pill">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || skills.length === 0}
              className="btn-primary disabled:opacity-40"
            >
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
  const [currentPage, setCurrentPage] = useState(1)

  const PAGE_SIZE = 4

  const sortedCandidates = useMemo(() => {
    return [...INITIAL_CANDIDATES].sort((a, b) =>
      sortDesc ? b.cgpa - a.cgpa : a.cgpa - b.cgpa,
    )
  }, [sortDesc])

  const totalPages = Math.max(1, Math.ceil(sortedCandidates.length / PAGE_SIZE))
  const page = Math.min(currentPage, totalPages)
  const pagedCandidates = sortedCandidates.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  )

  const stats = useMemo(() => {
    const total = INITIAL_CANDIDATES.length
    const availableNow = INITIAL_CANDIDATES.filter(
      (c) => c.availability === 'Available Now',
    ).length
    const interviewing = INITIAL_CANDIDATES.filter(
      (c) => c.status === 'Interviewing',
    ).length
    const avgCgpa =
      INITIAL_CANDIDATES.reduce((sum, c) => sum + c.cgpa, 0) / total
    return [
      { label: 'Verified candidates', value: total },
      { label: 'Available now', value: availableNow },
      { label: 'Interviewing', value: interviewing },
      { label: 'Average CGPA', value: avgCgpa.toFixed(2) },
    ]
  }, [])

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
          <h1 className="text-[34px] font-semibold tracking-tight text-ink sm:text-[40px]">
            Candidates
          </h1>
          <p className="mt-2 max-w-xl text-[14px] text-ink-muted-48">
            Filter by CGPA, verify by actual capability.
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

      <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="utility-card p-5">
            <p className="text-[34px] font-semibold tabular-nums tracking-tight text-ink sm:text-[40px]">
              {stat.value}
            </p>
            <p className="mt-1 text-[12px] text-ink-muted-48">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="utility-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-divider-soft">
                <th className="px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
                  Candidate
                </th>
                <th className="px-6 py-3.5">
                  <button
                    type="button"
                    onClick={toggleSort}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary/15 active:scale-95"
                  >
                    CGPA
                    <span aria-hidden="true">{sortDesc ? '↓' : '↑'}</span>
                  </button>
                </th>
                <th className="px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
                  Verified Capabilities
                </th>
                <th className="px-6 py-3.5 text-right text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider-soft">
              {pagedCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="transition-colors hover:bg-parchment/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-parchment text-[12px] font-semibold text-ink-muted-80">
                        {candidate.name
                          .split(' ')
                          .map((part) => part[0])
                          .join('')
                          .slice(0, 2)}
                      </span>
                      <div>
                        <p className="text-[17px] font-semibold tracking-tight text-ink">
                          {candidate.name}
                        </p>
                        <p className="mt-0.5 text-[12px] text-ink-muted-48">
                          Year {candidate.year} · {candidate.availability}
                        </p>
                        <span
                          className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[12px] font-semibold ${
                            candidate.status === 'Interviewing'
                              ? 'bg-ink/10 text-ink'
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[17px] font-semibold tabular-nums text-ink">
                      {candidate.cgpa.toFixed(2)}
                    </p>
                    <p className="mt-0.5 text-[12px] text-ink-muted-48">{candidate.program}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="tag-soft"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleViewPortfolio(candidate)}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[14px] font-normal transition-colors active:scale-95 ${
                        viewedPortfolios.includes(candidate.id)
                          ? 'text-ink-muted-48 hover:bg-parchment'
                          : 'text-primary hover:bg-primary/10'
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
        <div className="flex flex-col gap-3 border-t border-divider-soft px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-ink-muted-48">
            Last synced 14 min ago · Career OS Network
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-ink-muted-48">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-full px-3 py-1.5 text-[14px] font-normal text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:text-ink-muted-48 disabled:hover:bg-transparent active:scale-95"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-full px-3 py-1.5 text-[14px] font-normal text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:text-ink-muted-48 disabled:hover:bg-transparent active:scale-95"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {challenges.length > 0 && (
        <section className="mt-10">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-ink-muted-48">
            Your Published Challenges
          </p>
          <div className="utility-card overflow-hidden p-0">
            <ul className="divide-y divide-divider-soft">
              {challenges.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-[17px] font-semibold tracking-tight text-ink">
                    {c.title}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(c.skills ?? []).map((skill) => (
                      <span key={skill} className="tag-soft">
                        {skill}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
