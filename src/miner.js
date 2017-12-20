let currentBlock = {}
let hashRate = 500
let hps = 500
let jseTrack = {}
let lastRequestTime = 0
let minInterval = 12e3
const jseLoadServer = "https://load.jsecoin.com"

function jseTrackAjaxPost(url, req, callback) {
  var lookup = "o=" + encodeURIComponent(req);
  const xmlhttp2 = new XMLHttpRequest
  xmlhttp2.onreadystatechange = () => {
    4 == xmlhttp2.readyState && 200 == xmlhttp2.status && callback(xmlhttp2.responseText)
  }
  xmlhttp2.open("POST", url, !0), xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xmlhttp2.send(lookup)
}

function startNewBlock() {
  lastRequestTime = 0 === lastRequestTime
    ? 1
    : (new Date).getTime()
  jseTrackAjaxPost (jseLoadServer + "/request/", "1", response => {
    currentBlock = JSON.parse(response)
		console.log('JSE. hp/s: ' + hps);
    jseMine()
  })
}

const encoder = new TextEncoder("utf-8")

function cryptoSha256(str, nonce) {
  var buffer = encoder.encode(str);
  return crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
    return hex(hash) + "," + nonce
  })
}

function hex(buffer) {
  for (var hexCodes = [], view = new DataView(buffer), i = 0; i < view.byteLength; i += 4) {
    var paddedValue = ("00000000" + view.getUint32(i).toString(16)).slice(-8);
    hexCodes.push(paddedValue)
  }
  return hexCodes.join("")
}

function processHash(hashNonce, difficulty, jseTrack) {
  if (hashNonce.substr(0, difficulty) === "0".repeat(difficulty)) {
    const hashSplit = hashNonce.split(",")
    const hash = hashSplit[0]
    const nonce = hashSplit[1]
		console.log('JSE. Found Hash: ' + hash);
    const submission = {
      blockID: currentBlock.blockID,
      hash,
      nonce: nonce.toString(),
      pubid: jseTrack.pubid,
      siteid: jseTrack.siteid,
      subid: jseTrack.subid,
      uniq: jseTrack.uniq
    }
    jseTrackAjaxPost(jseLoadServer + "/submit/", JSON.stringify(submission), response => {})
    return true
  }
  return false
}

async function jseMine () {
  try {
    const difficulty = currentBlock.difficulty
    const targetText = JSON.stringify(currentBlock)
    const startNumber = Math.floor(9999999999 * Math.random())
    const hashingStarted = (new Date).getTime()
    let x = startNumber
    for (; x <= startNumber + hashRate; x++) {
      const targetTextWithNonce = targetText.split("*nonce*").join(x)
      const hash = await cryptoSha256(targetTextWithNonce, x)
      if (processHash(hash, difficulty, jseTrack)) {
        break
      }
    }
    setTimeout(() => {
      try {
        const hashingFinished = (new Date).getTime()
        const hashesCompleted = x - startNumber
        const hashingSeconds = (hashingFinished - hashingStarted) / 1e3
        hps = Math.floor(hashesCompleted / hashingSeconds)
        if ((hashRate = 1.1 * hps) < 25) (hashRate = 25)
        const tmpDate = (new Date).getTime()
        tmpDate > currentBlock.startTime + 2 * currentBlock.frequency + 3e3 && tmpDate > lastRequestTime + minInterval
          ? startNewBlock()
          : jseMine()
      } catch (err) {
        console.error(err)
        startNewBlock()
      }
    }, 850)
  } catch (err) {
    console.error(err)
  }
}

onmessage = e => {
  if (e.data.track) jseTrack = e.data.track
  if (e.data.minInterval) minInterval = e.data.minInterval
  startNewBlock()
}

onerror = err => {
  console.error(err)
}
