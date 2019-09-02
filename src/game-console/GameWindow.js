import React, { Component } from "react";

class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      gamester: "",
      score: 0,
      colors: ["red", "green", "blue", "cyan", "magenta", "pink"],
      card1: "",
      card2: ""
    };
  }

  handleChange = e => {
    console.log(e);
    this.setState({ gamester: e.target.value });
  };

  setUser = () => {
    this.setState({
      username: this.state.gamester
    });
  };

  _handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.setState({
        username: this.state.gamester
      });
    }
  };

  render() {
    {
      return this.state.username ? (
        <div id="game-console" className="col-md-8">
          <div id="game-header">
            <span className="username">
              Welcome <strong>{this.state.username}</strong>
            </span>
            <span> Score: {this.state.score} </span>
            <span> Time Remaining: 10 sec</span>
          </div>
          <div id="color-boxes">
            <h2 id="given-color" className="col-sm-3">
              {
                (this.state.card1 = this.state.colors[
                  Math.floor(
                    Math.random(this.state.colors) * this.state.colors.length
                  )
                ])
              }
            </h2>
            <h2 id="match-color" className="col-sm-3">
              Blue
            </h2>
          </div>
        </div>
      ) : (
        <div id="game-window" className="col-md-8">
          <div id="user">
            <input
              type="text"
              id="user-name"
              className="form-control col-md-8"
              value={this.state.gamester}
              onChange={this.handleChange}
              onKeyDown={e => this._handleKeyDown(e)}
              placeholder="Enter your name"
            />
            <button className="btn btn-primary ml-2" onClick={this.setUser}>
              Start
            </button>
          </div>
        </div>
      );
    }
  }
}

export default GameWindow;
