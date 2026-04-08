export default function AdminLayout({ children }) {
  return (
    <div className="admin-app-shell min-h-dvh w-full pl-[max(0px,env(safe-area-inset-left))] pr-[max(0px,env(safe-area-inset-right))]">
      {children}
    </div>
  )
}
