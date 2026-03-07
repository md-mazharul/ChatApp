import mysql.connector
from mysql.connector import Error

# 1. CORRECT CREDENTIALS APPLIED HERE
DB_CONFIG = {
    'host': 'localhost',
    'user': 'chatuser',      # <--- Your specific user
    'password': '1234',      # <--- Your password
    'database': 'chat'
}

def init_db():
    """Initializes the database and table."""
    try:
        # Connect to MySQL Server (No DB selected) to create the DB if needed
        temp_conn = mysql.connector.connect(
            host=DB_CONFIG['host'], 
            user=DB_CONFIG['user'], 
            password=DB_CONFIG['password']
        )
        cur = temp_conn.cursor()
        cur.execute("CREATE DATABASE IF NOT EXISTS chat")
        cur.close()
        temp_conn.close()

        # Connect to the 'chat' Database and create Table
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        # --- ADD THIS LINE TO WIPE OUT THE OLD TABLE ---
        cursor.execute("DROP TABLE IF EXISTS chat")
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS chat (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                sender VARCHAR(50), 
                message TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
        conn.close()
        print("Database initialized successfully.")
    except Error as e:
        print(f"DB Error: {e}")

def save_message(sender, message):
    """Saves a single message to the DB."""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        query = "INSERT INTO chat (sender, message) VALUES (%s, %s)"
        cursor.execute(query, (sender, message))
        conn.commit()
        conn.close()
        print(f"Saved to DB: [{sender}] {message}")
    except Error as e:
        print(f"Failed to save: {e}")