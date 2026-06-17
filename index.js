// index.js
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.BOT_TOKEN; // put your bot token in env variable
const CLIENT_ID = process.env.CLIENT_ID; // your bot's application/client ID

// Load truths and dares from JSON file
function loadData() {
  const raw = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
  return JSON.parse(raw);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define slash commands
const commands = [
  new SlashCommandBuilder()
    .setName('truth')
    .setDescription('Get a random truth question'),
  new SlashCommandBuilder()
    .setName('dare')
    .setDescription('Get a random dare'),
].map(cmd => cmd.toJSON());

// Register slash commands (run once, or whenever commands change)
async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  try {
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log('Slash commands registered.');
  } catch (err) {
    console.error(err);
  }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const data = loadData();

  if (interaction.commandName === 'truth') {
    const truths = data.truths;
    const pick = truths[Math.floor(Math.random() * truths.length)];
    await interaction.reply(`🧠 **Truth:** ${pick}`);
  }

  if (interaction.commandName === 'dare') {
    const dares = data.dares;
    const pick = dares[Math.floor(Math.random() * dares.length)];
    await interaction.reply(`🔥 **Dare:** ${pick}`);
  }
});

registerCommands();
client.login(TOKEN);
