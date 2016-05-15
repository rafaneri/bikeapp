/**
 * Created by rafaelneri on 10/05/16.
 * Load the KML database example
 */
var tj = require('togeojson'),
    fs = require('fs'),
    jsdom = require('jsdom').jsdom,
    model = require('./../model');

var kml = jsdom(fs.readFileSync('./config/database.kml', 'utf8'));
var cw = tj.kml(kml, { styles: true });
console.log(cw.features);

model.Feature.create(cw.features, function(err, entity){
    if (err) {
        console.log('error');
    } else {
        console.log('success');  
    } 
});
