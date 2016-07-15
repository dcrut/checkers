/* eslint-disable react/prop-types */

import React from 'react';

class UserCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '' };
  }

  // componentDidMount() {
  //   fetch('//localhost:3333/sections/types')
  //   .then(r => r.json())
  //   .then(j => {
  //     this.setState({ types: j.types.sections });
  //   });
  // }

  render() {
    return (
      <div>
        <h1>Registration</h1>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input className="form-control" ref="username" type="text" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref="email" type="text" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" ref="password" type="text" />
          </div>
          <button className="btn btn-primary" onClick={this.props.create}>Create</button>
        </form>

        <h2>Current Users</h2>
      </div>
    );
  }
}

export default UserCreator;
