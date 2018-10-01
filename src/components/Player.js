import React, { Component } from "react";
import AudioMeta from "./AudioMeta";
import AudioWrapper from "./AudioWrapper";

const Segment = ({ children }) => <div className="uk-margin"> {children} </div>;

function getAudio(url) {
  const audio = new Audio(url);
  return audio;
}

const STREAMS = [
  { label: "ac96k", value: "http://allclassical-ice.streamguys.com/ac96k" },
  {
    label: "ac128k",
    value: "http://allclassical-ice.streamguys.com/ac128kmp3"
  }
];

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStream: STREAMS[0].value,
      player: null
    };
  }

  changeStream = event => {
    this.setState({
      currentStream: event.target.value
    });
  };

  playStream = () => {
    if (this.state.player) {
      console.error("Orphaned player exists");
      return;
    }
    const newPlayer = getAudio(this.state.currentStream);
    newPlayer.play();

    this.setState({
      player: newPlayer
    });
  };

  pauseStream = () => {
    this.state.player.pause();
    this.setState({
      player: null
    });
  };

  render() {
    const { currentStream, player } = this.state;
    const streamOptions = STREAMS.map(({ label, value }) => (
      <option key={label} value={value}>
        {label}
      </option>
    ));
    return (
      <div className="uk-padding">
        <h3> AllClassical Portland 89.9 fm </h3>
        <Segment>
          <button
            className="uk-button uk-button-primary uk-button-small"
            onClick={() => (player ? this.pauseStream() : this.playStream())}
          >
            {" "}
            {player ? "Pause" : "Play"}{" "}
          </button>
        </Segment>
        <Segment>
          <select
            className="uk-select"
            value={currentStream}
            onChange={this.changeStream}
          >
            {streamOptions}
          </select>
        </Segment>
        <Segment>
          <AudioMeta source={currentStream} isPlaying={!!player} />
        </Segment>
        <Segment>
          <input
            className="uk-range"
            type="range"
            value={this.player ? this.player.volume : 0}
            disabled={!this.player}
            onChange={e => console.log(e.target.value)}
          />
        </Segment>
      </div>
    );
  }
}
export default Player;
