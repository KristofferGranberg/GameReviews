import React, {Component} from 'react'
import {Table, Button} from 'reactstrap';
import Linkify from 'react-linkify';

class ReviewTable extends Component {

  render(){

    const items = this.props.items.map(item => {
      return(
        <tr key = {item.review_id}>
          
          <td>{item.site_name}</td>
          <td>{item.score}</td>
          <td>{item.summary}</td>
          <td>
            <Linkify>{item.link}</Linkify>
          </td>
        </tr>
      )
    })

    return(
      <Table responsive striped>
        <thead>
          <tr>
            <th>Site Name</th>
            <th>Score</th>
            <th>Summary</th>
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
