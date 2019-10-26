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

  /*
  rowClick = () => {
    window.confirm('clicked')
  }
  */

  render(){

    const items = this.props.items.map(item => {
      return(
        <tr key = {item.game_id} /*onClick = {this.rowClick} */>
         
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>SEK</td>
          <td>{item.average_score}</td>
          <td>4</td>
          <td>
            <div style ={{width:"110px"}}>
              <ReviewModal buttonLabel = "reviews" item = {item} updateState = {this.props.updateState} id = {item.game_id}/>
              {''}
              {/*<Button color = "danger" onClick = {() => this.deleteItem(item.id)}>Del</Button>*/}
            </div>
          </td>
        </tr>
      )
    })

    return(
      <Table responsive striped >
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Average Score</th>
            <th>Nr Review</th>
            <th></th>
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
