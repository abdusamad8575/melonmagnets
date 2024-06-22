import { Route, Routes } from 'react-router-dom'
import './App.css'
import BulkOrder from './pages/BulkOrder'
import PinBadges from './pages/PinBadges'
import Product from './pages/Product'
import WhatsAppButton from './pages/WhatsAppButton'
import CheckOut from './pages/CheckOut'
import Topnav from './components/Topnav'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PinBadgeSingle from './pages/PinBadgeSingle'
import AboutUs from './pages/AboutUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CancellationRefunds from './pages/CancellationRefunds'
import ReturnPolicy from './pages/ReturnPolicy'
import StorePolicy from './pages/StorePolicy'
import AllProducts from './pages/AllProducts'
import TermsOfService from './pages/TermsOfServicce'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <Topnav/>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/:id' element={<Product />} />
        <Route path='/pinbagesmain' element={<PinBadges/>}/>
        <Route path='/pinbadges/:id' element={<PinBadgeSingle/>}/>
        <Route path='/bulkorder' element={<BulkOrder/>}/>
        <Route path='/checkout' element={<CheckOut/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
        <Route path='/cancellation' element={<CancellationRefunds/>}/>
        <Route path='/returnpolicy' element={<ReturnPolicy/>}/>
        <Route path='/storepolicy' element={<StorePolicy/>}/>
        <Route path='/termsofservice' element={<TermsOfService/>}/>
        <Route path='/allproducts' element={<AllProducts/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton/>
      <Footer/>
    </>
  )
}

export default App
