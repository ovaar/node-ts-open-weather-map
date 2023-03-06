export declare enum OpenWeatherMapApiUnits {
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
export declare class OpenWeatherMapApi {
    options: IOpenWeatherMapApiOptions;
    constructor(options?: IOpenWeatherMapApiOptions);
    byCityName(queryOpts: IByCityNameOptions): Promise<any>;
    forecastByCityName(queryOpts: IByCityNameOptions): Promise<any>;
    dailyForecastByCityName(queryOpts: IByCityNameOptions): Promise<any>;
    byCityId(cityId: number | string): Promise<any>;
    byGeographicCoordinates(latitude: number, longitude: number): Promise<any>;
    forecastByCityId(cityId: number | string): Promise<any>;
    dailyForecastByCityId(cityId: number | string): Promise<any>;
    private getBaseUrl;
}
