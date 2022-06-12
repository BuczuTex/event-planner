const PROXY_CONFIG = [
  {
    "/api/": {
      "target": "https://localhost:7290",
      "secure": false,
      "ws": true
    }
  }
]

module.exports = PROXY_CONFIG;
