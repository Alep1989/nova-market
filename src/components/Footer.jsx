import { useTheme } from "../context/ThemeContext"

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer className={`text-center py-3 border-top mt-auto ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container">
        <span>© {new Date().getFullYear()} Nova Market</span>
      </div>
    </footer>
  )
}
