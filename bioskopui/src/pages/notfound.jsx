import React, { Component } from 'react'

class Notfound extends Component {
    render() {
        return (
            <div id="error-page">
                <div id="error-inner">
                    <h1> I told you to text your mom</h1>
                    <div className="pesan-eror">404</div>
                    <p className="balik-home"><a href="#">Back to Home, your handsome dad here!</a></p><br />
                </div>
            </div>
        )
    }
}

export default Notfound
