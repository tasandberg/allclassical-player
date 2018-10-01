import React, { Component } from 'react'
import AudioWrapper from './AudioWrapper'
import { ipcMain } from 'electron'

function getAudio(url) {
  const audio = new Audio(url)
  audio.addEventListener('progress', function(p) {
    console.log('Progress', p)
  })

  audio.addEventListener('canplay', function (p) {
    console.log('canplay', p)
  })

  return audio
}

const STREAMS = [
  'http://allclassical-ice.streamguys.com/ac96k',
  'http://allclassical-ice.streamguys.com/ac128kmp3'
]

class Player extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentStream: STREAMS[0],
      player: null
    }
  }

  changeStream = (event) => {
    this.setState({
      currentStream: event.target.value
    })
  }

  playStream = () => {
    if (this.state.player) {
      console.error('Orphaned player exists')
      return
    }
    const newPlayer = getAudio(this.state.currentStream)
    newPlayer.play()

    this.setState({
      player: newPlayer
    })
  }

  pauseStream = () => {
    this.state.player.pause()
    this.setState({ player: null })
  }


  render() {
    const { currentStream, player } = this.state
    return (
      <div className='uk-padding'>
        <h1>AllClassical Portland 89.9fm</h1>
        <button onClick={() => player ? this.pauseStream() : this.playStream()}>
          {player ? 'Pause' : 'Play'}
        </button>
        <select className='uk-select' value={currentStream} onChange={this.changeStream}>
          {STREAMS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
    )
  }
}
export default Player