import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '../../../../services/employee.service.js';
import { useAuth } from "../../../../Contexts/AuthContext.jsx"; // 

function AddEmployeeForm() {
  const navigate = useNavigate();
  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || '';

  // 1. one Form State
  const [formData, setFormData] = useState({
    employee_email: '',
    employee_first_name: '',
    employee_last_name: '',
    employee_phone: '',
    employee_password: '',
    company_role_id: 1
  });

  // 2. Status and Error States
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // የጋራ Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // ተጠቃሚው ሲጽፍ Error መሳይ መልእክቱን ያጠፋል
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Client-side Validation
  const validateForm = () => {
    const newErrors = {};
    const regex = /^\S+@\S+\.\S+$/;

    if (!formData.employee_first_name.trim()) {
      newErrors.employee_first_name = 'First name is required';
    }
    if (!formData.employee_last_name.trim()) {
      newErrors.employee_last_name = 'Last name is required';
    }
    if (!formData.employee_phone.trim()) {
      newErrors.employee_phone = 'Phone number is required';
    }
    if (!formData.employee_email) {
      newErrors.employee_email = 'Email is required';
    } else if (!regex.test(formData.employee_email)) {
      newErrors.employee_email = 'Invalid email format';
    }
    if (!formData.employee_password || formData.employee_password.length < 6) {
      newErrors.employee_password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess(false);

    if (!validateForm()) return;

    setIsLoading(true);

    const payload = {
      ...formData,
      company_role_id: parseInt(formData.company_role_id, 10)
    };

    try {
      const res = await employeeService.createEmployee(payload, loggedInEmployeeToken);
      const data = res?.data ? res.data : res;

      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccess(true);
        // Form-ኡን ማፅዳት
        setFormData({
          employee_email: '',
          employee_first_name: '',
          employee_last_name: '',
          employee_phone: '',
          employee_password: '',
          company_role_id: 1
        });

        // በ React Router መምራት
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      const resMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      setServerError(resMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    
                    {/* Server Error / Success Message */}
                    <div className="form-group col-md-12">
                      {serverError && <div className="validation-error" role="alert">{serverError}</div>}
                      {success && <div className="success-message" role="alert">Employee added successfully! Redirecting...</div>}
                    </div>

                    {/* Email */}
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="employee_email"
                        value={formData.employee_email}
                        onChange={handleChange}
                        placeholder="Employee email"
                        disabled={isLoading}
                      />
                      {errors.employee_email && <div className="validation-error" role="alert">{errors.employee_email}</div>}
                    </div>

                    {/* First Name */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        value={formData.employee_first_name}
                        onChange={handleChange}
                        placeholder="Employee first name"
                        disabled={isLoading}
                      />
                      {errors.employee_first_name && <div className="validation-error" role="alert">{errors.employee_first_name}</div>}
                    </div>

                    {/* Last Name */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        value={formData.employee_last_name}
                        onChange={handleChange}
                        placeholder="Employee last name"
                        disabled={isLoading}
                      />
                      {errors.employee_last_name && <div className="validation-error" role="alert">{errors.employee_last_name}</div>}
                    </div>

                    {/* Phone */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        value={formData.employee_phone}
                        onChange={handleChange}
                        placeholder="Employee phone (555-555-5555)"
                        disabled={isLoading}
                      />
                      {errors.employee_phone && <div className="validation-error" role="alert">{errors.employee_phone}</div>}
                    </div>

                    {/* Role */}
                    <div className="form-group col-md-12">
                      <select
                        name="company_role_id"
                        value={formData.company_role_id}
                        onChange={handleChange}
                        className="custom-select-box"
                        disabled={isLoading}
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    {/* Password */}
                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="employee_password"
                        value={formData.employee_password}
                        onChange={handleChange}
                        placeholder="Employee password"
                        disabled={isLoading}
                      />
                      {errors.employee_password && <div className="validation-error" role="alert">{errors.employee_password}</div>}
                    </div>

                    {/* Submit Button */}
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        disabled={isLoading}
                      >
                        <span>{isLoading ? 'Please wait...' : 'Add employee'}</span>
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddEmployeeForm;