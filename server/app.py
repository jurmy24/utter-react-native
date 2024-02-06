import os
from flask import Flask
from server.api.message_routes import message_blueprint
# If using Flask-SocketIO
# from flask_socketio import SocketIO

print(__name__)

app = Flask(__name__)
app.register_blueprint(message_blueprint)
print("Started server....")

# socketio = SocketIO(app)
# Here you would initialize Flask-SocketIO if using WebSockets

if __name__ == '__main__':
    # flask --app app.py --debug run 
    # socketio.run(app, debug=True)  # If using Flask-SocketIO
    app.run(debug=True)

