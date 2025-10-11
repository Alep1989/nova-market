import Navbar from './Navbar'
import './header.css'

export default function Header() {
  return (
    <header className="nm-header">
      <div className="container">
        <h1 className="brand">Nova Market</h1>
        <Navbar />
      </div>
    </header>
  )
}
