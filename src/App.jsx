import { useState } from 'react'
import TopNav from './components/TopNav'
import StudentDashboard from './components/StudentDashboard'
import UniversityAdmin from './components/UniversityAdmin'
import EmployerHub from './components/EmployerHub'

const INITIAL_STATE = {
  activeRole: 'student',
  student: {
    githubConnected: false,
    pdfUploaded: false,
    appliedOpportunities: [],
  },
  employer: {
    sortDesc: true,
    challenges: [],
    viewedPortfolios: [],
  },
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-hairline bg-parchment px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <p className="text-[14px] font-semibold text-ink">Career OS</p>
            <ul className="mt-4 space-y-3 text-[14px] leading-[2.41] text-ink-muted-80">
              <li>Student Portal</li>
              <li>Admin Analytics</li>
              <li>Employer Hub</li>
            </ul>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink">University</p>
            <ul className="mt-4 space-y-3 text-[14px] leading-[2.41] text-ink-muted-80">
              <li>UTHM FSKTM</li>
              <li>Faculty Integration</li>
              <li>Alumni Network</li>
            </ul>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink">Resources</p>
            <ul className="mt-4 space-y-3 text-[14px] leading-[2.41] text-ink-muted-80">
              <li>API Documentation</li>
              <li>Skill Framework</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink">Connect</p>
            <ul className="mt-4 space-y-3 text-[14px] leading-[2.41] text-ink-muted-80">
              <li>
                <a
                  href="https://github.com/kesin0414/talentbanktechhackathon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  GitHub Repository
                </a>
              </li>
              <li>Contact Team</li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-[12px] text-ink-muted-48">
          © 2026 Career OS · TalentBank Tech Hackathon Prototype · Universiti
          Tun Hussein Onn Malaysia
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const [appState, setAppState] = useState(INITIAL_STATE)

  const setStudentState = (updater) => {
    setAppState((prev) => ({
      ...prev,
      student:
        typeof updater === 'function' ? updater(prev.student) : updater,
    }))
  }

  const setEmployerState = (updater) => {
    setAppState((prev) => ({
      ...prev,
      employer:
        typeof updater === 'function' ? updater(prev.employer) : updater,
    }))
  }

  const handleRoleChange = (role) => {
    setAppState((prev) => ({ ...prev, activeRole: role }))
  }

  return (
    <div className="min-h-screen bg-parchment">
      <TopNav
        activeRole={appState.activeRole}
        onRoleChange={handleRoleChange}
      />

      <main>
        {appState.activeRole === 'student' && (
          <StudentDashboard state={appState.student} setState={setStudentState} />
        )}
        {appState.activeRole === 'admin' && <UniversityAdmin />}
        {appState.activeRole === 'employer' && (
          <EmployerHub state={appState.employer} setState={setEmployerState} />
        )}
      </main>

      <Footer />
    </div>
  )
}
