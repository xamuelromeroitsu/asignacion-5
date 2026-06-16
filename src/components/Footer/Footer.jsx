import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p className="footer-copy">&copy; {year} LunaShop. Todos los derechos reservados.</p>

      <div className="footer-social">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg><use href="/icons.svg#github-icon" /></svg>
        </a>
        <a href="https://bsky.app" target="_blank" rel="noopener noreferrer" aria-label="Bluesky">
          <svg><use href="/icons.svg#bluesky-icon" /></svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
          <svg><use href="/icons.svg#x-icon" /></svg>
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
          <svg><use href="/icons.svg#discord-icon" /></svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer
