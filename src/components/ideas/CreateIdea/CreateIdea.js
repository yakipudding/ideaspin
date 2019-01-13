import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createIdea } from '../../../store/actions/ideaActions'
import MarkdownEditForm from '../EditForm/MarkdownEditForm'

class CreateIdea extends Component {
  state = {
    title: '',
    content: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createIdea(this.state);
    this.props.history.push('/');
  }
  render() {
    return (
      <MarkdownEditForm idea={this.state} item={null} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createIdea: (idea) => dispatch(createIdea(idea))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateIdea)
