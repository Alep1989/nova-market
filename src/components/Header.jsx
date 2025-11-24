<<<<<<< HEAD
import Navbar from './Navbar'

export default function Header() {
  return (
    <header>
      <Navbar />
    </header>
  )
}
=======
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
>>>>>>> 20fbfeed492d95954dedfb3d16f74ce02d4ae96e
