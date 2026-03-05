export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        {children}
      </div>
    </div>
  )
}
