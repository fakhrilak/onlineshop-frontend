

export const halperNodes=(data,tipe,image)=>{
    let label = ""
    if(tipe == "perent"){
        label = "ID " + data[0].id_tag + " X " + "ID " +data[1].id_tag 
    }else{
        label = "ID " + data.id_tag
    }
    return {
        "id": tipe,
        "x": 100,
        "y": 100,
        "data": {
          "type": "user"
        },
        "style": {
          "label": {
            "value": label
          },
          "keyshape": {
            "size": 50,
            "stroke": "#FF6A00",
            "fill": "#FF6A00",
            "fillOpacity": 0.2,
            "strokeOpacity": 1
          },
          "icon":{
            "type": "image",
            "value": image,
            "size": [50,50],
            "clip": {
                r: 25,
              },
            "stroke": "#46a7a6",
            "fill": "#46a7a6",
            "fillOpacity": 0.2,
            "strokeOpacity": 1
        }
        }
      }
}
export const halperEdges=(index)=>{
    return {
        "source": "perent",
        "target": "child-"+index,
        "style": {
            "keyshape": {
              "lineDash": [
                8,
                2
              ],
              "stroke": "#FF6A00"
            },
            "label": {
              "value": "Anak ke "+index,
              "fill": "#FF6A00"
            }
          }
      }
}