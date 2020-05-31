[![Build Status](https://travis-ci.org/ovaar/node-ts-open-weather-map.svg?branch=master)](https://travis-ci.org/ovaar/node-ts-open-weather-map)
[![Coverage Status](https://coveralls.io/repos/github/ovaar/node-ts-open-weather-map/badge.svg?branch=master)](https://coveralls.io/github/ovaar/node-ts-open-weather-map?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://img.shields.io/npm/v/node-ts-open-weather-map)](https://www.npmjs.com/package/node-ts-open-weather-map 'View this project on npm')
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/ThomasReynders)

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
    countryCode: 'gb'
  })

  console.log(data)
} catch (error) {
  console.log(error)
}
```

## Installation

```
$ npm i node-ts-open-weather-map
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
