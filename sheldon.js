const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
require('dotenv').config();

// Load quotes
const quotes = JSON.parse(fs.readFileSync('quotes.json', 'utf8'));

// Create bot
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Track recently used quotes per chat to avoid repetition
const recentQuotes = new Map();
const MAX_RECENT = 20; // Don't repeat until 20 other quotes are used

// Smart quote picker - avoids recently used quotes
function getSmartQuote(chatId, category) {
  const categoryKey = `${chatId}_${category}`;
  
  if (!recentQuotes.has(categoryKey)) {
    recentQuotes.set(categoryKey, []);
  }
  
  const recent = recentQuotes.get(categoryKey);
  const available = quotes[category].filter(q => !recent.includes(q));
  
  // If we've used most quotes, reset the recent list
  if (available.length === 0) {
    recent.length = 0;
    return getRandomItem(quotes[category]);
  }
  
  const selected = getRandomItem(available);
  
  // Add to recent list and keep only MAX_RECENT items
  recent.push(selected);
  if (recent.length > MAX_RECENT) {
    recent.shift();
  }
  
  return selected;
}

// Helper function to get random item from array (fallback)
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Welcome message
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 
    `🧪 *SHELDON COOPER BOT* 🧪\n\n` +
    `I'm not insane, my mother had me tested!\n\n` +
    `*Commands:*\n` +
    `/bazinga - BAZINGA!\n` +
    `/fact - Random Sheldon fact\n` +
    `/quote - Random Sheldon quote\n` +
    `/knock - Knock knock knock...\n\n` +
    `Or just send me any message and I'll respond with my superior intellect.`,
    { parse_mode: 'Markdown' }
  );
});

// BAZINGA command
bot.onText(/\/bazinga/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, getSmartQuote(chatId, 'bazinga'));
});

// Fact command
bot.onText(/\/fact/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🔬 ${getSmartQuote(chatId, 'facts')}`);
});

// Quote command
bot.onText(/\/quote/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `💬 "${getSmartQuote(chatId, 'quotes')}"`);
});

// Knock knock knock
bot.onText(/\/knock/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || 'Penny';
  
  bot.sendMessage(chatId, '👊')
    .then(() => new Promise(resolve => setTimeout(resolve, 500)))
    .then(() => bot.sendMessage(chatId, '👊'))
    .then(() => new Promise(resolve => setTimeout(resolve, 500)))
    .then(() => bot.sendMessage(chatId, '👊'))
    .then(() => new Promise(resolve => setTimeout(resolve, 500)))
    .then(() => bot.sendMessage(chatId, name))
    .then(() => new Promise(resolve => setTimeout(resolve, 800)))
    .then(() => bot.sendMessage(chatId, '👊'))
    .then(() => new Promise(resolve => setTimeout(resolve, 500)))
    .then(() => bot.sendMessage(chatId, '👊'))
    .then(() => new Promise(resolve => setTimeout(resolve, 500)))
    .then(() => bot.sendMessage(chatId, '👊'))
    .then(() => new Promise(resolve => setTimeout(resolve, 500)))
    .then(() => bot.sendMessage(chatId, name))
    .then(() => new Promise(resolve => setTimeout(resolve, 800)))
    .then(() => bot.sendMessage(chatId, '👊'))
    .then(() => new Promise(resolve => setTimeout(resolve, 500)))
    .then(() => bot.sendMessage(chatId, '👊'))
    .then(() => new Promise(resolve => setTimeout(resolve, 500)))
    .then(() => bot.sendMessage(chatId, '👊'))
    .then(() => new Promise(resolve => setTimeout(resolve, 500)))
    .then(() => bot.sendMessage(chatId, name));
});

// Random reactions to messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  // Ignore if it's a command
  if (text && text.startsWith('/')) {
    return;
  }
  
  // Respond to 90% of messages (good balance between active and not annoying)
  if (Math.random() > 0.85) {
    return;
  }
  
  // Randomly choose between different response types for more variety
  const responseType = Math.random();
  
  if (responseType < 0.5) {
    // 50% chance: reaction
    bot.sendMessage(chatId, getSmartQuote(chatId, 'reactions'));
  } else if (responseType < 0.7) {
    // 20% chance: fact
    bot.sendMessage(chatId, `🔬 ${getSmartQuote(chatId, 'facts')}`);
  } else if (responseType < 0.9) {
    // 20% chance: quote
    bot.sendMessage(chatId, `💬 "${getSmartQuote(chatId, 'quotes')}"`);
  } else {
    // 10% chance: BAZINGA!
    bot.sendMessage(chatId, getSmartQuote(chatId, 'bazinga'));
  }
});

console.log('🧪 Sheldon Bot is running... BAZINGA!');

