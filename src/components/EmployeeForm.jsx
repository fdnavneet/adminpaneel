
import React, { useEffect, useState } from "react";

const EmployeeForm = ({ onSave, editData, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    image: "",
  });

  const [error, setError] = useState({});

  useEffect(() => {
    editData ? setForm({ ...editData }) : resetForm();
  }, [editData]);

  const resetForm = () => {
    setForm({
      name: "",
      gender: "",
      dob: "",
      state: "",
      active: true,
      image: "",
    });
    setError({});
  };

  const validate = () => {
    let errors = {};

    if (!form.name) errors.name = "Name is required";
    else if (form.name.length < 3)
      errors.name = "Name must be at least 3 characters";

    if (!form.gender) errors.gender = "Gender is required";

    if (!form.dob) {
      errors.dob = "DOB is required";
    } else {
      const age = new Date().getFullYear() - new Date(form.dob).getFullYear();
      if (age < 18) errors.dob = "Employee must be 18+";
    }

    if (!form.state) errors.state = "State is required";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError({ image: "Only image files allowed" });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError({ image: "Image must be under 5MB" });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => setForm((p) => ({ ...p, image: reader.result }));
      reader.readAsDataURL(file);
    } else {
      setForm((p) => ({
        ...p,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
    resetForm();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editData ? "Edit Employee" : "Add Employee"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       
        <div>
          <input
            name="name"
            placeholder="Employee Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {error.name && (
            <p className="text-sm text-red-500 mt-1">{error.name}</p>
          )}
        </div>

        <div>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {error.gender && (
            <p className="text-sm text-red-500 mt-1">{error.gender}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {error.dob && (
            <p className="text-sm text-red-500 mt-1">{error.dob}</p>
          )}
        </div>

        <div>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select State</option>
            <option value="Up">UP</option>
            <option value="Delhi">Delhi</option>
            <option value="Andhra Pardesh">Andhra Pradesh</option>
          </select>
          {error.state && (
            <p className="text-sm text-red-500 mt-1">{error.state}</p>
          )}
        </div>

        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image
          </label>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              id="imageUpload"
              className="hidden"
            />

            <label
              htmlFor="imageUpload"
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 border border-dashed border-gray-400 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition"
            >
              📁 Choose Image
            </label>

            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="h-20 w-20 rounded-full object-cover border"
              />
            )}
          </div>

          {error.image && (
            <p className="text-sm text-red-500 mt-1">{error.image}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-gray-700">Active Employee</span>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-6 py-2 rounded-md transition"
        >
          {editData ? "Update" : "Save"}
        </button>

        {editData && (
          <button
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;
