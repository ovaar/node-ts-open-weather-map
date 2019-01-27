"use strict";

import axios from "axios";
import { URL, URLSearchParams } from "url";

const BASE_URL = "https://api.openweathermap.org/";

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

export class OpenWeatherMapApi {
  public options: IOpenWeatherMapApiOptions;

  constructor(
    options: IOpenWeatherMapApiOptions = {
      apiVersion: "2.5",
      key: "",
      temperatureUnit: OpenWeatherMapApiUnits.Celsius
    }
  ) {
    if (!options.key.length) {
      throw new Error("Invalid option key!");
    }

    this.options = options;
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
      throw new Error(`OpenWeatherMapApi: ${error.message}`);
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
