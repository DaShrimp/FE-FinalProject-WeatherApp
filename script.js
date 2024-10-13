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

function findLocation() {
    Forecast.innerHTML = "";
    if (typeof userLocation.value === 'number') {
        fetch(WEATHER_ZIP_ENDPOINT + userLocation.value).then((res) => res.json()).then(data => {
            if (data.cod != "" && data.cod != 200) {
                alert(data.message);
                return
            }
            console.log(data);
            getWeatherData(data);
        });
    } else {
        fetch(WEATHER_API_ENDPOINT + userLocation.value).then((res) => res.json()).then(data => {
            if (data.cod != "" && data.cod != 200) {
                alert(data.message);
                return
            }
            console.log(data);
            getWeatherData(data);
        });
    }

}



function getLongFormatDateTime(dtValue, offSet, options) {
    const unixTime = dtValue + offSet;
    const date = new Date(unixTime * 1000);
    return date.toLocaleString("en-US", { ...options, timeZone: 'UTC' });
}

function TempConvert(temp) {
    let tempValue = Math.round(temp);
    let message = "";
    if (converter.value == "°C") {
        message = tempValue + "<span>" + "\xB0C</span>";
    } else {
        message = (tempValue * 9) / 5 + 32 + "<span>" + "\xB0F</span>";
    }
    return message;
}

converter.addEventListener("change", () => {
    if (userLocation.value) {
        findLocation();
    }
});