import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { APIURL } from './../support/apiurl'
import { Icon, Table, Popup, Button } from 'semantic-ui-react'
import { totalHargaAction } from '../redux/actions'
import { Redirect } from 'react-router-dom'
// import { Button } from '@material-ui/core'
// import { Table, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import { element } from 'prop-types'

class Cart extends Component {
    state = {
        datacart: null,
        // indexdetail: 0,
        totalharga: 0,
        detailSeat: [],
        cartOke: false

    }

    componentDidMount() {
        Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.UserId}&bayar=false`)
            .then((res) => {
                var datacart = res.data
                var harga = 0
                for (var i = 0; i < datacart.length; i++) {
                    harga += datacart[i].totalharga
                }
                this.setState({ totalharga: harga })
                var qtyarr = []
                // console.log(res.data)
                res.data.forEach(element => {
                    qtyarr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`))
                })
                var qtyarrfinal = []
                Axios.all(qtyarr)
                    .then((res1) => {
                        res1.forEach((val) => {
                            qtyarrfinal.push(val.data)
                        })
                        // console.log(qtyarrfinal)
                        var datafinal = []
                        datacart.forEach((val, index) => {
                            datafinal.push({ ...val, qty: qtyarrfinal[index] })
                        })
                        // console.log(datafinal)
                        this.setState({
                            datacart: datafinal
                        })
                    }).catch((err1) => {
                        console.log(err1)
                    })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderCart = () => {
        if (this.state.datacart !== null) {
            if (this.state.datacart.length === 0) {
                return (
                    <tr>
                        <td>Cart Kosong</td>
                    </tr>)
            }
            return this.state.datacart.map((val, index) => {
                return (
                    <Table.Row>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{val.movie.title}</Table.Cell>
                        <Table.Cell><Icon name='wait' /> {val.jadwal}:00</Table.Cell>
                        <Table.Cell>{val.qty.length}</Table.Cell>
                        <Table.Cell>Rp. {val.totalharga}</Table.Cell>

                        <Table.Cell>
                            <Popup
                                position='left center'
                                content={<Table singleLine color='red' inverted>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Total</Table.HeaderCell>
                                            <Table.HeaderCell>Seat</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>

                                        <Table.Row key={index} >
                                            <Table.Cell>{this.state.detailSeat.length}</Table.Cell>
                                            <Table.Cell>{this.state.detailSeat.map((val, i) => {
                                                return val + ', '
                                            })}
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>}
                                on='click'
                                pinned
                                trigger={<Button floated='right' color='instagram' size='tiny' onClick={() => this.btnDetail(index)}>Detail</Button>
                                }
                            />
                        </Table.Cell>

                    </Table.Row>
                )
            })
        }
    }

    btnDetail = (index) => {
        var id = this.state.datacart[index].id
        Axios.get(`${APIURL}ordersDetails?orderId=${id}`)
            .then(res => {
                var detailfilm = res.data
                var seat = []
                var row = []
                detailfilm.map((val, index) => {
                    seat.push(val.seat)
                    row.push(val.row)
                })
                var abjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                var posisi = []
                for (var i = 0; i < seat.length; i++) {
                    for (var j = 0; j < abjad.length; j++) {
                        if (row[i] === j) {
                            posisi.push(String(abjad[j]) + (seat[i] + 1))
                        }
                    }
                } this.setState({ detailSeat: posisi })
            })
    }

    btnHistory = () => {
        this.props.totalHargaAction(this.state.totalharga)
        this.setState({ cartOke: true })
    }

    render() {
        // console.log(this.state.totalharga)
        if (this.state.cartOke) {
            return <Redirect to='/history' />
        }

        this.props.totalHargaAction(this.state.totalharga)
        if (this.props.UserId) {
            return (
                <div className='mt-5 '>
                    <center>
                        <Table color='teal' inverted celled style={{ width: '70%', height: '100px' }} >
                            <Table.Header>
                                <h1>Cart</h1>
                                <Table.Row  >
                                    <Table.HeaderCell >No.</Table.HeaderCell>
                                    <Table.HeaderCell >Title</Table.HeaderCell>
                                    <Table.HeaderCell >Jadwal Tayang </Table.HeaderCell>
                                    <Table.HeaderCell >Jumlah</Table.HeaderCell>
                                    <Table.HeaderCell >Harga</Table.HeaderCell>
                                    <Table.HeaderCell >Summary</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.renderCart()}
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='6' floated='center'>
                                        <Button size='tiny' animated='vertical' color='vk' inverted style={{ marginLeft: '841px' }}>
                                            <Button.Content hidden onClick={this.btnHistory}>Checkout</Button.Content>
                                            <Button.Content visible >
                                                <Icon name='shop' />Total Rp {this.props.totalharga}
                                            </Button.Content>
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table >
                    </center>
                </div >
            )
        } return (
            <div>404 Not Found</div>
        )
    }
}
const MapstateToprops = (state) => {
    return {
        AuthLog: state.Auth.login,
        UserId: state.Auth.id,
        keranjang: state.Auth.keranjang,
        totalharga: state.Auth.totalharga
    }
}

export default connect(MapstateToprops, { totalHargaAction })(Cart)
