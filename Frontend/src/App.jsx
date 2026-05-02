import { useState } from 'react'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/app.routes";

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <h1>App</h1>
    </>
  )
}

export default App
