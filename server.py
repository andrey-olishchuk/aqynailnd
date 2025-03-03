import http.server
import socketserver
import os

PORT = int(os.environ.get('PORT', 5000))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run_server():
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
            print(f"Serving at port {PORT}")
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"Port {PORT} is already in use. Please free the port or use a different one.")
        else:
            print(f"Error starting server: {e}")
            
if __name__ == "__main__":
    run_server()
