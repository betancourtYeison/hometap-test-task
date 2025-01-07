def test_status_endpoint(client):
  response = client.get('/api/status')
  assert response.status_code == 200
  assert response.json == {"message": "hometap API is working"}
