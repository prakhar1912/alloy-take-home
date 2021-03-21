import rp from "request-promise";
import { User } from "../model";
import wiki from "./wiki";

export const getAccessToken = async (data) => {
  const options = {
    method: "POST",
    uri: "https://slack.com/api/oauth.v2.access",
    form: data,
  };

  const authDetails = await rp(options);
  return JSON.parse(authDetails);
};

export const sendScrapeData = async () => {
  try {
    const users = await User.find({});
    const scrapeData = await wiki();
    users.forEach(async (user) => {
      const data = {
        token: user.accessToken,
        channel: user.userId,
        text: scrapeData,
      };

      const options = {
        method: "POST",
        uri: "https://slack.com/api/chat.postMessage",
        form: data,
      };

      await rp(options);
    });
  } catch (err) {
    console.log(err);
  }
};
