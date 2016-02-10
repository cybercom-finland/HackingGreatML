const express = require('express');
const path = require('path');
const app = express();

function serve(where, what) {
  app.get(where, (req, res) => {
    res.sendFile(path.join(__dirname, what));
  });
};

// For static files, we will return them.
app.use(express.static(path.join(__dirname, 'public')));
serve('/lib/svm/svm.js', 'node_modules/svm/lib/svm.js');
serve('/train/indoor.json', 'datasets/sml2010/internalTrainingSet.json');
serve('/train/outdoor.json', 'datasets/sml2010/externalTrainingSet.json');
serve('/test/indoor.json', 'datasets/sml2010/internalTestSet.json');
serve('/test/outdoor.json', 'datasets/sml2010/externalTestSet.json');
serve('/validate/indoor.json', 'datasets/sml2010/internalValidationSet.json');
serve('/validate/outdoor.json', 'datasets/sml2010/externalValidationSet.json');

// For anything else, we will return index.html as is common with
// single page apps.
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(8080);
console.log('Listening in http://localhost:8080');

