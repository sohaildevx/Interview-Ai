import { useState } from 'react'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/app.routes";
import {AuthProvider} from "./features/auth/auth.context";

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </>
  )
}

export default App
