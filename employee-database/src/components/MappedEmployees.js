import React from 'react'

const MappedEmployees = ({id, firstName, lastName, email, role, startDate, handleDelete, updatePage}) => {
  
  
  return (
    <tr className='employee'>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>{startDate.slice(0, 10)}</td>
      <td>
        <button className="edit" onClick={updatePage} id={id}>
          <i id={id} className="far fa-edit fa-lg"></i>
        </button>
      </td>
      <td>
        <button onClick={handleDelete} className="delete" id={id}>
          <i id={id} className="far fa-trash-alt fa-lg"></i>
        </button>
      </td>
    </tr>

    // <div className="employee-output" key={id}>
    //   <p className="output-item">{firstName}</p>
    //   <p className="output-item">{lastName}</p>
    //   <p className="output-item" style={{ flex: 4 }}>
    //     {email}
    //   </p>
    //   <p className="output-item">{role}</p>
    //   <p className="output-item" style={{ flex: 3 }}>
    //     {startDate.slice(0, 10)}
    //   </p>
    //   <div className="output-buttons">
    //     <button className="edit" onClick={updatePage} id={id}>
    //       <i id={id} className="far fa-edit fa-lg"></i>
    //     </button>
    //     <button onClick={handleDelete} className="delete" id={id}>
    //       <i id={id} className="far fa-trash-alt fa-lg"></i>
    //     </button>
    //   </div>
    // </div>
  );
}

export default MappedEmployees

