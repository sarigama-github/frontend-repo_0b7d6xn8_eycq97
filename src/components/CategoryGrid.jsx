import { useMemo } from 'react'

function CategoryGrid({ categories, selected, toggle, search }) {
  const filtered = useMemo(() => {
    if (!search) return categories
    const q = search.toLowerCase()
    const out = {}
    Object.entries(categories).forEach(([cat, apps]) => {
      const hits = apps.filter(a => a.toLowerCase().includes(q))
      if (hits.length) out[cat] = hits
    })
    return out
  }, [categories, search])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(filtered).map(([cat, apps]) => (
        <div key={cat} className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="px-4 py-3 border-b border-slate-200 font-semibold text-slate-700">
            {cat}
          </div>
          <div className="p-3 grid grid-cols-1 gap-2">
            {apps.map(app => {
              const active = selected.includes(app)
              return (
                <button
                  key={app}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm border transition-colors ${active ? 'bg-blue-50 border-blue-400 text-blue-800' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                  onClick={() => toggle(app)}
                >
                  <span>{app}</span>
                  <span className={`ml-3 inline-flex items-center justify-center w-5 h-5 rounded ${active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{active ? '✓' : '+'}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoryGrid
