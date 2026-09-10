import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import routes from './routes'

function App() {

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#050505',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#e60000',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#e60000',
              secondary: '#fff',
            },
          },
        }}
      />
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
