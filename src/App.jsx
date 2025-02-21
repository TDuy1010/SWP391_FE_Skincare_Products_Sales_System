
import { RouterProvider } from 'react-router-dom'
import { router } from './routers/router'
import './page/Admin/ResponsiveAdmin/ResponsiveAdmin.css';
import './page/Customer/ResponsiveCustomer/ResponsiveCustomer.css';


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
