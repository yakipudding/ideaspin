import React from 'react'
import moment from 'moment'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import HeadingRenderer from '../../../biz/render'

const IdeaDetailSummary = ({idea}) => {
  return (
    <div className="idea-detail-summary">
      <div className="card z-depth-0">
        <div className="card-content">
          <h1 id={idea.id} className="card-title">{idea.title}</h1>
          <Markdown source={idea.content} className="content" renderers={{heading: HeadingRenderer}} />
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by {idea.authorFirstName} {idea.authorLastName}</div>
          <div>{moment(idea.createdAt.toDate()).calendar()}</div>
          <Link to={'/editidea/' + idea.id} key={idea.id}>
            <div className="btn-floating waves-effect waves-light pink"><i className="material-icons">edit</i></div>
          </Link>
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
  )
}

export default IdeaDetailSummary
