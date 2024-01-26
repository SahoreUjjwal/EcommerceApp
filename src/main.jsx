import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContext from './contexts/authContext.jsx'
import CartContext from './contexts/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
      <CartContext>
        <App />
      </CartContext>
    </AuthContext>
  </React.StrictMode>,
)
