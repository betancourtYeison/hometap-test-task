from flask import Flask
from hometap_api.views import status, providers
from dotenv import load_dotenv

load_dotenv()

def create_app():
  app = Flask(__name__)

  register_blueprints(app)
  
  return app
  
def register_blueprints(app):
  app.register_blueprint(status.blueprint)
  app.register_blueprint(providers.blueprint)
