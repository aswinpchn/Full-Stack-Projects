window.onload = () => {
    if ("geolocation" in navigator) {
        console.log('geolocation is available in this browser');
    } else {
        return 0;
    }

    var displayContainer = document.getElementById("displayContainer");
};

function displayLocation () {
    var promise1 = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => { resolve(position);}, ()=>{reject();});
    });

    promise1.then((position) => {
        displayContainer.innerHTML = "we are in " + position.coords.latitude + " degree latitude And " + position.coords.longitude + " Longitude";  

        var URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyC_2hp8Ko7ynB8PPazgtpqvgrJ4DiSKZvs`;

        fetch(URL)
            .then(response => {
                if(response.status == 200) {
                    return response.json()
                }
            })
            .then(data => {
                displayContainer.innerHTML = `${displayContainer.innerHTML} <br> you are in ${data.results[7].formatted_address} aren't you?`;
            });
    }).catch((error) => {
        console.log(error + "Can't retrieve the location");
    });
}


// navigator.geolocation.getCurrentPosition(resolve, reject); // this works i dont know why.
// where is position coming from to resolve.