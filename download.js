const _ = require("lodash");
const _client_secret = require("./client_secret");
if (_.isEmpty(_client_secret)) {
    console.log("No credentials");
    process.exit(0);
}
const { client_id, client_secret } = _client_secret.installed;
const fs = require("fs-extra");
const { google } = require("googleapis");
const Photos = require('googlephotos');
const axios = require("axios");
const ora = require("ora");
const TOKEN_PATH = "./token.json"
const DOWNLOAD_FOLDER = "./GooglePhotosBackup"
const port = 4000;
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, `http://localhost:${port}/auth`);
let photos;
let count = 0;

(async () => {
    try {
        await authenticate();
        let pageToken;
        do {
            const response = await photos.mediaItems.list(10, pageToken);
            if (response.mediaItems) {
                await downloadMedia(response.mediaItems);
            }
            pageToken = response.nextPageToken;
        } while (pageToken);
        process.exit(1);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
})();

async function authenticate() {
    let auth;
    try {
        auth = oauth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8")));
        photos = new Photos(oauth2Client.credentials.access_token);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
    return auth;
}

async function downloadMedia(mediaItems) {
    await fs.ensureDir(DOWNLOAD_FOLDER);
    const spinner = ora("Скачивание фото...").start();
    for (const item of mediaItems) {
        console.log(item.mediaMetadata);
        const url = `${item.baseUrl}=d`; // Полный размер
        const filename = `${DOWNLOAD_FOLDER}/${item.filename}`;
        const response = await axios.get(url, { responseType: "stream" });
        response.data.pipe(fs.createWriteStream(filename));
        await new Promise((resolve) => response.data.on("end", async () => {
            // Пытался прикрутить удаление фоток, но это допустимо только в альбомах.
            // При этом, как я понял, из альбома удаляется, но сам файл остаётся.
            // Пока удаляем вручную: удерживая Shift выделяем первую и последнюю фотку и жмём удалить - по-моему это единственный способ массового удаления.
            //await photos.albums.batchRemoveMediaItems({ mediaItemIds: [item.id] } );
            count++;
            resolve();
        }));
    }
    spinner.succeed("✅ Все фото скачаны!");
    console.log("Количество файлов:", count);
}
