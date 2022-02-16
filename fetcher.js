const request = require('request');
const fs = require("fs");
const isInvalid = require("is-invalid-path");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = Object.values(process.argv).slice(2);
const url = args[0];
const path = args[1];

if (isInvalid(path)) {
  console.log("Path is invalid, ending program");
  return;
}

const write = function(path, body) {
  fs.writeFile(path, body, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
  });
}

request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  if (fs.existsSync(path)) {
    rl.question("File already exists, Y and enter to overwrite:  ", answer => {
      if (answer === 'Y') {
        write(path, body);
      } else {
        console.log("cancelling operations");
      }
      rl.close();
    })
  } else {
    write(path, body);
  }

  
  // console.log('body:', body); // Print the HTML for the Google homepage.
});