import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';

// Route guards
import ProtectedRoute from './routes/ProtectedRoute';

// Skeleton fallback
import SkeletonBox from './components/skeletons/SkeletonBox';

import { useScrollToTop } from './hooks/useScrollToTop';

// Lazy loaded pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Travels = lazy(() => import('./pages/Travels'));
const TravelDetails = lazy(() => import('./pages/TravelDetails'));
const Bookings = lazy(() => import('./pages/Bookings'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  useScrollToTop();

  return (
    <Suspense
      fallback={
        <div style={{ padding: '16px' }}>
          <SkeletonBox width="60%" height="20px" />
          <SkeletonBox width="40%" />
          <SkeletonBox width="80%" />
        </div>
      }
    >
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<AppLayout />}>
          <Route 
            path="/travels" 
            element={
              <ProtectedRoute>
                <Travels />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/travels/:id"
            element={
              <ProtectedRoute>
                <TravelDetails />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* 404 Error Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
