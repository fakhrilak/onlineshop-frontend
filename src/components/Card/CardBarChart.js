import React from "react";

const CardBarChart = (props) => {
  const { value, name, call, satuan, id } = props;
 console.log(id)
  return (
    <>
   
      <div className="relative flex flex-col min-w-0 break-words bg-white h-80 w-full mb-8 shadow-md border-2 border-green-700 mt-2 rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold text-center">
                {call}
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold text-center">
                {name}
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 ">
          {/* Chart */}
          <div className="text-5xl text-center mt-7">
          <p>{value}</p>
          </div>
        </div>
        <div>
            <p
            className="text-xs text-center"
            >{id}</p>
        </div>
      </div>
    </>
  );
}

export default CardBarChart