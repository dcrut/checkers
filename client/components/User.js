/* eslint-disable jsx-quotes, react/prop-types */

import React from 'react';
import Nav from './Nav';
import UserCreator from './UserCreator';

// export default (props) => (
//   <div>
//     <Nav />
//
//     <div className="container">
//       <div className="row">
//         <div className="col-xs-12">
//           {props.children}
//         </div>
//       </div>
//     </div>
//   </div>
// );

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '' };
    this.create = this.create.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  // componentDidMount() {
  //   this.refresh();
  // }

  // refresh() {
  //   fetch('//localhost:3333/users')
  //   .then(r => r.json())
  //   .then(j => {
  //     this.setState({ users: j.users });
  //   });
  // }

  create(e) {
    const username = this.refs.section.refs.username.value;
    const email = this.refs.section.refs.email.value;
    const password = this.refs.section.refs.password.value;
    const body = JSON.stringify({ username, email, password });

    fetch('//localhost:3333/users',
    { method: 'post', body, headers: { 'Content-Type': 'application/json' } })
    .then(r => r.json());
    // .then(() => this.refresh());

    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-4'>
            <UserCreator ref='section' create={this.create} />
          </div>
          <div className='col-xs-8'>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
