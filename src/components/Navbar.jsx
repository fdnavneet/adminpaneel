import { useAuth } from "../context/AuthContext";

const Navbar = ({employees}) => {
    const { logout } = useAuth();
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Dashboard
          </h1>
          <p className="text-gray-600">
            Total Employees:{" "}
            <span className="font-semibold">{employees.length}</span>
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-4 py-2 rounded-md transition "
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar