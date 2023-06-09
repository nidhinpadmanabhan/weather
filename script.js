function relod(){

result.innerHTML= `

<div class="text-light c10 container p-3 text-center" style="background-color: rgba(0, 0, 0, 0.738); border-radius: 20px; border: white 4px double;">
<div>
<h1 class="c40 text-center pt-3" id="pnam" ><strong></strong></h1>
<h2 class="c50 text-center" id="tem">  </h2>
<h3 class="c50 text-center" id="mai"></h3>
</div>
<hr>
<div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h3 id="win"></h3>
            <div>
                <p><i class="fa-solid fa-wind fa-fade fa-1x"></i> <strong> wind speed </strong> </p>
            </div>
            <hr>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h3 id="press"></h3>
            <div>
                <p><i class="fa-solid fa-fade fa-gauge"></i> <strong> Pressure </strong> </p>
            </div>
            <hr>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h3 id="hum"></h3>
            <div>
                <p><i class="fa-solid fa-fade fa-droplet fa-1x"></i> <strong> Humidity </strong> </p>
            </div>
            <hr>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h3 id="visib"></h3>
            <div>
                <p><i class="fa-solid fa-fade fa-eye fa-1x"></i> <strong> Visibility </strong></p>
            </div>
            <hr>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h3 id="xtem"></h3>
            <div>
                <p><i class="fa-solid fa-fade fa-temperature-high fa-1x"></i> <strong> Maximum Temperature </strong></p>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h3 id="ntem"></h3>
            <div>
                <p><i class="fa-solid fa-fade fa-temperature-low fa-1x"></i> <strong> Minimum Temperature </strong></p>
            </div>
        </div>
    </div>`

}


function displayPlace() {
    place = pname.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=b41ec3be35c7dac8aabbc21ba253137a`).then(data => data.json()).then(data => displayData(data)).catch(e => displayError())
}
success = (position) => {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=62d116a858634a47707feac3ec79a3e2`).then(data => data.json())
        .then(data => displayData(data))

}
error = () => {
    result.innerHTML = `

        <div class="text-light c10 container p-3 text-center" style = "background-color: rgba(0, 0, 0, 0.738); border-radius: 20px; border: white 4px double;" >
            <div>
                <h1 class="c40 pt-3" ><strong> unable to find location </strong></h1>
            </div>
        </div> `
}

function searchLoc() {
    navigator.geolocation.getCurrentPosition(success, error);
}

function displayError(){
    result.innerHTML = `

    <div class="text-light c10 container p-3 text-center" style = "background-color: rgba(0, 0, 0, 0.738); border-radius: 20px; border: white 4px double;" >
        <div>
            <h3 class="c40 pt-3" ><strong> check if the spelling of the place is correct?? </strong></h3>
        </div>
    </div> `

}


function displayData(pData) {
    pnam.innerHTML = pData.name
    mai.innerHTML = pData.weather[0].main
    tem.innerHTML =  Math.floor(pData.main.temp - 273.15)+ " °C"
    ntem.innerHTML = Math.floor(pData.main.temp_min - 273.15)+ " °C"
    xtem.innerHTML = Math.floor(pData.main.temp_max - 273.15)+ " °C"
    press.innerHTML = pData.main.pressure+ " mb"
    hum.innerHTML = pData.main.humidity+ " %"
    win.innerHTML = pData.wind.speed+ " km/hr"
    visib.innerHTML = pData.visibility / 1000+ " km"

}

