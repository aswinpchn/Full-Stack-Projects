# Readme

## Task

1. In this assignment. We are creating a form, where user can enter his details and upload his image.
2. Clicking submit. It is saved to our system.
3. In another page, there will be list of data entered.

## Process

1. HTML, CSS and JS for frontend. (AJAX for making API calls to the backend). (Think of AJAX like Axios).
2. NodeJS server to make interaction with the SQL. <https://stackoverflow.com/questions/37453671/run-a-sql-query-in-js> <https://zellwk.com/blog/crud-express-mongodb/>
3. We are using Multer package in the nodejs to process image and store in our computer. Multer package can parse multi-part data and help us store image/files in the server. <https://medium.com/@nitinpatel_20236/image-upload-via-nodejs-server-3fe7d3faa642> <https://www.npmjs.com/package/multer>
4. When returning data, we return the pathof the image along with the data. So, that it can be simply displyaed by setting the location as src in img tag.
