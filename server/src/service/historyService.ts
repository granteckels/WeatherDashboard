import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      const data = await fs.readFile('db/searchHistory.json', 'utf-8'); // Read file contents
      return JSON.parse(data); // Parse JSON and return it
    } catch (error) {
      console.error('Error reading file:', error);
      return null; // Return null or a default value in case of an error
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try {
      const data = JSON.stringify(cities, null, 2); // Convert array to formatted JSON
      await fs.writeFile('db/searchHistory.json', data, 'utf-8'); // Write to file
    } catch (error) {
      console.error('Error writing file:', error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const newCity = new City(city, uuidv4());
    const currentCities = await this.getCities();

    const currentCityNames = currentCities.map((city: City) => city.name);
    if(!currentCityNames.includes(newCity.name)) {
      await this.write([...currentCities, newCity]);
    }
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.getCities();
    const updatedCities = cities.filter((city: City) => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
