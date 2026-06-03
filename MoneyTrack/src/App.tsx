import { RouterProvider } from 'react-router-dom';
import './App.css'
import routes from './routes';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <RouterProvider router={routes}/>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#121821',
            color: '#F3F4F6',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '500',
            maxWidth: '500px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
          },

          success: {
            style: {
              borderLeft: '4px solid #10B981',
            },
            iconTheme: {
              primary: '#10B981',
              secondary: '#121821',
            },
          },
          
          error: {
            style: {
              borderLeft: '4px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
            duration: 5000, 
          },
        }}
      />
    </>
  )
}

export default App
