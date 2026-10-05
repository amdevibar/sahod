# Sahod by Anna — setup on GitHub Pages

About an hour, best done on a computer. You only do this once.

## 1. Put the app on GitHub Pages

1. Go to **github.com** and create a free account (or sign in).
2. Click **+ → New repository**. Name it `sahod`, choose **Public**, and click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Unzip `sahod-github.zip`. Open the `sahod` folder, select **everything inside it** (index.html, sw.js, config.js, manifest.json, SETUP.md and the `lib` and `icons` folders) and drag it onto the GitHub page. Click **Commit changes**.
5. Go to **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and **/(root)**, then click **Save**.
6. After a minute or two, your app is live at `https://YOUR-USERNAME.github.io/sahod/` (replace YOUR-USERNAME with your GitHub username).

## 2. Create your Google sign-in key

Use the same Google account that owns your **Sahod data** spreadsheet.

1. Go to **console.cloud.google.com**. Click the project picker at the top → **New project**. Name it `Sahod` and click **Create**, then make sure it's selected.
2. Open **APIs & Services → Library**, search for **Google Sheets API**, and click **Enable**.
3. Open **Google Auth Platform** (it may be called **OAuth consent screen**) and click **Get started**:
   - App name: `Sahod`. Support email: your email.
   - Audience: **External**.
   - Contact email: your email. Agree and click **Create**.
4. In **Audience**, under **Test users**, click **Add users** and add your own Gmail address. Leave the app in **Testing**.
5. In **Clients**, click **Create client**:
   - Application type: **Web application**. Name: `Sahod`.
   - **Authorized JavaScript origins**: `https://YOUR-USERNAME.github.io`
   - **Authorized redirect URIs**: `https://YOUR-USERNAME.github.io/sahod/` (with the slash at the end)
   - Click **Create** and copy the **Client ID** (it ends in `.apps.googleusercontent.com`).

## 3. Add the key to the app

1. In your GitHub repository, click **config.js**, then the pencil icon (Edit).
2. Replace `PASTE-YOUR-CLIENT-ID.apps.googleusercontent.com` with your Client ID, keeping the quotes.
3. Click **Commit changes**. Wait a minute for GitHub Pages to update.

## 4. Connect your data

1. Open `https://YOUR-USERNAME.github.io/sahod/`.
2. Tap **Sign in with Google**. Google will say the app isn't verified, because it's your own private app: tap **Continue**, then allow access to your spreadsheets.
3. Paste the link to your **Sahod data** spreadsheet (in the Apps Script version: Settings → Open in Google Sheets, then copy the address) and tap **Connect**.

## 5. Add it to your iPhone

1. On your iPhone, open the same link in **Safari** and do step 4 there too (each device connects once).
2. Tap **Share → Add to Home Screen → Add**.
3. Open Sahod from the Home Screen icon. From now on it opens even with no signal.

## Updating the app later

When Claude sends you new files, upload them to the repository the same way (**Add file → Upload files**), replacing the old ones, and commit. The new `sw.js` will have a new version number. Open Sahod once while online, then close and reopen it to switch to the new version.

## Good to know

- Google sign-in lasts about an hour. When it runs out, Sahod renews it automatically when you open the app online, or shows "Tap to sign in" in the top bar. Offline use never needs it.
- Changes made offline are kept on your phone and synced when you're back online.
- Your data is only in your Google Sheet and on your devices. The code in this repository contains no personal data.
