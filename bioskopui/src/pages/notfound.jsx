import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Notfound extends Component {
    render() {
        return (
            <div id="error-page" className='mt-10'>
                <div id="error-inner">
                    <h1> I told you to text your mom</h1>
                    <Link to='/'>
                        <div className="pesan-eror">404</div>
                        <p className="balik-home"><a href="#">Back to Home, your handsome dad here!</a></p><br />
                    </Link>
                </div>
            </div>
        )
    }
}

export default Notfound
