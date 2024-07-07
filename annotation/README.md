# Annotation home task

This React APP is help user to upload image, predict image and show the result of predictions.

# Setup:
npm install

npm run build

# Start Json server:
navigate to /assets

json-server --watch db.json 

Json server will start a localhost:3000 ( make sure it's hosting on port 3000 otherwise code will break)

# Start React
npm start ( start react at different port )


# Note:
This application doesn't call any API , so it only load initial image data from a local json 
file, and use state to cache any update on images.

Predictions results are stored on json server

To make it look better, I have hard coded that whenever user upload a new image, it will just use an apple image I saved
in the public. And when a prediction triggered for this apple image, a hard coded prediction result will be loaded. 


