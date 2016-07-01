Polymer({
    is: "chart-test-app",
    properties: {
        test: {
            type: String,
            value: ""
        },
        cols: {
            type: Array,
            value: [{"label": "Data", "type": "datetime"},{"label": "Humidity", "type": "number"},{"label": "Temperature", "type": "number"}]
        },
        rows: {
            type: Array,
            value: [["Col1", 5.0, 7],["Col2", 5.0, 7],["Col3", 5.0, 7]]
        }
    },
    resizeWindow() {
        document.getElementById("mychart").drawChart();
    },
    parseData(that, data) {
        console.log("LEN: " + data.Items.length);
        rows = [];
        for (var i=200; i<data.Items.length; i++) {
            //console.log("HUMIDITY " + i + " = " + data.Items[i].payload.M.state.M.reported.M.humidity.N);
            rows.push([new Date(parseInt(data.Items[i].timestamp.S)),
                parseInt(data.Items[i].payload.M.state.M.reported.M.humidity.N),
                parseInt(data.Items[i].payload.M.state.M.reported.M.temp.N)]);
        }
        that.rows = rows;
        document.getElementById("mychart").rows = rows;
    },
    initAWS(that) {
        AWS.config.update({accessKeyId: 'AKIAIEYDIIO5CV755QOQ', secretAccessKey: 'ACeRJ4JFNXkHymT+Rw01xqqtBSRhhLQ3oGBgeH5+'});
        // Configure your region
        AWS.config.region = 'eu-west-1';
        var dynamodb = new AWS.DynamoDB();
        var params = {
            TableName: 'HackingGreat_Measurements' /* required */
        }
        dynamodb.scan(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                console.log(data);           // successful response
                that.parseData(that, data);
            }
        });
    },
    ready() {
        var that = this;
        window.addEventListener("resize", this.resizeWindow);
        console.log( 'ready');
        var socket = io();
        socket.emit('test message', 'test');
        socket.on('test message', function(msg) {
            console.log('test message: ' + msg);
            that.test = msg;
        });
        this.initAWS(that);
    },
    detached() {
        window.removeEventListener("resize", this.resizeWindow);
    }
});
