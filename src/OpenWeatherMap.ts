"use strict";

import axios from "axios";
import { URL, URLSearchParams } from "url";

export enum OpenWeatherMapApiUnits {
  Fahrenheit = "imperial",
  Celsius = "metric"
}

export interface IOpenWeatherMapApiOptions {
  apiVersion?: string;
  key: NonNullable<string>;
  temperatureUnit?: OpenWeatherMapApiUnits;
}

export interface IByCityNameOptions {
  name: string;
  countryCode?: string;
}

const BASE_URL = "https://api.openweathermap.org/";
const DEFAULT_API_VERSION = "2.5";
const DEFAULT_UNIT = OpenWeatherMapApiUnits.Celsius;

export class OpenWeatherMapApi {
  public options: IOpenWeatherMapApiOptions;

  constructor(
    options: IOpenWeatherMapApiOptions = {
      apiVersion: DEFAULT_API_VERSION,
      key: "",
      temperatureUnit: DEFAULT_UNIT
    }
  ) {
    if (!options.key.length) {
      throw new Error("Invalid option key!");
    }

    this.options = options;
    this.options.apiVersion = this.options.apiVersion || DEFAULT_API_VERSION;
    this.options.temperatureUnit = this.options.temperatureUnit || DEFAULT_UNIT;
  }

  public async byCityName(queryOpts: IByCityNameOptions): Promise<any> {
    try {
      const params = new URLSearchParams({
        q: [queryOpts.name, queryOpts.countryCode].join(),
        units: this.options.temperatureUnit
      });

      const url = this.getBaseUrl() + "&" + params.toString();
      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw error;
    }
  }

  private getBaseUrl(): URL {
    const params = new URLSearchParams({
      APPID: this.options.key as string
    });

    return new URL(
      `data/${this.options.apiVersion}/weather?${params.toString()}`,
      BASE_URL
    );
  }
}
