import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { APIURL } from './../support/apiurl'
import { Icon, Menu, Table, } from 'semantic-ui-react'
// import { Table, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import { element } from 'prop-types'

class Cart extends Component {
    state = {
        datacart: null
    }

    componentDidMount() {
        Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.UserId}&bayar=false`)
            .then((res) => {
                // this.setState({ datacart: res.data })
                var datacart = res.data
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
        console.log(this.state.datacart)
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
                        <Table.Cell><button className='btn btn-primary'>Detail</button></Table.Cell>
                    </Table.Row>
                )
            })
        }
    }

    render() {
        if (this.props.UserId) {
            return (
                <div className='mt-3 '>
                    <center>
                        <Table celled style={{ width: '70%' }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell >Order ID</Table.HeaderCell>
                                    <Table.HeaderCell >Title</Table.HeaderCell>
                                    <Table.HeaderCell >Jadwal Tayang </Table.HeaderCell>
                                    <Table.HeaderCell >Jumlah</Table.HeaderCell>
                                    <Table.HeaderCell >Summary</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.renderCart()}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='5'>
                                        <Menu floated='right' pagination>
                                            <Menu.Item as='a' icon>
                                                <Icon size='small' name='chevron left' />
                                            </Menu.Item>
                                            {/* <Menu.Item as='a'>1</Menu.Item>
                                        <Menu.Item as='a'>2</Menu.Item> */}
                                            {/* <Menu.Item as='a'>3</Menu.Item> */}
                                            <Menu.Item as='a' icon>
                                                <Icon size='small' name='chevron right' />
                                            </Menu.Item>
                                        </Menu>
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
        UserId: state.Auth.id
    }
}

export default connect(MapstateToprops)(Cart)
