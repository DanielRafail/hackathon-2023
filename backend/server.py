from flask import Flask, request, redirect
import os
from dotenv import load_dotenv
from base64 import b64encode
from flask_cors import CORS
from flask import abort
from flask_socketio import SocketIO,emit

load_dotenv()

from twitter_api import get_google_searches

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'

CORS(app, resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

messageHistory = []
images = []
socialMediaPosts = []

@socketio.on("connect")
def connected():
	"""event listener when client connects to the server"""
	emit("connect",{"data":f"id: {request.sid} is connected"})
	print(socialMediaPosts)
	emit("WorkMessage", messageHistory)
	emit("WorkFromHomeImages", images)
	socketio.emit("SocialMediaPost", socialMediaPosts)

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

@app.route("/api/social_media_posts", methods=["POST"])
def get_twitter_searches():
    print("sending social media post")
    data = request.get_json()
    socialMediaPosts.clear()
    socialMediaPosts.extend(data)
    socketio.emit("SocialMediaPost", data)
    return {}

      
@app.route("/api/messageHistory", methods=["POST"])
def receive_message_history():
	data = request.get_json()
	print(data)
	messageHistory.extend(data)
	return {}
 
@app.route("/api/sendNewMessage", methods=["POST"])
def receive_new_message():
	data = request.get_json()
	messageHistory.extend(data)
	socketio.emit("WorkMessage", data)
	return {}
 
if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0',) 
	socketio.run(app, debug=True)