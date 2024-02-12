import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './tailwind.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className='bg-gray-200 w-screen h-screen'>
      <div className="max-w-screen-sm mx-auto h-screen bg-white">
        <App />
      </div>
  </div>
)
