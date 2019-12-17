import Axios from "axios"
import { APIURL } from "../../support/apiurl"
import Swal from 'sweetalert2'

export const LoginSuccessAction = (datauser) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: datauser
    }
}

export const Loginthunk = (username, password) => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_LOADING' })
        Axios.get(`${APIURL}users?username=${username}&password=${password}`)
            .then((res) => {

                if (res.data.length) {
                    Axios.get(`${APIURL}orders?userId=${res.data[0].id}`)
                        .then((res2) => {
                            console.log(res2.data)
                            dispatch(keranjangAction(res2.data.length))

                        }).catch((err) => {
                            console.log(err)

                        })

                    localStorage.setItem('dino', res.data[0].id)
                    dispatch(LoginSuccessAction(res.data[0]))
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Berhasil',
                        showConfirmButton: false,
                        timer: 1500
                        // // footer: '<a href>Why do I have this issue?</a>'
                    })
                } else {
                    dispatch({ type: 'LOGIN_ERROR', payload: 'Salah Masukin Password' })
                    Swal.fire({
                        icon: 'error',
                        title: 'Oopps...',
                        text: 'Username/Password Salah',
                    })
                }
            }).catch((err) => {
                console.log(err)
                dispatch({ type: 'LOGIN_ERROR', payload: 'server error' })
            })
    }
}


export const LogoutActions = () => {
    return {
        type: 'LOGOUT'
    }
}

export const Login_error = () => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_ERROR', payload: '' })
    }
}

export const keranjangAction = (jumlahcart) => {
    return {
        type: 'COUNT_CART', payload: jumlahcart
    }
}

export const ChangePassAction = newpass => {
    return {
        type: "RESET_PASS",
        payload: newpass
    };
}
export const totalHargaAction = (price) => {
    return {
        type: 'TOTAL_HARGA',
        payload: price
    }
}