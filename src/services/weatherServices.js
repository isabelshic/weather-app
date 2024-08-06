const API_KEY = '5613b2ffd545c1bd54b891ddff684560';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=imperial`);
  const data = await response.json();
  return data;
}
