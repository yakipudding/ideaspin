import React from 'react'
import moment from 'moment'
import Markdown from 'react-markdown'

const ItemSummary = ({item}) => {
  return (
    <div className="row">
      <div className="col s12 m10">
        <div className="blue-grey white-text category">
          <span>{item.category}</span>
        </div>
        <div className="card">
          <div className="card-content">
            <span className="card-title">{item.title}</span>
            <Markdown source={item.content} className="content" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemSummary
