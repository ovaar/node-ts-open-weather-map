import test from "ava";
import * as index from "../src/index";

test("Should have OpenWeatherMapApi available", t => {
  t.truthy(index.OpenWeatherMapApi);
});
