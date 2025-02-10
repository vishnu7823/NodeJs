import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onEmployeeAdded, onEmployeeUpdated, selectedEmployee }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [salary, setSalary] = useState("");

    useEffect(() => {
        if (selectedEmployee) {
            setName(selectedEmployee.name);
            setEmail(selectedEmployee.email);
            setAge(selectedEmployee.age);
            setSalary(selectedEmployee.salary);
        }
    }, [selectedEmployee]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employeeData = { name, email, age, salary };

        try {
            if (selectedEmployee) {
                // Update Employee
                await fetch(`http://localhost:5000/api/employees/${selectedEmployee.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(employeeData),
                });
                onEmployeeUpdated();
            } else {
                // Add Employee
                await fetch("http://localhost:5000/api/employees", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(employeeData),
                });
                onEmployeeAdded();
            }

            // Clear form
            setName("");
            setEmail("");
            setAge("");
            setSalary("");
        } catch (error) {
            console.error("Error saving employee:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{selectedEmployee ? "Update Employee" : "Add Employee"}</h3>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
            <button type="submit">{selectedEmployee ? "Update" : "Add"}</button>
        </form>
    );
};

export default EmployeeForm;
