const apiKey = "***Your API KEY***";

let city = " ";

let box = document.getElementById("cities");

async function getWeather(lat, long) {
  box.innerHTML = " ";
  const apiUrlWeather =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=" +
    apiKey;

  const req = await fetch(apiUrlWeather);
  const data = await req.json();
  console.log(data);

  let cel = Math.round(data.main.temp - 273);

  document.getElementById("weather").innerHTML =
    "<div class='card  min-w-sm max-w-sm border border-gray-100  transition-shadow test  shadow-lg hover:shadow-shadow-xl w-full bg-green-600 text-purple-50 rounded-md'><h2 class='text-md mb-2 px-4 pt-4'><div class='flex justify-between'><div class='badge relative top-0'><span class='mt-2 py-1 h-12px text-2xl font-bold w-12px  rounded right-1 bottom-1 px-4'>" +
    data.name +
    "</span></div><span class='text-lg font-bold ' id='span'></span></div></h2><div class='flex items-center p-4'><div class='flex justify-center items-center w-96'><svg height='20' width='20' viewBox='0 0 32 32' class='fill-current h-32 w-32 text-yellow-300'><img src='https://openweathermap.org/img/wn/" +
    data.weather[0].icon +
    "@2x.png'></div></div><div class='text-md pt-4 pb-4 px-4'><div class='flex justify-between items-center'><div class='space-y-2'><span class='flex space-x-2 items-center'><svg height='20' width='20' viewBox='0 0 32 32'class='fill-current'><path d='M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z'></path><path d='M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z'></path></svg> <span>" +
    data.wind.speed +
    " km/h</span></span><span class='flex space-x-2 items-center'><svg height='20' width='20' viewBox='0 0 32 32' class='fill-current'><path d='M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z'></path><path d='M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,9.0114,9.0114,0,0,1,16,28ZM16,5.8483l-5.7817,9.2079A7.9771,7.9771,0,0,0,9,19a7,7,0,0,0,14,0,8.0615,8.0615,0,0,0-1.248-3.9953Z'></path> </svg> <span>" +
    data.main.humidity +
    " %</span></span></div><div><h1 class='text-6xl'>" +
    cel +
    "<span class='font-semibold text-xl'>C°</span></h1></div></div></div></div>";

  var span = document.getElementById("span");
  function time() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    span.textContent =
      ("0" + h).substr(-2) +
      ":" +
      ("0" + m).substr(-2) +
      ":" +
      ("0" + s).substr(-2);
  }

  setInterval(time, 1000);
}

async function getCity() {
  let citySearchInput = document.getElementById("citySearch").value;
  city = citySearchInput;

  document.getElementById("citySearch").value = " ";

  box.innerHTML = " ";

  const apiUrlGeo =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=" +
    apiKey;
  const req = await fetch(apiUrlGeo);
  const data = await req.json();

  for (const cities of data) {
    box.innerHTML +=
      "<button  class='flex select-none items-center gap-3 rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none m-5' type='button' data-ripple-dark='true' onclick='getWeather(" +
      cities.lat +
      ", " +
      cities.lon +
      ")'> " +
      cities.name +
      " <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' /><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' /></svg></button>";
  }

  console.log(data);
}
