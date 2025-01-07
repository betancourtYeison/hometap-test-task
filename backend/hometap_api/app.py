from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from hometap_api.views import status, providers

load_dotenv()

def create_app():
  app = Flask(__name__)

  CORS(app, resources={r"/*": {"origins": [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5002",
    "http://localhost:5002"
  ]}})

  register_blueprints(app)
  
  return app
  
def register_blueprints(app):
  app.register_blueprint(status.blueprint)
  app.register_blueprint(providers.blueprint)
