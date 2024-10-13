const
    userLocation = document.getElementById("userLocation"),
    converter = document.getElementById("converter"),
    weatherIcon = document.querySelector(".weatherIcon"),
    temperature = document.querySelector(".temperature"),
    feelsLike = document.querySelector(".feelsLike"),
    description = document.querySelector(".description"),
    date = document.querySelector(".date"),
    city = document.querySelector(".city");

const
    HValue = document.getElementById("HValue"),
    WValue = document.getElementById("WValue"),
    SRValue = document.getElementById("SRValue"),
    SSValue = document.getElementById("SSValue"),
    CValue = document.getElementById("CValue"),
    UVValue = document.getElementById("UVValue"),
    PValue = document.getElementById("PValue");

const
    Forecast = document.querySelector(".Forecast");


const
    WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=a5bb4718b30b6f58f58697997567fffa&q=`,
    WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?appid=a5bb4718b30b6f58f58697997567fffa&exclude=minutely&units=metric&`,
    WEATHER_ZIP_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=a5bb4718b30b6f58f58697997567fffa&zip=`;
const
    options1 = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    },
    options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };


function getWeatherData(data) {

    city.innerHTML = data.name + ", " + data.sys.country;
    weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

    fetch(`${WEATHER_DATA_ENDPOINT}&lon=${data.coord.lon}&lat=${data.coord.lat}`).then((res) => res.json()).then(data => {
        console.log(data);
        temperature.innerHTML = TempConvert(data.current.temp);
        feelsLike.innerHTML = "Feels like " + data.current.feels_like;
        description.innerHTML = `<i class = "fa-brands fa-cloudversify"></i> &nbsp;` + data.current.weather[0].description;
        date.innerHTML = getLongFormatDateTime(data.current.dt, data.timezone_offset, options);

        HValue.innerHTML = Math.round(data.current.humidity) + "<span>%</span>";
        WValue.innerHTML = Math.round(data.current.wind_speed) + "<span>m/s</span>";
        SRValue.innerHTML = getLongFormatDateTime(data.current.sunrise, data.timezone_offset, options1);
        SSValue.innerHTML = getLongFormatDateTime(data.current.sunset, data.timezone_offset, options1);
        CValue.innerHTML = data.current.clouds + "<span>%</span>";
        UVValue.innerHTML = data.current.uvi;
        PValue.innerHTML = data.current.pressure + "<span>hPa</span>";

        data.daily.forEach((weather) => {
            let div = document.createElement("div");
            let daily = getLongFormatDateTime(weather.dt, 0, options).split(" at ");
            div.innerHTML = daily[0]
            div.innerHTML += `<img src = "https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"/>`;
            div.innerHTML += `<p class = "forecast-desc">${weather.weather[0].description}</p>`;
            div.innerHTML += `<span>Min: <span>${TempConvert(weather.temp.min)}</span>&nbsp;Max: <span>${TempConvert(weather.temp.max)}</span></span>`;
            Forecast.append(div);
        });
    });
}
