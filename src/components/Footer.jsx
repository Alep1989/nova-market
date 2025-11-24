import { useTheme } from "../context/ThemeContext"

export default function Footer() {
  const { theme, toggleTheme } = useTheme()

  return (
    <footer className={`text-center py-3 border-top mt-auto position-relative ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center gap-3">
          <span>© {new Date().getFullYear()} Nova Market</span>

          <label className="theme-switch-wrapper" style={{ display: 'inline-block' }}>
            <input
              type="checkbox"
              className="theme-switch-checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <div className="theme-switch">
              <div className="theme-switch-stars">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
              </div>
              <div className="theme-switch-clouds">
                <div className="cloud"></div>
                <div className="cloud"></div>
              </div>
              <div className="theme-switch-slider"></div>
            </div>
          </label>
        </div>
      </div>
    </footer>
  )
}
