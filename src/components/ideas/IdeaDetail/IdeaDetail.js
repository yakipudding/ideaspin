import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import IdeaDetailSummary from './IdeaDetailSummary'
import ItemList from './ItemList'
import tocbot from 'tocbot'

class IdeaDetail extends Component {
  render() {
    if (this.props.idea) {
      return (
        <div className="container section idea-details">
          <div className="row">
            <div className="col s12 m9 js-toc-content">
              <IdeaDetailSummary idea={this.props.idea} />
              <ItemList items={this.props.items} />
            </div>
            <div className="col s12 m2 offset-m1">
              <div className="js-toc idea-toc is-position-fixed"></div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="container center">
          <p>Loading idea...</p>
        </div>
      )
    }
  }
  
  /* 再描画後 */
  componentDidUpdate(prevProps, prevState){
    /* 再描画後に実際のDOMにアクセスするためのメソッド */
    tocbot.refresh();
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.js-toc-content',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h1, h2, h3, h4',
      // How many heading levels should not be collpased.
      // For example, number 6 will show everything since
      // there are only 6 heading levels and number 0 will collpase them all.
      // The sections that are hidden will open
      // and close as you scroll to headings within them.
      collapseDepth: 3,
      // Fixed position class to add to make sidebar fixed after scrolling
      // down past the fixedSidebarOffset.
      positionFixedClass: 'is-position-fixed',
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const ideas_db = state.firestore.data.ideas;
  const idea = ideas_db ? {...ideas_db[id], id: id} : null;
  const items_db = state.firestore.ordered.itemtrees;
  const items = items_db ? items_db.find(item => item.id === id) : null;
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
)(IdeaDetail)
