import React, { Component } from 'react';
import Header from './compenents/header'
import Home from './pages/home'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import ManageAdmin from './pages/manageadmin'
import Login from './pages/login'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './redux/actions'
import Axios from 'axios';
import { APIURL } from './support/apiurl';
import movieDetail from './pages/movie-details';
import Loader from 'react-loader-spinner'
import Belitiket from './pages/belitiket'


class App extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    var id = localStorage.getItem('dino')
    Axios.get(`${APIURL}users/${id}`)
      .then((res) => {
        this.props.LoginSuccessAction(res.data)
        // this.setState({ loading: false })
      }).catch((err) => {
        console.log(err)
      })
    this.setState({ loading: false })
  }


  render() {
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
        <Header />
        <Switch>
          <Route path={'/'} exact>
            <Home />
          </Route>
          <Route path={'/manageadmin'} exact>
            <ManageAdmin />
          </Route>
          <Route path='/moviedetail/:id' exact component={movieDetail} />
          <Route path='/belitiket' exact component={Belitiket} />
          <Route path={'/login'} exact component={Login} />
        </Switch>
      </div>
    );
  }
}

const MapstateToprops = (state) => {
  return {
    AuthLog: state.Auth.login
  }
}

export default connect(MapstateToprops, { LoginSuccessAction })(App);