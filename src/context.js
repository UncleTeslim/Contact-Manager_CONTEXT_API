import React, { Component } from 'react'

const Context = React.createContext();

let url = 'https://jsonplaceholder.typicode.com/users'

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

// let isLoading = ()=> {
//   console.log("loading!!")
// }



export class Provider extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      // isLoading: true,
      dispatch: action => this.setState(state =>
        reducer(state, action))
      
    };
  }

 
  componentDidMount() {
    // isLoading();
     fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ contacts: data }));
    
  }

//  async componentDidMount() {
//     // isLoading();
//    const res = await fetch(url);
//    const json = await res.json();
//    this.setState({ contacts: json });

//   }
 


  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;