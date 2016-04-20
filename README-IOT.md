# Summary

This track is about using Amazon IoT, Siemens S7 and Edison board with temperature and humidity sensors. 


# Intel Edison gateway device
Temperature and humidity measurements are made with Intel Edison with arduino comptible board for sensors
![alt tag](http://www.seeedstudio.com/wiki/images/thumb/0/03/Grove_Indoor_Environment_Kit_for_Edison_with_case.JPG/800px-Grove_Indoor_Environment_Kit_for_Edison_with_case.JPG)

More information about sensors here:
[Grove kit](http://www.seeedstudio.com/wiki/Grove_Indoor_Environment_Kit_for_Edison)

# IoT solution

GW is running node.js that reads sensor data every 10 seconds and communicates it with MQTT to AWS platform

In AWS there is implemented IoT service to receive MQTT messages with JSON payload and rules engine rule to save every datapoint to DynamoDB. You can access dynamoDB data with REST inteface using AWS SDK's.

You can test the Amazon IoT Javascript client in JSFiddle. It prints the received values into the browser console:

[https://jsfiddle.net/uuugqy9r/1/](https://jsfiddle.net/uuugqy9r/1/)


