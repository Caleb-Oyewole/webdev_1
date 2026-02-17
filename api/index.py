from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__)
CORS(app)

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
    },
    {
        "id": 4,
        "name": "Spacious Family Home",
        "location": "Abuja, Nigeria",
        "price": 750000,
        "rating": 4.9,
        "status": "Live",
        "image": "https://images.unsplash.com/photo-1570129477492-45e003008e2e?q=80&w=600",
        "type": "3+ Bedroom",
        "description": "Perfect for families with excellent amenities"
    },
    {
        "id": 5,
        "name": "Modern Studio Flat",
        "location": "Accra, Ghana",
        "price": 280000,
        "rating": 4.3,
        "status": "Live",
        "image": "https://images.unsplash.com/photo-1493857671505-72967e2e2760?q=80&w=600",
        "type": "Studio",
        "description": "Contemporary design with smart features"
    },
    {
        "id": 6,
        "name": "Student Friendly 1BR",
        "location": "Kampala, Uganda",
        "price": 320000,
        "rating": 4.1,
        "status": "Live",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600",
        "type": "1 Bedroom",
        "description": "Budget-friendly with shared facilities"
    }
]

bookings_db = []

# ==================== ROOT ROUTE ====================

@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        'success': True,
        'message': 'Houdy API Server is running',
        'version': '1.0'
    }), 200

# ==================== AUTHENTICATION ENDPOINTS ====================

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login endpoint"""
    data = request.json if request.json else {}
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()

    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password required'}), 400

    user = next((u for u in users_db if u['email'] == email), None)

    if user and user['password'] == password:
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': {'id': user['id'], 'name': user['name'], 'email': user['email']}
        }), 200

    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401


@app.route('/api/auth/signup', methods=['POST'])
def signup():
    """User signup endpoint"""
    data = request.json if request.json else {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()

    if not name or not email or not password:
        return jsonify({'success': False, 'message': 'All fields required'}), 400

    if any(u['email'] == email for u in users_db):
        return jsonify({'success': False, 'message': 'Email already registered'}), 400

    new_user = {
        'id': max([u['id'] for u in users_db], default=0) + 1,
        'name': name,
        'email': email,
        'password': password
    }
    users_db.append(new_user)

    return jsonify({
        'success': True,
        'message': 'Account created successfully',
        'user': {'id': new_user['id'], 'name': new_user['name'], 'email': new_user['email']}
    }), 201

# ==================== LISTINGS ENDPOINTS ====================

@app.route('/api/listings/all', methods=['GET'])
def get_all_listings():
    """Get all listings"""
    return jsonify({'success': True, 'listings': listings_db}), 200


@app.route('/api/listings/search', methods=['GET'])
def search_listings():
    """Search listings by location and type"""
    location = (request.args.get('location') or '').lower()
    listing_type = (request.args.get('type') or '').lower()

    results = listings_db

    if location:
        results = [l for l in results if location in l['location'].lower()]

    if listing_type:
        results = [l for l in results if listing_type in l['type'].lower()]

    return jsonify({'success': True, 'listings': results}), 200


@app.route('/api/listings/<int:listing_id>', methods=['GET'])
def get_listing(listing_id):
    """Get specific listing"""
    listing = next((l for l in listings_db if l['id'] == listing_id), None)

    if not listing:
        return jsonify({'success': False, 'message': 'Listing not found'}), 404

    return jsonify({'success': True, 'listing': listing}), 200


@app.route('/api/listings', methods=['POST'])
def create_listing():
    """Create new listing (admin only)"""
    data = request.json if request.json else {}
    required = ['name', 'location', 'price', 'type']

    if not all(data.get(field) for field in required):
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400

    new_listing = {
        'id': max([l['id'] for l in listings_db], default=0) + 1,
        'name': data.get('name'),
        'location': data.get('location'),
        'price': data.get('price'),
        'rating': data.get('rating', 4.0),
        'status': data.get('status', 'Live'),
        'image': data.get('image', ''),
        'type': data.get('type'),
        'description': data.get('description', '')
    }
    listings_db.append(new_listing)

    return jsonify({'success': True, 'listing': new_listing}), 201

# ==================== BOOKINGS ENDPOINTS ====================

@app.route('/api/bookings', methods=['POST'])
def create_booking():
    """Create new booking"""
    data = request.json if request.json else {}
    required = ['user_id', 'listing_id', 'check_in', 'check_out']

    if not all(data.get(field) for field in required):
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400

    new_booking = {
        'id': len(bookings_db) + 1,
        'user_id': data.get('user_id'),
        'listing_id': data.get('listing_id'),
        'check_in': data.get('check_in'),
        'check_out': data.get('check_out'),
        'status': 'pending',
        'created_at': datetime.now().isoformat()
    }
    bookings_db.append(new_booking)

    return jsonify({'success': True, 'booking': new_booking}), 201


@app.route('/api/bookings/<int:user_id>', methods=['GET'])
def get_user_bookings(user_id):
    """Get user's bookings"""
    user_bookings = [b for b in bookings_db if b['user_id'] == user_id]
    return jsonify({'success': True, 'bookings': user_bookings}), 200

# ==================== STATISTICS ====================

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get platform statistics"""
    stats = {
        'listings_count': len(listings_db),
        'users_count': len(users_db),
        'bookings_count': len(bookings_db),
        'average_rating': sum(l.get('rating', 0) for l in listings_db) / len(listings_db) if listings_db else 0
    }
    return jsonify({'success': True, 'stats': stats}), 200

# ==================== ERROR HANDLERS ====================

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
