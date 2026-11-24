"""Dependency-free local portfolio routes."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import argparse

ROOT = Path(__file__).resolve().parent.parent


class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        path = urlsplit(self.path).path
        if path in ("/", "/index.html"):
            self.path = "/frontend/src/pages/index.html"
        elif not path.startswith(("/frontend/", "/src/")):
            self.send_error(404)
            return
        resolved = Path(self.translate_path(self.path)).resolve()
        allowed = (ROOT / "frontend", ROOT / "src")
        if not any(resolved.is_relative_to(folder) for folder in allowed):
            self.send_error(404)
            return None
        return super().send_head()

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()


def run():
    parser = argparse.ArgumentParser(description="Serve the portfolio locally")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), PortfolioHandler)
    print(f"Portfolio: http://127.0.0.1:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
