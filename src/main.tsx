import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import LoadingScreen from './components/LoadingScreen'
import PortfolioV2 from './PortfolioV2'

/**
 * Boot flow: show the 3D loading screen first, mount the site once it's done.
 * Gating the site itself means its images aren't fetched until the model is
 * ready — so the featured/personal grids then show their pixelated loaders
 * instead of everything competing with the 8 MB GLB download.
 */
function Root() {
  const [booted, setBooted] = useState(false)
  return booted ? <PortfolioV2 /> : <LoadingScreen onDone={() => setBooted(true)} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
