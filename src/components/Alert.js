import React from 'react'

const alertStyles = {
  height:'30px',
  padding:'5px',
  borderRadius: '5px',
  display:'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  position:'absolute',
  top:'0',
  transition: 'all .8s ease-out'
}

const Alert = ({ type }) => {
   return (
      <div style={alertStyles} className='slide-down'>
         <h6 style={{marginRight:'8px',color:'#222'}}>{type === 'success' ? 'Create Account Successful' : 'Create Account Failure, try again'}</h6>
         <span style={type === 'success' ? {color:"#2ecc71"} : {color:"#e74c3c"}}>
           <i className="fas fa-info-circle"></i>
         </span>
      </div>
   )
}

export default Alert;
