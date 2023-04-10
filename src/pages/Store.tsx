import data from '../data/data.json'
import { Item } from '../components/Item';
import { useState } from 'react';

const Store = () => {
  const items = data['items'];
  return (
    <div className="justify-items-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 pt-10">
      {
        items.map(item => (
          <Item key={item.id} {...item}/>
        ))
      }
    </div>
  )
}

export default Store