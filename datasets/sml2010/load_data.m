# This example loads the generated MAT files into Octave and plots one of them.
load("externalTrainingSet.mat")
load("externalTestSet.mat")
load("externalValidationSet.mat")
load("internalTrainingSet.mat")
load("internalTestSet.mat")
load("internalValidationSet.mat")
scatter(externalTrainingSet(:,1), externalTrainingSet(:,2))

