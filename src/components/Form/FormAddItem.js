import React, { useEffect, useState } from 'react'

const FormAddItem = (props) => {
    const [item,setItem] = useState()
    useEffect(()=>{
        let datas = [...props.newItem]
        datas[props.index] = {
            name : props.newItem[props.index].name,
            value : item,
            type : props.newItem[props.index].type
        }
        props.setNewItem(datas)
    },[item])
  return (
    <div>
        <input
        className='w-full border-2 border-green-700 rounded'
        value={item}
        placeholder={props.data.name}
        onChange={(e)=>setItem(e.target.value)}
        />
    </div>
  )
}

export default FormAddItem