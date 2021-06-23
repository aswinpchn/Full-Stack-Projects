const yourJsFunction = () => {
  const formData = new FormData($('#form')[0]); // https://stackoverflow.com/questions/21044798/how-to-use-formdata-for-ajax-file-upload
  
  /* 
    https://api.jquery.com/jquery.ajax/ There is a promise like 'fail' Which will be triggered in case of Network failure.
    How to do it react - https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c
    https://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
    https://stackoverflow.com/questions/20795449/jquery-ajax-form-submission-enctype-multipart-form-data-why-does-contentt
    Very important. The two links tell what params should be used.
  */
  $.ajax({
    url: "http://localhost:9000/save",
    data: formData,
    processData: false, // Without this some wierd thing will happen with Query params. Without this somehow, the request was failing.
    contentType: false, // contentType option to false is used for multipart/form-data forms that pass files.
    type: 'POST',
    success: (data, status) => {
      console.log(data, status); // This is triggered when the result is 200.
      alert('Data entry successful');
    }
  }).fail(function() {
    alert( "Failed" );  // This is called when there is 500 error, and also during network failure.
  });
}