import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Paths } from './paths'
import { ConfigProvider, theme } from "antd";

import './styles/style.scss'
import Login from './pages/login'
import Register from './pages/register'

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <h1>home</h1>,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.employeeAdd,
    element: <h1>employeeAdd</h1>,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <h1>employee</h1>,
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <h1>employeeEdit</h1>,
  },
  {
    path: `${Paths.status}/:status`,
    element: <h1>status</h1>,
  },
])

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
