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
import Theme from "@chakra-ui/react";

createRoot(document.getElementById('root')).render(

  <Theme appearance="dark">
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='login' element={<LoginPage />} />
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
  </Theme>

)
