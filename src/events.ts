import {
  Client,
  GuildMember,
  Message,
  MessageAttachment,
  MessageEmbed,
  TextChannel,
} from 'discord.js';
import * as Canvas from 'canvas';
import { CONFIG } from './globals';

export function onReady(bot: Client) {
  if (!bot.user) {
    return;
  }
  console.log(`${bot.user.tag} is online!`);
  bot.user.setActivity('in the best songs competition', { type: 'COMPETING' });
}

/**
 * Triggered when a member joins a server
 * @param {GuildMember} member iteration for the member's profile
 */
export async function onMemberJoin(member: GuildMember): Promise<Message | Message[]> {
  const normalGuild = member.guild;
  const general = normalGuild.channels.cache.get(CONFIG.welcomeChannelID) as TextChannel;

  Canvas.registerFont('./fonts/Comic Book.otf', { family: 'fontFamily' });

  const canvas = Canvas.createCanvas(700, 300);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage('./DangleWelcome.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // width lower the number = right
  // hight lower the number = lower

  // Slightly smaller text placed above the member's display name
  ctx.font = '30px Comic Book.otf';
  ctx.fillStyle = '#FFA500';
  ctx.fillText('Welcome to the server,', canvas.width / 3.475, canvas.height / 1.325);
  // darker

  // Add an exclamation point here and below
  ctx.fillStyle = '#FFA500';
  ctx.fillText(`${member.displayName}!`, canvas.width / 3.025, canvas.height / 1.135);
  // darker

  ctx.fillStyle = '#000000';
  ctx.fillText(`${member.displayName}!`, canvas.width / 3, canvas.height / 1.15);
  // lighter

  ctx.fillStyle = '#000000';
  ctx.fillText('Welcome to the server,', canvas.width / 3.5, canvas.height / 1.35);
  // lighter

  const memberNumder = member.guild.members.cache.filter((user) => !user.user.bot).size;
  // Add an exclamation point here and below

  ctx.font = '17px Comic Book.otf';
  ctx.fillStyle = '#FFA500';
  ctx.fillText(`You are member number ${memberNumder}`, canvas.width / 1.55, canvas.height / 1.045);
  // darker

  ctx.font = '17x Comic Book.otf';
  ctx.fillStyle = '#000000';
  ctx.fillText(`You are member number ${memberNumder}`, canvas.width / 1.55, canvas.height / 1.05);
  // ligter

  ctx.beginPath();
  ctx.arc(85, 240, 50, 0, Math.PI * 2, true);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
  ctx.drawImage(avatar, 34.5, /* X Axis */
    191.2, /* Y Axis */
    100, /* Image Width */
    100 /* Image Height */);

  const embed = new MessageEmbed();

  embed.files = [new MessageAttachment(canvas.toBuffer(), 'file.png')];

  embed.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`**Welcome ${`<@${member.id}>`}, to Dangle's Tree Fort! <:Fanart3:532849610759208970>**`
      + '\n**`-`[Twitch](https://www.twitch.tv/danglettv)** and **[YouTube]'
      + '(https://www.youtube.com/channel/UCCg8frauKlYVcVHl3FQqyzw)**\n `-`'
      + '**Support the creator of the bot by inviting his bot to your server**\n'
      + '**[Invite KFC Bucket Boi to your server!](https://invite.bucketbot.dev)**');
  embed.setColor('0xf6ff06');
  embed.addField('rules', '**You can read the rules at <#531191604359462919>**'
    + '<:DangleHappy:616843198530322442>\n If you have any questions just DM <@575252669443211264> \n'
    + 'And Finally you can go to <#665347289484623880> and <#664602141142417438> to assign yourself somes roles!'
    + '<:Fanart5:533541779824443392>');
  embed.setFooter('This bot was brought to you by King Of Karma#0069',
    'https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481');
  embed.setImage('attachment://file.png');
  return general.send(`${`${member}`}`, { embed });
}
