import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateEmployee = (props) => {
  return (
    <div className="employee-form">
      <h1 className='form-header'>Update employee</h1>
      <form onSubmit={props.submit} id={props.employee._id}>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="firstName">First Name</label>
            <input
              className="form-input"
              id="firstName"
              required
              type="text"
              placeholder="Enter you first name"
              name="firstName"
              value={props.employee.firstName}
              onChange={props.handleChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="firstName">Last Name</label>
            <input
              className="form-input"
              required
              type="text"
              placeholder="Enter you last name"
              name="lastName"
              value={props.employee.lastName}
              onChange={props.handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item email">
            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              id="email"
              required
              type="email"
              placeholder="Email"
              name="email"
              value={props.employee.email}
              onChange={props.handleChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="date">Date</label>
            <DatePicker
              autoComplete="off"
              className="form-input"
              id="date"
              required
              placeholderText="Employee start date"
              selected={new Date(props.employee.startDate)}
              minDate={new Date(2010, 0, 1)}
              maxDate={new Date(2030, 11, 31)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={(date) =>
                props.setEmployee((prev) => ({ ...prev, startDate: date }))
              }
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="role">Role</label>
            <input
              className="form-input role-input"
              id="role"
              required
              type="text"
              placeholder="Employee role"
              name="role"
              value={props.employee.role}
              onChange={props.handleChange}
            />
          </div>
        </div>
        <button className="add-update" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
