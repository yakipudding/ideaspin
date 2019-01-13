import React from 'react'
import Markdown from 'react-markdown'
import HeadingRenderer from '../../../biz/render'

const ItemSummary = ({item}) => {
  return (
    <div className="item-summary card">
      <div className="card-content">
        <Markdown source={item.content} className="content" renderers={{heading: HeadingRenderer}} />
      </div>
    </div>
  )
}

export default ItemSummary
