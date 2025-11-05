# 🧪 BAZINGA! Sheldon Bot

A simple Telegram bot that responds with random Sheldon Cooper quotes.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a new Telegram bot:
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Send `/newbot`
   - Follow the instructions
   - Copy your bot token

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your bot token to `.env`:
```
TELEGRAM_BOT_TOKEN=your_actual_token_here
```

5. Run the bot:
```bash
npm start
```

## Commands

- `/start` - Welcome message
- `/bazinga` - Random BAZINGA moment
- `/fact` - Random Sheldon fact
- `/quote` - Random Sheldon quote
- `/knock` - Knock knock knock... Penny!

The bot also has a 30% chance to respond to any non-command message with a snarky Sheldon reaction!

## That's it!

No databases. No complex features. Just pure Sheldon chaos. 🎉

