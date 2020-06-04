'use strict';

const request = require('request');
const util = require('./util');

module.exports.webhook = (event, context, callback) => {
  const token = process.env.BOT_TOKEN;

  const BASE_URL = `https://api.telegram.org/bot${token}/sendMessage`;
  
  const body = JSON.parse(event.body)
  const message = body.message
  const chatId = message.chat.id
  console.log("Body: ",body)

  request.post(BASE_URL).form({ text: util.getQuotes(), chat_id: chatId });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }),
  };

  return callback(null, response);

};

