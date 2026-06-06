export default function TopNav({ activeRole, onRoleChange }) {
  const roles = [
    { id: 'student', label: 'Student View' },
    { id: 'admin', label: 'University Admin' },
    { id: 'employer', label: 'Employer Hub' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <span className="text-[11px] font-semibold text-white">CO</span>
          </div>
          <span className="text-[14px] font-semibold tracking-tight text-white">
            Career OS
          </span>
        </div>

        <nav
          className="flex max-w-[60vw] items-center gap-0.5 overflow-x-auto rounded-full bg-tile-1 p-1 sm:max-w-none sm:gap-1"
          role="tablist"
          aria-label="Role switcher"
        >
          {roles.map((role) => (
            <button
              key={role.id}
              role="tab"
              aria-selected={activeRole === role.id}
              onClick={() => onRoleChange(role.id)}
              className={`segment-btn whitespace-nowrap ${
                activeRole === role.id
                  ? 'segment-btn-active'
                  : 'segment-btn-inactive'
              }`}
            >
              <span className="hidden sm:inline">{role.label}</span>
              <span className="sm:hidden">
                {role.id === 'student'
                  ? 'Student'
                  : role.id === 'admin'
                    ? 'Admin'
                    : 'Employer'}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="border-b border-white/10 bg-parchment/80 backdrop-blur-[20px] backdrop-saturate-[180%]">
        <div className="mx-auto flex h-[52px] max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <p className="text-[14px] font-semibold tracking-tight text-ink">
            {activeRole === 'student' && 'Adaptive Readiness Profile'}
            {activeRole === 'admin' && 'Lifelong Outcome Loop'}
            {activeRole === 'employer' && 'Talent Discovery Engine'}
          </p>
          <span className="hidden text-[12px] text-ink-muted-48 sm:inline">
            Universiti Tun Hussein Onn Malaysia · Live Demo
          </span>
        </div>
      </div>
    </header>
  )
}
