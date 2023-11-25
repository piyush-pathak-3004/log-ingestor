function showInsertForm() {
    document.getElementById('insertForm').style.display = 'block';
    document.getElementById('queryForm').style.display = 'none';
}

function showQueryForm() {
    document.getElementById('queryForm').style.display = 'block';
    document.getElementById('insertForm').style.display = 'none';
}

async function insertLog() {
    const logData = {
        level: document.getElementById('level').value,
        message: document.getElementById('message').value,
        resourceId: document.getElementById('resourceId').value,
        timestamp: document.getElementById('timestamp').value,
        traceId: document.getElementById('traceId').value,
        spanId: document.getElementById('spanId').value,
        commit: document.getElementById('commit').value,
        metadata: {
            parentResourceId: document.getElementById('parentResourceId').value,
        }
    };

    console.log(logData);

    try {
        const response = await fetch('http://localhost:3000/log-ingestor/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logData),
        });

        const result = await response.json();
        console.log(result);
        displayInsertResult(result);
    } catch (error) {
        console.error('Error inserting log:', error);
    }
}

async function queryLogs() {
    const queryData = {
        level: document.getElementById('level').value,
        message: document.getElementById('message').value,
        resourceId: document.getElementById('resourceId').value,
        timestamp: document.getElementById('timestamp').value,
        traceId: document.getElementById('traceId').value,
        spanId: document.getElementById('spanId').value,
        commit: document.getElementById('commit').value,
        metadata: {
            parentResourceId: document.getElementById('parentResourceId').value,
        }
    };

    console.log(logData);

    try {
        const queryParams = new URLSearchParams(queryData);
        const response = await fetch(`http://localhost:3000/log-ingestor/query?${queryParams.toString()}`);
        const result = await response.json();
        console.log(result);
        displayQueryResults(result);
    } catch (error) {
        console.error('Error querying logs:', error);
    }
}

function displayQueryResults(results) {
    const resultsContainer = document.getElementById('queryResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results && results.logs) {
        results.logs.forEach(log => {
            const logElement = document.createElement('pre');
            logElement.textContent = JSON.stringify(log, null, 2);
            resultsContainer.appendChild(logElement);
        });
    } else {
        resultsContainer.textContent = 'No logs found.';
    }
}

function displayInsertResult(result) {
    const insertResultContainer = document.getElementById('insertResult');
    insertResultContainer.innerHTML = ''; // Clear previous result

    const insertResultElement = document.createElement('p');
    insertResultElement.textContent = result.success
        ? 'Log successfully inserted!'
        : 'Failed to insert log. Please check the data and try again.';

    insertResultContainer.appendChild(insertResultElement);
}