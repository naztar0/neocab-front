import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { DEBUG, DEBUG_LAYOUT } from '@/config';

const App = lazy(() => import('@/App'));
const AppMobile = lazy(() => import('@/AppMobile'));

const mobile = DEBUG ? DEBUG_LAYOUT === 'mobile' : document.location.hostname.split('.')[0] === 'm';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  mobile ? (
    <Suspense fallback={<div />}>
      <AppMobile />
    </Suspense>
  ) : (
    <Suspense fallback={<div />}>
      <App />
    </Suspense>
  ),
);
