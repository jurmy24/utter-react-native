from flaskapp import app
from flask import jsonify

@app.route('/')
def home():
    return jsonify({"message": "Welcome to my language learning app!"})
