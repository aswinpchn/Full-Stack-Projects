let on_click = () => {
  alert('Clicked');

  // https://api.jquery.com/jquery.ajax/ There is a promise like 'fail' Which will be triggered in case of Network failure.
  $.ajax({
    url: "http://localhost:9000/all",
    type: 'GET',
    success: (data, status) => {
      // console.log(data, status); // This is triggered when the result is 200.
      var len = data.length;    
      var str = '';    
      for (i = 0; i < len; i++) {    
        str += "<tr>";    
        str += "<td>" + data[i].first_name + "</td>";    
        str += "<td>" + data[i].last_name + "</td>";    
        str += "<td>" + data[i].gender + "</td>";
        str += "<td>" + data[i].age + "</td>";
        str += "<td>" + data[i].notes + "</td>";
        str += `<td id=img_${i}></td>`; // Creating a placeholder for image with dynamic id. So that image will be appended later.
        str += "<td>" + data[i].height + "</td>";
        str += "<td>" + data[i].weight + "</td>";
        str += "<td>" + data[i].temperature + "</td>";
        str += "<td>" + data[i].pulse + "</td>";
        str += "<td>" + data[i].BP + "</td>";
        str += "</tr>";    
        document.getElementById("tblGrid").innerHTML += str;

        var image = new Image();
        image.src = data[i].image; // Base64 string is given as src attribute to the image.
        document.getElementById(`img_${i}`).appendChild(image); // Appending image as child of the placeholder tr.
        str = '';    
      }
      // var image = new Image();
      // console.log(data[i-1].image);
      // image.src = data[i-1].image; // Base64 string is given as src attribute to the image.
      // document.getElementById(`img_${len}`).appendChild(image); // Appending image as child of the placeholder tr.
    }
  }).fail(function() {
    alert( "Failed" );  // This is called when there is 500 error, and also during network failure.
  });
}