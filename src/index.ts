import { Client, VoiceState, VoiceConnection } from 'discord.js';
import { config } from 'dotenv';

config();

(async function main() {
  const client = new Client();
  let voiceConnection: VoiceConnection | null = null;
  const setConnection = (conn: VoiceConnection | null) => voiceConnection = conn;

  client.on('voiceStateUpdate', (before: VoiceState, after: VoiceState) => {
    if (!before.channel) {
      console.log(`${after.member?.nickname} joined voice channel`);
    } else if (
      before.channelID !== after.channelID
    ) {
      console.log(`${after.member?.nickname} switched voice channel`);
    } else if (!before.streaming && after.streaming) {
      // user started streaming.
      console.log(`${after.member?.nickname} started streaming`);
    }
  });

  client.on('message', async (message) => {
    if (message.author.bot) return;

    else if (message.content === '!ping') {
      message.channel.send('pong');
    } else if (message.content === '!join') {
      message.member?.voice.channel ?
        setConnection(await message.member.voice.channel.join()) :
        message.reply('Please join any voice channel and then call me.');
    } else if (message.content === '!leave' && voiceConnection) {
      voiceConnection.disconnect();
      setConnection(null);
    }
  });

  client.login(process.env.DISCORD_TOKEN);
})();
