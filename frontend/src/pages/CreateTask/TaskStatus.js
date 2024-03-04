import React from 'react'
import { NavDropdown } from 'react-bootstrap'

const TaskStatus = ({title,statusAndPrioriryFields,handleChange}) => {
    
  return (
    <NavDropdown title={title} className="mb-3">
              {statusAndPrioriryFields.map((s) => (
                <NavDropdown.Item key={s} onClick={() => handleChange(s)}>
                  {s}
                </NavDropdown.Item>
              ))}
    </NavDropdown>
  )
}

export default TaskStatus