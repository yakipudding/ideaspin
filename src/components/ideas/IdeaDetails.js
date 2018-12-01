import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import Markdown from 'react-markdown'
import ItemSummary from './ItemSummary'
import { Link } from 'react-router-dom'

class IdeaDetails extends Component {

  renderIdea(){
    const {idea} = this.props;
    return (
      <div>
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{idea.title}</span>
            <Markdown source={idea.content} className="content" />
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {idea.authorFirstName} {idea.authorLastName}</div>
            <div>{moment(idea.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 center">
            <Link to={'/createitem/' + idea.id} key={idea.id}>
              <div className="btn-floating waves-effect waves-light red"><i className="material-icons">add</i></div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {items} = this.props;
    if (this.props.idea) {
      return (
        <div className="container section idea-details">
          {this.renderIdea()}
          { items && items.map(item => {
            return (
              <ItemSummary key={item.id} item={item} />
            )
          })}
        </div>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading idea...</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const id = ownProps.match.params.id;
  const ideas_db = state.firestore.data.ideas;
  const idea = ideas_db ? {...ideas_db[id], id: id} : null;
  const items_db = state.firestore.ordered.itemtrees;
  const items = items_db ? items_db[0].items : null;
  return {
    idea: idea,
    items: items,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((ownProps) => [
    { collection: 'ideas', doc: ownProps.match.params.id },
    { collection: 'itemtrees', doc: ownProps.match.params.id, subcollections: [{ collection: 'items', orderBy: ['createdAt', 'asc'] }] }
  ])
)(IdeaDetails)
