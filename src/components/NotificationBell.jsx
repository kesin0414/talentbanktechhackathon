import { useEffect, useRef, useState } from 'react'

const BellIcon = () => (
  <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
    <path
      d="M10 2.5a4.5 4.5 0 0 0-4.5 4.5v2.4c0 .6-.2 1.2-.6 1.7L3.5 13h13l-1.4-1.9c-.4-.5-.6-1.1-.6-1.7V7A4.5 4.5 0 0 0 10 2.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M8 15a2 2 0 0 0 4 0"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
)

const ICONS = {
  github: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.22.83 1.22.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.52.56.83 1.28.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.74.54 1.49v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  ),
  skill: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3 4.2 13.3l.7-4.3L1.8 6l4.3-.6L8 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  view: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M1 8s2.5-4.5 7-4.5S15 8 15 8s-2.5 4.5-7 4.5S1 8 1 8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  brief: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 5V3.5A1 1 0 0 1 7 2.5h2a1 1 0 0 1 1 1V5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M8 2L1.5 13.5h13L8 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.7" fill="currentColor" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 14c0-2.7 2.5-4.5 5.5-4.5s5.5 1.8 5.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
}

export default function NotificationBell({ notifications, onMarkRead, onMarkAllRead }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const unread = notifications.filter((n) => !n.read).length

  useEffect(() => {
    if (!open) return
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white active:scale-95"
        aria-label={`Notifications${unread ? ` (${unread} unread)` : ''}`}
        aria-expanded={open}
      >
        <BellIcon />
        {unread > 0 && (
          <span
            className="absolute right-1 top-1 h-2 w-2 rounded-full bg-error ring-2 ring-black"
            aria-hidden="true"
          />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-[60] mt-2 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[18px] border border-hairline bg-canvas shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-fade-in">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <h3 className="text-[14px] font-semibold text-ink">Notifications</h3>
            {unread > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="text-[12px] text-primary active:scale-95"
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="px-4 py-10 text-center text-[12px] text-ink-muted-48">
              No notifications yet
            </div>
          ) : (
            <ul className="max-h-[400px] overflow-y-auto divide-y divide-hairline">
              {notifications.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => onMarkRead(n.id)}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-parchment ${
                      !n.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-parchment text-ink">
                      {ICONS[n.type] || ICONS.alert}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] leading-[1.4] text-ink-muted-80">
                        {n.title}
                      </p>
                      <p className="mt-0.5 text-[12px] text-ink-muted-48">
                        {n.time}
                      </p>
                    </div>
                    {!n.read && (
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
