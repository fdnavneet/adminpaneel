
import React, { useEffect, useState } from "react";
import { getEmployees, saveEmployees } from "../utils/storage";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import Navbar from "./Navbar";

const Dashboard = () => {

  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const handleSave = (data) => {
    const list = [...employees];
    editIndex !== null ? (list[editIndex] = data) : list.push(data);
    setEmployees(list);
    saveEmployees(list);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    if (confirm("DELETE Employee?")) {
      const updated = employees.filter((_, i) => i !== index);
      setEmployees(updated);
      saveEmployees(updated);
    }
  };

  const handleToggleStatus = (index) => {
    const updated = [...employees];
    updated[index].active = !updated[index].active;
    setEmployees(updated);
    saveEmployees(updated);
  };

  const filteredEmployees = employees
    .map((emp, index) => ({ ...emp, originalIndex: index }))
    .filter((emp) => {
      const matchName = emp.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchGender =
        genderFilter === "" || emp.gender === genderFilter;

      const matchStatus =
        statusFilter === ""
          ? true
          : statusFilter === "active"
          ? emp.active
          : !emp.active;

      return matchName && matchGender && matchStatus;
    });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      
      <Navbar employees = {employees} />

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <EmployeeForm
          onSave={handleSave}
          editData={editIndex !== null ? employees[editIndex] : null}
          onCancel={() => setEditIndex(null)}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <EmployeeTable
          data={filteredEmployees}
          onDelete={handleDelete}
          onEdit={(i) => setEditIndex(i)}
          onToggle={handleToggleStatus}
        />
      </div>
    </div>
  );
};

export default Dashboard;
