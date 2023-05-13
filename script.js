let time = document.getElementById("current-time")
    day = document.getElementById("current-date")

    setInterval(() => {
        let d = new Date();
        time.innerHTML = d.toLocaleTimeString();
        day.innerHTML = d.toLocaleDateString();
    }, 1000)


    function displayPlace() {
        place = pname.value
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=b41ec3be35c7dac8aabbc21ba253137a`).then(data => data.json()).then(data => displayData(data))
    }

    success = (position) => {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=62d116a858634a47707feac3ec79a3e2`).then(data => data.json())
            .then(data => displayData(data))

    }
    error = () => {
        locality.innerText = `unable to find location`
    }
    function searchLoc() {
        navigator.geolocation.getCurrentPosition(success, error);
    }



    function displayData(pData) {
        pname = pData.name
        main = pData.weather[0].main
        temp = Math.floor(pData.main.temp - 273.15)
        tempmin = Math.floor(pData.main.temp_min - 273.15)
        tempmax = Math.floor(pData.main.temp_max - 273.15)
        pressure = pData.main.pressure
        humidity = pData.main.humidity
        wind = pData.wind.speed
        visibility = pData.visibility / 1000



        result.innerHTML = `
        <div class="text-light" style="background-color: rgba(0, 0, 0, 0.738); border-radius: 20px; border: white 4px double;">
  <div>
    <h1 class="c40 pt-3" ><strong>${pname}</strong></h1>
    <h2 class="c50 text-center"> <i class="fa-solid fa-fade fa-temperature-half fa-1x"></i> ${temp} °C </h2>
    <h3 class="c50 text-center">${main}</h3>
</div>
<hr>
<div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <h3>${wind} km/hr</h3>
                    <div>
                        <p><i class="fa-solid fa-wind fa-fade fa-1x"></i> <strong> wind speed </strong> </p>
                    </div>
                    <hr>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <h3>${pressure} hPa</h3>
                    <div>
                        <p><i class="fa-solid fa-fade fa-gauge"></i> <strong> Pressure </strong> </p>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <h3>${humidity}  %</h3>
                    <div>
                        <p><i class="fa-solid fa-fade fa-droplet fa-1x"></i> <strong> Humidity </strong> </p>
                    </div>
                    <hr>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <h3>${visibility} km</h3>
                    <div>
                        <p><i class="fa-solid fa-fade fa-eye fa-1x"></i> <strong> Visibility </strong></p>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <h3>${tempmax} °C </h3>
                    <div>
                        <p><i class="fa-solid fa-fade fa-temperature-high fa-1x"></i> <strong> Maximum Temperature </strong></p>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <h3>${tempmin} °C </h3>
                    <div>
                        <p><i class="fa-solid fa-fade fa-temperature-low fa-1x"></i> <strong> Minimum Temperature </strong></p>
                    </div>
                </div>
            </div>
`
    }