import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    game_id: 0,
    name: '',
    description: '',
    price: '',
    average_score: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/games', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        average_score: this.state.average_score
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/games', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game_id: this.state.game_id,
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        average_score: this.state.average_score
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { game_id, name, description, price, average_score} = this.props.item
      this.setState({ game_id, name, description, price, average_score })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="name" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="description" name="description" id="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description}  />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="price" name="price" id="price" onChange={this.onChange} value={this.state.price === null ? '' : this.state.price}  />
        </FormGroup>
        <FormGroup>
          <Label for="average_score">Average Score</Label>
          <Input type="text" name="average_score" id="average_score" onChange={this.onChange} value={this.state.average_score === null ? '' : this.state.average_score} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
