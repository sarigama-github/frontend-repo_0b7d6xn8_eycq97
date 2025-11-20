import { useState } from 'react'

function Header({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    const q = e.target.value
    setQuery(q)
    onSearch(q)
  }

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2">
          <img src="/favicon.ico" alt="logo" className="w-6 h-6" />
          <span className="font-semibold text-slate-800">App Installer Builder</span>
        </a>
        <div className="flex-1" />
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search apps..."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-9 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        </div>
      </div>
    </header>
  )
}

export default Header
