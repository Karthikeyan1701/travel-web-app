import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './routes/ProtectedRoute';

import { useScrollToTop } from './hooks/useScrollToTop';

import Login from './pages/Login';
import Register from './pages/Register';
import Travels from './pages/Travels';
import TravelDetails from './pages/TravelDetails';
import Bookings from './pages/Bookings';
import NotFound from './pages/NotFound';

const App = () => {
  useScrollToTop();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/travels" element={<Travels />} />
          <Route path="/travels/:id" element={<TravelDetails />} />
          <Route path="/bookings" element={<Bookings />} />
        </Route>

        {/* 404 Error Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
