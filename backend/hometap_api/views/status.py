from flask import Blueprint

blueprint = Blueprint('status', __name__, url_prefix='/api/status')

@blueprint.route('')
def status():
  return {"message": "hometap API is working"}