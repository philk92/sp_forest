const form = document.querySelector("#searchForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = document.getElementById("searchInput").value;
  if (inputVal.indexOf("ddg:") === 0) {
    window.location.href = `https://www.duckduckgo.com/?q=${inputVal.slice(4)}`;
  } else if (inputVal.indexOf("yt:") === 0) {
    window.location.href = `https://www.youtube.com/results?search_query=${inputVal.slice(3)}`;
  } else if (inputVal.indexOf("gh:") === 0) {
    window.location.href = `https://github.com/search?q=${inputVal.slice(3)}`;
  } else {
    window.location.href = `https://www.google.com/search?q=${inputVal}`;
  }
});

const weatherStation = "Q061";

const wetterSpan = document.querySelector("#wetter");
const forecast = document.querySelector("#forecast");
const forecast0 = document.querySelector("#forecast0");
const forecast1 = document.querySelector("#forecast1");
const forecast2 = document.querySelector("#forecast2");
const searchInput = document.querySelector("#searchInput");

let currentData;
let currentTemp;
let forecastData;

const conditions = [
  "null",
  "Sonne",
  "Sonne, leicht bewölkt",
  "Sonne, bewölkt",
  "Wolken",
  "Nebel",
  "Nebel, rutschgefahr",
  "leichter Regen",
  "Regen",
  "Starker Regen",
  "leichter Regen, rutschgefahr",
  "Starker Regen, rutschgefahr",
  "Regen, vereinzelt Schneefall",
  "Regen, vermehrt Schneefall",
  "Leichter Schneefall",
  "Schneefall",
  "Starker Schneefall",
  "Wolken (Hagel)",
  "Sonne, leichter Regen",
  "Sonne, starker Regen",
  "Sonne, Regen, vereinzelter Schneefall",
  "Sonne, Regen, vermehrter Schneefall",
  "Sonne, vereinzelter Schneefall",
  "Sonne, vermehrter Schneefall",
  "Sonne (Hagel)",
  "Sonne (Starker Hagel)",
  "Gewitter",
  "Gewitter, Regen",
  "Gewitter, starker Regen",
  "Gewitter (Hagel)",
  "Gewitter (starker Hagel)",
  "Wind",
];

const currentFetch = async () => {
  const response = await fetch(
    `https://s3.eu-central-1.amazonaws.com/app-prod-static.warnwetter.de/v16/current_measurement_${weatherStation}.json`
  );
  currentData = await response.json();
  currentTemp = parseInt(currentData.temperature);
  // wetterSpan.innerText = `Es hat aktuell ${Math.floor(currentTemp / 10)}°C.`;
};

const forecastFetch = async () => {
  const response2 = await fetch(
    `https://s3.eu-central-1.amazonaws.com/app-prod-static.warnwetter.de/v16/forecast_mosmix_${weatherStation}.json`
  );
  forecastData = await response2.json();
  console.log(forecastData);
  let d0 = forecastData.days[0];
  let d1 = forecastData.days[1];
  let d2 = forecastData.days[2];
  // forecast0.innerText = `Heute (${changeDate(d0.dayDate)}):  Min: ${Math.floor(
  //   d0.temperatureMin / 10
  // )}°C,  Max: ${Math.floor(d0.temperatureMax / 10)}°C, ${conditions[d0.icon1]}.`;
  // forecast1.innerText = `Morgen (${changeDate(d1.dayDate)}):  Min: ${Math.floor(
  //   d1.temperatureMin / 10
  // )}°C,  Max: ${Math.floor(d1.temperatureMax / 10)}°C, ${conditions[d1.icon1]}.`;
  // forecast2.innerText = `Übermorgen (${changeDate(d2.dayDate)}):  Min: ${Math.floor(
  //   d2.temperatureMin / 10
  // )}°C,  Max: ${Math.floor(d2.temperatureMax / 10)}°C, ${conditions[d2.icon1]}.`;
  searchInput.placeholder = `Jetzt: ${Math.floor(currentTemp / 10)}˚C - Heute: ${Math.floor(
    d0.temperatureMax / 10
  )}˚C - Morgen: ${Math.floor(d1.temperatureMax / 10)}˚C`;
};

// datumformat von api ist yyyy-mm-dd, change zu dd.mm.yyyy
function changeDate(x) {
  let y = x.toString().split("-");
  return `${y[2]}.${y[1]}.`;
  // return `${y[2]}.${y[1]}.${y[0]}`;
}

// funktionen aufrufen um daten von API abzurufen
currentFetch();
forecastFetch();
