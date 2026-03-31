export const ListIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5.5" y1="3" x2="14" y2="3" />
    <line x1="5.5" y1="8" x2="14" y2="8" />
    <line x1="5.5" y1="13" x2="14" y2="13" />
    <circle cx="2" cy="3" r="1" fill="currentColor" stroke="none" />
    <circle cx="2" cy="8" r="1" fill="currentColor" stroke="none" />
    <circle cx="2" cy="13" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const CheckIcon = ({ checked }: { checked: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="12" height="12" rx="2" />
    {checked && <polyline points="5 8 7 10 11 6" />}
  </svg>
)

export const TaskListCheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M16.313,11.26l-5.592,5.592a.818.818,0,0,1-1.158,0L7.688,14.976"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M15.75,4.51H19.5A1.5,1.5,0,0,1,21,6.01V21.76a1.5,1.5,0,0,1-1.5,1.5H4.5A1.5,1.5,0,0,1,3,21.76V6.01a1.5,1.5,0,0,1,1.5-1.5H8.25a3.75,3.75,0,0,1,7.5,0Z"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12.057,3.765a.375.375,0,1,1-.428.313.375.375,0,0,1,.428-.313"
    />
  </svg>
)

export const HashIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16">
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      x1="3.75"
      y1="8.248"
      x2="23.25"
      y2="8.248"
    />
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      x1="0.75"
      y1="17.248"
      x2="20.25"
      y2="17.248"
    />
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      x1="12"
      y1="0.748"
      x2="4.5"
      y2="23.248"
    />
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      x1="19.5"
      y1="0.748"
      x2="12"
      y2="23.248"
    />
  </svg>
)
