import {StrictMode, lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider } from './utils/router';
import './index.css';

const AdminPage = lazy(() => import('./pages/AdminPage').then((module) => ({ default: module.AdminPage })));
const path = window.location.pathname.replace(/\/+$/, '') || '/';
const isAdminRoute = path === '/admin' || path.startsWith('/admin/');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? (
      <RouterProvider>
        <Suspense fallback={<main className="min-h-screen bg-[#0D1B2A]" />}>
          <AdminPage />
        </Suspense>
      </RouterProvider>
    ) : (
      <App />
    )}
  </StrictMode>,
);
