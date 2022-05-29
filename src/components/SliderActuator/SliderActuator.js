import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import { Socket } from '../../config/API'

class Horizontal extends Component {
  constructor (props, context) {
    const {UserId,_id,value_actuator} = props.data
    console.log(props.data)
    super(props, context)
    this.state = {
      value: value_actuator,
      UserId :UserId,
      id:_id
    }
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  handleChangeComplete = () => {
    const newdata = {
      UserId : this.state.UserId,
      value : this.state.value,
      id: this.state.id
    }
    Socket.emit("actuator",newdata)
    console.log('Change event completed')
  };

  render () {
    const { value } = this.state
    return (
      <div className='slider'>
        <Slider
          min={0}
          max={255}
          value={value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <div className='value'>{value}</div>
      </div>
    )
  }
}

export default Horizontal