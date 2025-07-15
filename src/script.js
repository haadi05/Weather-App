const UiContainer = document.querySelector(".divContainer");
const search_btn = document.querySelector(".search-btn");
const userInput = document.querySelector(".User-Input");
const main_title = document.querySelector(".title");

function api() {
  if (userInput.value == "") return;
  const value = userInput.value;
  const replace = value.textContent;

  let api =
    "https://api.openweathermap.org/data/2.5/weather?q={city}&appid=a620594034162ca21018136f97029a4f&units=metric";

  let url = api.replace("{city}", value);
  return url;
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

  UiContainer.innerHTML = "";
  main_title.textContent = "";

  UiContainer.innerHTML = `<div class="ui-container flex flex-col justify-center items-center mt-8 mb-8 "> 
    <img class="icon h-40 pb-3 text-white" src="./src/Icons/${result.weather[0].icon}.svg"></img>
    <p class="description pb-3 text-white text-2xl font-medium">${result.weather[0].description}</p>
    <p class="temp p-3 text-white text-7xl font-bold">${temp}°c</p>
    <p class="city-name p-3 text-white text-5xl font-medium">${result.name}</p>
    </div>`;
}

search_btn.addEventListener("click", async () => {
  let link = api();
  if (link === undefined || null) return alert("Enter a city name");
  let result = await fetchData(link);
  renderUi(result);
});

document.addEventListener("keydown", async (e) => {
  if (e.key == "Enter") {
    const link = api();
    if (link === undefined || null) return alert("Enter a city name");
    const result = await fetchData(link);
    renderUi(result);
  }
});
