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
import History from './pages/history'
import managestudio from './pages/managestudio';

class App extends Component {
  state = {
    loading: true,
    keranjang: []
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
          <Route path={'/history'} exact component={History} />
          <Route path={'/managestudio'} exact component={managestudio} />
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