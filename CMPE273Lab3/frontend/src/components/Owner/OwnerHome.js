import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';

class OwnerHome extends Component {
    
    constructor(props) {
        super(props)
        this.username = ""
    }

    render(){
        this.username = localStorage.getItem("userName")
        return(
					<div class="container mt-5 text-center">
						<div class="display-4 mb-5">Hi {this.username}</div>
						<div>
								<div><Link to="/owner/menu/manage-items"><button><h3>Manage menu</h3></button></Link></div>
								<div><Link to="/owner/menu/view"><button><h3>View menu</h3></button></Link></div>
						</div>
					</div>
        )
    }
}
//export OwnerHome Component
export default OwnerHome;