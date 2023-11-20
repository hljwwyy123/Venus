var Promise = require('promise')

/*
  @usage getMapbox().then(mapbox => ...)
*/

// (void) => Promise[Mapbox]
module.exports = function getMapbox() {

  // (url: String) => Promise[Event]
  function loadLink(url) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      link.addEventListener('error', reject)
      link.addEventListener('load', resolve)
      document.body.appendChild(link)
    })
  }

  // (url: String) => Promise[Mapbox]
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = url
      script.addEventListener('error', reject)
      script.addEventListener('load', () => resolve(getMapbox()))
      document.body.appendChild(script)
    })
  }

  // (void) => Promise[Mapbox]
  function getMapbox() {
    return new Promise((resolve, reject) => {
      if (window.L && window.L.mapbox) {
        resolve(window.L.mapbox)
      } else {
        reject()
      }
    })
  }

  return new Promise(
    (resolve, reject) => getMapbox()
      .then(resolve)
      .catch(() => new Promise.all([
        loadScript('//api.mapbox.com/mapbox.js/v2.3.0/mapbox.js'),
        loadLink('//api.mapbox.com/mapbox.js/v2.3.0/mapbox.css')
      ])
        .then(([as]) => resolve(as))
        .catch(reject)
      )
  )

}