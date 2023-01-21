import json
from flask import abort

def is_json(myjson):
  try:
    json.loads(myjson)
  except Exception as e:
    return False
  return True


def verifyAPIResponse(jsonResponse, caller):
    if jsonResponse.status_code > 300 or jsonResponse.status_code < 200 or is_json(jsonResponse.text) == False:
        print("API error from: " + caller + " => ")
        print(jsonResponse.text)
        abort(404)