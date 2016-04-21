"use strict"

const net = require('net');
const modbus = require("modbus-tcp");
const modClient = new modbus.Client();
const readline = require('readline');

const tcpClient = net.connect(3000, 'localhost', () => {
    console.log('Connected to Modbus server!');

    // Pipe tcp stream


    function completer(line) {
        let completions = 'rc rdi wsc wmc help'.split(' ');
        let hits = completions.filter((c) => { return c.indexOf(line) == 0 });
        // show all completions if none found
        return [hits.length ? hits : completions, line]
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        completer: completer
    });


    rl.setPrompt('Modbus> ');
    rl.prompt();

    rl.on('line', (line) => {
        let cmd = line.split(' ');
        switch(cmd[0].trim()) {
            case 'rc': {
                break;
            }
            case 'rdi': {
                break;
            }
            case 'wsc': {
                break;
            }
            case 'wmc': {
                break;
            }
            case 'help':
                console.log('rc   read coils from(=0) to(=0)');
                console.log('rdi  read discrete inputs from(=0) to(=0)');
                console.log('wsc  write single coil address(=0) value(=0)');
                console.log('wmc  write multiple coils from(=0) to(=0) values');
                rl.prompt();
                break;
            }
            default:
                console.log('Say what? ...`' + line.trim() + '`');
                rl.prompt();
        }
    }).on('close', () => {
        console.log('Have a great day!');
        process.exit(0);
    });

});


tcpClient.on('error', (err) => {
    console.log(err);
});
