from flask import Flask
from flaskapp.api.message_routes import message_blueprint
# If using Flask-SocketIO
# from flask_socketio import SocketIO

app = Flask(__name__)
app.register_blueprint(message_blueprint)

# socketio = SocketIO(app)
# Here you would initialize Flask-SocketIO if using WebSockets

if __name__ == '__main__':
    # socketio.run(app, debug=True)  # If using Flask-SocketIO
    app.run(debug=True)

