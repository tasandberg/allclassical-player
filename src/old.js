const icy = require('icy')
const streams = [
  'http://allclassical-ice.streamguys.com/ac96k',
  'http://allclassical-ice.streamguys.com/ac128kmp3'
]

{
  currentStream: { label: '', value: ''},
  availableStreams: [],
  volume: 100,
  recentSongs: []
}
const streamSelect = document.getElementById('streamSelect')
streams.forEach((s) => {
  const opt = document.createElement('option')
  opt.text = s
  streamSelect.add(opt)
})

const streamMeta = document.getElementById('streamMeta')
streamSelect.addEventListener('change', (e) => {
  audio.src = e.target.value
})

const audio = new Audio()
audio.src = streamSelect.value

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

setStreamInfo()

playBtn.addEventListener('click', () => audio.play())

stopBtn.addEventListener('click', () => {
  audio.pause()
  audio.currentTime = 0
})
