import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { editIdea } from '../../../store/actions/ideaActions'
import MarkdownEditForm from '../EditForm/MarkdownEditForm'

class EditIdea extends Component {
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
    this.props.editIdea(this.state, this.props.ideaId);
    this.props.history.push('/idea/' + this.props.ideaId);
  }
  render() {
    if(this.props.idea){
      return (
        <MarkdownEditForm idea={this.state} item={null} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      )
    }
    else{
      return (
        <div className="container center">
          <p>Loading idea...</p>
        </div>
      )
    }
  }
  componentDidMount() {
    if(this.props.idea)
    {
      this.setState({title: this.props.idea.title, content: this.props.idea.content})
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const ideas_db = state.firestore.data.ideas;
  const idea = ideas_db ? ideas_db[id] : null;
  return {
    ideaId: id,
    idea: idea,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editIdea: (idea) => dispatch(editIdea(idea))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((ownProps) => [
    { collection: 'ideas', doc: ownProps.match.params.id }
  ])
)(EditIdea)
