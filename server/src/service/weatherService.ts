import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
// TODO: Define a class for the Weather object
class Weather {
  date: string;
  temp: number;
  humidity: number;
  wind: number;
  condition: string;

  constructor(
    date: string,
    temp: number,
    humidity: number,
    wind: number,
    condition: string
  ) {
    const [year, month, day] = date.split('-');
    this.date = `${+month}/${+day}/${year}`;
    this.temp = temp;
    this.humidity = humidity;
    this.wind = wind;
    this.condition = condition;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseUrl: string = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}&units=imperial';
  APIKey: string = '1b03ef8fe8dcb6c4d65f6ab70667bc38';
  cityName: string = 'San Diego'; // Default city

  constructor() {
    this.baseUrl = this.baseUrl.replace('{API key}', this.APIKey);
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const locationData = await response.json();
      return locationData;
    } catch (error: any) {
      console.error(error.message);
    }
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&appid=${this.APIKey}`
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { latitude, longitude } = coordinates;
    return this.baseUrl.replace('{lat}', latitude.toString()).replace('{lon}', longitude.toString());
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return { latitude: locationData[0].lat, longitude: locationData[0].lon }
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const weatherData = await response.json();
      return this.parseCurrentWeather(weatherData);
    } catch (error: any) {
      console.error(error.message);
      return [];
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const firstDayWeather = response.list[0];
    const nextFiveDaysWeather = response.list.filter((item: any) => item.dt_txt.endsWith('00:00:00'));
    const weatherData = [firstDayWeather, ...nextFiveDaysWeather];

    return weatherData.map(day => ({
      date: day.dt_txt.slice(0,10),
      temp: day.main.temp,
      humidity: day.main.humidity,
      wind: day.wind.speed,
      condition: day.weather[0].main
    }))
  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;

    const coordinates = await this.fetchAndDestructureLocationData();
    const parsedWeatherData = await this.fetchWeatherData(coordinates);
    const weatherData = parsedWeatherData.map(day => (new Weather(
      day.date, day.temp, day.humidity, day.wind, day.condition
    )))
    console.log(weatherData);
  }
}

export default new WeatherService();
