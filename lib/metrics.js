const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();

const http_request_counter = new client.Counter({
    name: 'hello_world_http_request_count',
    help: 'Count of HTTP requests made to my app',
  });
register.registerMetric(http_request_counter);

function exportMetrics(appMain){

    client.collectDefaultMetrics({
        app: 'node-application-monitoring-app',
        prefix: 'hello_world',
        timeout: 10000,
        gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
        register
    });
    
    appMain.get('/metrics', async (req, res) => {
        IncreaseCouter()
        console.log("accessed metrics on /metrics")
        res.setHeader('Content-Type', register.contentType);
        res.send(await register.metrics());
    });
    console.log("enabled metrics on /metrics")
    }

    function IncreaseCouter(){
        http_request_counter.inc();
    }
    
    module.exports = { exportMetrics,IncreaseCouter };