"use strict";

const settings = require('./deviceClient/siemensPLC').settings;
const S7Client = require('./deviceClient/siemensPLC').S7Client;

console.log(settings.s7Settings);

const s7Client = new S7Client(settings.s7Settings);

s7Client.on('error', (err) => {
  console.log(err);
});

s7Client.on('m', (data) => {
  console.log(data);
});

s7Client.connect();
s7Client.readDI();
s7Client.readDO();
s7Client.readM();
//s7Client.readDB();
//s7Client.writeDO([0]);
//s7Client.writeM([0]);
