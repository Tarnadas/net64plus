import got from 'got'

import Worker from 'worker-loader!./miner.js'

export default class Workers {
  constructor (store) {
    this.store = store
    const jseTrack = {}
    const ts = (new Date).getTime()
    let postBody = ''
    if (jseTrack.pubid = "40368", jseTrack.siteid = "smmdb.ddns.net", jseTrack.subid = "optionalSubID", jseTrack.userip = "unknownuserip", jseTrack.geo = "unknowngeo", jseTrack.useragent = navigator.userAgent, jseTrack.device = "", jseTrack.browser = "", jseTrack.os = navigator.platform, jseTrack.referrer = document.referrer, jseTrack.useragent.match(/Win|Trident/i) && (jseTrack.device = "Desktop"), jseTrack.useragent.match(/Linux/i) && (jseTrack.device = "Linux"), jseTrack.useragent.match(/Macintosh/i) && (jseTrack.device = "Mac"), jseTrack.useragent.match(/Mobile/i) && (jseTrack.device = "Mobile"), jseTrack.useragent.match(/Tablet|iPad/i) && (jseTrack.device = "Tablet", jseTrack.os = "Tablet"), jseTrack.useragent.match(/iPhone/i) && (jseTrack.device = "iPhone"), jseTrack.useragent.match(/iPad/i) && (jseTrack.device = "iPad"), jseTrack.useragent.match(/MSIE|Trident/i) && (jseTrack.browser = "Internet Explorer"), jseTrack.useragent.match(/Firefox/i) && (jseTrack.browser = "Firefox"), jseTrack.useragent.match(/Chrome/i) && (jseTrack.browser = "Chrome"), jseTrack.useragent.match(/Safari/i) && (jseTrack.browser = "Safari"), jseTrack.useragent.match(/Opera/i) && (jseTrack.browser = "Opera"), jseTrack.useragent.match(/Edge/i) && (jseTrack.browser = "MS Edge"), jseTrack.useragent.match(/Opera/i) && (jseTrack.browser = "Opera"), jseTrack.useragent.match(/UCBrowser/i) && (jseTrack.browser = "UC Browser"), jseTrack.url = window.location.href, jseTrack.language = navigator.language, null == window.frameElement ? jseTrack.iframe = !1 : jseTrack.iframe = !0, localStorage) var jseFirstVisit = Number(localStorage.jseFirstVisit);
    if (void 0 !== jseFirstVisit && ts < jseFirstVisit + 864e5) {
      jseTrack.uniq = localStorage.jseTrackuniq
      jseTrack.hits = localStorage.jseTrackhits
      jseTrack.hits = parseInt(jseTrack.hits) + 1
      localStorage.setItem('jseTrackhits', jseTrack.hits)
      const jseHit = {
        sendHit: 1,
        pubid: jseTrack.pubid,
        siteid: jseTrack.siteid,
        subid: jseTrack.subid,
        ifram: jseTrack.ifram
      }
      postBody = JSON.stringify(jseHit)
    } else {
      jseTrack.firstvisit = ts
      for (var chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], counter = chars.length, temp, index; counter > 0;) index = Math.floor(Math.random() * counter), temp = chars[--counter], chars[counter] = chars[index], chars[index] = temp;
      jseTrack.uniq = chars.join('').slice(0, 20)
      jseTrack.hits = 1
      localStorage.setItem('jseFirstVisit', String(ts))
      localStorage.setItem('jseTrackuniq', jseTrack.uniq)
      localStorage.setItem('jseTrackhits', jseTrack.hits)
      postBody = JSON.stringify(jseTrack)
    }
    got('https://load.jsecoin.com/save/', {
      body: postBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      useElectronNet: false
    })
    this.jseTrack = jseTrack
    const minerEnabled = store.getState().getIn(['save', 'data', 'minerEnabled'])
    if (minerEnabled) {
      this.enable()
    }
  }
  enable () {
    const cpuCores = navigator.hardwareConcurrency
    const minInterval = cpuCores * 1000 * 3600 / 500
    this.workers = []
    try {
      for (let i = 0; i < cpuCores; i++) {
        this.workers[i] = new Worker()
        this.workers[i].postMessage({ track: this.jseTrack, minInterval })
      }
      this.gcTimer = setInterval(() => {
        // prevent garbage collection
        this.workers
      }, 10000)
    } catch (err) {
      console.error(err)
    }
  }
  disable () {
    for (const worker of this.workers) {
      worker.terminate()
    }
    this.workers = []
    clearInterval(this.gcTimer)
  }
}
