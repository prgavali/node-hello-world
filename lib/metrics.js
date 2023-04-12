const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();


function exportMetrics(appMain){

    client.collectDefaultMetrics({
        app: 'node-application-monitoring-app',
        prefix: 'hello_world',
        timeout: 10000,
        gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
        register
    });
    
    appMain.get('/metrics', async (req, res) => {
        console.log("accessed metrics on /metrics")
        res.setHeader('Content-Type', register.contentType);
        res.send(await register.metrics());
    });
    console.log("enabled metrics on /metrics")
    }
    
    module.exports = { exportMetrics };