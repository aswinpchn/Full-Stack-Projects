const express = require('express');
const cors = require('cors');
// const dbCall = require('./helper_single_DB_connection'); This module contains code where single connection is created each time and closed.
var multer = require('multer');

const { port, image_location } = require('./config');  

// Multer disk storage is advanced version of multer. It gives you control over the uploads. https://www.npmjs.com/package/multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, image_location); // This is the destination where the image will be saved.
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.slice(6)); // Customize how the file should be named.
  }
});
var upload = multer({ storage: storage });

const dbCall = require('./helper_pool_DB');
const app = express();

// use cors to allow cross origin resource sharing. Only the given origin can access this backend.
app.use(cors({ 
  origin: '*', // 'localhost:9000' will allow only 9000. * will allow anything.
  credentials: true,
}));

/*
  These two function are used to help express decode json and url's coming in the request. Previously, this used to be in bodyParse.urlencoded and bodyParser.json. But from express 4.* These have been implemented in the express itself.
  They help to tidy up the request object before we use them. Express lets us use middleware with the use method.
  https://www.geeksforgeeks.org/express-js-express-urlencoded-function/
  https://www.geeksforgeeks.org/express-js-express-json-function/
  These two should be before the actual post, and put requests. As this middleware actually helps in their processing.
*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/all', async (req, res) => {
  
  try {
    const result = await dbCall('select * from patient');
    res.status(200).json(result);
  }
  catch(e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
});

/*
  What happens in the upload middleware is that, it takes input field 'myImage' from the from and saves it in our file system in the path specified.
*/
app.post('/save', upload.single('myImage'), async (req, res) => {
  console.log(req.file, req.body);
  /*
    {
      fieldname: 'myImage',
      originalname: 'My photo1.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: '/Users/aswinprasad/Desktop/Goals/SJSU/4th semester/CMPE 280/Health camp SPA - MySQL/Backend/uploads/images',
      filename: 'myImage-1617619516388.jpeg',
      path: '/Users/aswinprasad/Desktop/Goals/SJSU/4th semester/CMPE 280/Health camp SPA - MySQL/Backend/uploads/images/myImage-1617619516388.jpeg',
      size: 37590
    }
  */
  try {
    
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let gender = req.body.gender;
    let age = req.body.age;
    let notes = req.body.notes;
    let image = req.file.path;
    let height = req.body.height;
    let weight = req.body.weight;
    let temperature = req.body.temperature;
    let pulse = req.body.pulse;
    let BP = req.body.BP;
    
    const result = await dbCall(
      `INSERT INTO patient ( first_name, last_name, gender, age, notes, image, height, weight, temperature, pulse, BP) VALUES 
      ("${first_name}", "${last_name}", "${gender}", "${age}", "${notes}", "${image}", "${height}", "${weight}", "${temperature}", "${pulse}", "${BP}")`);
    
    res.status(200).json({});
  } catch(e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, function() {
  console.log('listening on ' + port)
});

module.exports = app;