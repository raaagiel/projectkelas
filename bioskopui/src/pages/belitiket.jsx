import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { APIURL } from '../support/apiurl'
import { Redirect } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import Numeral from 'numeral'
import { keranjangAction } from './../redux/actions'
// import { Link } from 'react-router-dom'

// import Cart from './pages/cart';


class Belitiket extends Component {
    state = {
        datamovie: {},
        seats: 260,
        baris: 0,
        booked: [],
        loading: true,
        jam: 12,
        pilihan: [],
        openmodalcart: false,
        redirecthome: false
        // harga: 0,
        // jumlahtiket: 0
    }

    componentDidMount() {
        this.onJamchance()
    }

    onJamchance = () => {
        var studioId = this.props.location.state.studioId
        var movieId = this.props.location.state.id
        Axios.get(`${APIURL}studios/${studioId}`)
            .then((res1) => {
                Axios.get(`${APIURL}orders?movieId=${movieId}&jadwal=${this.state.jam}`)
                    .then((res2) => {
                        var arrAxios = []
                        console.log(res2.data)
                        res2.data.forEach((val) => {
                            arrAxios.push(Axios.get(`${APIURL}ordersDetails?orderId=${val.id}`))
                        })
                        // ===========================LOOPING AXIOS===============================================
                        var arrAxios2 = []

                        Axios.all(arrAxios).then((res3) => {
                            console.log(res3)
                            res3.forEach((val) => {
                                arrAxios2.push(...val.data)
                            })
                            console.log(arrAxios2)
                            this.setState({
                                datamovie: this.props.location.state,
                                seats: res1.data.jumlahKursi,
                                baris: res1.data.jumlahKursi / 20,
                                booked: arrAxios2,
                                loading: false
                            })
                        }).catch((err) => {
                            console.log(err)
                        })
                    }).catch((err2) => {
                        console.log(err2)
                    })
            }).catch((err1) => {
                console.log(err1)
            })
    }

    onOrderClick = () => {
        var userId = this.props.UserId
        var movieId = this.state.datamovie.id
        var pilihan = this.state.pilihan
        var jadwal = this.state.jam
        var totalharga = this.state.pilihan.length * 25000
        var bayar = false
        var dataorders = {
            userId,
            movieId,
            totalharga,
            jadwal,
            bayar
        }
        Axios.post(`${APIURL}orders`, dataorders)
            .then((res) => {
                Axios.get(`${APIURL}orders?userId=${res.data.id}`)
                    .then((res2) => {
                        console.log(res2.data.length)
                        // this.props.keranjangAction(res2.data.length)
                    }).catch((err) => {
                        console.log(err)
                    })
                // console.log(res.data.id)
                var dataordersdetail = []
                pilihan.forEach((val) => {
                    dataordersdetail.push({
                        orderId: res.data.id,
                        seat: val.seat,
                        row: val.row
                    })
                })
                console.log(dataordersdetail)
                var dataordersdetail2 = []
                dataordersdetail.forEach((val) => {
                    dataordersdetail2.push(Axios.post(`${APIURL}ordersDetails`, val))
                })
                Axios.all(dataordersdetail2)
                    .then((res1) => {
                        console.log(res1)
                        this.setState({ openmodalcart: true })
                    }).catch((err) => {
                        console.log(err)
                    })
            }).catch((err) => {
                console.log(err)
            })
    }

    onClickOkOrder = () => {
        this.setState({ openmodalcart: false })
        window.location.reload()
    }

    onButtonjamclick = (val) => {
        this.setState({ jam: val, pilihan: [] })
        this.onJamchance()
    }

    onpilihSeatClick = (row, seat) => {
        var pilihan = this.state.pilihan
        pilihan.push({ row, seat })
        this.setState({ pilihan })
    }

    onCancelSeatClick = (row, seat) => {
        var pilihan = this.state.pilihan
        var rows = row
        var seats = seat
        var arr = []
        for (var i = 0; i < pilihan.length; i++) {
            if (pilihan[i].row !== rows || pilihan[i].seat !== seats) {
                arr.push(pilihan[i])
            }
        }
        this.setState({ pilihan: arr })
    }

