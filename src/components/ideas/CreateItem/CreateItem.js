import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createItem } from '../../../store/actions/ideaActions'
import MarkdownEditForm from '../EditForm/MarkdownEditForm'

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
    this.props.createItem(this.state, this.props.ideaId);
    this.props.history.push('/idea/' + this.props.ideaId);
  }
  render() {
    return (
      <MarkdownEditForm idea={null} item={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
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
