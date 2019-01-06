var fs = require("fs");
 
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
 
 // console.log(data);
 
  var dataArr = data.split(",");
 
  console.log(dataArr[0]);
  console.log(dataArr[1]);

});