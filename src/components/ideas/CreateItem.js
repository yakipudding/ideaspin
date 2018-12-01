import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createItem } from '../../store/actions/ideaActions'

class CreateItem extends Component {
  state = {
    category: '',
    content: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    // let item = {
    //   ...this.state,
    //   ideaId: this.props.ideaId
    // }
    // this.props.createItem(item);
    this.props.createItem(this.state, this.props.ideaId);
    this.props.history.push('/idea/' + this.props.ideaId);
  }
  render() {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Idea</h5>
          <div className="input-field">
            <input type="text" id='category' onChange={this.handleChange} />
            <label htmlFor="category">Item Category</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Item Content</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    ideaId: id,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createItem: (item, ideaId) => dispatch(createItem(item, ideaId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem)
