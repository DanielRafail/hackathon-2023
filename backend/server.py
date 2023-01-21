from flask import Flask, request
import os
from dotenv import load_dotenv
import requests
from base64 import b64encode
import json
from flask_cors import CORS
from flask import abort

app = Flask(__name__)

load_dotenv()
CORS(app)


# route
@app.route("/route", methods=["GET"])
def route():
    pass

if __name__ == "__main__":
    #do stuff
    app.run(debug=True) 
    