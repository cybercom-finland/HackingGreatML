const _ = require('lodash');
const readline = require('readline');
const fs = require('fs');
const readStream = fs.createReadStream('NEW-DATA-1.T15.txt');

const lineReader = readline.createInterface({
  terminal: false,
  input: readStream
});

console.log('Reading temperature and humidity values for internal and external measurements...');

const internalTempIndex = 2;
const internalHumidityIndex = 7;
const externalTempIndex = 21;
const externalHumidityIndex = 22;

var index = 0;
var internalData = [];
var externalData = [];
lineReader.on('line', (line) => {
  if (index > 0) {
    const data = line.split(' ');
    internalData.push({
      t: data[internalTempIndex],
      h: data[internalHumidityIndex]
    });
    externalData.push({
      t: data[externalTempIndex],
      h: data[externalHumidityIndex]
    });
  }
  index++;
}).on('close', () => {
  // We have 2765 data items in the example data for internal and
  // for external measurements.

  // Shuffling and dividing into training and test sets.
  // Training set is used to build the model.
  // Test set are data items not in the training set used to check
  // if the model predicts their classes correctly.

  // Note that in real life you also need a validation set
  // to make sure you haven't simply made your parameters learn the test set.

  _.shuffle(internalData);
  _.shuffle(externalData);
  const cutoffIndex = Math.floor(internalData.length / 2);
  const internalTrainingSet = internalData.slice(0, cutoffIndex);
  const internalTestSet = internalData.slice(cutoffIndex, externalData.length);
  const externalTrainingSet = externalData.slice(0, cutoffIndex);
  const externalTestSet = externalData.slice(cutoffIndex, externalData.length);
  fs.writeFile('internalTrainingSet.json',
    JSON.stringify(internalTrainingSet, null, 2),
    (error) => console.log);
  fs.writeFile('internalTestSet.json',
    JSON.stringify(internalTestSet, null, 2),
    (error) => console.log);
  fs.writeFile('externalTrainingSet.json',
    JSON.stringify(externalTrainingSet, null, 2),
    (error) => console.log);
  fs.writeFile('externalTestSet.json',
    JSON.stringify(externalTestSet, null, 2),
    (error) => console.log);
  console.log('Written the files with the temp/humidity data.');
});
