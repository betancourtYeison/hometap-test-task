from unittest.mock import patch
from hometap_api.views.providers import make_api_request

def test_providers_endpoint_without_address(client):
  response = client.get('/api/providers')
  assert response.status_code == 400
  assert response.json == {"error": "Address is required"}

def mock_data(url, headers, params):
  if "provider-1" in url:
    return {
        "squareFootage": 2873,
        "lotSizeSqFt": 2485,
        "yearBuilt": 1995,
        "propertyType": "Townhouse",
        "bedrooms": 5,
        "bathrooms": 3,
        "features": {
            "roomCount": 4,
            "septicSystem": True
        },
        "lastSalePrice": 362690
    }
  elif "provider-2" in url:
     return {
        "SquareFootage": 2873,
        "LotSizeAcres": 0.06,
        "YearConstructed": 1995,
        "PropertyType": "Townhouse",
        "Bedrooms": 5,
        "Bathrooms": 3,
        "RoomCount": 4,
        "SepticSystem": True,
        "LastSalePrice": 362690
    }
  return {"error": "API is not available"}

@patch('hometap_api.views.providers.make_api_request', side_effect=mock_data)
def test_providers_endpoint_with_address(mock_request, client):
    response = client.get('/api/providers?address=123 Main St')
    assert response.status_code == 200
    data = response.json["providers"]

    assert data[0]["1 Square Footage"] == "2.873"
    assert data[0]["2 Lot Size (Acress)"] == 0.06
    assert data[0]["3 Year Built"] == 1995

    assert data[1]["1 Square Footage"] == "2.873"
    assert data[1]["2 Lot Size (Acress)"] == 0.06
    assert data[1]["3 Year Built"] == 1995

@patch('hometap_api.views.providers.requests.get', side_effect=Exception("API error"))
def test_providers_endpoint_with_address(mock_request):
   response = make_api_request("https://property-detail-api/failed", {}, {})
   assert response == ({"error": "API is not available"}, 400)