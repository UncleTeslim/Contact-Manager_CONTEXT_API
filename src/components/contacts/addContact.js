import React, { useState }  from 'react'
import { Consumer } from '../../context'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

let url = 'https://jsonplaceholder.typicode.com/users'

const AddContact = (props) => {

  const [inputContact, setInputContact] = useState({
    name: '',
    email: '',
    phone: '',
  });


  const handleChange = (e) => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    setInputContact(() => ({ ...inputContact, [targetName]: targetValue }));
  }


  const handleSubmit = (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = inputContact;

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone
    };

    axios.post(url, newContact)
    .then(res => dispatch({ type: 'ADD_CONTACT', payload: res.data}))
  

    // dispatch({ type: 'ADD_CONTACT', payload: newContact });

    setInputContact({
      name: '',
      email: '',
      phone: '',
    })
    props.history.push('/');
  }

  // const handleSubmit = async (dispatch, e) => {
  //   e.preventDefault();

  //   const { name, email, phone } = inputContact;

  //   const newContact = {
  //     id: uuidv4(),
  //     name,
  //     email,
  //     phone
  //   };

  //   const res = await axios.post(url, newContact);
  //     dispatch({ type: 'ADD_CONTACT', payload: res.data })


  //   // dispatch({ type: 'ADD_CONTACT', payload: newContact });

  //   setInputContact({
  //     name: '',
  //     email: '',
  //     phone: '',
  //   })
  //   props.history.push('/');
  // }

  return (
    <Consumer>
      {value => {
        const { dispatch } = (value);
        return (
          <div className="card mb-3">
            <div className="card-header">
              Add Contact
            </div>
            <div className="card-body">
              <form onSubmit={(e) => handleSubmit(dispatch, e)}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Input Your Name..."
                    value={inputContact.name}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Input Your Email.."
                    value={inputContact.email}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="number"
                    name="phone"
                    className="form-control form-control-lg"
                    placeholder="Input Your Phone Number..."
                    value={inputContact.phone}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <input type="submit" value="Add Contact" className="btn btn btn-secondary" />
                
               
              </form>
            </div>
          </div>
        )
      }}
    </Consumer>
  )
}

export default AddContact;
