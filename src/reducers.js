const initialState = {
  currentStream: {
    label: '',
    value: ''
  },
  availableStreams: [
    'http://allclassical-ice.streamguys.com/ac96k',
    'http://allclassical-ice.streamguys.com/ac128kmp3'
  ],
  volume: 100,
  recentSongs: []
}

module.exports = function(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  return state
}