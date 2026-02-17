const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI
    initializeEventListeners();
    loadListings();
    loadStats();
});

function initializeEventListeners() {
    // Auth Buttons
    document.getElementById('login-btn').addEventListener('click', () => {
        document.getElementById('login-modal').classList.remove('hidden');
    });

    document.getElementById('signup-btn').addEventListener('click', () => {
        document.getElementById('signup-modal').classList.remove('hidden');
    });

    document.getElementById('close-login').addEventListener('click', () => {
        document.getElementById('login-modal').classList.add('hidden');
    });

    document.getElementById('close-signup').addEventListener('click', () => {
        document.getElementById('signup-modal').classList.add('hidden');
    });

    // Login Form
    document.getElementById('login-submit').addEventListener('click', async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (data.success) {
                alert('Login successful!');
                localStorage.setItem('user', JSON.stringify(data.user));
                document.getElementById('login-modal').classList.add('hidden');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Error logging in');
        }
    });

    // Signup Form
    document.getElementById('signup-submit').addEventListener('click', async () => {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            if (data.success) {
                alert('Account created successfully!');
                localStorage.setItem('user', JSON.stringify(data.user));
                document.getElementById('signup-modal').classList.add('hidden');
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Error creating account');
        }
    });

    // Search Functionality
    document.getElementById('search-btn').addEventListener('click', async () => {
        const location = document.getElementById('search-location').value;
        const apartmentType = document.getElementById('apartment-type').value;

        if (!location) {
            alert('Please enter a location');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/listings/search?location=${location}&type=${apartmentType}`);
            const data = await response.json();
            displayListings(data.listings);
        } catch (error) {
            console.error('Search error:', error);
            alert('Error searching listings');
        }
    });

    // Navigation
    document.getElementById('tour-btn').addEventListener('click', () => {
        alert('Tour feature coming soon!');
    });

    document.getElementById('explore-more').addEventListener('click', (e) => {
        e.preventDefault();
        loadListings();
    });
}

async function loadListings() {
    try {
        const response = await fetch(`${API_URL}/listings/all`);
        const data = await response.json();
        displayListings(data.listings);
    } catch (error) {
        console.error('Error loading listings:', error);
    }
}

function displayListings(listings) {
    const container = document.getElementById('listings-container');
    container.innerHTML = '';

    listings.forEach(listing => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-3xl p-3 border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer listing-card';
        card.innerHTML = `
            <div class="relative rounded-2xl overflow-hidden h-52 mb-4">
                <span class="absolute top-3 left-3 bg-[#E67E22] text-white text-[9px] font-bold px-3 py-1 rounded-full z-10 uppercase">
                    ${listing.status || 'Live'}
                </span>
                <img src="${listing.image}" class="w-full h-full object-cover" alt="${listing.name}">
            </div>
            <div class="px-2 pb-2">
                <div class="flex justify-between items-center mb-1">
                    <h4 class="font-bold text-sm">${listing.name}</h4>
                    <span class="text-[10px] font-bold bg-zinc-50 px-2 py-1 rounded">⭐ ${listing.rating || 4.5}</span>
                </div>
                <p class="text-zinc-400 text-xs mb-3">${listing.location}</p>
                <p class="text-[#E67E22] font-extrabold text-lg">$${listing.price.toLocaleString()}<span class="text-zinc-400 text-[10px] font-normal">/yr</span></p>
            </div>
        `;
        card.addEventListener('click', () => {
            alert(`Viewing details for ${listing.name}. Click to book!`);
        });
        container.appendChild(card);
    });
}

async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/stats`);
        const data = await response.json();
        document.getElementById('listings-count').textContent = data.listingsCount + '+';
        document.getElementById('students-count').textContent = data.studentsCount + '+';
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}
