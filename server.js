var app = require('./server-config.js');

app.set('port', (process.env.PORT || 4568));
console.log('Shortly is listening on ', app.get('port'));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// app.listen(port);

// console.log('Server now listening on port ' + port);
