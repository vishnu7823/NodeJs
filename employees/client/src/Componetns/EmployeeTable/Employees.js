import React, { useEffect, useState } from 'react';
import "./Employees.css"

const EmployeesTable = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "", age: "", salary: "" });
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);

    // Fetch Employees
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'
            });
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Add / Update Employee
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingEmployeeId ? 'PUT' : 'POST';
            const url = editingEmployeeId
                ? `http://localhost:5000/api/employees/${editingEmployeeId}`
                : 'http://localhost:5000/api/employees';

            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            fetchEmployees();
            setFormData({ name: "", email: "", age: "", salary: "" });
            setEditingEmployeeId(null);
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    // Handle Edit Click
    const handleEdit = (employee) => {
        setFormData({
            name: employee.name,
            email: employee.email,
            age: employee.age,
            salary: employee.salary,
        });
        setEditingEmployeeId(employee._id);
    };

    // Handle Delete Employee
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await fetch(`http://localhost:5000/api/employees/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });

                fetchEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    return (
        <div>
            <h2>Employee List</h2>

            {/* Employee Form */}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
                <button type="submit">{editingEmployeeId ? "Update" : "Add"}</button>
            </form>

            {/* Employee Table */}
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp._id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.age}</td>
                            <td>{emp.salary}</td>
                            <td>
                                <button onClick={() => handleEdit(emp)}>Edit</button>
                                <button onClick={() => handleDelete(emp._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesTable;
