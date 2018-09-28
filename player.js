const MPlayer = require('mplayer')
const { exec } = require('child_process')
const pastSongs = []

MPlayer.prototype.quit = function() {
  console.log('Sending quit command')
  this.player.cmd('quit')
}

var player = new MPlayer()

function notifyStatus(status) {
  if (!status.title) return
  const trackTitle = status.title.split(' - ')
  const composer = trackTitle[0]
  const piece = trackTitle[1]
  const appleScript = `display notification "${composer}" with title "${piece}"`
  exec(`osascript -e '${appleScript}'`)
}

function logSong(song) {
  if (!song) return false
  pastSongs.unshift({ date: new Date(), title: song })
  return true
}

function ljust(string, width, padding) {
	padding = padding || " ";
	padding = padding.substr( 0, 1 );
	if ( string.length < width )
		return string + padding.repeat( width - string.length );
	else
		return string;
}

function printMenu(status) {
  let menu = "89.9 Allclassical Portland\n-------------\n"
  menu += "Stream: " + status.filename
  menu += "Title: " + status.title
  menu += "\n"
  menu += "Recent Songs\n-------------\n"
  for (let i = 1; i < 11; i++) {
    let song = pastSongs[i-1]
    if (!song) continue
    menu += ljust(`${i}. `, 4)
    menu += song.date + " -- " + song.title + "\n"
  }
  process.stdout.write('');
  process.stdout.write(menu);
}

player.on('status', function(status) {
  if (logSong(status.title)) {
    printMenu(status)  
    notifyStatus(status)
  }
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
