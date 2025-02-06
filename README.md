## Purpose of the software
It is a set of scripts that allows you to download all your Google Photos and videos to your computer.
## Supported OS
MS Windows 10 and higher, Ubuntu desktop 20 and higher.
## Get Google credentials
1. Go to Google dev console
https://console.cloud.google.com/apis
2. `OAuth consent screen` -> `Create project` -> `Create`
3. Configure consent screen if you do not did it:
3.1.`External` -> `Create`
3.2. Enter `App name`, `User support email`, `Developer contact information`
3.3. `SAVE AND CONTINUE`
3.4. `ADD OR REMOVE SCOPES`
3.5. Select following scopes:
`.../auth/photoslibrary`
`.../auth/userinfo.profile`
`.../auth/userinfo.email`
3.6. `UPDATE`
3.7. `SAVE AND CONTINUE`
3.8. `SAVE AND CONTINUE`
3.9. `Back to dashboard`
4. `Credentials` -> `Create credentials` -> `OAuth client ID`
5. `Application type` -> `Web application`
6. `CREATE`
7. `DOWNLOAD JSON`
8. Put loaded file to our app folder.
## Download this app
## Install nvm/npm
