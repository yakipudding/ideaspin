import React from 'react'
import Markdown from 'react-markdown'
import HeadingRenderer from '../../../biz/render'
import {Input} from 'react-materialize'

const MarkdownEditForm = ({idea, item, handleChange, handleSubmit}) => {
  const titleLabel = idea ? 'title' : 'category';
  const titleLabelName = idea ? 'アイデア名' : 'カテゴリ：「基本設計」「画面設計」など…';
  const title = idea ? idea.title : item.category;
  const content = idea ? idea.content: item.content;
  const buttonLabel = idea ? 'アイデアを新規投稿' : 'アイテムを追加する';
  return (
    <div>
      <div className="col s12 m6 white edit">
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <Input type="text" id={titleLabel} onChange={handleChange} validate value={title}
                   label={titleLabelName} labelClassName="active" />
          </div>
          <div className="input-field">
            <Input type="textarea" id="content" onChange={handleChange} validate value={content} row="10"
                   label="Markdown形式で書けます" labelClassName="active" className="makrdown-textarea" />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">{buttonLabel}</button>
          </div>
        </form>
      </div>
      <div className="col s12 m6 white edit edit-preview">
        <div className="preview-area">
          <h1>{title}</h1>
          <Markdown source={content} className="content" renderers={{heading: HeadingRenderer}} />
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditForm
