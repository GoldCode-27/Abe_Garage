import { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { useAuth } from "../../../../Contexts/AuthContext.jsx";
import { format } from 'date-fns';
import employeeService from "../../../../services/employee.service.js";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const { employee } = useAuth();
  const token = employee?.employee_token;

  useEffect(() => {
    if (!token) return;

    employeeService.getAllEmployees(token)
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) {
          setEmployees(data.data);
        }
      })
      .catch((err) => {
        console.error("Employee fetch failed:", err);
      });
  }, [token]);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Employees</h2>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Active</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Role</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.employee_id}>
                    <td>{emp.active_employee ? "Yes" : "No"}</td>
                    <td>{emp.employee_first_name}</td>
                    <td>{emp.employee_last_name}</td>
                    <td>{emp.employee_email}</td>
                    <td>{emp.employee_phone}</td>
                    <td>
                      {emp.added_date && !isNaN(new Date(emp.added_date))
                        ? format(new Date(emp.added_date), 'MM - dd - yyyy | kk:mm')
                        : 'N/A'}
                    </td>
                    <td>{emp.company_role_name}</td>
                    <td>
                      <div className="edit-delete-icons">
                        edit | delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
};

export default EmployeesList;