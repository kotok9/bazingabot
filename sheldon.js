const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
require('dotenv').config();

// Load quotes
const quotes = JSON.parse(fs.readFileSync('quotes.json', 'utf8'));

// Create bot
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Helper function to get random item from array
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
  bot.sendMessage(chatId, getRandomItem(quotes.bazinga));
});

// Fact command
bot.onText(/\/fact/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🔬 ${getRandomItem(quotes.facts)}`);
});

// Quote command
bot.onText(/\/quote/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `💬 "${getRandomItem(quotes.quotes)}"`);
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
  
  // 30% chance to respond with a random reaction
  if (Math.random() < 0.3) {
    bot.sendMessage(chatId, getRandomItem(quotes.reactions));
  }
});

console.log('🧪 Sheldon Bot is running... BAZINGA!');

