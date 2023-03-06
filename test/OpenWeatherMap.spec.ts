declare let describe: jest.Describe
declare let it: jest.It
declare let expect: jest.Expect

import axios, { AxiosResponse } from 'axios'
import * as sinon from 'sinon'
import * as sampleDailyForecastData from './sample-london-daily-forecast.json'
import * as sampleForecastData from './sample-london-forecast.json'
import * as sampleWeatherData from './sample-london-weather.json'

import {
  IOpenWeatherMapApiOptions,
  OpenWeatherMapApi,
  OpenWeatherMapApiUnits
} from '../src/OpenWeatherMap'

let sandbox: sinon.SinonSandbox

describe('Testing OpenWeatherMap', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('Should throw an error if the Api key is undefined', () => {
    expect(() => {
      const api = new OpenWeatherMapApi({ key: '' })
    }).toThrowError()
  })

  it('Should throw an error if the Api options are undefined', () => {
    expect(() => {
      const api = new OpenWeatherMapApi(undefined)
    }).toThrowError()
  })

  it('Should set the default Api options successfully', () => {
    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)

    expect(api.options.apiVersion).toBe('2.5')
    expect(api.options.key).toBe('xxx-xxx-xxx')
    expect(api.options.temperatureUnit).toBe(OpenWeatherMapApiUnits.Celsius)
  })

  it('Should set the Api options succesfully', () => {
    const options: IOpenWeatherMapApiOptions = {
      apiVersion: '1.1',
      key: 'xxx-xxx-xxx',
      temperatureUnit: OpenWeatherMapApiUnits.Fahrenheit
    }

    const api = new OpenWeatherMapApi(options)

    expect(api.options.apiVersion).toBe('1.1')
    expect(api.options.key).toBe('xxx-xxx-xxx')
    expect(api.options.temperatureUnit).toBe(OpenWeatherMapApiUnits.Fahrenheit)
  })

  it('Should get the weather byCityName successfully', async () => {
    const expectedUrl =
      'https://api.openweathermap.org/data/1.1/weather?APPID=xxx-xxx-xxx&q=Eindhoven%2Cnl&units=imperial'

    const response: AxiosResponse = {
      config: {},
      data: sampleWeatherData,
      headers: {},
      status: 200,
      statusText: 'success'
    }
    const stub = sandbox.stub(axios, 'get').resolves(response)

    const options: IOpenWeatherMapApiOptions = {
      apiVersion: '1.1',
      key: 'xxx-xxx-xxx',
      temperatureUnit: OpenWeatherMapApiUnits.Fahrenheit
    }

    const api = new OpenWeatherMapApi(options)

    const data = await api.byCityName({
      countryCode: 'nl',
      name: 'Eindhoven'
    })

    sinon.assert.called(stub)
    const call = stub.getCall(0)

    expect(data).toBe(sampleWeatherData)
    expect(call.args[0]).toBe(expectedUrl)
  })

  it('Should throw an error byCityName fails', async () => {
    sandbox.stub(axios, 'get').rejects(new Error('http error'))

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)
    await expect(
      api.byCityName({
        countryCode: 'nl',
        name: 'Eindhoven'
      })
    ).rejects.toThrow('http error')
  })

  it('Should get the forecastByCityName successfully', async () => {
    const expectedUrl =
      'https://api.openweathermap.org/data/2.5/forecast?APPID=xxx-xxx-xxx&q=Eindhoven%2Cnl&units=metric'

    const response: AxiosResponse = {
      config: {},
      data: sampleForecastData,
      headers: {},
      status: 200,
      statusText: 'success'
    }
    const stub = sandbox.stub(axios, 'get').resolves(response)

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)

    const data = await api.forecastByCityName({
      countryCode: 'nl',
      name: 'Eindhoven'
    })

    sinon.assert.called(stub)
    const call = stub.getCall(0)

    expect(data).toBe(sampleForecastData)
    expect(call.args[0]).toBe(expectedUrl)
  })

  it('Should throw an error forecastByCityName fails', async () => {
    sandbox.stub(axios, 'get').rejects(new Error('http error'))

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)

    await expect(
      api.forecastByCityName({
        countryCode: 'nl',
        name: 'Eindhoven'
      })
    ).rejects.toThrow('http error')
  })

  it('Should get the dailyForecastByCityName successfully', async () => {
    const expectedUrl =
      'https://api.openweathermap.org/data/2.5/forecast/daily?APPID=xxx-xxx-xxx&q=Eindhoven%2Cnl&units=metric'

    const response: AxiosResponse = {
      config: {},
      data: sampleDailyForecastData,
      headers: {},
      status: 200,
      statusText: 'success'
    }
    const stub = sandbox.stub(axios, 'get').resolves(response)

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)

    const data = await api.dailyForecastByCityName({
      countryCode: 'nl',
      name: 'Eindhoven'
    })

    sinon.assert.called(stub)
    const call = stub.getCall(0)

    expect(data).toBe(sampleDailyForecastData)
    expect(call.args[0]).toBe(expectedUrl)
  })

  it('Should throw an error dailyForecastByCityName fails', async () => {
    sandbox.stub(axios, 'get').rejects(new Error('http error'))

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)

    await expect(
      api.dailyForecastByCityName({
        countryCode: 'nl',
        name: 'Eindhoven'
      })
    ).rejects.toThrow('http error')
  })

  it('Should get the weather byCityId successfully', async () => {
    const expectedUrl =
      'https://api.openweathermap.org/data/1.1/weather?APPID=xxx-xxx-xxx&id=12345&units=imperial'

    const response: AxiosResponse = {
      config: {},
      data: sampleWeatherData,
      headers: {},
      status: 200,
      statusText: 'success'
    }
    const stub = sandbox.stub(axios, 'get').resolves(response)

    const options: IOpenWeatherMapApiOptions = {
      apiVersion: '1.1',
      key: 'xxx-xxx-xxx',
      temperatureUnit: OpenWeatherMapApiUnits.Fahrenheit
    }

    const api = new OpenWeatherMapApi(options)

    const data = await api.byCityId(12345)

    sinon.assert.called(stub)
    const call = stub.getCall(0)

    expect(data).toBe(sampleWeatherData)
    expect(call.args[0]).toBe(expectedUrl)
  })

  it('Should throw an error byCityId fails', async () => {
    sandbox.stub(axios, 'get').rejects(new Error('http error'))

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)
    await expect(
      api.byCityId(23456)
    ).rejects.toThrow('http error')
  })

  it('Should get the weather byGeographicCoordinates successfully', async () => {
    const latitude = 35
    const longitude = 139

    const expectedUrl =
      `https://api.openweathermap.org/data/1.1/weather?APPID=xxx-xxx-xxx&lat=${latitude}&lon=${longitude}&units=imperial`

    const response: AxiosResponse = {
      config: {},
      data: sampleWeatherData,
      headers: {},
      status: 200,
      statusText: 'success'
    }
    const stub = sandbox.stub(axios, 'get').resolves(response)

    const options: IOpenWeatherMapApiOptions = {
      apiVersion: '1.1',
      key: 'xxx-xxx-xxx',
      temperatureUnit: OpenWeatherMapApiUnits.Fahrenheit
    }

    const api = new OpenWeatherMapApi(options)

    const data = await api.byGeographicCoordinates(latitude, longitude)

    sinon.assert.called(stub)
    const call = stub.getCall(0)

    expect(data).toBe(sampleWeatherData)
    expect(call.args[0]).toBe(expectedUrl)
  })

  it('Should throw an error byGeographicCoordinates fails', async () => {
    sandbox.stub(axios, 'get').rejects(new Error('http error'))

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)
    await expect(
      api.byGeographicCoordinates(35, 139)
    ).rejects.toThrow('http error')
  })

  it('Should get the forecastByCityId successfully', async () => {
    const expectedUrl =
      'https://api.openweathermap.org/data/2.5/forecast?APPID=xxx-xxx-xxx&id=34567&units=metric'

    const response: AxiosResponse = {
      config: {},
      data: sampleForecastData,
      headers: {},
      status: 200,
      statusText: 'success'
    }
    const stub = sandbox.stub(axios, 'get').resolves(response)

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)

    const data = await api.forecastByCityId(34567)

    sinon.assert.called(stub)
    const call = stub.getCall(0)

    expect(data).toBe(sampleForecastData)
    expect(call.args[0]).toBe(expectedUrl)
  })

  it('Should throw an error forecastByCityId fails', async () => {
    sandbox.stub(axios, 'get').rejects(new Error('http error'))

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)

    await expect(
      api.forecastByCityId(45678)
    ).rejects.toThrow('http error')
  })

  it('Should get the dailyForecastByCityId successfully', async () => {
    const expectedUrl =
      'https://api.openweathermap.org/data/2.5/forecast/daily?APPID=xxx-xxx-xxx&id=56789&units=metric'

    const response: AxiosResponse = {
      config: {},
      data: sampleDailyForecastData,
      headers: {},
      status: 200,
      statusText: 'success'
    }
    const stub = sandbox.stub(axios, 'get').resolves(response)

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)

    const data = await api.dailyForecastByCityId(56789)

    sinon.assert.called(stub)
    const call = stub.getCall(0)

    expect(data).toBe(sampleDailyForecastData)
    expect(call.args[0]).toBe(expectedUrl)
  })

  it('Should throw an error dailyForecastByCityId fails', async () => {
    sandbox.stub(axios, 'get').rejects(new Error('http error'))

    const options: IOpenWeatherMapApiOptions = {
      key: 'xxx-xxx-xxx'
    }

    const api = new OpenWeatherMapApi(options)

    await expect(
      api.dailyForecastByCityId(67890)
    ).rejects.toThrow('http error')
  })
})
