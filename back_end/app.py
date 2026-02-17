from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# ==================== ROOT ROUTE ====================

@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        'success': True,
        'message': 'Houdy API Server is running',
        'version': '1.0'
    }), 200

# In-memory databases
users_db = [
    {"id": 1, "name": "John Doe", "email": "john@example.com", "password": "123456"}
]

listings_db = [
    {
        "id": 1,
        "name": "Deluxe Studio",
        "location": "Lagos, Nigeria",
        "price": 450000,
        "rating": 4.5,
        "status": "Live",
        "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600",
        "type": "Studio",
        "description": "Beautiful studio apartment near campus"
    },
    {
        "id": 2,
        "name": "Cozy Apartment",
        "location": "Lagos, Nigeria",
        "price": 350000,
        "rating": 4.2,
        "status": "Live",
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600",
        "type": "1 Bedroom",
        "description": "Perfect for students studying nearby"
    },
    {
        "id": 3,
        "name": "Premium Suite",
        "location": "Ibadan, Nigeria",
        "price": 550000,
        "rating": 4.8,
        "status": "Live",
        "image": "https://images.unsplash.com/photo-1512917774080-9b274b3057bb?q=80&w=600",
        "type": "2 Bedroom",
        "description": "Luxury accommodation with modern amenities"
    }
]

bookings_db = []

# ==================== AUTH ROUTES ====================

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login endpoint"""
    data = request.json if request.json else {}
    email = data.get('email')
    password = data.get('password')

    user = next((u for u in users_db if u['email'] == email and u['password'] == password), None)

    if user:
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email']
            }
        }), 200
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid email or password'
        }), 401


@app.route('/api/auth/signup', methods=['POST'])
def signup():
    """User signup endpoint"""
    data = request.json if request.json else {}
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Check if email already exists
    if any(u['email'] == email for u in users_db):
        return jsonify({
            'success': False,
            'message': 'Email already exists'
        }), 409

    new_user = {
        'id': len(users_db) + 1,
        'name': name,
        'email': email,
        'password': password
    }
    users_db.append(new_user)

    return jsonify({
        'success': True,
        'message': 'Account created successfully',
        'user': {
            'id': new_user['id'],
            'name': new_user['name'],
            'email': new_user['email']
        }
    }), 201


# ==================== LISTINGS ROUTES ====================

@app.route('/api/listings/all', methods=['GET'])
def get_all_listings():
    """Get all listings"""
    return jsonify({
        'success': True,
        'listings': listings_db
    }), 200


@app.route('/api/listings/search', methods=['GET'])
def search_listings():
    """Search listings by location and type"""
    location = (request.args.get('location') or '').lower()
    apartment_type = (request.args.get('type') or '').lower()

    results = listings_db

    if location:
        results = [l for l in results if location in l['location'].lower()]

    if apartment_type and apartment_type != 'select apartment type':
        results = [l for l in results if apartment_type in l['type'].lower()]

    return jsonify({
        'success': True,
        'listings': results
    }), 200


@app.route('/api/listings/<int:listing_id>', methods=['GET'])
def get_listing_details(listing_id):
    """Get specific listing details"""
    listing = next((l for l in listings_db if l['id'] == listing_id), None)

    if listing:
        return jsonify({
            'success': True,
            'listing': listing
        }), 200
    else:
        return jsonify({
            'success': False,
            'message': 'Listing not found'
        }), 404


@app.route('/api/listings', methods=['POST'])
def create_listing():
    """Create a new listing (admin)"""
    data = request.json if request.json else {}

    new_listing = {
        'id': len(listings_db) + 1,
        'name': data.get('name'),
        'location': data.get('location'),
        'price': data.get('price'),
        'rating': 4.5,
        'status': 'Live',
        'image': data.get('image'),
        'type': data.get('type'),
        'description': data.get('description')
    }
    listings_db.append(new_listing)

    return jsonify({
        'success': True,
        'message': 'Listing created',
        'listing': new_listing
    }), 201


# ==================== BOOKINGS ROUTES ====================

@app.route('/api/bookings', methods=['POST'])
def create_booking():
    """Create a new booking"""
    data = request.json if request.json else {}

    new_booking = {
        'id': len(bookings_db) + 1,
        'user_id': data.get('user_id'),
        'listing_id': data.get('listing_id'),
        'check_in': data.get('check_in'),
        'check_out': data.get('check_out'),
        'status': 'Pending',
        'created_at': datetime.now().isoformat()
    }
    bookings_db.append(new_booking)

    return jsonify({
        'success': True,
        'message': 'Booking created',
        'booking': new_booking
    }), 201


@app.route('/api/bookings/<int:user_id>', methods=['GET'])
def get_user_bookings(user_id):
    """Get all bookings for a user"""
    user_bookings = [b for b in bookings_db if b['user_id'] == user_id]

    return jsonify({
        'success': True,
        'bookings': user_bookings
    }), 200


# ==================== STATS ROUTES ====================

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get platform statistics"""
    return jsonify({
        'success': True,
        'listingsCount': len(listings_db),
        'studentsCount': 3897,
        'totalBookings': len(bookings_db)
    }), 200


# ==================== ERROR HANDLING ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'message': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'message': 'Internal server error'
    }), 500


# ==================== HEALTH CHECK ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'success': True,
        'message': 'Server is running',
        'timestamp': datetime.now().isoformat()
    }), 200


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
