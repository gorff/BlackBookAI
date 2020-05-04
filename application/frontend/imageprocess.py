try:

    import sys
    from tensorflow.keras.preprocessing.image import ImageDataGenerator
    import os
    import json
    dir = os.path.dirname(__file__)
    img_dir = os.path.join(dir, 'uploads')

    IMG_SHAPE  = 150 # Our training data consists of images with width of 150 pixels and height of 150 pixels
    BATCH_SIZE = 1 
    image_gen_val = ImageDataGenerator(rescale=1./255)
    val_data_gen = image_gen_val.flow_from_directory(batch_size=BATCH_SIZE,
                                                    directory=img_dir,
                                                    target_size=(IMG_SHAPE, IMG_SHAPE),
                                                    class_mode='binary')
    batch = val_data_gen[0] # val_data_gen[batch number][image number][channel]
    images=batch[0]
    data = json.dumps({"signature_name": "serving_default", "instances": images.tolist()})

    # send result back to node.js

    dataFile = open(os.path.join(dir, "img_data.json"), "w") 
    dataFile.write(data)
    dataFile.close() 

    print("image processing completed") 
    sys.stdout.flush()

except:
    print(sys.exc_info())
    sys.stdout.flush()
