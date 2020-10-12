import React from 'react'
import MappedEmployees from './MappedEmployees'

const EmployeeInfo = ({searchBar, employees, handleDelete, updatePage}) => {
  
  const lowercaseSearch = searchBar.toLowerCase()
  const searchedEmployees = employees.filter(employee => 
    Object.keys(employee).some(key => 
      employee[key].toString().toLowerCase().startsWith(lowercaseSearch)
      )
  )
  
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Start Date</th>
              
            </tr>
          </thead>
          <tbody>
            {searchedEmployees.map((employee) => (
              <MappedEmployees
                key={employee._id}
                id={employee._id}
                firstName={employee.firstName}
                lastName={employee.lastName}
                email={employee.email}
                role={employee.role}
                startDate={employee.startDate}
                handleDelete={handleDelete}
                updatePage={updatePage}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default EmployeeInfo