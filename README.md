[![Coverage Status](https://coveralls.io/repos/github/ninox92/node-ts-open-weather-map/badge.svg?branch=master)](https://coveralls.io/github/ninox92/node-ts-open-weather-map?branch=master)
[![Build Status](https://travis-ci.org/ninox92/node-ts-open-weather-map.svg?branch=master)](https://travis-ci.org/ninox92/node-ts-open-weather-map)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

> Simplified OpenWeatherMap API client

<p align="center">
  <a href="#example">Example</a> •
  <a href="#key-features">Installation</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a> •
  <a href="#donations">Donations</a>
</p>


## Example

```javascript
try {
  const { OpenWeatherMapApi } = require('node-ts-open-weather-map')
  const openWeatherMapApi = new OpenWeatherMapApi({
    key: process.env.OpenWeatherMapApiKey
  })

  const data = await openWeatherMapApi.byCityName({
    name: 'London',
    countyCode: 'gb'
  })

  console.log(data)
} catch (error) {
  console.log(error)
}
```

## Installation

```
$ npm i -s https://github.com/ninox92/node-ts-open-weather-map
```

## Credits

This software uses the following open source packages:

- [Axios](https://github.com/axios/axios)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)

## License

MIT

## Donations

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/btVGTv4zM)