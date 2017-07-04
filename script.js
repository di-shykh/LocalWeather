 (function () {
     window.addEventListener("load",function () {
        var flag="C";
        var code;
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);      
        }
        //Get the latitude and the longitude; 
        function successFunction(position) {
            var lat=position.coords.latitude;
            var lng=position.coords.longitude;
            if(flag=="C")
                unit="metric";
            else if(flag=="F")
                unit="imperial";
            getData(lat,lng,unit);
            var divUnit=document.querySelector("#unit");
            divUnit.innerHTML=flag;
            //change units from C to F and vs
            divUnit.addEventListener("click",function () {
                if(flag=="C"){
                    flag="F";
                    unit="imperial";
                }
                else{
                    flag="C";
                    unit="metric";
                }
                getData(lat,lng,unit);
                divUnit.innerHTML=flag;
            });
            //change background depends of weather
            var c=Math.floor(code/100);
            var weather;
            switch(c){
                case 2: weather="thunderstorm.jpg"; break;
                case 3: weather="drizzle.jpg"; break;
                case 5: weather="rain.jpg"; break;
                case 6: weather="snow.jpg"; break;
                case 7: weather="mist.jpg"; break;
                case 8: if(code==800)
                            weather="clear.jpg";
                        else
                            weather="clouds.jpg";
                        break;
            }
            if(weather){
                var strForBg="url(img/"+weather+")"
                document.body.style.backgroundImage=strForBg;
            }
        }
        //get data from openweathermap.org
        function getData(lat,lng,unit) {       
            var str="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&units="+unit+"&appid=983487e5aea707e04b993c8b863439f7";
            var xhr = new XMLHttpRequest();
            xhr.open("GET", str, false);
            xhr.send();
            jsonArr = JSON.parse(xhr.responseText);
            var divCity=document.querySelector("#city");
            divCity.innerHTML=jsonArr.name+", "+jsonArr.sys.country;
            var divTemp=document.querySelector("#temp");
            divTemp.innerHTML=jsonArr.main.temp+" &deg";
            var divMain=document.querySelector("#main");
            divMain.innerHTML=jsonArr.weather[0].main;
            var divIcon=document.querySelector("#icon");
            var urlImg="http://openweathermap.org/img/w/"+jsonArr.weather[0].icon+".png";
            divIcon.innerHTML="<img src="+urlImg+">";
            code=jsonArr.weather[0].id;
        }
        function errorFunction(){
            alert("Geocoder failed");
        }
     })   
 })();
