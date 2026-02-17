# 🚀 Vercel Deployment Guide for Houdy

## Prerequisites
Before deploying to Vercel, ensure you have:
- ✅ GitHub account (free)
- ✅ Vercel account (free)
- ✅ Git installed locally

---

## Step-by-Step Deployment Instructions

### **STEP 1: Initialize Git Repository** (in VSCode Terminal)

```bash
# Navigate to project root
cd c:/Users/USER/projects/webdev_1

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Houdy web app with Flask backend and HTML frontend"
```

---

### **STEP 2: Create GitHub Repository** (Outside VSCode)

1. Go to **https://github.com/new**
2. Fill in repository details:
   - Repository name: `webdev_1` (or your preferred name)
   - Description: "Houdy - Student Accommodation Booking Platform"
   - Choose **Public** or **Private**
   - Click **"Create repository"**

3. Copy the commands GitHub shows you

---

### **STEP 3: Push Code to GitHub** (in VSCode Terminal)

```bash
# Add GitHub remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/webdev_1.git

# Rename branch to main if needed
git branch -M main

# Push code to GitHub
git push -u origin main
```

> If prompted for authentication, create a **Personal Access Token** at https://github.com/settings/tokens

---

### **STEP 4: Deploy to Vercel** (Outside VSCode)

#### **Option A: Automatic (Recommended)**

1. Go to **https://vercel.com/new**
2. Click **"Import Project"**
3. Select **"Import Git Repository"**
4. Paste your GitHub repo URL: `https://github.com/USERNAME/webdev_1`
5. Click **"Continue"**
6. Configure project:
   - **Framework Preset**: Select **"Other"**
   - **Root Directory**: Leave blank (default)
   - Click **"Deploy"**
7. Wait for deployment to complete (2-3 minutes)

#### **Option B: Using Vercel CLI**

```bash
# Install Vercel CLI globally (run once)
npm install -g vercel

# Deploy from project directory
cd c:/Users/USER/projects/webdev_1
vercel
```

---

### **STEP 5: Set Environment Variables** (in Vercel Dashboard)

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add the following variables:

| Variable Name | Value |
|---|---|
| `FLASK_ENV` | `production` |
| `API_URL` | `https://your-vercel-url.vercel.app/api` |

---

### **STEP 6: Update Frontend API URL** (in VSCode)

After deployment, update the frontend to use your Vercel backend:

1. Open `front_end/script.js`
2. Find line 1: `const API_URL = 'http://localhost:5000/api';`
3. Replace with: `const API_URL = 'https://your-vercel-url.vercel.app/api';`

> Get your Vercel URL from your project dashboard (usually displayed at top of page)

---

## Deployment Structure

Your Vercel deployment includes:

```
webdev_1/
├── api/
│   └── index.py              # Backend serverless function
├── front_end/
│   ├── index.html           # Frontend HTML
│   ├── script.js            # Frontend JS (UPDATED!)
│   └── style.css            # Frontend CSS
├── vercel.json              # Vercel configuration
└── README.md
```

---

## Accessing Your Live App

After successful deployment:

1. **Frontend URL**: `https://your-vercel-url.vercel.app`
2. **Backend API**: `https://your-vercel-url.vercel.app/api`
3. **Health Check**: `https://your-vercel-url.vercel.app/api/health`

---

## Testing Your Deployment

### Test Endpoints

```bash
# Health check
curl https://your-vercel-url.vercel.app/api/health

# Get all listings
curl https://your-vercel-url.vercel.app/api/listings/all

# Test login (replace URL)
curl -X POST https://your-vercel-url.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

### Test Frontend

1. Open your Vercel URL in browser
2. Test features:
   - ✅ Navigate between pages
   - ✅ Search for listings
   - ✅ Try login (john@example.com / 123456)
   - ✅ Try signup with new account

---

## Updating Your App

After deployment, to make changes:

1. Edit files locally in VSCode
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```
3. Vercel automatically redeploys (watch in Vercel dashboard)

---

## Troubleshooting

### Issue: "API 404 Not Found"
**Solution**: Verify your API URL is updated in `script.js` with correct Vercel domain

### Issue: "CORS Error"
**Solution**: Backend is already configured with CORS. Check that:
- Your frontend domain is whitelisted
- API calls use correct domain

### Issue: "Static files returning 404"
**Solution**: Ensure `vercel.json` has correct rewrites configuration

### Issue: "Can't connect to backend"
**Solution**: 
1. Check Vercel deployment is complete
2. Test API endpoint directly: `https://your-url/api/health`
3. Verify API_URL in script.js is correct

---

## Important Notes

⚠️ **In-Memory Database**: 
- Data is NOT persisted between deployments
- Each deploy resets the database
- For production, integrate a real database (MongoDB, PostgreSQL, etc.)

⚠️ **Environment Variables**:
- Never commit `.env` files to GitHub
- Always use Vercel dashboard to manage secrets

⚠️ **Cold Starts**:
- First request to your API might take 2-3 seconds
- This is normal for serverless functions

---

## Next Steps for Production

1. **Database Integration**: 
   - Use MongoDB Atlas (free tier available)
   - Or PostgreSQL with Neon
   - Update `api/index.py` to use database

2. **Email Verification**:
   - Add email verification for signups
   - Use SendGrid or similar service

3. **SSL Certificate**: 
   - Vercel provides free HTTPS automatically

4. **Custom Domain**:
   - Buy domain (GoDaddy, Namecheap, etc.)
   - Add to Vercel project settings

5. **Analytics & Monitoring**:
   - Monitor API performance in Vercel dashboard
   - Set up error tracking with Sentry

---

## Vercel Dashboard Features

Once deployed, explore:
- **Deployments**: View all deployment history
- **Analytics**: Monitor traffic and performance
- **Environment Variables**: Manage secrets
- **Domains**: Add custom domains
- **Function Logs**: Debug API errors
- **Usage**: Monitor serverless function usage

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Flask on Vercel**: https://vercel.com/guides/deploying-flask-with-vercel
- **GitHub Help**: https://docs.github.com/en/get-started

---

**Last Updated**: February 17, 2026
**Deployment Version**: 2.0
