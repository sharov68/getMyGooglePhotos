const _ = require("lodash");
const client_secret = require("./client_secret");

if (_.isEmpty(client_secret)) {
    console.log("No credentials");
    process.exit(0);
}

const fs = require("fs-extra");
const { google } = require("googleapis");
const open = require("open");
const axios = require("axios");
const ora = require("ora");
const TOKEN_PATH = "./token.json"
const DOWNLOAD_FOLDER = "./GooglePhotosBackup"
/*
const SCOPES = ["https://www.googleapis.com/auth/photoslibrary.readonly"];
const TOKEN_PATH = process.env.TOKEN_PATH || "./token.json";
const DOWNLOAD_FOLDER = process.env.DOWNLOAD_FOLDER || "./GooglePhotosBackup";

async function authenticate() {
    const auth = new google.auth.OAuth2(
        "YOUR_CLIENT_ID",
        "YOUR_CLIENT_SECRET",
        "http://localhost"
    );

    if (fs.existsSync(TOKEN_PATH)) {
        auth.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8")));
        return auth;
    }

    const authUrl = auth.generateAuthUrl({ access_type: "offline", scope: SCOPES });
    console.log(`Перейди по ссылке для авторизации: ${authUrl}`);
    await open(authUrl);

    const { code } = await new Promise((resolve) => {
        process.stdin.once("data", (data) => resolve({ code: data.toString().trim() }));
    });

    const { tokens } = await auth.getToken(code);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    auth.setCredentials(tokens);

    return auth;
}

async function listMedia(auth) {
    const service = google.photoslibrary({ version: "v1", auth });
    let mediaItems = [];
    let nextPageToken = null;

    console.log("📸 Загружаем список фото...");
    do {
        const response = await service.mediaItems.list({ pageSize: 100, pageToken: nextPageToken });
        mediaItems = mediaItems.concat(response.data.mediaItems || []);
        nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    return mediaItems;
}

async function downloadMedia(mediaItems) {
    await fs.ensureDir(DOWNLOAD_FOLDER);
    const spinner = ora("Скачивание фото...").start();

    for (const item of mediaItems) {
        const url = `${item.baseUrl}=d`; // Полный размер
        const filename = `${DOWNLOAD_FOLDER}/${item.filename}`;
        const response = await axios.get(url, { responseType: "stream" });
        response.data.pipe(fs.createWriteStream(filename));
        await new Promise((resolve) => response.data.on("end", resolve));
    }

    spinner.succeed("✅ Все фото скачаны!");
}

(async () => {
    const auth = await authenticate();
    const mediaItems = await listMedia(auth);
    await downloadMedia(mediaItems);
})();
*/