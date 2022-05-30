import os
from flask import Flask, redirect, render_template, request
from PIL import Image
import torchvision.transforms.functional as TF
import CNN
import numpy as np
import torch
import pandas as pd
import json
import requests
from flask_cors import CORS, cross_origin



disease_info = pd.read_csv('disease_info.csv' , encoding='cp1252')

model = CNN.CNN(39)    
model.load_state_dict(torch.load("plant_disease_model_1_latest.pt", map_location=torch.device('cpu')))
model.eval()

def prediction(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    input_data = TF.to_tensor(image)
    input_data = input_data.view((-1, 3, 224, 224))
    output = model(input_data)
    output = output.detach().numpy()
    index = np.argmax(output)
    return index

class Disease:
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/submit', methods=['POST'])
@cross_origin(supports_credentials=True)
def submit():
    image = request.files['file']
    filename = image.filename
    file_path = os.path.join('static/uploads', filename)
    image.save(file_path)
    print(file_path)
    pred = prediction(file_path)
    disease = Disease()
    disease.title = disease_info['disease_name'][pred]
    disease.description =disease_info['description'][pred]
    disease.prevent = disease_info['Possible Steps'][pred]
    disease.image_url = disease_info['image_url'][pred]
    return disease.toJSON()
        
if __name__ == '__main__':
    app.run(debug=True)
