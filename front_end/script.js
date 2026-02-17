// Determine API URL based on environment
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : `${window.location.origin}/api`;

// ==================== PAGE NAVIGATION ====================

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });

    // Show selected page
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.remove('hidden');
        page.classList.add('active');
    }
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializePageNavigation();
    initializeAuthForms();
    initializeSocialAuth();
    initializeSearch();
    loadStats();
    loadListings();
    loadSpecialOffers();
});

// ==================== NAVIGATION SETUP ====================

function initializeNavigation() {
    // Navbar logo click
    document.getElementById('nav-logo').addEventListener('click', () => {
        showPage('home-page');
    });

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page + '-page';
            showPage(pageId);
        });
    });
}

function initializePageNavigation() {
    // Login button in navbar
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            showPage('login-page');
        });
    }

    // Signup button in navbar
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            showPage('signup-page');
        });
    }

    // Back buttons
    const backLogin = document.getElementById('back-from-login');
    if (backLogin) {
        backLogin.addEventListener('click', () => {
            showPage('home-page');
        });
    }

    const backSignup = document.getElementById('back-from-signup');
    if (backSignup) {
        backSignup.addEventListener('click', () => {
            showPage('home-page');
        });
    }

    // Switch between login/signup
    const switchSignup = document.getElementById('switch-to-signup');
    if (switchSignup) {
        switchSignup.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('signup-page');
        });
    }

    const switchLogin = document.getElementById('switch-to-login');
    if (switchLogin) {
        switchLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('login-page');
        });
    }

    // Browse listings button
    const browseBtn = document.getElementById('browse-btn');
    if (browseBtn) {
        browseBtn.addEventListener('click', () => {
            showPage('listings-page');
        });
    }

    // Explore more button (optional)
    const exploreMore = document.getElementById('explore-more');
    if (exploreMore) {
        exploreMore.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('special-offers-page');
        });
    }
}

// ==================== AUTHENTICATION ====================

function initializeAuthForms() {
    // Login Form
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email-page').value;
        const password = document.getElementById('login-password-page').value;

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
                showPage('home-page');
                document.getElementById('login-form').reset();
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Error logging in');
        }
    });

    // Signup Form
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email-page').value;
        const password = document.getElementById('signup-password-page').value;
        const termsChecked = document.getElementById('terms-checkbox').checked;

        if (!termsChecked) {
            alert('Please agree to the Terms & Conditions');
            return;
        }

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
                showPage('home-page');
                document.getElementById('signup-form').reset();
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Error creating account');
        }
    });
}

// ==================== SOCIAL AUTHENTICATION ====================

function initializeSocialAuth() {
    // Google Login
    document.getElementById('google-login-btn').addEventListener('click', () => {
        handleGoogleAuth('login');
    });

    // Google Signup
    document.getElementById('google-signup-btn').addEventListener('click', () => {
        handleGoogleAuth('signup');
    });

    // Apple Login
    document.getElementById('apple-login-btn').addEventListener('click', () => {
        handleAppleAuth('login');
    });

    // Apple Signup
    document.getElementById('apple-signup-btn').addEventListener('click', () => {
        handleAppleAuth('signup');
    });
}

function handleGoogleAuth(type) {
    alert(`Google ${type.toUpperCase()} - Coming Soon!\n\nIntegrate Google OAuth 2.0 with your Google Cloud Console credentials.`);
    // In production, implement actual Google OAuth 2.0 flow
    console.log(`Google ${type} initiated`);
}

function handleAppleAuth(type) {
    alert(`Apple ${type.toUpperCase()} - Coming Soon!\n\nIntegrate Sign in with Apple using your Apple Developer account.`);
    // In production, implement actual Apple Sign In flow
    console.log(`Apple ${type} initiated`);
}

// ==================== SEARCH & FILTERS ====================

