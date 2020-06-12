import React, { Component } from 'react'

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload)
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload,
          ...state.contacts]    
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        {
          id: 1,
          name: "Teslim Kazeem",
          email: "teslim@gmail.com",
          phone: "08000000009"
        },
        {
          id: 2,
          name: "Femi Opanuga",
          email: "femi@gmail.com",
          phone: "08000000008"
        },
        {
          id: 3,
          name: "Tosin Okubanjo",
          email: "tosin@gmail.com",
          phone: "08000000007"
        }
      ],
      dispatch: action => this.setState(state =>
        reducer(state, action))
      
    };
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;