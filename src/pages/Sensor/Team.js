import React from "react"

class Team extends React.Component {
  state = {
    betValue: 100
  };

  handleOnChange = e => {
    this.setState({
      betValue: e.target.value
    });
  };

  handleOnClick = () => {
    this.props.betOnTeam(this.state.betValue, this.props.id);
  };

  render() {
    const { id } = this.props;
    const { betValue } = this.state;
    return (
      <div key={id}>
        <input
          type="number"
          min="100"
          max="5000"
          value={betValue}
          onChange={this.handleOnChange}
        />
        <button onClick={this.handleOnClick} type="button">
          Bet
        </button>
      </div>
    );
  }
}

export default Team;