function initializeSearch() {
    document.getElementById('search-btn').addEventListener('click', performSearch);

    // Allow Enter key to search
    document.getElementById('search-location').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

async function performSearch() {
    const location = document.getElementById('search-location').value;
    const apartmentType = document.getElementById('apartment-type').value;
    const priceRange = document.getElementById('price-range').value;
    const rating = document.getElementById('rating-filter').value;

    if (!location) {
        alert('Please enter a location');
        return;
    }

    try {
        let query = `${API_URL}/listings/search?location=${encodeURIComponent(location)}`;
        if (apartmentType) query += `&type=${encodeURIComponent(apartmentType)}`;

        const response = await fetch(query);
        const data = await response.json();

        let listings = data.listings || [];

        // Apply price filter
        if (priceRange) {
            listings = filterByPrice(listings, priceRange);
        }

        // Apply rating filter
        if (rating) {
            listings = listings.filter(l => (l.rating || 0) >= parseFloat(rating));
        }

        displaySearchResults(listings);
        showPage('listings-page');
    } catch (error) {
        console.error('Search error:', error);
        alert('Error searching listings');
    }
}

function filterByPrice(listings, priceRange) {
    return listings.filter(listing => {
        const price = listing.price;
        switch (priceRange) {
            case '0-200000':
                return price <= 200000;
            case '200000-400000':
                return price > 200000 && price <= 400000;
            case '400000-600000':
                return price > 400000 && price <= 600000;
            case '600000+':
                return price > 600000;
            default:
                return true;
        }
    });
}

function displaySearchResults(listings) {
    const container = document.getElementById('all-listings-container');
    if (!listings || listings.length === 0) {
        container.innerHTML = '<p class="text-zinc-500 col-span-3 text-center">No listings found. Try different filters.</p>';
        return;
    }

    container.innerHTML = listings.map(listing => createListingCard(listing)).join('');
}

// ==================== LISTINGS ====================

async function loadListings() {
    try {
        const response = await fetch(`${API_URL}/listings/all`);
        const data = await response.json();
        displayAllListings(data.listings || []);
    } catch (error) {
        console.error('Error loading listings:', error);
    }
}

function displayAllListings(listings) {
    const container = document.getElementById('all-listings-container');
    if (listings.length === 0) {
        container.innerHTML = '<p class="text-zinc-500">No listings available.</p>';
        return;
    }

    container.innerHTML = listings.map(listing => createListingCard(listing)).join('');
}

function createListingCard(listing) {
    return `
        <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div class="relative h-56 overflow-hidden">
                <span class="absolute top-4 left-4 bg-[#E67E22] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    ${listing.status || 'Live'}
                </span>
                <img src="${listing.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt="${listing.name}">
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h4 class="font-extrabold text-lg">${listing.name}</h4>
                        <p class="text-zinc-500 text-sm">${listing.location}</p>
                    </div>
                    <span class="text-xs font-bold bg-zinc-100 px-2 py-1 rounded">⭐ ${listing.rating || 4.5}</span>
                </div>
                <p class="text-xs text-zinc-400 mb-3 line-clamp-2">${listing.description || 'Modern student accommodation'}</p>
                <div class="border-t border-zinc-200 pt-3">
                    <p class="text-[#E67E22] font-extrabold text-xl">$${listing.price?.toLocaleString() || 'N/A'}<span class="text-zinc-400 text-xs font-normal">/yr</span></p>
                </div>
                <button class="w-full mt-3 bg-[#E67E22] text-white py-2 rounded-lg font-bold hover:bg-[#D35400] transition text-xs">
                    View Details
                </button>
            </div>
        </div>
    `;
}

// ==================== SPECIAL OFFERS ====================

async function loadSpecialOffers() {
    try {
        const response = await fetch(`${API_URL}/listings/all`);
        const data = await response.json();
        // Filter for special offers (featured listings)
        const offers = (data.listings || []).slice(0, 3);
        displaySpecialOffers(offers);
    } catch (error) {
        console.error('Error loading special offers:', error);
    }
}

function displaySpecialOffers(offers) {
    const container = document.getElementById('special-offers-container');
    if (offers.length === 0) {
        container.innerHTML = '<p class="text-zinc-500">No special offers available.</p>';
        return;
    }

    container.innerHTML = offers.map(offer => `
        <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#E67E22]">
            <div class="relative h-56 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-[#E67E22]/20 to-transparent"></div>
                <span class="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
                    🔥 SPECIAL OFFER
                </span>
                <img src="${offer.image}" class="w-full h-full object-cover" alt="${offer.name}">
            </div>
            <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h4 class="font-extrabold text-lg">${offer.name}</h4>
                        <p class="text-zinc-500 text-sm">${offer.location}</p>
                    </div>
                    <span class="text-xs font-bold bg-orange-100 text-[#E67E22] px-2 py-1 rounded">⭐ ${offer.rating || 4.5}</span>
                </div>
                <p class="text-zinc-600 text-sm mb-4">Limited time offer - Book now and save!</p>
                <div class="bg-orange-50 p-3 rounded-lg mb-3 text-center">
                    <p class="text-[#E67E22] font-extrabold text-2xl">20% OFF</p>
                    <p class="text-xs text-zinc-600">This month only</p>
                </div>
                <p class="text-[#E67E22] font-extrabold text-lg mb-3">$${offer.price?.toLocaleString() || 'N/A'}<span class="text-zinc-400 text-xs font-normal">/yr</span></p>
                <button class="w-full bg-[#E67E22] text-white py-2 rounded-lg font-bold hover:bg-[#D35400] transition text-xs">
                    Claim Offer
                </button>
            </div>
        </div>
    `).join('');
}

// ==================== STATISTICS ====================

async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/stats`);
        const data = await response.json();
        document.getElementById('listings-count').textContent = (data.listingsCount || 542) + '+';
        document.getElementById('students-count').textContent = (data.studentsCount || 3897) + '+';
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// ==================== UTILITY FUNCTIONS ====================

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Store user session
function setUserSession(user) {
    localStorage.setItem('user', JSON.stringify(user));
    updateUIForLoggedInUser();
}

function getStoredUser() {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
}

function updateUIForLoggedInUser() {
    const user = getStoredUser();
    if (user) {
        document.getElementById('login-btn').textContent = `Hi, ${user.name}`;
        document.getElementById('signup-btn').textContent = 'Logout';
        document.getElementById('signup-btn').addEventListener('click', () => {
            localStorage.removeItem('user');
            location.reload();
        });
    }
}

// Initialize user session on page load
window.addEventListener('load', () => {
    updateUIForLoggedInUser();
});

// Smooth scroll for anchors
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

console.log('✅ Houdy App Loaded Successfully!');
