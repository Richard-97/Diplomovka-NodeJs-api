var express = require('express');
const cors = require('cors');
var app = express();


app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('OK')
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
