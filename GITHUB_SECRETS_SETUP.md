# Setting up npm Publishing with GitHub Actions

## Step 1: Generate npm Token

1. Go to https://npmjs.com/settings/~/tokens
2. Click **"Generate New Token"**
3. Select **"Granular Access Token"** (recommended)
4. Configure:
   - **Token name**: `github-actions`
   - **Expiration**: 90 days or more
   - **Permissions**: Select "Publish packages" and "Modify packages"
   - **Packages and scopes**: Select your scope `@azeagakhan` (or All packages)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)

## Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repo: https://github.com/agakhansr/clickaway
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. **Name**: `NPM_TOKEN`
5. **Value**: Paste your npm token from Step 1
6. Click **"Add secret"**

## Step 3: Test the Workflow

1. Make a small change and push to `main`
2. Go to **Actions** tab on GitHub
3. Watch the workflow run
4. The publish job will now use your npm token

## Step 4: Verify Publishing

After the workflow completes:
- Check https://npmjs.com/package/@azeagakhan/clickaway
- Verify the new build is published
- Done! 🎉

---

## Important Notes

- ⚠️ **Keep your token secret!** Never share it or commit it to code
- 🔄 **Token expiration**: Granular tokens expire after 90 days by default
- 🔐 **GitHub Secrets**: Are encrypted and only visible to GitHub Actions
- 📦 **Auto-publishing**: Any push to `main` will trigger a publish

---

## Troubleshooting

### "npm error code ENEEDAUTH"
- Verify the `NPM_TOKEN` secret is added to GitHub
- Check that the token has "publish" permissions
- Ensure the token hasn't expired

### "401 Unauthorized"
- Your npm token may have expired
- Generate a new token and update the GitHub secret

### Publishing didn't run
- Check that you pushed to the `main` branch
- GitHub Actions must be enabled in your repo settings
