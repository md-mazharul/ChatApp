from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from dataStore.dataStore import init_db, save_message

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app)

# Allow both React and Terminal to connect
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize DB
init_db()

@socketio.on('connect')
def handle_connect():
    print("A user connected (React or Terminal)")

@socketio.on('send_message')
def handle_message(data):
    """
    Receives a message from EITHER React or Terminal.
    data looks like: {'sender': 'React', 'text': 'Hello'}
    """
    sender = data.get('sender', 'Unknown')
    text = data.get('text', '')
    
    print(f"[{sender}] says: {text}")

    # 1. Save to MySQL
    save_message(sender, text)

    # 2. Broadcast to EVERYONE (so React sees Terminal's msg, and vice versa)
    emit('receive_message', {'sender': sender, 'text': text}, broadcast=True)

if __name__ == '__main__':
    print("Server running on port 5000...")
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)