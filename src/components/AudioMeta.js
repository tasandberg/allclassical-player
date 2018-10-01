import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import icy from 'icy'

function setStreamInfo () {
  let url = audio.src
  icy.get(url, function (res) {
    // log the HTTP response headers
    console.log(res.headers)
    // log any "metadata" events that happen
    res.on('metadata', function (metadata) {
      const parsed = icy.parse(metadata)
      console.log(parsed)
      streamMeta.innerHTML = JSON.stringify(parsed, null, 2)
    })
  })

  setTimeout(setStreamInfo, 1000)
}

class AudioWrapper extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      currentTitle: null,
      prevTitle: null
    }
  }
  static propTypes = {
    source: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired
  }

  componentDidMount () {
    this.setStreamInfo()
  }

  setStreamInfo () {
    const { source, isPlaying } = this.props
    const { currentTitle } = this.state

    if (!isPlaying) {
      console.log('No player active, aborting metadata request')
    }

    icy.get(source, res => {
      res.on('metadata', metadata => {
        const { StreamTitle } = icy.parse(metadata)
        if (StreamTitle != currentTitle) {
          this.setState({
            currentTitle: StreamTitle
          })
        }
      })
    })
    setTimeout(this.setStreamInfo.bind(this), 200)
  }

  render () {
    const { currentTitle, prevTitle } = this.state

    return (
      <Fragment>
        <p>
          Now Playing: {currentTitle}
        </p>
        <p>
          Previous: {prevTitle}
        </p>
      </Fragment>
    )
  }
}

export default AudioWrapper
