const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();


function exportMetrics(appMain){

    client.collectDefaultMetrics({
        app: 'node-application-monitoring-app',
        prefix: 'hello_',
        timeout: 10000,
        gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
        register
    });
    
    appMain.get('/metrics', async (req, res) => {
        res.setHeader('Content-Type', register.contentType);
        res.send(await register.metrics());
    });
    
    }
    
    module.exports = { exportMetrics };