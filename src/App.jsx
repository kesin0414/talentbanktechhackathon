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
  notifications: {
    student: [
      { id: 's1', type: 'github', title: 'GitHub repo “career-portfolio-api” synced — +3 verified commits', time: '2 hours ago', read: false },
      { id: 's2', type: 'skill', title: 'PostgreSQL skill level updated to 90% — Advanced module complete', time: 'Yesterday', read: false },
      { id: 's3', type: 'view', title: 'Profile viewed by Petronas Digital Talent Scout', time: '3 days ago', read: false },
      { id: 's4', type: 'brief', title: 'New match: Backend Engineer Intern at Grab — 78% match', time: '5 days ago', read: true },
    ],
    admin: [
      { id: 'a1', type: 'alert', title: 'Skill gap detected: Jakarta EE — 45 alumni auto-enrolled in micro-credential', time: '2 hours ago', read: false },
      { id: 'a2', type: 'alert', title: 'Career plateau detected: 12 QA alumni nudged toward Cypress upskill', time: 'Yesterday', read: false },
      { id: 'a3', type: 'brief', title: 'Industry shift: Cloud migration demand up 38% in Johor', time: '2 days ago', read: false },
      { id: 'a4', type: 'user', title: 'Grab posted 6 new backend roles — 19 students auto-enrolled', time: '3 days ago', read: true },
    ],
    employer: [
      { id: 'e1', type: 'user', title: 'Ahmad T. accepted your interview invitation', time: '1 hour ago', read: false },
      { id: 'e2', type: 'skill', title: 'New verified candidate: Sarah L. completed CI/CD Pipeline module', time: '4 hours ago', read: false },
      { id: 'e3', type: 'view', title: '3 candidates viewed your mock challenge today', time: 'Yesterday', read: false },
      { id: 'e4', type: 'brief', title: 'Talent pool grew by 47 candidates this week', time: '2 days ago', read: true },
    ],
  },
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-hairline bg-parchment px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-[14px] font-semibold text-ink">Career OS</p>
            <ul className="mt-4 space-y-3 text-[14px] leading-[2.41] text-ink-muted-80">
              <li>Student Portal</li>
              <li>Admin Analytics</li>
              <li>Employer Hub</li>
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
          © 2026 Career OS · TalentBank Tech Hackathon Prototype
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

  const markNotificationRead = (id) => {
    setAppState((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [prev.activeRole]: prev.notifications[prev.activeRole].map((n) =>
          n.id === id ? { ...n, read: true } : n,
        ),
      },
    }))
  }

  const markAllNotificationsRead = () => {
    setAppState((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [prev.activeRole]: prev.notifications[prev.activeRole].map((n) => ({
          ...n,
          read: true,
        })),
      },
    }))
  }

  return (
    <div className="min-h-screen bg-parchment">
      <TopNav
        activeRole={appState.activeRole}
        onRoleChange={handleRoleChange}
        notifications={appState.notifications[appState.activeRole]}
        onMarkRead={markNotificationRead}
        onMarkAllRead={markAllNotificationsRead}
      />

      <main>
        {appState.activeRole === 'student' && (
          <StudentDashboard
            state={appState.student}
            setState={setStudentState}
            challenges={appState.employer.challenges}
          />
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
