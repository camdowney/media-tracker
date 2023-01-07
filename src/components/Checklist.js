import { useState, useEffect } from 'react'

export default function Checklist({ label, items }) {
  const clean = items =>
    items?.map(item => item.active === undefined ? ({ ...item, active: true }) : item)

  const [data, setData] = useState(clean(items))

  const toggleItem = index => () =>
    setData(data.map((item, i) => i === index ? ({ ...item, active: !item.active,  }) : item))

  useEffect(() => {
    setData(clean(items))
  }, [items])

  return (
    <div className='vertical-field'>
      {label &&
        <label htmlFor='edit-title'>{label}</label>
      }
      <div className='checklist'>
        {data?.map((item, index) =>
          <div className='checklist-item' onClick={toggleItem(index)} key={index}>
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