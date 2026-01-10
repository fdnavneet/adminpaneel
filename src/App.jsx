import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./components/Dashboard"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element ={<Login />} />
        <Route
        path="/dashboard"
        element ={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        />
      </Routes>
    </div>
  )
}

export default App