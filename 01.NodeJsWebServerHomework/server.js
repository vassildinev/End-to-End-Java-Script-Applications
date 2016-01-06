(function(){
    "use strict";
    var http = require('http'),
        fs = require('fs'),
        formidable = require('formidable'),
        util = require('util'),
        path = require('path'),
        mime = require('mime');

    var port = 3030;
    http.createServer(function(request, response){
        "use strict";
        if(request.url === '/'){
            fs.readdir('files', function(error, files){
                var allFiles = '<div>';
                for(var i = 0; i < files.length; i += 1){
                    allFiles += '<a href="/files/download/' + files[i] + '">' + files[i] + '</a><br/>';
                }

                allFiles += '</div>';

                fs.readFile('views/home-view.html', function(error, data) {
                    response.writeHead(200);
                    response.write(data + allFiles);
                    response.end();
                });
            });
        }

        if(request.url === '/files/upload'){
            if(request.method.toLowerCase() === 'post'){
                var form = new formidable.IncomingForm();
                form.uploadDir = 'files';
                form.keepExtensions = true;

                form.parse(request, function(err, fields, files) {
                    response.writeHead(200, {'content-type': 'text/plain'});
                    response.end(util.inspect({files: files.upload.path}));
                });
            } else {
                fs.readFile('views/login-view.html', function (error, data) {
                    response.writeHead(200, {'content-type': 'text/html'});
                    response.write(data);
                    response.end();
                });
            }
        }

        if(request.url.indexOf('/files/download') !== -1){
            var filePath = __dirname +'/' + 'files/' +  request.url.split('/')[3];
            var filename = path.basename(filePath);
            var mimeType = mime.lookup(filePath);

            response.setHeader('Content-disposition', 'attachment; filename=' + filename);
            response.setHeader('Content-type', mimeType);

            var fileStream = fs.createReadStream(filePath);
            fileStream.pipe(response);
        }
    }).listen(port);

    console.log('Server running on port ' + port);
}());