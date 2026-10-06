import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

class Boundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
          <h1>Something broke</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#b00020' }}>
            {String(this.state.error?.stack || this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <Boundary>
    <App />
  </Boundary>
)