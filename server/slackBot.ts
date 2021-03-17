const rp = require("request-promise");
import User from "../model/user";
import wiki from "./wiki";

export const getAccessToken = async (data) => {
  const options = {
    method: "POST",
    uri: "https://slack.com/api/oauth.v2.access",
    form: data,
  };

  const authDetails = await rp(options);
  console.log(JSON.parse(authDetails));
  return JSON.parse(authDetails);
};

export const sendScrappData = async () => {
  try {
    const users = await User.find();
    const scrappData = await wiki();
    users.forEach(async (user) => {
      const data = {
        token: user.accessToken,
        channel: user.userId,
        text: scrappData,
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
