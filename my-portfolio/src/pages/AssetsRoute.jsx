import { lazy, Suspense } from 'react'

const AssetsPage = lazy(() => import('./AssetsPage.jsx'))

export default function AssetsRoute() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#07070a' }} />}>
      <AssetsPage />
    </Suspense>
  )
}
