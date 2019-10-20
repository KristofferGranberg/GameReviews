import React, {Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import AddEditForm from '../Forms/AddEditForm'
import GameTable from '../Tables/GameTable';
import ReviewTable from '../Tables/ReviewTable';

class ReviewModal extends Component {

  constructor(props){
    
    super(props)
      this.state = {
        items: [],
        modal: false
      }
      // this didn't work before but works now :/
      this.getReviews()
  }

  getReviews(){
    const id = this.props.item.game_id
      fetch(`http://localhost:3009/reviews/${id}`)
        .then( response => response.json())
        .then(items => this.setState({items}))
        .catch(err => console.log(err))
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
    // fetch correct reviews when toggle, not the best but works...
    //this.getReviews()
  }

  render(){
    const closeBtn = <button className = "close" onClick = {this.toggle}>&times;</button>
    const label = this.props.buttonLabel

    let button = ""
    let title = ""

    if(label === "reviews"){
      button = <Button
        color = "primary"
        onClick = {this.toggle}
        style = {{float: "left", marginRight: "10px"}}>
        {label}</Button>
        title = 'review'
    } else {
      button = <Button
        color = "success"
        onClick = {this.toggle}
        style = {{float: "left", marginRight: "10px"}}>
        {label}</Button>
        title = 'Add New Item'
    }

    return(
      <div>
      {button}
        <Modal
          isOpen = {this.state.modal}
          toggle = {this.toggle}
          className = {this.props.className}>
          <ModalHeader>
            <h3 align = 'center'>
               {this.props.item.name} reviews
            </h3>
          </ModalHeader>
          <ModalBody>
            <ReviewTable items = {this.state.items}/>
          </ModalBody>
          <ModalFooter>
            {/*<Button color = "secondary" onClick = {this.toggle}>Cancel</Button> */}
            {closeBtn}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ReviewModal

/*
<GameTable items = {this.state.items}/>

          <AddEditForm
              addItemToState = {this.props.addItemToState}
              updateState = {this.props.updateState}
              toggle = {this.toggle}
              item =  {this.props.item}/>


            <AddEditForm
              addItemToState = {this.props.addItemToState}
              updateState = {this.props.updateState}
              toggle = {this.toggle}
              item =  {this.props.item}/>
*/