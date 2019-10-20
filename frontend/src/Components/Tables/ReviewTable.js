import React, {Component} from 'react'
import {Table, Button} from 'reactstrap';

class ReviewTable extends Component {

  render(){

    const items = this.props.items.map(item => {
      return(
        <tr key = {item.review_id}>
          <th scope = "row">{item.review_id}</th>
          <td>{item.site_name}</td>
          <td>{item.score}</td>
          <td>{item.link}</td>
        </tr>
      )
    })

    return(
      <Table responsive hover>
        <thead>
          <tr>
            <th>Review ID</th>
            <th>Site Name</th>
            <th>Score</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default ReviewTable
