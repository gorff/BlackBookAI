# BlackBookAI Codetest.
## Instructions;
- clone repo, and executing docker-compose up should bring the containers online.
- Visit localhost:8080 should show the frontend. Backend is runnning on localhost:8501 if you want to check that out too. 
## Decription
Runs two containers 
- ubuntu base, running node webserver with python and tensorflow image preprocessing
- Tensorflow serving, serving a trained cats/dogs classifier model. (see /application/backend/trainModel.ipynb)
Front end accepts image files of cats (tested with jpg) of any dimension and uses a python script and tensorflow.keras.preprocessing.image.ImageDataGenerator to preprocess the image. 
This data is then sent via the tensorflow serving restful API to the backend for classification. 
The response/classification from the backend is then displayed on the front end.
