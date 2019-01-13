import React from 'react'
import ItemSummary from './ItemSummary'

const ItemCategory = ({category}) => {
  return (
    <div>
      <div className="category blue-grey white-text">
        <h1 id={category.category}>{category.category}</h1>
      </div>
      { category.items.map(item => {
          return (
            <ItemSummary item={item} key={item.id} />
          )
        })
      }
    </div>
  )
}

export default ItemCategory
