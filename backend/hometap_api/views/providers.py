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
            '1 Square Footage': "{:.3f}".format(data.get('squareFootage') / 1000) if data.get('squareFootage') is not None else None,
            '2 Lot Size (Acress)': round(data.get('lotSizeSqFt', 0) / 43560, 2),
            '3 Year Built': data.get('yearBuilt'),
            '4 Property Type': data.get('propertyType'),
            '5 Bedrooms': data.get('bedrooms'),
            '6 Bathrooms': data.get('bathrooms'),
            '7 Room Count': data.get('features', {}).get('roomCount'),
            '8 Septic System': data.get('features', {}).get('septicSystem'),
            '9 Sale Price': "${:.3f}".format(data.get('lastSalePrice') / 1000) if data.get('lastSalePrice') is not None else None
        },
        'provider_2': {
            '1 Square Footage': "{:.3f}".format(data.get('SquareFootage') / 1000) if data.get('SquareFootage') is not None else None,
            '2 Lot Size (Acress)': data.get('LotSizeAcres'),
            '3 Year Built': data.get('YearConstructed'),
            '4 Property Type': data.get('PropertyType'),
            '5 Bedrooms': data.get('Bedrooms'),
            '6 Bathrooms': data.get('Bathrooms'),
            '7 Room Count': data.get('RoomCount'),
            '8 Septic System': data.get('SepticSystem'),
            '9 Sale Price': "${:.3f}".format(data.get('LastSalePrice') / 1000) if data.get('LastSalePrice') is not None else None
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

    return {"providers": [data1, data2]}