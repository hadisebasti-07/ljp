import Header from './Header'
import Footer from './Footer'
import FloatingActions from '../common/FloatingActions'
import PromoBanner from '../common/PromoBanner'
import './Layout.css'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <PromoBanner />
      <Header />
      <main className="layout__main">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
