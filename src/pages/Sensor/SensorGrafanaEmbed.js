import React,{useState} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'

const SensorGrafanaEmbed = () => {
    const [date,setDate] = useState(new Date(Date.now() - (60000 * 60)).getTime())
    const [INdex,setIndex] = useState(0)
    const dataquery = [
        {name:"30 Menit terahir", value : (60000 * 30)},
        {name:"1 Jam terahir", value : (60000 * 60)},
        {name: "3 Jam terahir", value : (60000 * 60 * 3)},
        {name: "12 Jam terahir", value : (60000 * 60 * 12)},
        {name: "24 Jam terahir", value : (60000 * 60 * 24)},
        {name: "7 Hari terahir", value : (60000 * 60 * 24 * 7)},
        {name: "1 Bulan terahir", value : (60000 * 60 * 24 * 30)},
        {name: "2 Bulan terahir", value : (60000 * 60 * 24 * 30 * 2)},
      ]
    const stayl =(data)=>{
    if(data == INdex){
        return "underline text-green-700 cursor-pointer"
    }else{
        return "underline cursor-pointer"
    }
    }
    const table = [{table:2},{table:4},{table:5},{table:6}]
    return (
        <div>
            <div className="">
                <div className="w-full lg:w-10/12 grid grid-cols-4 gap-5 m-auto pb-10">
                    {dataquery.map((data,index)=>(
                        <div key={index} >
                        <p
                        className={stayl(index)}
                        onClick={()=>{
                            setDate(new Date(Date.now() - data.value).getTime())
                            setIndex(index)
                        }}
                        >{data.name}</p>
                        </div>
                    ))}
                </div>
                {table.map((data,index)=>(
                    <div className="mt-2 border-2 border-green-700 rounded w-full">
                        <iframe className="rounded w-full bg-white h-64"
                        src={`https://grafana.zilog.tech/d-solo/vXoVsCd7k/new-dashboard-copy?orgId=1&from=${date}&to=${new Date()}&theme=light&panelId=${data.table}`}></iframe>
               </div>
                ))}
            </div>
            <div className="mt-2 border-2 border-green-700 rounded w-full">
                <iframe 
                className="rounded w-full bg-white h-64"
                src="https://grafana.zilog.tech/d/vXoVsCd7k/new-dashboard-copy?orgId=1&from=1635130346760&to=1635151946760&theme=light"/>
            </div>
        </div>
    )
}

export default SensorGrafanaEmbed
