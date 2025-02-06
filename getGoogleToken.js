const _ = require("lodash");
const _client_secret = require("./client_secret");
if (_.isEmpty(_client_secret)) {
    console.log("No credentials");
    process.exit(0);
}
// proporty name inside of _client_secret dependence from app type in your Google development console.
// for example, type "Web Application" _client_secret.web
// In future need to collect all properties
const { client_id, client_secret } = _client_secret.installed ? _client_secret.installed : _client_secret.web;
const fs = require("fs-extra");
const { google } = require("googleapis");
const open = require("open");
const TOKEN_PATH = "./token.json"
const SCOPES = [/*"https://www.googleapis.com/auth/photoslibrary.readonly", */"https://www.googleapis.com/auth/photoslibrary"];
const express = require("express");
const app = express();
const port = 4000;
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, `http://localhost:${port}/auth`);
let server;

app.get("/auth", async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    oauth2Client.setCredentials(tokens);
    res.send("Authentication successful! You can close this window.");
    console.log("Токен сохранён. Можно запускать скрипты download и delete.");
    server.close();
    process.exit(1);
});

server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    (async () => {
        try {
            const authUrl = oauth2Client.generateAuthUrl({ access_type: "offline", scope: SCOPES });
            console.log(`Перейди по ссылке для авторизации: ${authUrl}`);
            await open(authUrl);
        } catch (error) {
            console.log(error);
            process.exit(0);
        }
    })();
});
