import * as commando from 'discord.js-commando';
import { exec } from 'child_process';
import { CONFIG } from '../../globals';

// Creates a new class (being the command) extending off of the commando client
export default class addGitCommand extends commando.Command {
  constructor(client: commando.CommandoClient) {
    super(client, {
      name: 'add',
      // This is the group the command is put in
      guildOnly: true,
      group: 'owner',
      // This is the name of set within the group (most people keep this the same)
      memberName: 'add',
      description: 'adds files to the git',
      // Makes command only usable by owners (set in index.js)
      ownerOnly: true,
      args: [
        {
          key: 'add',
          prompt: 'What are you adding',
          type: 'string',
        },
      ],
    });
  }

  // Now to run the actual command, the run() parameters need to be defiend (by types and names)
  public async run(
    msg: commando.CommandoMessage,
    { add }: { add: string },
  ): Promise<any> {
    console.log(`Starting directory: ${process.cwd()}`);
    try {
      console.log(`New directory: ${process.cwd()}`);
    } catch (err) {
      return console.log(`chdir: ${err}`);
    }

    exec(`git add ${add}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return msg.say(
          'I cant add to the repo for some reason...\n'
          + `That reason being \`\`\`${error}\`\`\`\nSo i moved back into \`\`\`${process.cwd()}\`\`\`\nuse \`rbstatus\` To check for files!`,
        );
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);

        return msg.say(`uh oh problemo\n\`\`\`js${stderr}\`\`\``);
      }
      console.log(`stdout: ${stdout}`);
      return msg.say(`\`\`\`Current directory: ${process.cwd()}\`\`\`\nAdded! use \`${CONFIG.prefix}status\` to check files`);
    });

    console.log(`Final directory: ${process.cwd()}`);
    try {
      console.log(`New directory: ${process.cwd()}`);
    } catch (err) {
      console.log(`chdir: ${err}`);
    }
    return console.log('Everything should be added');
  }
}
