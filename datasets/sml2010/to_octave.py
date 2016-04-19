#!/usr/bin/python

import numpy as np
import scipy.io as sio

import json

def convertFile(name):

    with open(name + '.json', 'r') as datafile:
        jsondata = json.loads(datafile.read())
        data = map(lambda l: [l["t"], l["h"]], jsondata)

        print('Creating Octave file for input: ' + name)
        npdata = np.asarray(data)
        sio.savemat(name + '.mat', {name: data})

convertFile('externalTestSet')
convertFile('externalTrainingSet')
convertFile('externalValidationSet')
convertFile('internalTestSet')
convertFile('internalTrainingSet')
convertFile('internalValidationSet')

