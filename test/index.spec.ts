declare let describe: jest.Describe
declare let it: jest.It
declare let expect: jest.Expect

import * as index from '../src/index'

describe('Testing Index', () => {
  it('Should have OpenWeatherMapApi available', () => {
    expect(index.OpenWeatherMapApi).not.toBeNull()
  })
})
