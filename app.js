var express = require('express');
const cors = require('cors');
var app = express();
const textToSpeech = require('@google-cloud/text-to-speech');
const textToSpeechClient = new textToSpeech.TextToSpeechClient();


app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('OK')
})
app.post('/text-to-speech', async (req, res) => {
  const {data} = req.body;

  if(data === ""){
    res.status(400).json(err);
  }

  const request = {
    audioConfig: {
      audioEncoding: 'LINEAR16',
      pitch: 0,
      speakingRate: 1
    },
    input: {
      text: data
    },
    voice: {
      languageCode: 'sk-SK',
      name: `sk-SK-Wavenet-A`
    }
  };

  const  [response] = await textToSpeechClient.synthesizeSpeech(request);
  if(response!==null){
    var base64string = new Buffer.from(response.audioContent).toString('base64');
    res.status(200).json({
      audioContent: base64string
    });
  }
  else {res.status(400).json("error")}
 
});

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
