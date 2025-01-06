from flask import Blueprint, request
import os
import requests

blueprint = Blueprint('providers', __name__, url_prefix='/api/providers')

def make_api_request(url, headers, params):
    try:
        response = requests.get(url, headers=headers, params=params)
        return response.json()['data']
    except Exception:
        return {'error': 'API is not available'}, 400
    
def parse_provider_data(data, provider_name):
    parsed = {
        'provider_1': {
            'squareFootage': data.get('squareFootage'),
            'lotSize': round(data.get('lotSizeSqFt', 0) / 43560, 2),
            'yearBuilt': data.get('yearBuilt'),
            'propertyType': data.get('propertyType'),
            'bedrooms': data.get('bedrooms'),
            'bathrooms': data.get('bathrooms'),
            'roomCount': data.get('features', {}).get('roomCount'),
            'septicSystem': data.get('features', {}).get('septicSystem'),
            'lastSalePrice': data.get('lastSalePrice'),
        },
        'provider_2': {
            'squareFootage': data.get('SquareFootage'),
            'lotSize': data.get('LotSizeAcres'),
            'yearBuilt': data.get('YearConstructed'),
            'propertyType': data.get('PropertyType'),
            'bedrooms': data.get('Bedrooms'),
            'bathrooms': data.get('Bathrooms'),
            'septicSystem': data.get('SepticSystem'),
            'lastSalePrice': data.get('LastSalePrice'),
        }
    }
    return parsed.get(provider_name, {})

def handle_provider_data(address, provider_name):
    url = os.getenv(f'URL_{provider_name.upper()}')
    api_key = os.getenv(f'X_API_KEY_{provider_name.upper()}')

    if not url or not api_key:
        return {'error': f'Missing configuration for {provider_name}'}, 500
    
    headers = {
        'Content-Type': 'application/json',
        'X-API-KEY': api_key
    }
    params = {'address': address}
    data = make_api_request(url, headers, params)

    return parse_provider_data(data, provider_name)

@blueprint.route('')
def providers():
    address = request.args.get('address')
    if not address:
        return {'error': 'Address is required'}, 400
    
    data1 = handle_provider_data(address, 'provider_1')
    data2 = handle_provider_data(address, 'provider_2')

    return {"data": [data1, data2]}