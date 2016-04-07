"use strict";


const EventEmitter = require('events');
const snap7 = require('node-snap7');
const client = new snap7.S7Client();


class S7Client  extends EventEmitter {

    constructor(settings) {
        //console.log('>> S7Client: ctor');
        //console.log(settings);
        super();
        this.settings = settings;
    }

    /*
        On error, all methods should emit an 'error' event with error message
        On success, all methods should emit event with I/O data
    */

    connect() {
        const self = this;

        /*
            Connect to plc.
            On success emit 'connected'
        */
    };

    readDI() {
        const self = this;
        let data = { di: []};

        /*
            Read digital inputs from plc.
        */
    };

    readDO() {
        const self = this;
        let data = { do: []};

        /*
            Read digital outputs from plc.
        */
    };

    readM() {
        const self = this;
        let data = { m: []};

        /*
            Read bit memory from plc.
        */
    };

    readDB() {
        const self = this;
        let data = { dbValues: []};

        /*
            Read data blocks from plc.
        */
    };

    writeDO(bytes) {
        const self = this;
        var buf = new Buffer(bytes);

        /*
            Write digital outputs to plc.
        */
    };

    writeM(bytes) {
        const self = this;
        var buf = new Buffer(bytes);

        /*
            Write bits to plc bit memory.
        */
    };

}

module.exports = S7Client;
