import { useState, useEffect } from 'react'

function reformatItemData(items) {
  return items?.map(item => 
    item?.active === undefined
      ? ({ ...item, active: true })
      : item
  )
}

export default function Checklist({ label, items }) {
  const [data, setData] = useState(reformatItemData(items))

  function toggleItem(index) {
    const item = data[index]
    item.active = !item.active
    setData(data)
  }

  useEffect(() => {
    setData(reformatItemData(items))
  }, [items])

  return (
    <div className='vertical-field'>
      {label &&
        <label htmlFor='edit-title'>{label}</label>
      }
      <div className='checklist'>
        {data?.map((item, index) =>
          <div className='checklist-item' onClick={() => toggleItem(index)} key={index}>
            <p>{item.title}</p>
            <input type='hidden' value={item.active} />
            {item.active &&
              <i className='fa fa-check' />
            }
          </div>
        )}
      </div>
    </div>
  )
}