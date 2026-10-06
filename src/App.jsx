import { Nav, Footer } from './components'
import { Home } from './pages'

export default function App() {
  return (
    <>
      <Nav />
      <main><Home /></main>
      <Footer />
      <a
        href="https://wa.me/919600986963"
        target="_blank"
        rel="noreferrer"
        className="btn fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 shadow-xl"
      >
        WhatsApp
      </a>
    </>
  )
}