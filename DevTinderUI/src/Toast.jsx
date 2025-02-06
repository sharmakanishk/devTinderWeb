import React from 'react'

const Toast = ({error}) => {
  return (
    <div className="toast toast-top toast-center">
    <div className="alert alert-success">
      <span>{error}</span>
    </div>
  </div>
  )
}

export default Toast
