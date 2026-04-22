import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Public layout + pages
import Layout from '../components/layout/Layout'
import HomePage from '../features/home/HomePage'
import ServicesPage from '../features/services/ServicesPage'
import AboutPage from '../features/about/AboutPage'
import NewsPage from '../features/about/NewsPage'
import ContactPage from '../features/contact/ContactPage'
import StraitsTimes from '../features/press/StraitsTimes'
import SassyMama from '../features/press/SassyMama'
import NTU from '../features/press/NTU'

// Admin
import AdminLayout from '../components/admin/AdminLayout'
import AdminLogin from '../features/admin/login/AdminLogin'
import AdminOverview from '../features/admin/dashboard/AdminOverview'
import AdminLocations from '../features/admin/locations/AdminLocations'
import AdminSubmissions from '../features/admin/submissions/AdminSubmissions'
import AdminNews from '../features/admin/news/AdminNews'
import AdminPromotions from '../features/admin/promotions/AdminPromotions'
import { useAuth } from '../hooks/useAuth'

const AdminGuard = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading…</div>
  return user ? children : <AdminLogin />
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/news" element={<Layout><NewsPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/press/straits-times" element={<Layout><StraitsTimes /></Layout>} />
        <Route path="/press/sassy-mama" element={<Layout><SassyMama /></Layout>} />
        <Route path="/press/ntu-nie" element={<Layout><NTU /></Layout>} />

        {/* Legacy redirects */}
        <Route path="/programmes" element={<Navigate to="/services" replace />} />
        <Route path="/about/our-story" element={<Navigate to="/about" replace />} />
        <Route path="/about/news" element={<Navigate to="/news" replace />} />

        {/* Admin */}
        <Route path="/admin" element={
          <AdminGuard>
            <AdminLayout><AdminOverview /></AdminLayout>
          </AdminGuard>
        } />
        <Route path="/admin/locations" element={
          <AdminGuard>
            <AdminLayout><AdminLocations /></AdminLayout>
          </AdminGuard>
        } />
        <Route path="/admin/submissions" element={
          <AdminGuard>
            <AdminLayout><AdminSubmissions /></AdminLayout>
          </AdminGuard>
        } />
        <Route path="/admin/news" element={
          <AdminGuard>
            <AdminLayout><AdminNews /></AdminLayout>
          </AdminGuard>
        } />
        <Route path="/admin/promotions" element={
          <AdminGuard>
            <AdminLayout><AdminPromotions /></AdminLayout>
          </AdminGuard>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
