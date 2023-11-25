var mongoose = require('mongoose');
const LogSchema = require('../models/logSchema');

//mongodb connection string
var mongourl = "mongodb://127.0.0.1:27017";

// Database names
var writeDbName = 'log-injection-writes';
var readDbName = 'log-injection-reads';

// Connection URIs
var writeUri = mongourl + "/" + writeDbName;
var readUri = mongourl + "/" + readDbName;

// Connection objects
var writeDb = mongoose.createConnection(writeUri, { w: 1 });
var readDb = mongoose.createConnection(readUri);

// Models
var WriteLog = writeDb.model("Log", LogSchema, 'logs');
var ReadLog = readDb.model("Log", LogSchema, 'logs');

module.exports = { WriteLog, ReadLog };