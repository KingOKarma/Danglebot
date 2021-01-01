import { Client } from 'discord.js-commando';
import path from 'path';
import { onMemberJoin, onReady } from './events';
import { CONFIG } from './globals';

async function main() {
  const bot = new Client({
  // My choses prefix is "c." you can choose anything you want!
    commandPrefix: CONFIG.prefix,
    owner: CONFIG.owners,

  });

  // Runs the function defined in ./events
  bot.on('ready', () => onReady(bot));

  bot.on('guildMemberAdd', onMemberJoin);


  // registers all groups/commands/etc
  // NOTE when adding new groups make sure to delete "build"
  // so when you compile nohthing breaks
  bot.registry.registerGroups([
    ['simple'],
    ['event emiters'],
    ['owner']
  ]).registerDefaults()
    .registerCommandsIn(
      path.join(__dirname, 'commands'),
    );

  await bot.login(CONFIG.token);
}

main().catch(console.error);
