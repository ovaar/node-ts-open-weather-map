'use strict'

import axios from 'axios'
import { URL, URLSearchParams } from 'url'

enum OpenWeatherMapApiDataType {
  Weather = 'weather',
  Forecast = 'forecast',
  DailyForecast = 'forecast/daily'
}

export enum OpenWeatherMapApiUnits {
  Fahrenheit = 'imperial',
  Celsius = 'metric'
}

export interface IOpenWeatherMapApiOptions {
  apiVersion?: string
  key: NonNullable<string>
  temperatureUnit?: OpenWeatherMapApiUnits
}

export interface IByCityNameOptions {
  name: string
  countryCode?: string
}

const BASE_URL = 'https://api.openweathermap.org/'
const DEFAULT_API_VERSION = '2.5'
const DEFAULT_UNIT = OpenWeatherMapApiUnits.Celsius

export class OpenWeatherMapApi {
  public options: IOpenWeatherMapApiOptions

  constructor(
    options: IOpenWeatherMapApiOptions = {
      apiVersion: DEFAULT_API_VERSION,
      key: '',
      temperatureUnit: DEFAULT_UNIT
    }
  ) {
    if (!options.key.length) {
      throw new Error('Invalid option key!')
    }

    this.options = options
    this.options.apiVersion = this.options.apiVersion || DEFAULT_API_VERSION
    this.options.temperatureUnit = this.options.temperatureUnit || DEFAULT_UNIT
  }

  public async byCityName(queryOpts: IByCityNameOptions): Promise<any> {
    try {
      const params = new URLSearchParams({
        q: [queryOpts.name, queryOpts.countryCode].join(),
        units: this.options.temperatureUnit
      })

      const url =
        this.getBaseUrl(OpenWeatherMapApiDataType.Weather) +
        '&' +
        params.toString()
      const { data } = await axios.get(url)

      return data
    } catch (error) {
      throw error
    }
  }

  public async forecastByCityName(queryOpts: IByCityNameOptions): Promise<any> {
    try {
      const params = new URLSearchParams({
        q: [queryOpts.name, queryOpts.countryCode].join(),
        units: this.options.temperatureUnit
      })

      const url =
        this.getBaseUrl(OpenWeatherMapApiDataType.Forecast) +
        '&' +
        params.toString()
      const { data } = await axios.get(url)

      return data
    } catch (error) {
      throw error
    }
  }

  public async dailyForecastByCityName(queryOpts: IByCityNameOptions): Promise<any> {
    try {
      const params = new URLSearchParams({
        q: [queryOpts.name, queryOpts.countryCode].join(),
        units: this.options.temperatureUnit
      })

      const url =
        this.getBaseUrl(OpenWeatherMapApiDataType.DailyForecast) +
        '&' +
        params.toString()
      const { data } = await axios.get(url)

      return data
    } catch (error) {
      throw error
    }
  }

  public async byCityId(cityId: number | string): Promise<any> {
    try {
      const params = new URLSearchParams({
        id: cityId.toString(),
        units: this.options.temperatureUnit
      })

      const url =
        this.getBaseUrl(OpenWeatherMapApiDataType.Weather) +
        '&' +
        params.toString()
      const { data } = await axios.get(url)

      return data
    } catch (error) {
      throw error
    }
  }

  public async byGeographicCoordinates(latitude: number, longitude: number): Promise<any> {
    try {
      const params = new URLSearchParams({
        lat: latitude.toString(),
        lon: longitude.toString(),
        units: this.options.temperatureUnit
      })

      const url =
        this.getBaseUrl(OpenWeatherMapApiDataType.Weather) +
        '&' +
        params.toString()
      const { data } = await axios.get(url)

      return data
    } catch (error) {
      throw error
    }
  }

  public async forecastByCityId(cityId: number | string): Promise<any> {
    try {
      const params = new URLSearchParams({
        id: cityId.toString(),
        units: this.options.temperatureUnit
      })

      const url =
        this.getBaseUrl(OpenWeatherMapApiDataType.Forecast) +
        '&' +
        params.toString()
      const { data } = await axios.get(url)

      return data
    } catch (error) {
      throw error
    }
  }

  public async dailyForecastByCityId(cityId: number | string): Promise<any> {
    try {
      const params = new URLSearchParams({
        id: cityId.toString(),
        units: this.options.temperatureUnit
      })

      const url =
        this.getBaseUrl(OpenWeatherMapApiDataType.DailyForecast) +
        '&' +
        params.toString()
      const { data } = await axios.get(url)

      return data
    } catch (error) {
      throw error
    }
  }

  private getBaseUrl(type: OpenWeatherMapApiDataType): URL {
    const params = new URLSearchParams({
      APPID: this.options.key as string
    })

    return new URL(
      `data/${this.options.apiVersion}/${type}?${params.toString()}`,
      BASE_URL
    )
  }
}
