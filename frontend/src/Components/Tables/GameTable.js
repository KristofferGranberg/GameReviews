import React, {Component} from 'react'
import {Table, Button} from 'reactstrap';
import ReviewModal from '../Modals/Modal'

class GameTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      //// TODO:  look over address here, check with server.js and queries.js
      fetch('http://localhost:3009/games', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      }).then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      }).catch(err => console.log(err))
    }
  }

  render(){

    const items = this.props.items.map(item => {
      return(
        <tr key = {item.gamne_id}>
          <th scope = "row">{item.game_id}</th>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>{item.average_score}</td>
          <td>
            <div style ={{width:"110px"}}>
              <ReviewModal buttonLabel = "Edit" item = {item} updateState = {this.props.updateState}/>
              {''}
              <Button color = "danger" onClick = {() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
      )
    })

    return(
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Average Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default GameTable
