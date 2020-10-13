import React, { useState, useEffect } from 'react'
import NewEmployee from './NewEmployee'
import EmployeeInfo from './EmployeeInfo'
import UpdateEmployee from './UpdateEmployee'
import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";


const Dashboard = ({setLoggedIn, setCurrentUser, currentUser}) => {
  const [newEmployee, setNewEmployee] = useState(false)
  const [searchBar, setSearchBar] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)
  const [updateEmployee, setUpdateEmployee] = useState(false)
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    startDate: '',
 });

  const handleToggle = () => {
    if(showSidebar) {
      setShowSidebar(false)
    } else {
      setShowSidebar(true)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //GET ALL EMPLOYEES
  const getEmployees = async () => {
    const response = await fetch("/allusers");
    const data = await response.json();

    setEmployees(data);
  };

  //ADD A NEW EMPLOYEE OR UPDATE EXISTING ONE
  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = ''
    let method = ''

    if(newEmployee) {
      setNewEmployee(false);
      endpoint = '/new'
      method ='POST'
    } else {
      setUpdateEmployee(false);
      const id = e.target.id;
      endpoint = `/update/${id}`
      method = 'PUT'
    }
    
    try {
      const response = await fetch(endpoint, {
        method: method,
        body: JSON.stringify(employee),
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      if(data.error){
        console.log(data.error)
      } else {
        if(newEmployee){
          setEmployees(prev => ([...prev, data]))
        } else {
          const updatedEmployees = [...employees]
          const index = updatedEmployees.findIndex((employee) => employee._id === data._id);
          updatedEmployees[index] = data
          setEmployees(updatedEmployees)
        }
      }
      setEmployee({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        startDate: "",
      });
    } catch (error) {
      console.log(error)
    }
  };

  const updatePage = (e) => {
    e.preventDefault();
    setUpdateEmployee(true);
    const id = e.target.id
    const [employeeToUpdate] = employees.filter(employee => id === employee._id)
    setEmployee(employeeToUpdate)
  };

  //REMOVE AN EMPLOYEE
  const handleDelete = async (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      "Are you sure you want to remove this employee?"
    );
    if (confirm) {
      // get ID of employee to delete
      const id = e.target.id
      await fetch(`/delete/${id}`, {
        method: "DELETE",
      });
      const remainingEmployees = employees.filter(
        (employee) => employee._id !== id
      );
      setEmployees(remainingEmployees);
    }
  };

  const cancel = () => {
    setNewEmployee(false)
    setUpdateEmployee(false)
    setEmployee({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      startDate: "",
    });
  }


  //GET ALL EMPLOYEES ON INITIAL RENDER
  useEffect(() => {
    getEmployees();
  }, []);
    return (
      <div className="dashboard-page">
        {showSidebar
          ?
        <div className="sidebar">
          <Sidebar
            setLoggedIn={setLoggedIn}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            handleToggle={handleToggle}
          />
        </div>
        :
          <i className="fas fa-bars" onClick={handleToggle}></i>
      }
        
        <div className="dashboard">
          <h1>Flow Dashboard</h1>
          <div className="functions">
            <Searchbar searchBar={searchBar} setSearchBar={setSearchBar}/>
            {newEmployee || updateEmployee ? null : (
              <button
                id="add"
                type="button"
                onClick={() => setNewEmployee(true)}
              >
                <i className="fas fa-user-plus"></i>
              </button>
            )}
            {newEmployee || updateEmployee ? (
              <button id="cancel" type="button" onClick={cancel}>
                <i className="fas fa-times"></i>
              </button>
            ) : null}
          </div>

          {newEmployee ? (
            <NewEmployee
              submit={handleSubmit}
              handleChange={handleChange}
              setEmployee={setEmployee}
              employee={employee}
            />
          ) : updateEmployee ? (
            <UpdateEmployee
              submit={handleSubmit}
              handleChange={handleChange}
              setEmployee={setEmployee}
              employee={employee}
            />
          ) : (
            <EmployeeInfo
              searchBar={searchBar}
              employees={employees}
              handleDelete={handleDelete}
              updatePage={updatePage}
            />
          )}
        </div>
      </div>
    );
}

export default Dashboard