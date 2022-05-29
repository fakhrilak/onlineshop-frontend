import React, { useEffect, useState,useCallback } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { API, BaseURL, config } from '../../config/API'
import { Line,Doughnut ,Bar} from "react-chartjs-2";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from '../../components/Sidebar/Sidebar';
import { connect } from 'react-redux';
import Modal from "../../components/Modal/Modal"
import { useMediaQuery } from 'react-responsive'
import {Socket} from "../../config/API"
const DetailGot = ({match,allkambing}) => {
    const[data,setData] = useState(null)
    const [startDate, setStartDate] = useState(new Date("2021-07-01"));
    const [finishDate,setFinishDate] = useState(new Date());
    const [buyAt,setbuyAt] = useState(new Date())
    const [image,setImage] = useState("")
    const [imagepreview,setImagePreview] = useState(null)
    const [allType,setAllType] = useState([])
    const [type,setType] = useState("")
    const [triger,setTriger] = useState(false)
    const [suplier,setSuplier] = useState([])
    const [tanggalbeli,setTanggalBeli] = useState()
    const [suplierId,setSuplierId] = useState()
    const [dipelihara,setTanggaldipelihara] = useState()
    const [gender,setGender] = useState()
    const [desc,setDesc] = useState("ini kambing apik ")
    const [indukId,setIndukID] = useState()
    const [kambingId,setKambingId] = useState(match.params.id)
    const [modal,setModal] = useState(false)
    const [picture,setPicture] = useState([])
    const [count,setCount] = useState(0)
    const isPortrait = useMediaQuery({ query: '(max-width: 667px)' })

    useEffect(()=>{
        API.get(`id-tag/${kambingId}?start=${dayjs(startDate).format("YYYY-MM-DD")}&finish=${dayjs(finishDate).format("YYYY-MM-DD")}`)
        .then((res)=>{
            setData(res.data.data)
            setPicture(res.data.data.picturs)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },[startDate,finishDate,triger])
    useEffect(()=>{
      if(data){
        Socket.on('ResTakeImage'+data.id_tag,data=>{
          console.log("ada event di ResTakeImage")
        setTriger(!triger)
      })
      }
      
    },[data])
    useEffect(()=>{
      API.get("/class",config)
      .then((res)=>{
            setAllType(res.data.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },[])

    useEffect(()=>{
      API.get("/suplier")
      .then((res)=>{
          setSuplier(res.data.data)
      })
      .catch((err)=>{
          console.log(err)
      })
    },[])

    const imageUpload=(e)=>{
      const file = e.target.files[0]
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
    
    const detailGot = (data,id_tag) => {
        let time = [];
        let value = [];
        for (let i = 0; i < data.length; i++) {
          time.push(dayjs(data[i].createAt).format("MM/DD/YY"));
          value.push(data[i].bb);
        }
        return {
          labels: time,
          datasets: [
            {
              label: "Id Kambing "+ id_tag,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 3,
              data: value,
            },
          ],
        };
      };

      const getDiff=(date)=>{
        const date1 = new Date(date);
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays
      }
    return (
      <div>
              <div className="h-full pt-2 md:ml-64">
                {data? <div>
                  {data.img == ""
                  ?
                  <div className="w-8/12 lg:w-8/12 m-auto pb-40 pt-10">
                    <div className="w-auto pb-10 bg-green-300 rounded text-green-200">
                        <input
                          type="file"
                          onChange={(e)=>imageUpload(e)}
                          className="w-auto pointer-events-auto cursor-pointer text-white"
                          ></input>
                          {image == "" && <div>
                              <span>Please add image to show in investor area</span>
                        </div>}  
                    </div>
                    <div className="w-auto text-center rounded bg-green-300 mt-2">
                        <img src={imagepreview}
                        className="w-10/12 m-auto pt-2 pb-2 rounded"
                        />
                    </div>
                    <div className="w-auto text-center rounded bg-green-300 mt-2">
                        <div className="grid grid-cols-3 gap-5 w-11/12 m-auto">
                            <select
                            className="mt-2 mb-2 rounded h-10 text-green-400 font-medium w-full"
                            onChange={(e)=>setType(e.target.value)}
                            >
                                <option
                                className=""
                                value=""
                                >Select kambing Type</option>
                                {allType.map((data,index)=>(
                                  <option key={index}
                                  value={data._id}
                                  >{data.name} {"   "} {data.kelas}</option>
                                ))}
                            </select>
                            <select
                            className="mt-2 mb-2 rounded h-10 text-green-400 font-medium w-full"
                            onChange={(e)=>setSuplierId(e.target.value)}
                            >
                                <option
                                className=""
                                value=""
                                >Select Suplier</option>
                                {suplier.map((data,index)=>(
                                  <option key={index}
                                  value={data._id}
                                  >{data.name_PT} {"   "} {data.name_suplier}</option>
                                ))}
                            </select>
                            <select
                            className="mt-2 mb-2 rounded h-10 text-green-400 font-medium w-full"
                            onChange={(e)=>setGender(e.target.value)}
                            >
                                <option
                                className=""
                                value=""
                                >Select Gender</option>
                                <option value="jantan">Jantan</option>
                                <option value="betina">Betina</option>
                            </select>
                        </div>
                        <div className="w-11/12 m-auto grid grid-cols-3 gap-2">
                            <div className="w-full mb-2">
                            <p
                            className="font-medium text-green-500"
                            >Tanggal Beli</p>
                            <DatePicker
                            className="rounded text-center font-bold w-full lg:w-full border-2 border-green-500 text-green-500"
                            selected={tanggalbeli} 
                            onChange={(date) => setTanggalBeli(date)} />
                            </div>
                            
                            <div>
                            <p
                            className="font-medium text-green-500"
                            >Tanggal dipelihara</p>
                            <DatePicker
                            className="rounded text-center font-bold w-full lg:w-full border-2 border-green-500 text-green-500"
                            selected={dipelihara} 
                            onChange={(date) => setTanggaldipelihara(date)} />
                            </div>
                            <div>
                              <p
                              className="font-medium text-green-500"
                              >Induk ID</p>
                              <input
                              className="rounded text-center font-bold w-full lg:w-full border-2 border-green-500 text-green-500"
                              placeholder="Induk ID"
                              value={indukId}
                              onChange={(e)=>setIndukID(e.target.value)}
                              />
                            </div>
                        </div>
                        <div className="pb-2 w-11/12 m-auto">
                          <textarea
                          className="w-full rounded"
                          placeholder="DESC KAMBING"
                          value={desc}
                          onChange={(e)=>setDesc(e.target.value)}
                          />
                        </div>
                    </div>
                    
                    {imagepreview && <div className="pt-10">
                       <button className="bg-green-300 w-20 text-white h-10 rounded"
                       onClick={()=>{
                        const newdata = new FormData()
                        if(suplierId.length <= 3 || tanggalbeli.length <= 3 || dipelihara.length<=3 ||desc.length <=3||
                          gender.length <=3){
                            alert("Lengkapi fiel dengan benar")
                        }else{
                          newdata.append("idTag",data.id_tag)
                          newdata.append("file",image)
                          newdata.append("type",type)
                          newdata.append('suplier',suplierId)
                          newdata.append("beli",tanggalbeli)
                          newdata.append("pelihara",dipelihara)
                          newdata.append("desc",desc)
                          newdata.append('gender',gender)
                          newdata.append('indukId',indukId)
                          API.post("/web/kambing-img",newdata,config)
                          .then((res)=>{
                            alert(res.data.message)
                            setTriger(!triger)
                          })
                          .catch((err)=>{
                            alert(err)
                          })   
                        }
                      }}
                       >Upload</button>
                       <button className="bg-green-300 w-20 text-white h-10 rounded ml-5"
                       onClick={()=>{
                        setImage("")
                        setImagePreview(null) 
                       }}
                       >Delet</button>
                    </div>}
                   
                  </div>
                  :<div className="w-11/12 lg:w-8/12 m-auto pb-10 pt-10">
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4 rounded ">
                           <div className="bg-green-300 lg:bg-white w-full rounded-t-xl">
                              {isPortrait ? <div className="mt-10"/>:null}
                              <div className="w-4/6 text-center bg-gradient-to-r font-bold from-green-100 shadow-2xl to-green-300 rounded m-auto">
                                <p className="text-xl text-gray-700 font-bold">PROFILE KAMBING</p>
                              </div>
                              <div className="mt-10"/>
                              <img src={BaseURL+'/single/'+picture[count]}
                              className="w-4/6 rounded h-80 m-auto shadow-2xl"
                              />
                              <Modal
                              show={modal} 
                              handleshow={setModal}
                              heigh={"4/6"} 
                              width={"5/12"}
                              top={36}
                              >
                                <div className="w-10/12 m-auto text-center">
                                  <p className="text-bolder">Upload More Foto</p>
                                  <div className="border-1 border-green-300">
                                    <input
                                    type="file"
                                    onChange={(e)=>imageUpload(e)}
                                    className="w-auto pointer-events-auto cursor-pointer text-white"
                                    ></input>
                                  </div>
                                  <div className="w-auto text-center rounded mt-2">
                                    <img src={imagepreview}
                                    className="w-6/12 h-6/12 m-auto pt-2 pb-2 rounded"
                                    />
                                  </div>                               
                                  <div className="grid grid-cols-2 gap-2">
                                    <button onClick={()=>{
                                      setImagePreview(null) 
                                      setImage(null)}} className="w-full bg-red-400 rounded">Delet</button>
                                    <button className="bg-green-300 rounded"
                                    onClick={()=>{
                                      let newdata = new FormData()
                                      newdata.append("id",kambingId)
                                      newdata.append("file",image)
                                      API.post("/foto-col",newdata,config)
                                      .then((res)=>{
                                        alert(res.data.message)
                                        setModal(false)
                                        setTriger(!triger)
                                        
                                      })
                                      .catch((err)=>{
                                        alert(err)
                                      }) 
                                    }}
                                    >Upload</button>
                                  </div>
                                  
                                </div>
                              </Modal>
                              <div className="mt-2"/>
                              <div className="bg-green-400 w-4/6 mt-2 rounded-b m-auto">
                                <button className="w-full font-bolder"
                                onClick={()=>setModal(true)}
                                >Upload More</button>
                              </div>
                              <div className="mt-2"/>
                              <div className=" w-4/6 rounded m-auto grid grid-cols-2 gap-4">
                                {count != 0 ? <button className="w-full font-bolder bg-green-400"
                                onClick={()=>{
                                  if(count != 0){
                                    setCount(count-1)
                                  }
                                }}
                                >BACK</button> : <button className="w-full"></button>}
                                {picture.length > 0 && count != picture.length-1 ?<button className="w-full font-bolder bg-green-400"
                                onClick={()=>{
                                  if(picture.length > 0 && count != picture.length-1){
                                    setCount(count+1)
                                  }
                                }}
                                >NEXT</button>: <button className="w-full"></button>}
                              </div>
                              {isPortrait ? <div className="mt-20"/>:null}
                          </div>
                          <div className="bg-white rounded-t-2xl border-l-2 lg:border-0 border-r-2 border-t-2 border-green-200" style={{position:"relative",top:"-40px"}}>
                            <div className="mt-5"/>
                            <div className="w-11/12 border-0 m-auto border-gray-400 rounded mt-2 grid grid-cols-2  bg-gradient-to-r from-green-100 shadow-2xl to-green-300">
                              <p className="text-left ml-2">Start</p>
                              <p><strong>{dayjs(data.createAt).format('dddd, MMMM D,YYYY') }</strong></p>
                            </div>
                            <div className="mt-3"/>
                            <div className="w-11/12 border-0 m-auto border-gray-400 rounded mt-2 grid grid-cols-2 bg-gradient-to-r from-green-100 shadow-2xl to-green-300">  
                              <p className="text-left ml-2">Status</p>
                              <p><strong>{data.status}</strong></p>                              
                            </div>
                            <div className="mt-3"/>
                            <div className="w-11/12 border-0 m-auto border-gray-400 rounded mt-2 grid grid-cols-2 bg-gradient-to-r from-green-100 shadow-2xl to-green-300">
                              <p className="text-left ml-2">Tipe</p>
                              <p><strong>{data.type.name}</strong></p>
                            </div>
                            <div className="mt-3"/>
                            <div className="w-11/12 border-0 m-auto border-gray-400 rounded mt-2 grid grid-cols-2 bg-gradient-to-r from-green-100 shadow-2xl to-green-300">
                              <p className="text-left ml-2">Kelas</p>
                              <p><strong>{data.type.kelas}</strong></p>
                            </div>
                            <div className="mt-3"/>
                            <div className="w-11/12 border-0 m-auto border-gray-400 rounded mt-2 grid grid-cols-2 bg-gradient-to-r from-green-100 shadow-2xl to-green-300">
                              <p className="text-left ml-2">Harga</p>
                              <p><strong>{data.type.harga}</strong>/kg</p>
                            </div>
                            {data.ket ? <>
                            <div className="mt-3"/>
                            <div className="w-11/12 border-0 m-auto border-gray-400 rounded mt-2 grid grid-cols-2 bg-gradient-to-r from-green-100 shadow-2xl to-green-300">
                              <p className="text-left ml-2">Dipelihara</p>
                              <p> <strong>{dayjs(data.ket.pelihara).format('dddd, MMMM D, YYYY') }</strong></p>
                            </div>
                            <div className="mt-3"/>
                            <div className="w-11/12 border-0 m-auto border-gray-400 rounded mt-2 grid grid-cols-2 bg-gradient-to-r from-green-100 shadow-2xl to-green-300">
                              <p className="text-left ml-2">Lama dipelihara </p>
                              <p><strong>{getDiff(data.ket.pelihara)}</strong>{" "}hari</p>
                            </div>
                            <div className="mt-3"/>
                            <div className="w-11/12 border-0 m-auto border-gray-400 rounded mt-2 grid grid-cols-2 bg-gradient-to-r from-green-100 shadow-2xl to-green-300">
                              <p className="text-left ml-2">Gender </p>
                              <p><strong>{data.ket.gender}</strong></p>
                            </div>
                            </>:null}                           
                          </div>
                          
                        </div>
                        {data.ket ?
                        <div  className="w-full border-0 border-gray-400 mb-8 rounded mt-2 lg:mt-5 bg-gradient-to-r from-green-100 shadow-2xl to-green-300">
                            <div className="lg:mt-5"/>
                            <div>
                              <p className="font-bold text-left ml-2">DESCRIPTION</p>
                            </div>
                            <p className="text-left ml-2">{data.ket.desc}</p>
                          </div>:null}                         
                  </div>}
                </div>:null}
              <div className="w-11/12 lg:w-8/12 m-auto text-center rounded-lg bg-gradient-to-r font-bold from-green-100 shadow-2xl to-green-300">
                  <p className="text-xl text-gray-700 font-bold">LIFE RECORD KAMBING</p>
              </div>
              <div className="w-11/12 lg:w-8/12 m-auto pt-10 rounded-lg grid grid-cols-2 lg:grid-cols-4 pb-4">           
                  <div className="w-8/12 mb-10 text-center m-auto">
                      <p
                      className="font-medium text-green-500"
                      >Start Date</p>
                      <DatePicker
                      className="rounded text-center font-bold w-full lg:w-full border-2 border-green-500 text-green-500"
                      selected={startDate} 
                      onChange={(date) => setStartDate(date)} />
                  </div>
                  <div className="w-8/12 mb-10 text-center m-auto">
                      <p
                      className="font-medium text-green-500"
                      >To Date</p>
                      <DatePicker
                      className="rounded text-center font-bold w-full lg:w-full border-2 border-green-500 text-green-500"
                      selected={finishDate} 
                      onChange={(date) => setFinishDate(date)} />
                  </div>
              </div> 
              <div
              className="w-11/12 lg:w-8/12 m-auto bg-white rounded-lg"
              >
                  {data ? 
                      <div className="mt-10 rounded-lg bg-gradient-to-r font-bold from-green-10">
                          <div>
                              <Line
                                data={detailGot(data.bb,data.id_tag)}
                                options={{
                                  maintainAspectRatio: false,
                                  responsive: true,
                                  pointRadius: 0,
                                  legend: {
                                    display: false,
                                  },
                                  tooltips: {
                                    callbacks: {
                                      label: function (tooltipItem) {
                                        return tooltipItem.yLabel;
                                      },
                                    },
                                  },
                                  legend: {
                                    label: {
                                      fontColor: "#2e8080",
                                    },
                                    align: "end",
                                    position: "bottom",
                                  },
                                  tooltips: {
                                    mode: "index",
                                    intersect: false,
                                  },
                                  lineHeightAnnotation: {
                                    always: true,
                                    hover: true,
                                    lineWeight: 1.5,
                                  },
                                  animation: {
                                    duration: 2000,
                                  },
                                  scales: {
                                    yAxes: [
                                      {
                                        ticks: {
                                          autoSkip: true,
                                          maxTicksLimit: 10,
                                          beginAtZero: true,
                                        },
                                        gridLines: {
                                          display: false,
                                        },
                                      },
                                    ],
                                    xAxes: [
                                      {
                                        type: "time",
                                        distribution: "linear",
                                      },
                                    ],
                                  },
                                }}
                              />
                          </div>
                          <div
                          className="w-full mt-10"
                          >
                              <Bar data={detailGot(data.bb,data.id_tag)}
                              
                              />
                          </div>
                  </div>:
                  <div>Loading...</div>}
              </div>
        </div>
        </div>


    )
}
const mapStateToProps = (state) => ({
 allkambing : state.kambing.kambings
});
export default connect(mapStateToProps, {})(DetailGot);
