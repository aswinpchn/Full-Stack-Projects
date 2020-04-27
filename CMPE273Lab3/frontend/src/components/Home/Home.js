import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'

class Home extends Component {

    render(){

        var redirectVar
        if (localStorage.getItem('isOwner') === "false") {
            redirectVar = <Redirect to="/user/home" />
        } else if (localStorage.getItem('isOwner') === "true") {
            redirectVar = <Redirect to="/owner/home" />
        }

        return(
            <div class="row" style={{ minHeight: 100 + "vh"}}>
                { redirectVar }
                <div style={ { marginLeft: "30%"  } }>
                    <h1>Grubhub</h1>
                    <h4><Link to="/login">Sign in</Link></h4>
                    <img src="https://res.cloudinary.com/grubhub-marketing/image/upload/fl_lossy/v1543862073/grubhubHomePage/opengraph_image_gh.jpg" alt="BaseImage" />
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home