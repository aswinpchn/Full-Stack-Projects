import React, {Component} from 'react'
import '../../../App.css'
import {Link} from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { getItemQuery } from '../../../queries/queries'
import { addItemMutation } from '../../../mutation/mutations'

class ManageItems extends Component {    

    constructor(props) {
        super (props)
        this.state = {
            AllSections : [],
            AllItems : [],
            NewSectionName : "",
            NewItemName : "",
            errMsg : "",
            successMsg : ""
        }
        this.SectionValue = null
    }

    updateItems = (AllItems) => {
        this.setState({
            AllItems : AllItems
        })
    }

    render(){

        var allUsersData = this.props.getItemQuery.allUsers
        var AllSections = []
        let index
        for (index in allUsersData) {
            if (allUsersData[index].id === localStorage.getItem("userId")) {
                AllSections = allUsersData[index].restaurantInfo.sections
            }
        }

        var Sections = []
        var Items = []
        var section, item

        if (AllSections.length === 0) {
            Sections.push(
                <div class="m-3 p-3 shadow">
                    <h3>Oops! There are no sections in your menu right now. <Link to="/owner/menu/manage-sections">Add here</Link></h3>
                </div>
            )
        } else {

            for (section in AllSections){
                Items = []

                for (item in AllSections[section].items) {
                        Items.push(
                            <tr>
                                <td class="row">
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" value={AllSections[section].items[item].name} disabled />
                                    </div>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" value={AllSections[section].items[item].description} disabled />
                                    </div>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" value={AllSections[section].items[item].price} disabled />
                                    </div>
                                </td>
                            </tr>
                        )
                }
                Sections.push(
                    <div class="m-3 p-3 shadow">
                        <h3>{ AllSections[section]['name']}</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="row text-center">
                                        <div class="col-sm-3">Item Name</div>
                                        <div class="col-sm-3">Item Description</div>
                                        <div class="col-sm-3">Price</div>
                                        <div class="col-sm-3">Action</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AddItems SectionValue={ AllSections[section] } handler={ this.updateItems } parent={this}></AddItems>
                                { Items }
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
        return(
            <div>
                <div>
                    <h6 class="mt-3"><Link to="/owner/menu/view">View menu</Link></h6>
                    <h6 class="mt-3 mb-3"><Link to="/owner/menu/manage-sections">Manage Sections</Link></h6>
                    <h5 class="mt-2">Manage Items</h5>
                </div>
            <div>
                { Sections }
            </div>
        </div>
        )
    }
}


class AddItems extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemname : "",
            itemdescription : "",
            itemprice : "",
            itemimage : "",
            sectionid : this.props.SectionValue['id'],
            errMsg : "",
            successMsg : ""
        }
    }

    NewItemNameChangeHandler = (e) => {
        this.setState({
            itemname : e.target.value
        })
    }

    NewItemDescriptionChangeHandler = (e) => {
        this.setState({
            itemdescription : e.target.value
        })
    }

    NewItemPriceChangeHandler = (e) => {
        this.setState({
            itemprice : e.target.value
        })
    }

    IsValidImage = (Image) => {
        if (Image == null) {
            return true
        }
        if (Image.name == null){
            return true
        }
        if (Image.name.match(/^.*\.jpg$/)) {
            return true
        }
        return false
    }    

    NewItemImageChangeHandler = (e) => {
        if(!this.IsValidImage(e.target.files[0])){
            this.setState({
                itemimage : e.target.files[0]
            })
        } else {
            var newImage = new File([e.target.files[0]], 'ImageNew.jpg', { type : 'image/jpeg' })
            this.setState({
                itemimage : newImage
            })
        }
    } 

    IsValueEmpty = (Value) => {
        if (Value == null)
            return true
        if ("".localeCompare(Value.replace(/\s/g, "")) === 0) 
            return true
        return false
    }

    IsValidPrive = (price) => {
        if (price.match(/^[0-9]+([.]?[0-9]{1,2})?$/)) {
            return true
        }
        return false
    }

    
    addItem = (e) => {
        e.preventDefault()
        if (this.IsValueEmpty(this.state.itemname) || this.IsValueEmpty(this.state.itemprice)){
            this.setState({
                errMsg : "Item name and price cannot be empty",
                successMsg : ""
            })
        } else if (!this.IsValidPrive(this.state.itemprice)){
            this.setState({
                errMsg : "Invalid item price",
                successMsg : ""
            })
        } else {
            const newItemData = {
                userId: localStorage.getItem("userId"),
                sectionId: this.state.sectionid,
                itemName: this.state.itemname,
                itemDescription: this.state.itemdescription,
                itemPrice: this.state.itemprice,               
            }
            console.log(newItemData)
            this.props.parent.props.addItemMutation({
                variables: newItemData
            })
            this.setState({
                itemname: "",
                itemdescription: "",
                itemprice: "",
            })
        }
    }

    render() {

        return (
            <tr>
                <td>
                    <div class="row">
                        <div class="col-sm-3"><input type="text" class="form-control" value={ this.state.itemname } onChange={ this.NewItemNameChangeHandler }/></div>
                        <div class="col-sm-3"><input type="text" class="form-control" value={ this.state.itemdescription } onChange={ this.NewItemDescriptionChangeHandler }/></div>
                        <div class="col-sm-3"><input type="text" class="form-control" value={ this.state.itemprice } onChange={ this.NewItemPriceChangeHandler }/></div>
                        <div class="col-sm-3">
                            <button type="submit" class="btn btn-primary" onClick={ this.addItem }>Add item to section</button>
                            <p class="text-danger"> { this.state.errMsg } </p>    
                            <p class="text-success"> { this.state.successMsg } </p>    
                        </div>
                    </div>
                </td>
            </tr>
        )
    }

}

//export ManageItems Component
export default compose(
    graphql(getItemQuery, { name: "getItemQuery" }),
    graphql(addItemMutation, { name: "addItemMutation" }),
)(ManageItems)