import React, {Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap'
import AddEditForm from '../Forms/AddEditForm'

class ReviewModal extends Component {

  constructor(props){
    super(props)
      this.state = {
        modal: false
      }
    }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render(){
    const closeBtn = <button className = "close" onClick = {this.toggle}>&times;</button>
    const label = this.props.buttonLabel

    let button = ""
    let title = ""

    if(label === "Edit"){
      button = <Button
        color = "warning"
        onClick = {this.toggle}
        style = {{float: "left", marginRight: "10px"}}>
        {label}</Button>
        title = 'Edit Item'
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
          <ModalBody>
          <AddEditForm
              addItemToState = {this.props.addItemToState}
              updateState = {this.props.updateState}
              toggle = {this.toggle}
              item =  {this.props.item}/>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ReviewModal

/*
            <AddEditForm
              addItemToState = {this.props.addItemToState}
              updateState = {this.props.updateState}
              toggle = {this.toggle}
              item =  {this.props.item}/>
*/