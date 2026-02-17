# 🚀 Quick Start: Deploy Houdy to Vercel

## 5-Minute Setup

### Step 1: Push to GitHub (Terminal)
```bash
cd c:/Users/USER/projects/webdev_1
git init
git add .
git commit -m "Initial commit: Houdy app"
git remote add origin https://github.com/YOUR_USERNAME/webdev_1.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel (Browser)
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste: `https://github.com/YOUR_USERNAME/webdev_1.git`
4. Select "Other" as Framework
5. Click "Deploy"
6. Wait 2-3 minutes...
7. ✅ Done! Your URL appears at top

### Step 3: Share Your URL
Your app is now live at: `https://your-project.vercel.app`

---

## What Changed?

✅ **New Files Added:**
- `vercel.json` - Vercel configuration
- `api/index.py` - Backend serverless functions
- `.gitignore` - Hide sensitive files
- `.env.example` - Environment template
- `VERCEL_DEPLOYMENT.md` - Full deployment guide

✅ **Updated Files:**
- `front_end/script.js` - Smart API URL detection (works locally & online)

✅ **How It Works:**
- Frontend and backend deployed together
- When running locally → uses `http://localhost:5000/api`
- When running on Vercel → uses `https://your-url.vercel.app/api`

---

## Test Your Deployment

1. Open your Vercel URL
2. Test login: `john@example.com` / `123456`
3. Try creating an account
4. Search for apartments
5. View special offers

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Can't push to GitHub | Create GitHub Personal Access Token at https://github.com/settings/tokens |
| Vercel deployment fails | Check vercel.json exists in root folder |
| API returns 404 | Make sure you're using the correct Vercel URL |
| Frontend blank | Check browser console (F12) for errors |

---

## Update Your Code After Deployment

1. Make changes in VSCode
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Vercel automatically redeploys!

---

## Next Steps

📖 **For full details**: Read [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

🔧 **For production features**:
- Add real database (MongoDB, PostgreSQL)
- Implement email verification
- Set up custom domain
- Add real Google/Apple OAuth

---

**Need Help?** Check [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for troubleshooting

