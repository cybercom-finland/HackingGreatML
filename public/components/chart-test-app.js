Polymer({
    is: "chart-test-app",
    properties: {
        test: {
            type: String,
            value: ""
        }
    },
    ready() {
        var that = this;
        console.log( 'ready');
        var socket = io();
        socket.emit('test message', 'test');
        socket.on('test message', function(msg) {
            console.log('test message: ' + msg);
            that.test = msg;
        });
    },
});
