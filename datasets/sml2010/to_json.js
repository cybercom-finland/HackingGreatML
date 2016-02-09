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
      t: new Number(data[internalTempIndex]),
      h: new Number(data[internalHumidityIndex])
    });
    externalData.push({
      t: new Number(data[externalTempIndex]),
      h: new Number(data[externalHumidityIndex])
    });
  }
  index++;
}).on('close', () => {
  // We have 2765 data items in the example data for internal and
  // for external measurements.

  // You will need:
  // 1. The training set: The algorithm sees this data and learns the model from it.
  // 2. The test set: You test the model against this dataset, to see if your model works at all.
  // 3. The validation set: After you have tuned your model a lot, you will need to check that you haven't simply tuned the model
  //    to implicitly know your test set. The validation set is used after tuning, and the accuracy of the model should be
  //    the same as with the test set.
  
  // Shuffling and dividing into training and test sets.
  // Training set is used to build the model.
  // Test set are data items not in the training set used to check
  // if the model predicts their classes correctly.
  // Validation set is used to prove you haven't accidentally cheated in tuning your model.

  _.shuffle(internalData);
  _.shuffle(externalData);

  const cutoffIndex = Math.floor(internalData.length / 3),
    cutoffIndex2 = Math.floor(internalData.length / 3 * 2),
    internalTrainingSet = internalData.slice(0, cutoffIndex),
    externalTrainingSet = externalData.slice(0, cutoffIndex),
    internalTestSet = internalData.slice(cutoffIndex, cutoffIndex2),
    externalTestSet = externalData.slice(cutoffIndex, cutoffIndex2),
    internalValidationSet = internalData.slice(cutoffIndex2, externalData.length),
    externalValidationSet = externalData.slice(cutoffIndex2, externalData.length);
  
  fs.writeFile('internalTrainingSet.json',
    JSON.stringify(internalTrainingSet, null, 2),
    (error) => console.log);
  fs.writeFile('internalTestSet.json',
    JSON.stringify(internalTestSet, null, 2),
    (error) => console.log);
  fs.writeFile('internalValidationSet.json',
      JSON.stringify(internalValidationSet, null, 2),
      (error) => console.log);
  fs.writeFile('externalTrainingSet.json',
    JSON.stringify(externalTrainingSet, null, 2),
    (error) => console.log);
  fs.writeFile('externalTestSet.json',
    JSON.stringify(externalTestSet, null, 2),
    (error) => console.log);
  fs.writeFile('externalValidationSet.json',
      JSON.stringify(externalValidationSet, null, 2),
      (error) => console.log);
  console.log('Written the files with the temp/humidity data.');
});
