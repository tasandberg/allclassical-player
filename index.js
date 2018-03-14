const MPlayer = require('mplayer')
const { exec } = require('child_process')

MPlayer.prototype.quit = function() {
  console.log('Sending quit command')
  this.player.cmd('quit')
}

var player = new MPlayer()

player.on('start', function(args) {
  console.log(args)
})

function notifyStatus(status) {
  if (!status.title) return
  const trackTitle = status.title.split(' - ')
  const composer = trackTitle[0]
  const piece = trackTitle[1]
  const appleScript = `display notification "${composer}" with title "${piece}"`
  exec(`osascript -e '${appleScript}'`)
}

player.on('status', function(status) {
  console.log(status)
  notifyStatus(status)
})

player.on('stop', function(p) {
  console.log('p')
})

player.openFile('http://allclassical-ice.streamguys.com/ac96k', {
  cache: 128,
  cacheMin: 1
})

player.volume(100)

process.on('SIGINT', function() {
  console.log('Exiting...')
  player.stop()
  player.player.instance.kill(2)
})
