// KHAI BAO CAC BIEN DE SU DUNG
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

// GOI API
const
    // API LAY TTHONG TIN CHUNG
    WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=a5bb4718b30b6f58f58697997567fffa&q=`,
    // API LAY THONG TIN CHI TIET
    WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?appid=a5bb4718b30b6f58f58697997567fffa&exclude=minutely&units=metric&`,
    // API LAY THONG TIN ZIP/POST CODE
    WEATHER_ZIP_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=a5bb4718b30b6f58f58697997567fffa&zip=`;

// KHAI BAO KIEU DU LIEU THOI GIAN
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

// HAM TIM VI TRI NGUOI DUNG VA TRA VE THONG TIN THHOI TIET
function findLocation() {
    Forecast.innerHTML = "";
    // ID ELSE DE XU LY TRUONG HOP NGUOI DUNG NHAP VAO ZIP CODE POST CODE HOAC NHAP VAO TEN THANH PHO
    if (typeof userLocation.value === 'number') {
        // GOI API XU LY ZIP CODE
        fetch(WEATHER_ZIP_ENDPOINT + userLocation.value).then((res) => res.json()).then(data => {
            if (data.cod != "" && data.cod != 200) {
                alert(data.message);
                return
            }

            console.log(data);
            getWeatherData(data);
        });
    } else {
        // GOI API XU LY TEN THANH PHO
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

// HAM XU LY THOONG TIN VA TRA VE KET QUA
function getWeatherData(data) {
    // THAY DOI TEN TP VA ICON NHIET DO
    city.innerHTML = data.name + ", " + data.sys.country;
    weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
    // LAY LATIYUTE VA LONGTITUTE TU DU LIEU CUA API ZIP HOAC API CHUNG
    fetch(`${WEATHER_DATA_ENDPOINT}&lon=${data.coord.lon}&lat=${data.coord.lat}`).then((res) => res.json()).then(data => {
        // LAY DATA TU API VA IN RA KHUNG WEATHER CHINH
        console.log(data);
        temperature.innerHTML = TempConvert(data.current.temp);
        feelsLike.innerHTML = "Feels like " + data.current.feels_like;
        description.innerHTML = `<i class = "fa-brands fa-cloudversify"></i> &nbsp;` + data.current.weather[0].description;
        date.innerHTML = getLongFormatDateTime(data.current.dt, data.timezone_offset, options);
        // LAY DATA TU API VA IN RA THONG TIN LIEN QUAN
        HValue.innerHTML = Math.round(data.current.humidity) + "<span>%</span>";
        WValue.innerHTML = Math.round(data.current.wind_speed) + "<span>m/s</span>";
        SRValue.innerHTML = getLongFormatDateTime(data.current.sunrise, data.timezone_offset, options1);
        SSValue.innerHTML = getLongFormatDateTime(data.current.sunset, data.timezone_offset, options1);
        CValue.innerHTML = data.current.clouds + "<span>%</span>";
        UVValue.innerHTML = data.current.uvi;
        PValue.innerHTML = data.current.pressure + "<span>hPa</span>";
        // LAY DATA TU API VA TAO CAC O DATA CAC NGAY TRONG TUAN
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
// TU DONG RELOAD THONG TIN SAU KHI THAY DOI LOAI NHIET DO
converter.addEventListener("change", () => {
    if (userLocation.value) {
        findLocation();
    }
});

// XU LY THONG TIN THOI GIAN
function getLongFormatDateTime(dtValue, offSet, options) {
    const unixTime = dtValue + offSet;
    const date = new Date(unixTime * 1000);
    return date.toLocaleString("en-US", { ...options, timeZone: 'UTC' });
}

// XU LY THONG TIN KHI DOI TU DO C -> F
function TempConvert(temp) {
    let tempValue = Math.round(temp);
    let message = "";
    if (converter.value == "°C") {
        message = tempValue + "<span>" + "\xB0C</span>";
    } else {
        let ctof = (tempValue * 9) / 5 + 32;
        message = ctof + "<span>" + "\xB0F</span>";
    }
    return message;
}