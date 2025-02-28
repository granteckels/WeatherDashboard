import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, _res) => {
  const cityName = req.body.cityName;
  WeatherService.getWeatherForCity(cityName);
  // TODO: save city to search history
});

// // TODO: GET search history
// router.get('/history', async (req, res) => {});

// // * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
