import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const TriangleLoader = lazy(() => import('@/components/icons/TriangleLoader'));
const Middleware = lazy(() => import('@/app/auth/Middleware'));
const AccountLayout = lazy(() => import('@/components/layouts/AccountLayout'));
const Dashboard = lazy(() => import('@/features/dashboard/Dashboard'));
const Wallet = lazy(() => import('@/features/wallet/Page.tsx'));

const AccountRoutes: FC = () => {
  return (
    <Suspense
      fallback={
        <TriangleLoader
          height={200}
          width={200}
          customCss="h-screen flexCenter mx-auto"
        />
      }
    >
      <Routes>
        <Route element={<Middleware />}>
          <Route element={<AccountLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallet/overview" element={<Wallet />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AccountRoutes;
