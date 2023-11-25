const Logs = require("../dbs/db");
const publishToQueue = require("../services/writeWorker");
const writeLog = Logs.WriteLog;



exports.insertLog = async (req, res) => {
    console.log("inside writeController...");
    let logData = req.body;
    
    let log = new writeLog({
        level: logData.level,
        message: logData.message,
        resourceId: logData.resourceId,
        timestamp: logData.timestamp,
        traceId: logData.traceId,
        spanId: logData.spanId,
        commit: logData.commit,
        metadata: {
            parentResourceId: logData.metadata ? logData.metadata.parentResourceId : null
        }

    });


    await log.save();
    await publishToQueue(logData);
    res.status(200).send("Log is injected successfully....");

}

