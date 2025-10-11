import './footer.css'

export default function Footer(){
  return (
    <footer className="nm-footer">
      <div className="container">© {new Date().getFullYear()} Nova Market</div>
    </footer>
  )
}
