const readline = require('readline');
const MPlayer = require('mplayer');
const { exec } = require('child_process');

var player = new MPlayer();

player.on('start', function(args) {
  console.log(args);
})

function notifyStatus(status) {
  if (!status.title) return
  const trackTitle = status.title.split(' - ')
  const composer = trackTitle[0]
  const piece = trackTitle[1]
  const appleScript = `display notification "${composer}" with title "${piece}"`
  exec(`osascript -e '${appleScript}'`)
}

player.on('status', function (status) {
  notifyStatus(status);

})

player.openFile('http://allclassical-ice.streamguys.com/ac96k', {
  cache: 128,
  cacheMin: 1
})

player.volume(100);

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.sequence === 'Q' || key.ctrl && key.name == 'c') {
    console.log("Exiting...");
    player.stop();
    process.exit();
  } else if (key.name === 'p') {
    player.status.playing ? player.pause() : player.play()
  } else {
    console.log(`You pressed the "${str}" key`);
    console.log();
    console.log(key);
    console.log();
  }
});
console.log('<P>lay/<P>ause <Q>uit');

process.on('SIGINT', function() {
  console.log("Exiting...");
  player.stop();
  process.exit();
})
