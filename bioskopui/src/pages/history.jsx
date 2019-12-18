import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { totalHargaAction } from '../redux/actions'


class History extends Component {

    state = {
        historyCart: []
    }

    componentDidMount() {
        console.log(this.props.role)
    }

    renderHistory = () => {
        if (this.state.historyCart !== null) {
            if (this.state.historyCart === 0) {
                return (
                    <Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>No.</Table.HeaderCell>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Jadwal</Table.HeaderCell>
                                <Table.HeaderCell>Total Harga</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>1</Table.Cell>
                                <Table.Cell>2</Table.Cell>
                                <Table.Cell>3</Table.Cell>
                                <Table.Cell>4</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                )
            }
        }
    }

    render() {
        return (
            <div>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>No.</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Jadwal</Table.HeaderCell>
                            <Table.HeaderCell>Total Harga</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>3</Table.Cell>
                            <Table.Cell>{this.props.totalharga}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

const MapstateToprops = (state) => {
    return {
        totalharga: state.Auth.totalharga
    }
}

export default connect(MapstateToprops, { totalHargaAction })(History)
