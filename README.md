# Truth or Dare Discord Bot

## Setup

1. Install Node.js (v18+).
2. Run `npm install` in this folder.
3. Create a bot at https://discord.com/developers/applications
   - Get the **Bot Token** and **Application (Client) ID**.
   - Enable the bot, invite it to your server with `applications.commands` and `bot` scopes (permissions: Send Messages).
4. Set environment variables before running:
   - Windows (PowerShell): `$env:BOT_TOKEN="your_token"; $env:CLIENT_ID="your_client_id"`
   - Mac/Linux: `export BOT_TOKEN="your_token"; export CLIENT_ID="your_client_id"`
5. Run `node index.js`

## Editing Questions/Dares
Edit `data.json` — add/remove entries in the `"truths"` and `"dares"` arrays. No code changes needed. Restart the bot after editing.

## Usage
- `/truth` — bot replies with a random truth question
- `/dare` — bot replies with a random dare
