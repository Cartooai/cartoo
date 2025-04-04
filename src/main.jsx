import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "@/components/ui/provider";
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import GetStarted from './components/Onboarding/GetStarted';
import Location from './components/Onboarding/Location';
import Name from './components/Onboarding/Name';
import Age from './components/Onboarding/Age';
import Gender from './components/Onboarding/Gender';
import Interest from './components/Onboarding/Interest';
import ChatPage from './pages/ChatPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactUsPage from './pages/ContactUsPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AboutUsPage from './pages/AboutUsPage';

createRoot(document.getElementById('root')).render(
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='contact-us' element={<ContactUsPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='terms' element={<TermsOfServicePage />} />
          <Route path='about' element={<AboutUsPage />} />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
        </Route>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='get-started' element={<ProtectedRoute><GetStarted /></ProtectedRoute>} />
          <Route path='location' element={<ProtectedRoute><Location /></ProtectedRoute>} />
          <Route path='name' element={<ProtectedRoute><Name /></ProtectedRoute>} />
          <Route path='age' element={<ProtectedRoute><Age /></ProtectedRoute>} />
          <Route path='gender' element={<ProtectedRoute><Gender /></ProtectedRoute>} />
          <Route path='interest' element={<ProtectedRoute><Interest /></ProtectedRoute>} />
          <Route path='chat' element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>

)
