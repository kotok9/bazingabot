# 🚀 Deploying Sheldon Bot to VPS (Ubuntu 24)

Complete guide to deploy your Sheldon bot using GitHub, SSH, and PM2.

---

## 📋 Prerequisites

- Ubuntu 24 VPS with SSH access
- GitHub account
- Telegram bot token from @BotFather

---

## 1️⃣ Push Code to GitHub

### On your local machine:

```bash
# Initialize git repo (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Sheldon bot"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/sheldon-bot.git
git branch -M main
git push -u origin main
```

**Note:** Make sure `.gitignore` is set up (it already is - excludes `.env` and `node_modules`)

---

## 2️⃣ SSH into Your VPS

```bash
ssh your_username@your_vps_ip
```

Example:
```bash
ssh root@123.45.67.89
```

---

## 3️⃣ Install Node.js (if not installed)

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

---

## 4️⃣ Install PM2 Globally

```bash
sudo npm install -g pm2
```

Verify:
```bash
pm2 --version
```

---

## 5️⃣ Clone Your Bot from GitHub

```bash
# Navigate to where you want the bot
cd ~

# Clone the repo
git clone https://github.com/YOUR_USERNAME/sheldon-bot.git

# Enter the directory
cd sheldon-bot
```

---

## 6️⃣ Install Dependencies

```bash
npm install
```

---

## 7️⃣ Set Up Environment Variables

Create the `.env` file from the example:

```bash
cp env.example .env
nano .env
```

Add this line (replace with your actual token):
```
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
```

**Save and exit:**
- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

---

## 8️⃣ Start Bot with PM2

```bash
# Start the bot
pm2 start sheldon.js --name sheldon-bot

# Check status
pm2 status
```

You should see:
```
┌─────┬──────────────┬─────────────┬─────────┬─────────┬──────────┐
│ id  │ name         │ mode        │ ↺       │ status  │ cpu      │
├─────┼──────────────┼─────────────┼─────────┼─────────┼──────────┤
│ 0   │ sheldon-bot  │ fork        │ 0       │ online  │ 0%       │
└─────┴──────────────┴─────────────┴─────────┴─────────┴──────────┘
```

---

## 9️⃣ Useful PM2 Commands

```bash
# View logs
pm2 logs sheldon-bot

# View logs (last 50 lines)
pm2 logs sheldon-bot --lines 50

# Stop the bot
pm2 stop sheldon-bot

# Restart the bot
pm2 restart sheldon-bot

# Delete from PM2
pm2 delete sheldon-bot

# Monitor in real-time
pm2 monit
```

---

## 🔟 Make PM2 Auto-Start on Server Reboot

```bash
# Generate startup script
pm2 startup

# This will show you a command to run - copy and paste it
# It will look something like:
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u your_user --hp /home/your_user

# Save current PM2 process list
pm2 save
```

Now your bot will automatically start when the VPS reboots! 🎉

---

## 🔄 Updating Your Bot (Future Updates)

When you make changes and want to deploy:

### On your local machine:
```bash
git add .
git commit -m "Update quotes"
git push
```

### On your VPS:
```bash
# Navigate to bot directory
cd ~/sheldon-bot

# Pull latest changes
git pull

# Restart the bot
pm2 restart sheldon-bot

# Check logs to make sure it's working
pm2 logs sheldon-bot --lines 20
```

---

## 🐛 Troubleshooting

### Bot not responding?
```bash
# Check if it's running
pm2 status

# Check logs for errors
pm2 logs sheldon-bot
```

### Port/Permission errors?
```bash
# Make sure the bot token is correct
cat .env

# Restart
pm2 restart sheldon-bot
```

### Pull request failed?
```bash
# If you have local changes conflicting
git stash
git pull
git stash pop
```

---

## 📊 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Process info
pm2 info sheldon-bot

# CPU and memory usage
pm2 list
```

---

## 🎉 You're Done!

Your Sheldon bot is now:
- ✅ Running on your VPS
- ✅ Managed by PM2
- ✅ Auto-restarts on crashes
- ✅ Auto-starts on server reboot
- ✅ Easy to update via GitHub

**BAZINGA!** Your bot is live! 🧪

---

## 💡 Pro Tips

1. **Use `pm2 logs -f`** to follow logs in real-time while testing
2. **Set up GitHub Actions** for auto-deployment (advanced)
3. **Use `pm2 plus`** for free monitoring dashboard (optional)
4. **Backup your `.env` file** somewhere safe (don't commit it!)

---

## 🔐 Security Note

Never commit your `.env` file to GitHub! The `.gitignore` already excludes it, but double-check:

```bash
git status
```

If `.env` appears, remove it:
```bash
git rm --cached .env
git commit -m "Remove .env from tracking"
```

