import React from 'react'
import ItemCategory from './ItemCategory'
import tocbot from 'tocbot'

const ItemList = ({items}) => {
  if (items && items.items){
    const itemarray = items.items;
    const group = itemarray.reduce((result, current) => {
      const element = result.find((p) => p.category === current.category);
      if (element) {
        element.items.push(current);
      } else {
        result.push({
          category: current.category,
          items: [current]
        });
      }
      return result;
    }, []);

    return (
      <div className="item-list">
        { group.map(category => {
            return(
              <ItemCategory category={category} key={category.category} />
            )
          })
        } 
      </div>
    )
  }
  else{
    return(
      <div className="item-list">
      </div>
    )
  }
}

export default ItemList
