'use strict';

var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');

var logo_dir = path.resolve(__dirname, '../../../client/logo');

// Get list of logos
exports.index = function(req, res) {
  var fullUrl = req.protocol + '://' + req.get('host') + '/logo/';

  fs.readdir(logo_dir, function(err, files) {
    if (err) {
      return res.send(200, []);
    }

    var list_logos = [];
    files.forEach(function(f) {
        if (path.extname(f) === '.png' || path.extname(f) === '.jpg') {
          var img_info = {};
          img_info.url = fullUrl + f;
          img_info.name = path.basename(f);
          
          console.log('Get size of ', logo_dir + '/' + f);
          var dimensions = sizeOf(logo_dir + '/' + f);
          img_info.width = dimensions.width;
          img_info.height = dimensions.height;

          list_logos.push(img_info);
        }
    })
    
    return res.json(200, list_logos);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}