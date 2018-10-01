import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class AudioWrapper extends PureComponent {
  static propTypes = {
    source: PropTypes.string.isRequired
  }
  render() {
    const source = this.props

    return (
      <audio src={source}></audio>
    )
  }
}

export default AudioWrapper