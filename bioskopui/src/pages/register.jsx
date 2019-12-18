import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import Axios from 'axios'
import { APIURL } from '../support/apiurl'
import Swal from 'sweetalert2'

class Register extends Component {
    state = {

    }

    onclickRegister = () => {
        var username = this.refs.username.value
        var password = this.refs.pass.value
        var confirmpass = this.refs.cnfrmpass.value
        var role = "user"
        var newUser = { username, password, role }
        // console.log(password, confirmpass)
        if (username === '' || password === '' || confirmpass === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Input Tidak Boleh Kosong',
                // footer: '<a href>Why do I have this issue?</a>'
            })
        } else {
            Axios.get(`${APIURL}users?username=${username}`)
                .then(res1 => {
                    // console.log(res1)
                    if (res1.data.length === 0) {
                        if (password !== confirmpass) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Password Tidak Sesuai',
                            })
                        } else {
                            Axios.post(`${APIURL}users`, newUser)
                                .then(res => {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Sukses !',
                                        text: 'Registrasi Berhasil, Silahkan Login',
                                    })
                                    this.props.history.push('login')
                                })
                                .catch(err1 => {
                                    console.log(err1)
                                })
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'User Sudah Terdaftar',
                        })
                    }
                }).catch(err1 => {
                    console.log(err1)
                })
        }
    }

    render() {
        return (
            <div className='container mt-auto' style={{ width: '30%' }} >
                <Form className=' mt-3 justify-content-center'>
                    <h1>REGISTER</h1>
                    <Form.Field>
                        <label>User Name</label>
                        <input ref='username' placeholder='username' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input ref='pass' type='password' placeholder='password' />
                    </Form.Field>
                    <Form.Field>
                        <label>Confirm Password</label>
                        <input ref='cnfrmpass' type='password' placeholder='password' />
                    </Form.Field>
                    <Button color='teal' type='submit' onClick={this.onclickRegister}>Register</Button>
                </Form>
            </div >
        )
    }
}

export default Register
