const EmployeeTable = ({ data, onDelete, onEdit, onToggle }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h3 className="text-lg font-semibold text-gray-800">Employee List</h3>

        <button
          onClick={() => window.print()}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition"
        >
          Print
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Sr No</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">DOB</th>
              <th className="px-4 py-3">State</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No employees found
                </td>
              </tr>
            )}

            {data.map((e, index) => (
              <tr key={e.originalIndex} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 font-semibold text-gray-700">
                  {index + 1}
                </td>

                <td className="px-4 py-2">
                  {e.image ? (
                    <img
                      src={e.image}
                      alt="emp"
                      className="h-10 w-10 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                      NA
                    </div>
                  )}
                </td>

                <td className="px-4 py-2 font-medium text-gray-800">
                  {e.name}
                </td>

                <td className="px-4 py-2">{e.gender}</td>
                <td className="px-4 py-2">{e.dob}</td>
                <td className="px-4 py-2">{e.state}</td>

                <td className="px-4 py-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={e.active}
                      onChange={() => onToggle(e.originalIndex)}
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-5 rounded-full transition ${
                        e.active ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 bg-white rounded-full shadow transform transition translate-y-0.5 ${
                          e.active ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        e.active ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {e.active ? "Active" : "Inactive"}
                    </span>
                  </label>
                </td>

                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(e.originalIndex)}
                      className="px-3 py-1 text-xs rounded-md bg-blue-500 hover:bg-blue-600 text-white transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(e.originalIndex)}
                      className="px-3 py-1 text-xs rounded-md bg-red-500 hover:bg-red-600 text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
