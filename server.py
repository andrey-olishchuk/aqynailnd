import http.server
import socketserver
import os

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

def run_server(port=3000):
    try:
        with socketserver.TCPServer(("0.0.0.0", port), Handler) as httpd:
            print(f"Server started at http://0.0.0.0:{port}")
            httpd.serve_forever()
    except OSError as e:
        print(f"Error starting server: {e}")

if __name__ == "__main__":
    run_server()