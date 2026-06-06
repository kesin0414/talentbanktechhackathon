import NotificationBell from './NotificationBell'

export default function TopNav({
  activeRole,
  onRoleChange,
  notifications,
  onMarkRead,
  onMarkAllRead,
}) {
  const roles = [
    { id: 'student', label: 'Student View' },
    { id: 'admin', label: 'University Admin' },
    { id: 'employer', label: 'Employer Hub' },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Global nav — true black, 44px, Apple spec */}
      <div className="bg-black">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary">
              <span className="text-[13px] font-semibold text-white leading-none">CO</span>
            </div>
            <span className="text-[17px] font-semibold text-white" style={{ letterSpacing: '-0.12px' }}>
              Career OS
            </span>
          </div>

          {/* Right cluster: role tabs + notification bell */}
          <div className="ml-auto flex items-center gap-3">
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
                    activeRole === role.id ? 'segment-btn-active' : 'segment-btn-inactive'
                  }`}
                >
                  <span className="hidden sm:inline">{role.label}</span>
                  <span className="sm:hidden">
                    {role.id === 'student' ? 'Student' : role.id === 'admin' ? 'Admin' : 'Employer'}
                  </span>
                </button>
              ))}
            </nav>

            <NotificationBell
              notifications={notifications}
              onMarkRead={onMarkRead}
              onMarkAllRead={onMarkAllRead}
            />
          </div>
        </div>
      </div>
    </header>
  )
}



