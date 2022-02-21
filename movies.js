var http = require("http");
var fs = require("fs");

var data = "";
var json = "";

var options = {
  host: "www.omdbapi.com",
  path: "/?apikey=eb0d1f23&s=star+wars",
};
var request = http.request(options, function (res) {
  res.on("data", function (chunk) {
    data += chunk;
  });
  res.on("end", function () {
    json = JSON.parse(data);

    //console.log(json);
  });
});
request.on("error", function (e) {
  console.log(e.message);
});
request.end();

var server = http.createServer(function (request, response) {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });

    response.end("<p>Nothing to see hear</p>");
  }
  if (request.url === "/movies") {
    response.writeHead(200, { "Content-Type": "text/html" });

    response.write("<table border='1'>");

    for (var i = 0; i < json.Search.length; i++) {
      response.write("<tr>");
      response.write("<td>" + json.Search[i].Title + "</td>");
      response.write("<td>" + json.Search[i].Year + "</td>");
      response.write(
        "<td><img src=" +
          json.Search[i].Poster +
          " alt= border=3 height=100 width=100></img></td>"
      );

      response.write("</tr>");
    }

    return response.end();
  }
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log("Server is running at http://localhost:%d", port);
