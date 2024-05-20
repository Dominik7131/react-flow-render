import React from 'react'
import ReactDOM from 'react-dom/client'

import Application from './application'

console.log("Running application ...")

ReactDOM.createRoot(document.getElementById('application')!).render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
)
