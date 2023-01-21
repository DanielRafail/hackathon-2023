from flask import Flask, request
import os
from dotenv import load_dotenv
import requests
from base64 import b64encode
import json
from flask_cors import CORS
from flask import abort

load_dotenv()

from twitter_api import get_google_searches

app = Flask(__name__)


CORS(app)


# route
@app.route("/route", methods=["GET"])
def route():
    pass

@app.route("/twitter", methods=["GET"])
def get_twitter_searches():
    if request.method == 'GET':
        return get_google_searches()

if __name__ == "__main__":
    #do stuff
    app.run(debug=True) 
    