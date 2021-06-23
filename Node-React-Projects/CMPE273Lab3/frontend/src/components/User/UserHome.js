import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import { graphql, compose } from 'react-apollo'
import { getRestaurants } from '../../queries/queries'

class UserHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            allRestaurants : []
        }
    }

	render(){

		var allUsersData = this.props.getRestaurants.allUsers
		var RestaurantsUI = [];
		var val;
		for (val in allUsersData){
				if(allUsersData[val].isOwner === true) {
						RestaurantsUI.push(
							<div style={{ borderColor: "black" }}>
									<div>
										<Link to={ "/user/restaurant-details/" + allUsersData[val]['id']}><h3 class="display-4">{ allUsersData[val].restaurantInfo.name }</h3></Link>
										<h5>Cuisine : { allUsersData[val].restaurantInfo.cuisine }</h5>
									</div>
							</div>
						)
				}
		}
		return(
				<div>

						{ RestaurantsUI }

				</div>
		)
	}
}
//export UserHome Component
export default compose(
    graphql(getRestaurants, { name: "getRestaurants" }),
)(UserHome)