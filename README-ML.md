# Summary
This is a basic example for using Support Vector Machines in machine learning.

# Support Vector Machines

[A great summary about SVMs](http://pages.cs.wisc.edu/~jerryzhu/cs540/handouts/hearst98-SVMtutorial.pdf)

## Theory

Support Vector Machine is a really simple, very general machine learning algorithm. It can be used to
classify continuous valued data into two categories based on given examples.

Support Vector Machine has been called one
of the few truly black box intelligent algorithms, that is, an algorithm that does not require much tuning
or data modelling. It has great numerical properties, always converges and is pretty much idiot proof.

Support Vector Machine works by embedding the input data vectors into very high dimensional (as many dimensions
as there are training data points) "feature space".
The feature space is defined by using a "kernel trick", that is, each dimension in the feature space is
simply a distance to the respective input data point mapped through a gaussian (or some other) function.

Note, the next matrices and vectors and the equal signs look a bit weird, because Markdown does
not support proper mathematical notation very well. So .= and weird tables it is.

So, considering a data matrix with 3 measurements (a, b, c) of 2D input data (the column vectors are input data vectors):

    |    |    |
--- | --- | --- |
 **a**  |  **b**  |  **c**  |

 .=

    |    |    |
--- | --- | --- |
 1  |  2  |  3  |
 1  |  1  |  1  |

Then the 3 training data points in the feature space matrix would be 3D (g is the gaussian bell function):

          |          |           |
   ---     |    ---     |    ---     |
g(\|**a**-**a**\|) | g(\|**b**-**a**\|) | g(\|**c**-**a**\|) |
g(\|**a**-**b**\|) | g(\|**b**-**b**\|) | g(\|**b**-**c**\|) |
g(\|**a**-**c**\|) | g(\|**b**-**c**\|) | g(\|**c**-**c**\|) |

 .=

     |      |     |
 --- |  --- |  ---  |
g(0) | g(1) |  g(2) |
g(1) | g(0) |  g(1) |
g(2) | g(2) |  g(0) |

In this higher dimensional space it is possible to define a single hyperplane to divide the training data points
into two parts, the ones that belong to the given category and the ones that don't.

The SVM algorithm defines such a hyperplane through linear programming methods so that the hyperplane is a "maximum margin
separation hyperplane". Classification becomes a simple test of whether the embedded data point lies on the positive
or the negative side of that hyperplane.

After defining the SVM with the training set, the SVM can be used to classify new data points. You simply need to
embed the new points to the original feature space (that is, measure the distances to each of the training points and
map through the gaussian), and then check which side of the learned maximum margin separation hyperplane does the new point
fall to.

Luckily there are libraries to do all the above for you, even though this is very simple as far as machine learning
algorithms go.

## Practice

Always when you use machine learning algorithms, you need three sets of data:

 1. Training set, to train your algorithm with.
 2. Test set, to test with different data that your algorithm works and is well parametrized.
 3. Validation set, after you have trained your system and found good parameters with testing, you need to test
    the final system with new data again to make sure you haven't simply taught your test set data to the system
    with your parametrization.

This is to prevent overfitting. Overfitting is a fundamental property of all learning algorithms. It means the
algorithm only learns the data you have "by heart", without learning the higher level patterns that allow the algorithm to
properly classify the new, previously unseen data.

Overfitting is tested by giving the system new, previously unseen data. If the system performs significantly worse
with this new validation data, than with the test data, then the system has overfitted, and everything should be thrown
to trash.

## Where to Go from Here

For classifying data points into more than two classes, you can either use hierarchical classification (reclassifying a subclass), or for example Support Vector Clustering.

Embedding data in a higher dimensional space is a good general trick to simplify the extraction of relevant features
from the data. In a way this can be thought of as separating the nonlinear features from data points into somewhat
more linear feature spaces. This can be useful also for example in encoding symbolic time series, embedding the intervals
to previous symbol classes (a part of my personal research at the moment regarding interleaved symbolic time series).

If your input data is not continuous valued numbers, but is for example symbolic, then you need different kinds of
classifying algorithms.

There is more to machine learning than classification. For example continual prediction is important when you need to
predict the future.

Deep neural networks, including Deep Belief Networks (Hinton et al.), Long Short-Term Memory, Convolutional Neural Networks (Ng. et al.) are a very active field in research. Both reinforced learning and
transfer learning are relatively new fields allowing significantly smaller learning data amounts while still
extracting working models.

In general, machine learning is divided to supervised learning (you give training examples), unsupervised learning
(no training examples, the system learns some structure from the raw data without guidance), and reinforced learning (where the system can experiment and gets rewards and punishments).

## The Example Code

The example dataset is downloaded from the internet and can be found from
[datasets](./datasets) directory. It lists temperature and humidity values measured
from different places, some indoors and some outdoors. The small
utilities in the datasets directory can be used to parse and convert
the data to JSON for use in the frontend, and to Octave MAT files
for analysis. The data is already converted for convenience.

You can load the data into Octave and plot it by writing `load_data`
in Octave ([load_data.m](./datasets/sml2010/load_data.m)).

The node.js server just serves the static HTML files and the JSON
example data files. The beef is in the [index.html](./public/index.html) file, executed on frontend.

The example code in frontend uses the SVM.js library to train the SVM
against the training set data. The data is graphed using Google Charts.

After the SVM has been trained, it is run against the test set data to
verify its accuracy. SVM parameters can be tuned to improve the accuracy
against the test set.

After tuning, the validation set of data should be used to verify that
the model performs well for new data also.

The code only uses the first 100 datapoints, because using more will
take a while and browser "this web page is not responding" will trigger.
If you want, you can try moving the heavy processing into a web worker thread.

## Connecting to real-time IoS data

As a fun little exercise, you can collect a training set data from the real sensor in the IoT track,
and label the data based on whether it was measured from inside the sauna
or from the conference room.

Then you can run the model against real-time IoS data to flag the current
situation as "inside sauna" or "in the conference room".

You can also use the visualization track to plot the data.
