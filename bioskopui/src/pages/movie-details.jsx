import React, { Component } from 'react'
import Axios from 'axios'
import { APIURL } from '../support/apiurl'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'


class movieDetail extends Component {

    state = {
        datadetailfilm: {},
        traileropen: false,
        notloginyet: false,
        kelogin: false,
        belitiketoke: false
    }

    componentDidMount() {
        Axios.get(`${APIURL}movies/${this.props.match.params.id}`)
            .then(res => {
                // console.log(res.data)
                this.setState({ datadetailfilm: res.data })
            }).catch(err => {
                console.log(err)
            })
    }

    onBeliTiketClick = () => {

        if (this.props.AuthLog) {
            this.setState({ belitiketoke: true })
        } else {
            this.setState({ notloginyet: true })
        }
    }

    render() {
        if (this.state.kelogin) {
            return <Redirect to={'/login'} />
        }
        if (this.state.belitiketoke) {
            return <Redirect to={{ pathname: '/belitiket', state: this.state.datadetailfilm }} />
        }

        return (
            <div>
                <Modal isOpen={this.state.traileropen} size='lg' toggle={() => this.setState({ traileropen: false })} contentClassName='Trailer'>
                    <ModalBody className='p-0 bg-tranparent'>
                        <iframe width='100%' title={this.state.datadetailfilm.title} height='100%' src={this.state.datadetailfilm.trailer}>
                        </iframe>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.notloginyet} toggle={() => this.setState({ notloginyet: false })}>
                    <ModalBody>
                        Anda Belum Login
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-danger' onClick={() => this.setState({ kelogin: true })}>Login</button>
                    </ModalFooter>

                </Modal>

                <div className='row p-3'>
                    <div className='col-md-5'>
                        <img src={this.state.datadetailfilm.image} height='400' alt='film' />
                        <div className='mt-3' style={{ fontSize: '30px' }}>
                            {this.state.datadetailfilm.title}
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className='mt-1'>
                            Title <span className='mr-auto'>:</span>
                        </div>
                        <div className='mt-1'>
                            Sutradara <span className='mr-auto'>:</span>
                        </div>
                        <div className='mt-1'>
                            Genre <span className='mr-auto'>:</span>
                        </div>
                        <div className='mt-1'>
                            Durasi <span className='mr-auto'>:</span>
                        </div>
                        <div className='mt-1'>
                            Sinopsis <span className='mr-auto'>:</span>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className='mt-1'>
                            {this.state.datadetailfilm.title}
                        </div>
                        <div className='mt-1'>
                            {this.state.datadetailfilm.sutradara}
                        </div>
                        <div className='mt-1'>
                            {this.state.datadetailfilm.genre}
                        </div>
                        <div className='mt-1'>
                            <Icon name='wait' />{this.state.datadetailfilm.durasi} menit
                        </div>
                        <div className='mt-1'>
                            {this.state.datadetailfilm.sinopsis}
                        </div>

                        <div className='mt-3'>
                            <button className='mr-3 btn btn-primary' onClick={this.onBeliTiketClick}>Book Now</button>
                            <button className='mr-3 btn btn-outline-warning' onClick={() => this.setState({ traileropen: true })} >Trailer</button>
                        </div>
                    </div>


                </div>
            </div>

        )
    }
}

const MapstateToprops = (state) => {
    return {
        AuthLog: state.Auth.login
    }
}
export default connect(MapstateToprops)(movieDetail)
