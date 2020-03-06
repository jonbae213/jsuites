import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/session_actions';

const msp = state => ({
  errors: state.ui.errors.session,
  currentUser: state.session.user
})

const mdp = dispatch => ({
  login: user => dispatch(login(user))
})

class SplashPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: []
    }

    this.handleAdmin = this.handleAdmin.bind(this);
    this.handleDemoUser = this.handleDemoUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }



  updateValue(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  handleDemoUser(e) {
    e.preventDefault();
    this.props.login({
      email: 'jason@jason.com',
      password: 'password'
    });
  }

  handleAdmin(e) {
    e.preventDefault();
    this.props.login({
      email: 'justin@justin.com',
      password: 'iamjustin'
    });
  }

  renderErrors() {
    let theseErrors = Object.values(this.state.errors);
    const errors = theseErrors.map((error, i) => {
      return (
        <li key={i} className="error-list-item">
          {error}
        </li>
      );
    });
    
    return (
      <ul className="error-list">
        {errors}
      </ul>
    );
  }

  render() {
    return (
      <section className="splash-page">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h1>Js</h1>
          {this.renderErrors()}
          <label>Email:</label>
          <input
            type="email"
            required
            value={this.state.email}
            onChange={this.updateValue("email")}
            placeholder="Email"
          />
          <label>Password:</label>
          <input
            type="password"
            required
            value={this.state.password}
            onChange={this.updateValue("password")}
            placeholder="Password"
          />
          <input className="login-btn" type="submit" value="Login" />
          <section className="demo-btns">
            <button
              onClick={e => this.handleAdmin(e)}
              className="demo-admin-btn"
            >
              Demo Admin
            </button>
            <button
              onClick={this.handleDemoUser}
              className="demo-user-btn"
            >
              Demo User
            </button>
          </section>
        </form>
      </section>
    );
  }
}

export default withRouter(connect(msp, mdp)(SplashPage));