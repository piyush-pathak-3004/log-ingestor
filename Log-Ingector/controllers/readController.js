var dbConnections = require("../dbs/db");
var ReadLog = dbConnections.ReadLog;


exports.queryLogs = async (req, res) => {
    console.log("inside queryLogs controller...");

    try {
        const queryParams = req.query;
        const query = {};

        // Define an array of fields that should be treated as strings
        const stringFields = ['level', 'message', 'resourceId', 'traceId', 'spanId', 'commit', 'metadata'];

        // Loop through each parameter in the request
        for (const key in queryParams) {
            const value = queryParams[key];

            if (stringFields.includes(key)) {
                query[key] = { $regex: new RegExp(value, 'i') };
            } else if (key === 'atTimestamp') {
                query.timestamp = new Date(value);
            } else if (key === 'fromTimestamp' && queryParams['toTimestamp']) {
                
                query.timestamp = {
                    $gte: new Date(value),
                    $lte: new Date(queryParams['toTimestampText']),
                };
            }
        }

        console.log(query);

        const logs = await ReadLog.find(query);

        res.status(200).json({ success: true, logs });
    } catch (error) {
        console.error("Error querying logs:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
