import React from 'react'
import ReactDOM from 'react-dom/client'
import PlayPage from './components/PlayPage'

/**
 * Entry for the standalone /play arcade page (play/index.html).
 * Applies the saved light/dark theme before the first paint so the page
 * never flashes the wrong palette, then mounts the arcade.
 */
try {
  const saved = localStorage.getItem('ot-theme')
  if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved)
} catch {
  /* private mode — default (dark) is fine */
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlayPage />
  </React.StrictMode>,
)
