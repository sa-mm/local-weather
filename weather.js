$(document).ready(function myFunction() {
  var myLat = "";
  var myLon = "";
  var selectedTempUnit = "farenheit";
  $("#temp-buttons :input").change(function() {
    if ($(this).is('#celsius') == true) {
      //console.log("Celsius button was clicked");
      if (selectedTempUnit == "farenheit") {
        selectedTempUnit = "celsius";
        var $ftemp = $('.temp-data').html();
        var $ctemp = ($ftemp - 32) * (5/9);
        $('.temp-data').html(+$ctemp.toFixed(2)); //the + sign here drops an unnecessary zero
      }
    } else {
      //console.log("The farenheit button was clicked.");
      if (selectedTempUnit = "celsius") {
        selectedTempUnit = "farenheit";
        var $ctemp = $('.temp-data').html();
        var $ftemp = (($ctemp * (9/5)) + 32);
        $('.temp-data').html(+$ftemp.toFixed(2));
      }
    }
  });

  if(navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      myLat = position.coords.latitude;
      myLon = position.coords.longitude;
      // var api = "https://api.darksky.net/forecast/";
      var api = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?";
      if (selectedTempUnit == "farenheit") {
        var units = "&units=imperial";
      } else {
        var units = "&units=metric";
      }
      var apiKey = "bd7d12743df2238bcd53393c028d3396";
      var url = api + 'lat=' + myLat + '&lon=' + myLon + units +  '&APPID=' + apiKey;
      // var url = api + apiKey + "/" + myLat + "," + myLon; //dark sky
      //console.log(url);
      $.getJSON(url,function(json){
        // console.log(json);
        $(".temp-data").html(json.main.temp);
        var weatherDescription = json.weather[0].description;
        var weatherImgURL = 'https://openweathermap.org/img/w/' + json.weather[0].icon + '.png';
        var weatherImg = '<img src="' + weatherImgURL + '" alt="' + weatherDescription + ' image">';
        $(".weather-description-data").html(weatherDescription + " " + weatherImg);
      });
      $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + myLat + ',' + myLon + '&sensor=false',function(data) {
        console.log("Data from google:\n" + data.results[0]);
        $(".location-data").html("The weather for " + data.results[0].formatted_address + ":");
      });//end of google maps api
    });//end of unnamed function, function(position)
  }//end of if-statement
 });