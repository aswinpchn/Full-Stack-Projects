let current_page = 'Demographics';
let image = ''

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $('#blah')
            .attr('src', e.target.result)
            .width(150)
            .height(200);
          image = reader.result;
      };

      reader.readAsDataURL(input.files[0]);
  }
}


let on_click = () => {
  alert('Clicked');
  let first_name = $('#first_name').val() || '';
  let last_name = $('#last_name').val() || '';
  let gender = $('#gender').val() || '';
  let age = $('#age').val() || '';
  let notes = $('#notes').val() || '';
  let image1  = image;
  let height = $('#height').val() || '';
  let weight = $('#weight').val() || '';
  let temperature = $('#temperature').val() || '';
  let pulse = $('#pulse').val() || '';
  let BP = $('#BP').val() || '';

  var db = openDatabase('mydb', '1.0', 'Test DB description', 2 * 1024 * 1024); 

  // Create table query -> create table patient (id unique, first_name, last_name, gender, age, notes, image, height, weight, temperature, pulse, BP)

  // console.log(`INSERT INTO LOGS1 (id, first_name, last_name, gender, age, notes, image, height, weight, temperature, pulse, BP) VALUES (1, "${first_name}", "${last_name}", "${gender}", "${age}", "${notes}", "${image}", "${height}", "${weight}", "${temperature}", "${pulse}", "${BP}")`);

  // console.log(image);

  db.transaction(function (tx) { 
    tx.executeSql(`INSERT INTO patient (first_name, last_name, gender, age, notes, image, height, weight, temperature, pulse, BP) VALUES ("${first_name}", "${last_name}", "${gender}", "${age}", "${notes}", "${image1}", "${height}", "${weight}", "${temperature}", "${pulse}", "${BP}")`);
  });  
} 