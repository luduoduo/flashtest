var alexa = require('alexa-app');
var async = require('async');
var r = require('request-promise');

var app = new alexa.app('FlashTest');
var config = require('./config.json');

app.intent('PlayBriefing', {
  utterances: ['{give|play} {me |}the {briefing|news}']
}, playBriefing);
app.launch(playBriefing);

function playBriefing(request, response) {
  async.map(config.feeds, function(feed, cb) {
    r.get({
        url: feed.url,
        json: true
      })
      .then(function(data) {
        if (Array.isArray(data)) {
          feed.items = data.slice(0, 5)
        } else {
          feed.items = [data]
        }
        cb(null, feed);
      }).catch(function(err) {
        cb(err);
      })
  }, function(err, feeds) {
    if (!err) {
      response.say('<p>Here\'s your Flash Briefing.</p>');
      feeds.forEach(function(feed, feedindex) {
        response.say('<p>' + feed.preamble + '</p>');
        feed.items.forEach(function(item, itemindex) {
          if (feed.format === 'audio') {
            response.say('<audio src="' + item.streamUrl + '"/>');
          } else if (feed.format === 'text') {
            response.say('<p>' + item.mainText + '</p>');
          }
        });
      });
      response.say('<p>That\'s all from your Flash Briefing. Goodbye.</p>');
    } else {
      response.say(config.error || config.name + ' is not available at the moment');
    }
    response.send();
  });

  return false
}

// Checking if we're actually being run as a module (in this case, as a Lambda function.)
if (module.parent) {
  exports.handle = app.lambda();
} else {
  var fs = require('fs');
  fs.writeFileSync('schema.json', app.schema());
  fs.writeFileSync('utterances.txt', app.utterances());
  console.log('Schema and utterances exported!')
}
