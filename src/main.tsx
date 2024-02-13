import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './tailwind.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className='bg-gray-200 min-w-screen min-h-screen'>
      <div className="max-w-screen-sm min-w-screen min-h-screen mx-auto bg-white">
        <App />
      </div>
  </div>
)
