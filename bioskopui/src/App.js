import React, { Component } from 'react';
import Header from './compenents/header'
import Home from './pages/home'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import ManageAdmin from './pages/manageadmin'
import Login from './pages/login'
import { connect } from 'react-redux'
import { LoginSuccessAction, keranjangAction } from './redux/actions'
import Axios from 'axios';
import { APIURL } from './support/apiurl';
import movieDetail from './pages/movie-details';
import Loader from 'react-loader-spinner'
import Belitiket from './pages/belitiket'
import Register from './pages/register';
import Cart from './pages/cart';
import Notfound from './pages/notfound';
import Changepass from './pages/changepass';

class App extends Component {
  state = {
    loading: true,
    keranjang: []
    // keranjang: '',
  }

  componentDidMount() {
    var id = localStorage.getItem('dino')

    Axios.get(`${APIURL}users/${id}`)
      .then((res) => {
        Axios.get(`${APIURL}orders?userId=${res.data.id}`)
          .then((res2) => {
            console.log(res2.data)
            this.setState({
              keranjang: res2.data
            })
            // this.props.keranjangAction(res2.data.length)
          }).catch((err) => {
            console.log(err)
          })
        this.props.LoginSuccessAction(res.data)
        // this.setState({ loading: false })
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.setState({ loading: false })
      })
    // console.log(this.props.keranjang)
  }

  // Axios.get(`${APIURL}orders?_expand=movie&userId=${id}&bayar=false`)
  //   .then((res) => {
  //     // this.setState({ datacart: res.data })
  //     var datacart = res.data
  //     var qtyarr = []
  //     // console.log(res.data)
  //     res.data.forEach(element => {
  //       qtyarr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`))
  //     })
  //     var qtyarrfinal = []
  //     Axios.all(qtyarr)
  //       .then((res1) => {
  //         res1.forEach((val) => {
  //           qtyarrfinal.push(val.data)
  //         })
  //         // console.log(qtyarrfinal)
  //         var datafinal = []
  //         datacart.forEach((val, index) => {
  //           datafinal.push({ ...val, qty: qtyarrfinal[index] })
  //         })
  //         // console.log(datafinal)
  //         this.setState({
  //           keranjang: datafinal
  //         })
  //       }).catch((err1) => {
  //         console.log(err1)
  //       })
  //   }).catch((err) => {
  //     console.log(err)
  //   })


  render() {
    this.props.keranjangAction(this.state.keranjang.length)
    if (this.state.loading) {
      return <Loader
        type='Puff'
        color='#00918e'
        height={100}
        width={100}
      />
    }
    return (
      <div>
        {/* count={this.state.keranjang.length} */}
        <Header />
        <Switch>
          <Route path={'/'} exact>
            <Home />
          </Route>
          <Route path={'/manageadmin'} exact component={ManageAdmin} />
          <Route path='/moviedetail/:id' exact component={movieDetail} />
          <Route path='/belitiket' exact component={Belitiket} />
          <Route path={'/login'} exact component={Login} />
          <Route path='/cart' exact component={Cart} />
          <Route path={'/register'} exact component={Register} />
          <Route path={'/changepass'} exact component={Changepass} />

          <Route path='/*' exact component={Notfound} />
        </Switch>
      </div>
    );
  }
}

const MapstateToprops = (state) => {
  return {
    AuthLog: state.Auth.login,
    UserId: state.Auth.id,
    keranjang: state.Auth.keranjang
  }
}

export default connect(MapstateToprops, { LoginSuccessAction, keranjangAction })(App);