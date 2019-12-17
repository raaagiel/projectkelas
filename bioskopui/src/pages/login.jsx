import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
import { LoginSuccessAction, Loginthunk, Login_error } from './../redux/actions'
// import Axios from 'axios';
// import { APIURL } from '../support/apiurl';

class Login extends Component {
    state = {
        error: '',
        loading: false
    }

    onLoginClick = () => {
        var username = this.refs.username.value
        var password = this.refs.password.value
        this.props.Loginthunk(username, password)
    }

    render() {
        if (this.props.AuthLog) {
            return <Redirect to={'/'} />
        }
        return (
            <div>
                <div className='container mt-auto' style={{ width: '30%' }}>
                    <Form className=' mt-3 justify-content-center'>
                        <h1>LOGIN</h1>
                        <Form.Field>
                            <label>User Name</label>
                            <input ref='username' placeholder='username' />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input ref='password' type='password' placeholder='password' />
                            <div>
                                <Link to='/register'> Register </Link>
                            </div>
                        </Form.Field>

                        {this.props.Auth.loading ?
                            <Loader
                                type='Puff'
                                color='#00918e'
                                height={100}
                                width={100}
                            />
                            :
                            <Button color='instagram' type='submit' onClick={this.onLoginClick}>Login</Button>
                        }
                    </Form>
                </div>
            </div>
        );
    }
}

const MapstateToprops = (state) => {
    return {
        AuthLog: state.Auth.login,
        Auth: state.Auth
    }
}

export default connect(MapstateToprops, { LoginSuccessAction, Loginthunk, Login_error })(Login);