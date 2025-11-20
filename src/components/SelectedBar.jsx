function SelectedBar({ items, onClear, onBuild, building, downloadUrl }) {
  return (
    <div className="sticky bottom-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 flex items-center gap-3">
          <div className="text-sm text-slate-600">
            {items.length === 0 ? 'No apps selected' : `${items.length} selected`}
          </div>
          <div className="flex flex-wrap gap-2 flex-1">
            {items.map((i) => (
              <span key={i} className="inline-flex items-center gap-2 text-xs bg-blue-50 text-blue-800 border border-blue-200 rounded px-2 py-1">
                {i}
              </span>
            ))}
          </div>
          <button
            onClick={onClear}
            className="text-sm px-3 py-2 rounded border border-slate-300 hover:bg-slate-50"
          >
            Clear
          </button>
          <button
            onClick={onBuild}
            disabled={items.length === 0 || building}
            className="text-sm px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {building ? 'Building…' : 'Get Your Installer'}
          </button>
          {downloadUrl && (
            <a
              href={downloadUrl}
              className="text-sm px-4 py-2 rounded bg-emerald-600 text-white"
            >
              Download Script
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectedBar
