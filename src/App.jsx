import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import CategoryGrid from './components/CategoryGrid'
import SelectedBar from './components/SelectedBar'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [categories, setCategories] = useState({})
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [building, setBuilding] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${BASE_URL}/api/apps`)
      const data = await res.json()
      setCategories(data.categories || {})
    }
    load()
  }, [])

  const flatApps = useMemo(() => new Set(Object.values(categories).flat()), [categories])

  const toggle = (app) => {
    if (!flatApps.has(app)) return
    setSelected((prev) => (prev.includes(app) ? prev.filter(a => a !== app) : [...prev, app]))
  }

  const clear = () => setSelected([])

  const build = async () => {
    try {
      setBuilding(true)
      setDownloadUrl('')
      const res = await fetch(`${BASE_URL}/api/build`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apps: selected })
      })
      if (!res.ok) throw new Error('Build failed')
      const data = await res.json()
      setDownloadUrl(`${BASE_URL}${data.download_url}`)
    } catch (e) {
      alert(e.message)
    } finally {
      setBuilding(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onSearch={setSearch} />

      <section className="max-w-6xl mx-auto px-4 pt-8 pb-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Pick the apps you want</h1>
          <p className="text-slate-600">We’ll make a tiny installer for you. No toolbars. No junk. Just clean installs.</p>
        </div>

        {Object.keys(categories).length === 0 ? (
          <div className="text-center text-slate-500">Loading catalog…</div>
        ) : (
          <CategoryGrid categories={categories} selected={selected} toggle={toggle} search={search} />
        )}
      </section>

      <SelectedBar items={selected} onClear={clear} onBuild={build} building={building} downloadUrl={downloadUrl} />
    </div>
  )
}

export default App
