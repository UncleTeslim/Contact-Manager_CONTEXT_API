import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Consumer } from '../../context'

const Contact = (props) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const { id, name, email, phone } = props.contact;
  const showContact = (e) => {
    setShowContactInfo(!showContactInfo);
  }
  
  let url = 'https://jsonplaceholder.typicode.com/users'

  const deleteContact = (id, dispatch) => {

    fetch(url+"/"+id, {
      method: 'DELETE',
    })
      .then(data => dispatch({ type: 'DELETE_CONTACT', payload: id }))
    }

  

  // const deleteContact = async (id, dispatch) => {

  //   await fetch(url + "/" + id, {
  //     method: 'DELETE',
  //   });
  //   dispatch({ type: 'DELETE_CONTACT', payload: id })
  // }
  
  return (
    <Consumer>
      {value => {
        const { dispatch } = (value);
        return (
          <div className="card card-body mb-3">
            <h4>{name}
              <i onClick={(e) => showContact(e)}
                className="fa fa-caret-down" style={{ cursor: 'pointer' }}
              />
               <i onClick={(e) => deleteContact( id, dispatch)}
                className="fa fa-trash" style={{ cursor: 'pointer', float: 'right', color: 'red' }}
              />
              {/* <Link to={`contact/edit/${id}`}>
                <i
                  className="fa fa-pencil"
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    marginRight: '1rem'
                  }}
                />
              </Link> */}
            </h4> 
            {showContactInfo ? (<ul className="list-group">
              <li className="list-group-item">Email: {email}</li>
              <li className="list-group-item">Phone: {phone}</li>
            </ul>) : null}
          </div>
        )
      }}
    </Consumer>
  )
}   
  
    
 


Contact.propTypes = {
  contact: PropTypes.object.isRequired,
 }


export default Contact;
