import { CronJob } from 'cron';
import * as slackBot from './slackBot'

export default new CronJob('0 9 * * *', async () => {
    await slackBot.sendScrapeData();
}, null, true, 'America/Los_Angeles');
