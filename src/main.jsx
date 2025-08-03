import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './services/router.jsx'
import { AuthProvider } from './hooks/use-auth.jsx'
import { FavoritesProvider } from './hooks/use-favorites.jsx'
import { AuthContextProvider } from './services/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <AuthProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </AuthProvider>
    </AuthContextProvider>
  </StrictMode>
)
