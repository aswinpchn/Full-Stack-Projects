let on_click = () => {
  alert('Clicked');

  var db = openDatabase('mydb', '1.0', 'Test DB description', 2 * 1024 * 1024); 

  db.transaction(function (tx) { 
    tx.executeSql(
      'SELECT * From patient', 
      [], 
      (tx, results) => {
        var len = results.rows.length, i;    
        var str = '';    
        for (i = 0; i < len; i++) {    
          str += "<tr>";    
          str += "<td>" + results.rows.item(i).first_name + "</td>";    
          str += "<td>" + results.rows.item(i).last_name + "</td>";    
          str += "<td>" + results.rows.item(i).gender + "</td>";
          str += "<td>" + results.rows.item(i).age + "</td>";
          str += "<td>" + results.rows.item(i).notes + "</td>";
          str += `<td id=img_${len}></td>`; // Creating a placeholder for image with dynamic id. So that image will be appended later.
          str += "<td>" + results.rows.item(i).height + "</td>";
          str += "<td>" + results.rows.item(i).weight + "</td>";
          str += "<td>" + results.rows.item(i).temperature + "</td>";
          str += "<td>" + results.rows.item(i).pulse + "</td>";
          str += "<td>" + results.rows.item(i).BP + "</td>"; 
          str += "</tr>";    
          document.getElementById("tblGrid").innerHTML += str;    
          str = '';    
        }
        var image = new Image();
        image.src = results.rows.item(i-1).image; // Base64 string is given as src attribute to the image.
        console.log(results.rows.item(i-1).image);
        document.getElementById(`img_${len}`).appendChild(image); // Appending image as child of the placeholder tr.
      },
      null);
  });
}