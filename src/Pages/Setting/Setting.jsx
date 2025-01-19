import React, { useState } from 'react';
import { FaTrashAlt, FaUserPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Setting = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [newRole, setNewRole] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeName, setEmployeeName] = useState('');

  // Handle form submission
  const handleSettingSubmit = e => {
    e.preventDefault();
    Swal.fire({
      title: 'Settings Updated!',
      text: 'Your company settings have been updated successfully.',
      icon: 'success',
      confirmButtonColor: '#1F7A8C',
    });
  };

  // Handle adding employee
  const handleAddEmployee = () => {
    const newEmployee = {
      name: employeeName,
      role: newRole || 'Employee',
      email: `${employeeName.toLowerCase().split(' ').join('')}@example.com`,
    };
    setEmployeeList([...employeeList, newEmployee]);
    setEmployeeName('');
    setNewRole('');
    Swal.fire({
      title: 'Employee Added!',
      text: 'New employee has been successfully added.',
      icon: 'success',
      confirmButtonColor: '#1F7A8C',
    });
  };

  // Handle deleting employee
  const handleDeleteEmployee = email => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        const updatedEmployeeList = employeeList.filter(
          employee => employee.email !== email,
        );
        setEmployeeList(updatedEmployeeList);
        Swal.fire({
          title: 'Deleted!',
          text: 'Employee has been removed.',
          icon: 'success',
          confirmButtonColor: '#1F7A8C',
        });
      }
    });
  };

  return (
    <div className='bg-lightSecondary dark:bg-darkSecondary text-darkSecondary dark:text-lightSecondary min-h-screen p-8 font-sans'>
      {/* Company Settings Section */}
      <section className='bg-white shadow-lg rounded-lg p-6 mb-8 dark:bg-darkSecondary'>
        <h2 className='text-2xl font-semibold mb-6'>Company Settings</h2>
        <form onSubmit={handleSettingSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='company-name'
              className='text-gray-700 dark:text-lightSecondary'
            >
              Company Name
            </label>
            <input
              type='text'
              id='company-name'
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder='Enter company name'
              required
              className='w-full p-4 rounded-md border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-darkSecondary dark:border-gray-600 dark:text-lightSecondary'
            />
          </div>
          <div>
            <label
              htmlFor='company-email'
              className='text-gray-700 dark:text-lightSecondary'
            >
              Company Email
            </label>
            <input
              type='email'
              id='company-email'
              value={companyEmail}
              onChange={e => setCompanyEmail(e.target.value)}
              placeholder='Enter company email'
              required
              className='w-full p-4 rounded-md border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-darkSecondary dark:border-gray-600 dark:text-lightSecondary'
            />
          </div>
          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4 dark:bg-darkSecondary dark:hover:bg-darkSecondary'
          >
            Save Settings
          </button>
        </form>
      </section>

      {/* Employee Management Section */}
      <section className='bg-white shadow-lg rounded-lg p-6 mb-8 dark:bg-darkSecondary'>
        <h2 className='text-2xl font-semibold mb-6'>Employee Management</h2>
        <div className='space-y-6'>
          <div>
            <label
              htmlFor='role-select'
              className='text-gray-700 dark:text-lightSecondary'
            >
              Select Role for New Employee
            </label>
            <select
              id='role-select'
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              className='w-full p-4 rounded-md border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-darkSecondary dark:border-gray-600 dark:text-lightSecondary'
            >
              <option value=''>Select Role</option>
              <option value='Admin'>Admin</option>
              <option value='HR'>HR</option>
              <option value='Employee'>Employee</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='employee-name'
              className='text-gray-700 dark:text-lightSecondary'
            >
              Employee Name
            </label>
            <input
              type='text'
              id='employee-name'
              value={employeeName}
              onChange={e => setEmployeeName(e.target.value)}
              placeholder='Enter employee name'
              required
              className='w-full p-4 rounded-md border-2 border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-darkSecondary dark:border-gray-600 dark:text-lightSecondary'
            />
          </div>
          <button
            type='button'
            onClick={handleAddEmployee}
            className='w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400'
          >
            <FaUserPlus className='inline mr-2' />
            Add New Employee
          </button>
        </div>
      </section>

      {/* Employee List Section */}
      <section className='bg-white shadow-lg rounded-lg p-6 dark:bg-darkSecondary'>
        <h2 className='text-2xl font-semibold mb-6'>Employee List</h2>
        <div>
          {employeeList.length === 0 ? (
            <p className='text-gray-500 dark:text-lightSecondary'>
              No employees added yet.
            </p>
          ) : (
            <ul className='space-y-4'>
              {employeeList.map(employee => (
                <li
                  key={employee.email}
                  className='flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-darkSecondary'
                >
                  <div>
                    <strong>{employee.name}</strong> - {employee.role} (
                    {employee.email})
                  </div>
                  <button
                    onClick={() => handleDeleteEmployee(employee.email)}
                    className='text-red-500 hover:text-red-600 dark:text-lightSecondary dark:hover:text-red-500'
                  >
                    <FaTrashAlt className='inline mr-2' />
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Setting;
