import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.css'

function Layout() {
  return (
    <main className="layout-main">
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}

export default Layout