    renderHargaQuantity = () => {
        var jumlahtiket = this.state.pilihan.length
        var harga = jumlahtiket * 25000
        return (
            <div>
                {jumlahtiket}Tiket x {Numeral(25000).format('0,0.00')}={'Rp.' + Numeral(harga).format('Rp0,0.00')}
            </div>
        )
    }

    renderseat = () => {
        var arr = []
        for (let i = 0; i < this.state.baris; i++) {
            arr.push([])
            for (let j = 0; j < this.state.seats / this.state.baris; j++) {
                arr[i].push(1)
            }
        }
        // console.log(arr)
        // console.log(this.state.booked)
        for (let j = 0; j < this.state.booked.length; j++) {
            arr[this.state.booked[j].row][this.state.booked[j].seat] = 3
        }
        for (let a = 0; a < this.state.pilihan.length; a++) {
            arr[this.state.pilihan[a].row][this.state.pilihan[a].seat] = 2
        }
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        var jsx = arr.map((val, index) => {
            return (
                <center key={index}>
                    {
                        val.map((val1, i) => {
                            if (val1 === 3) {
                                return (
                                    <button key={i} disabled className='rounded btn btn-disable mr-2 mt-2 bg-danger text-center'>
                                        {alphabet[index] + (i + 1)}
                                    </button>
                                )
                            } else if (val1 === 2) {
                                return (
                                    <button key={i} onClick={() => this.onCancelSeatClick(index, i)} className='rounded btn-order mr-2 mt-2 btn-pilih text-center'>
                                        {alphabet[index] + (i + 1)}
                                    </button>
                                )
                            }
                            return (
                                <button key={i} onClick={() => this.onpilihSeatClick(index, i)} className='rounded btn-order mr-2 mt-2 text-center'>
                                    {alphabet[index] + (i + 1)}
                                </button>
                            )
                        })
                    }
                </center>
            )
        })
        return jsx
    }

    renderbutton = () => {
        return this.state.datamovie.jadwal.map((val, index) => {
            if (this.state.jam === val) {
                return (
                    <button className='mx-2 btn btn-secondary' disabled>{val}.00</button>
                )
            }
            return (
                <button key={index} className='mx-2 btn btn-secondary' onClick={() => this.onButtonjamclick(val)}>{val}.00</button>
            )
        })
    }

    render() {
        if (this.props.location.state && this.props.AuthLog) {
            if (this.state.redirecthome) {
                return <Redirect to={'/'} />
            }
            return (
                <div>
                    <Modal isOpen={this.state.openmodalcart}>
                        <ModalBody>
                            Berhasil Ditambahkan
                        </ModalBody>
                        <ModalFooter >
                            {/* <Link to='/'> */}
                            <button className='btn btn-primary mr-2' onClick={this.onClickOkOrder}>Ok</button>
                            {/* </Link> */}
                        </ModalFooter>
                    </Modal>
                    <center className='mt-1'>
                        <div>
                            {this.state.datamovie.title}
                        </div>

                        {this.state.loading ? null : this.renderbutton()}

                        <div>
                            {this.state.pilihan.length ? <button onClick={this.onOrderClick} className='btn btn-primary mt-3'>Book Now</button>
                                : null}
                        </div>
                        {this.state.pilihan.length ?
                            this.renderHargaQuantity()
                            :
                            null
                        }
                        <div className='d-flex justify-content-center mt-4'></div>
                        <div>
                            {this.state.loading ? null : this.renderseat()}
                        </div>
                        <div style={{ height: '20px', backgroundColor: 'black', color: 'white', textAlign: 'center', marginTop: "10px" }} >Layar </div>
                    </center>
                </div >
            )
        }
        return (
            <div>
                404 Not Found
            </div>
        )
    }
}

const MapstateToprops = (state) => {
    return {
        AuthLog: state.Auth.login,
        UserId: state.Auth.id
    }
}
export default connect(MapstateToprops, { keranjangAction })(Belitiket)
