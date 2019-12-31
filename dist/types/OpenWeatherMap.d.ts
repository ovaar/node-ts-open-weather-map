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
    private getBaseUrl;
}
