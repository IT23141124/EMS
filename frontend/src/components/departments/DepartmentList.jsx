import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([])

  const onDepartmentDelete = async (id) => {
    const data = departments.filter(dep => dep._id !== id)
    setDepartment(data)
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />),
          }));
          setDepartment(data);
          setFilteredDepartments(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
  }

  return (
    <>
      {depLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="justify-between flex items-center">
            <input
              type="text"
              placeholder="Search by Department Name"
              className="px-4 py-0.5 w-1/4 border"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add new Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={filteredDepartments} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
