import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { store } from './store/store'
import { router } from './router'
import Spinner from './components/ui/Spinner'

export default function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Spinner /></div>}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '16px',
            background: '#1a1033',
            color: '#fff',
          },
        }}
      />
    </Provider>
  )
}
