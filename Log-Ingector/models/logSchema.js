var mongoose = require('mongoose');
var dbConnections = require('../dbs/db');
var schema = mongoose.Schema;

const logSchema = new schema({
    level: {
        type:String,
    },
    message: {
        type:String,
    },
    resourceId: {
        type:String,
    },
    timestamp: {
        type:Date,
        required:true,
        index: true
    },
    traceId: {
        type:String,
    },
    spanId: {
        type:String,
    },
    commit: {
        type:String,
    },
    metadata: {
        parentResourceId: {
            type:String,
        }
    }
},{collection:'logs'});

module.exports = logSchema;