### Install using npm

`npm install -g serverless`

### Configure

`export AWS_ACCESS_KEY_ID=<your-key-here>`
`export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>`

`serverless`

### deploy 

Run from the same directory where we have the `serverless.yaml` file

`serverless deploy`

### Setting up Telegram 

Set the webhook

`curl https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<AWS_API_GATEWAY_URL>`

Check the webhook

`curl https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo`

Delete the webhook

`curl https://api.telegram.org/bot<BOT_TOKEN>/deleteWebhook`