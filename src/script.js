const UiContainer = document.querySelector(".divContainer");
const search_btn = document.querySelector(".search-btn");
const userInput = document.querySelector(".User-Input");
const main_title = document.querySelector(".title");
const forecast_btn = document.querySelector(".forecast-btn");
const forecast_container = document.querySelector(".forecastContainer");

forecast_btn.remove();

function api(forecast) {
  if (userInput.value == "") return;
  const value = userInput.value;
  const replace = value.textContent;

  let weatherApi =
    "https://api.openweathermap.org/data/2.5/weather?q={city}&appid=a620594034162ca21018136f97029a4f&units=metric";

  let weatherForecastApi =
    "https://api.openweathermap.org/data/2.5/forecast?q={city}&appid=a620594034162ca21018136f97029a4f&units=metric";

  if (forecast === true) {
    let url = weatherForecastApi.replace("{city}", value);
    return url;
  } else {
    let url = weatherApi.replace("{city}", value);
    return url;
  }
}

async function fetchData(link) {
  try {
    const rawData = await fetch(link);
    const data = await rawData.json();
    if (data.cod == 404) return alert("Invaild city name");
    return data;
  } catch (error) {
    alert("Failed");
  }
}

async function renderUi(result) {
  const temp = Math.round(result.main.temp);

  forecast_container.innerHTML = "";
  UiContainer.innerHTML = "";
  main_title.textContent = "";

  UiContainer.innerHTML = `<div class="ui-container flex flex-col justify-center items-center pb-6"> 
    <img class="icon h-40 pb-3 text-white" src="./src/Icons/${result.weather[0].icon}.svg"></img>
    <p class="description pb-3 text-white text-2xl font-medium">${result.weather[0].description}</p>
    <p class="temp p-3 text-white text-7xl font-bold">${temp}°c</p>
    <p class="city-name p-3 text-white text-5xl font-medium">${result.name}</p>`;

  forecast_container.append(forecast_btn);
}

async function renderforecast(result) {
  forecast_btn.remove();
  forecast_container.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const temp = Math.round(result.list[i].main.temp);
    const icon = result.list[i].weather[0].icon;
    const time = new Date(result.list[i].dt * 1000).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: "true",
      },
    );

    forecast_container.innerHTML += `<div class="forecastContainer flex flex-row justify-evenly items-center">
        <div
          class="forecastUi flex flex-col justify-center items-center mb-7 [&>*]:pb-1"
        >
          <p class="text-xs mb-1 text-white">${time}</p>
          <img class="h-9" src="src/Icons/${icon}.svg" />
          <p class="text-sm font-medium text-white">${temp}°c</p>
        </div>`;
  }
}

search_btn.addEventListener("click", async () => {
  let forecast = false;
  let link = api(forecast);
  if (link === undefined || null) return alert("Enter a city name");
  let result = await fetchData(link);
  renderUi(result);
});

document.addEventListener("keydown", async (e) => {
  let forecast = false;
  if (e.key == "Enter") {
    const link = api();
    if (link === undefined || null) return alert("Enter a city name");
    const result = await fetchData(link);
    renderUi(result);
  }
});

forecast_btn.addEventListener("click", async () => {
  let forecast = true;
  let link = api(forecast);
  if (link === undefined || null) return alert("Enter a city name");
  let result = await fetchData(link);
  renderforecast(result);
});
