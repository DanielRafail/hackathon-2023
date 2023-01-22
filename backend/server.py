from flask import Flask, request
import os
from dotenv import load_dotenv
import requests
from base64 import b64encode
import json
from flask_cors import CORS
from flask import abort
from flask_socketio import SocketIO,emit
import threading
import random

load_dotenv()

from twitter_api import get_google_searches

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'

load_dotenv()
CORS(app, resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on("connect")
def connected():
	"""event listener when client connects to the server"""
	print(request.sid)
	print("client has connected")
	emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

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
	app.run(debug=True, host='0.0.0.0') 
	socketio.run(app, debug=True)
