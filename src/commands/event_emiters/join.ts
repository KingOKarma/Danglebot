import { Message } from 'discord.js';
import * as commando from 'discord.js-commando';

// Creates a new class (being the command) extending off of the commando client
export default class JoinEventCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'join',
      // This is the group the command is put in
      guildOnly: true,
      group: 'event emiters',
      // This is the name of set within the group (most people keep this the same)
      memberName: 'join',
      description: 'emits the "guildMemberAdd" event',
      // Makes command only usable by owners (set in index.js)
      ownerOnly: true,
    });
  }

  // Now to run the actual command, the run() parameters need to be defiend (by types and names)
  public async run(
    msg: commando.CommandoMessage,
  ): Promise<Message | Message[]> {
    this.client.emit('guildMemberAdd', msg.member);
    return msg.say('Emited the guildMemberAdd event!');
  }
}
