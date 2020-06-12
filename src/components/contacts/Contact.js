import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../../context'

const Contact = (props) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const { id, name, email, phone } = props.contact;
  const showContact = (e) => {
    setShowContactInfo(!showContactInfo);
  }

  const deleteContact = (id, dispatch) => {
    dispatch({type: 'DELETE_CONTACT', payload: id});
  }

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
