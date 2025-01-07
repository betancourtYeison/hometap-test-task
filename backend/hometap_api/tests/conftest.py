import pytest
from flask import Flask
from hometap_api.app import create_app

@pytest.fixture
def app():
  app = create_app()
  app.config.update({"TESTING": True})
  return app

@pytest.fixture
def client(app: Flask):
  return app.test_client()
