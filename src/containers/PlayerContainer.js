import React from 'react'
import { connect } from 'react-redux'
import Player from '../components/Player'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = ({dispatch, ownProps}) => {
  return {}
}

const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(Player)

export default PlayerContainer