import React from 'react'

const Table = ({data}) => {
    const controller=(data,index)=>{
        let result = []
        for(let i = 0;i<data.body.length;i++){
            result.push(
                <td  class="py-3 px-6 text-left whitespace-nowrap">
                    {data.body[i].body[index]}
                </td>
            )
        }

        return result
    }
    return (
        <div>
            <table class="min-w-max w-full table-auto">
                <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            {data.header.map((header,index)=>(
                                 <th class="py-3 px-6 text-left"
                                 key={index}
                                 >{data.header[index]}</th>
                        ))}
                        </tr>
                </thead>
                <tbody class="text-white text-sm font-light">
                        {data.body[0].body.map((x,index)=>(
                            <tr key={index}
                            class="border-b border-gray-200 hover:bg-gray-100 hover:text-green-700"
                            >
                                {controller(data,index)}
                            </tr> 
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table