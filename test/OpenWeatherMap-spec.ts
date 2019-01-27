import ava, { TestInterface } from "ava";
import axios, { AxiosResponse } from "axios";
import * as sinon from "sinon";
import * as sampleData from "./sample-london.json";

import {
  OpenWeatherMapApiUnits,
  IOpenWeatherMapApiOptions,
  IByCityNameOptions,
  OpenWeatherMapApi
} from "../src/OpenWeatherMap";

interface TestContext {
  sandbox: sinon.SinonSandbox;
}

const test = ava as TestInterface<TestContext>;

test.before(t => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach(t => {
  t.context.sandbox.restore();
});

test("Should throw an error if the Api key is undefined", t => {
  t.throws(() => {
    new OpenWeatherMapApi({ key: "" });
  });
});

test("Should set the Api options succesfully", t => {
  const options: IOpenWeatherMapApiOptions = {
    key: "xxx-xxx-xxx",
    apiVersion: "1.1",
    temperatureUnit: OpenWeatherMapApiUnits.Fahrenheit
  };

  const api = new OpenWeatherMapApi(options);

  t.is(api.options.apiVersion, "1.1");
  t.is(api.options.key, "xxx-xxx-xxx");
  t.is(api.options.temperatureUnit, OpenWeatherMapApiUnits.Fahrenheit);
});

test.serial("Should get the weather byCityName successfully", async t => {
  const expectedUrl =
    "https://api.openweathermap.org/data/1.1/weather?APPID=xxx-xxx-xxx&q=Eindhoven%2Cnl&units=imperial";

  const response: AxiosResponse = {
    config: {},
    data: sampleData,
    status: 200,
    statusText: "success",
    headers: {}
  };
  const stub = t.context.sandbox.stub(axios, "get").resolves(response);

  const options: IOpenWeatherMapApiOptions = {
    key: "xxx-xxx-xxx",
    apiVersion: "1.1",
    temperatureUnit: OpenWeatherMapApiUnits.Fahrenheit
  };

  const api = new OpenWeatherMapApi(options);

  const data = await api.byCityName({
    countryCode: "nl",
    name: "Eindhoven"
  } as IByCityNameOptions);

  sinon.assert.called(stub);
  const call = stub.getCall(0);
  t.is(data, sampleData);
  t.is(call.args[0], expectedUrl);
});

test.serial("Should throw an error byCityName fails", async t => {
  t.context.sandbox.stub(axios, "get").rejects(new Error("http error"));

  const options: IOpenWeatherMapApiOptions = {
    key: "xxx-xxx-xxx",
    apiVersion: "1.1",
    temperatureUnit: OpenWeatherMapApiUnits.Fahrenheit
  };

  const api = new OpenWeatherMapApi(options);

  await t.throwsAsync(
    api.byCityName({
      countryCode: "nl",
      name: "Eindhoven"
    } as IByCityNameOptions),
    { message: "OpenWeatherMapApi: http error" }
  );
});
