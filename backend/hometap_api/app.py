from flask import Flask
from hometap_api.views import status

def create_app():
  app = Flask(__name__)

  register_blueprints(app)
  
  return app
  
def register_blueprints(app):
  app.register_blueprint(status.blueprint)
