import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import ReviewModal from './Component/Modals/Modal'
import GameTable from './Component/Tables/GameTable'
import {CSVLink} from 'react-csv' // ?


class App extends Component {
  const port = 3009

  state = {
    items: []
  }

  getItems(){
    fetch(`http://localhost:${port}/games`)
      .then( response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) =>{
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
      //destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      //add the updated item to the array
      item,
      //add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({items: newArray})
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({items: updatedItems})
  }

  componentDidMount(){
    this.getItems()
  }

  render(){
    return(
      <Container className = "App">
        <Row>
          <Col>
          <h1 style = {{margin: "20px 0"}}> GameReviews </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <GameTable
              items = {this.state.items}
              updateState = {this.updateState}
              deleteItemFromState = {this.deleteItemFromState}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename = {"db.csv"}
              color = "primary"
              style = {{float: "left", marginRight: "10px"}}
              className = "btn btn-primary"
              data = {this.state.items}>
            CSV Download
            </CSVLink>
            <ReviewModal
              buttonLabel = "Add Game"
              addItemToState = {this.addItemToState}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App



// import React from 'react';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
