var gulp = require("gulp");
var sever = require("gulp-webserver");
var path = require("path");
var fs = require("fs");
var data = require("./src/json/ajax.json").data;
gulp.task("server", function() {
    gulp.src("./src/")
        .pipe(sever({
            port: 8585,
            open: true,
            middleware: function(req, res, next) {
                var pathname = require("url").parse(req.url).pathname;
                if (req.url === "/favicon.ico") {
                    return;
                }
                pathname = pathname === "/" ? "index.html" : pathname;
                if (pathname === "/api/indexList") {
                    res.end(JSON.stringify(data));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }
            }
        }))
})