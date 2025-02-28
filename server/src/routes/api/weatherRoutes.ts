import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const cityName = req.body.cityName;
  const weatherData = await WeatherService.getWeatherForCity(cityName);
  // TODO: save city to search history
  await HistoryService.addCity(cityName);

  res.json(weatherData);
});

// // TODO: GET search history
router.get('/history', async (_req, res) => {
  const searchHistory = await HistoryService.getCities();
  res.json(searchHistory);
});

// // * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, _res, next) => {
  await HistoryService.removeCity(req.params.id)
  next();
});

export default router;
