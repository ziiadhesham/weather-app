const apikey = "4406b3c9db2f4990a0f175409251002";
const searchInput = document.getElementsByTagName("input")[0];
const searchButton = document.getElementsByClassName("search-btn")[0];
const locationElement = document.getElementsByClassName("location")[0];
const tempElement = document.getElementsByClassName("details-grid")[0];
const weather=document.getElementsByClassName("temperature")[0];

searchButton.addEventListener("click", () => {
  const searchQuery = searchInput.value;
  getWeather(searchQuery);
});

function getWeather(searchQuery) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${searchQuery}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => displayError(error));
}

function displayWeather(data) {
  console.log(data);
  
  if (!data || !data.location || !data.current) {
    displayError("Invalid data returned from API");
    return;
  }
  const { name } = data.location;
  const { temp_c, condition } = data.current;
  const description = condition.text;

  weather.innerHTML = `<h3>${temp_c}°C</h3>`;
  weather.style="font-size: 80px;";

  locationElement.innerHTML = `
    <h1>${name}</h1>
    <p>Temperature: ${temp_c}°C</p>
    <p>Condition: ${description}</p>

  `
  tempElement.innerHTML = `
    <div class="detail-item">
      <span>Temp max</span>
      <span>${data.current.temp_max}°C</span>
    </div>
    <div class="detail-item">
      <span>Temp min</span>
      <span>${data.current.temp_min}°C</span>
    </div>
    <div class="detail-item">
      <span>Humidity</span>
      <span>${data.current.humidity}%</span>
    </div>
    <div class="detail-item">
      <span>Cloudy</span>
      <span>${data.current.cloud}%</span>
    </div>
  `
  
}

function displayError(error) {
  locationElement.innerHTML = `<p>Error: ${error.message}</p>`;
}
