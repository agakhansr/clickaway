# Publishing Guide

## Preparing for Publication

### 1. Update Version

Before publishing, update the version in `package.json`:

```bash
npm version patch  # for bug fixes (1.0.0 → 1.0.1)
npm version minor  # for new features (1.0.0 → 1.1.0)
npm version major  # for breaking changes (1.0.0 → 2.0.0)
```

### 2. Build the Package

```bash
npm run build
```

This generates:
- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES modules format
- `dist/index.d.ts` - TypeScript declarations

### 3. Test Everything

```bash
npm run type-check
npm run lint
npm test
```

### 4. Manual Publishing

If not using GitHub Actions:

```bash
# Create npm account at https://www.npmjs.com
npm login
npm publish
```

## Using GitHub Actions for Auto-Publishing

1. Create an npm token at https://www.npmjs.com/settings/~/tokens
2. Add it as a secret in your GitHub repo:
   - Go to Settings → Secrets and variables → Actions
   - Create `NPM_TOKEN` secret with your token
3. Push to `main` branch - GitHub Actions will automatically build and publish!

## Package Distribution Files

After build, your package includes:

```
dist/
├── index.js           # CommonJS (for require)
├── index.d.ts         # TypeScript definitions
├── index.esm.js       # ES Modules (for import)
└── index.js.map       # Source maps
```

## Post-Publication

After publishing, you can:
- View on npm: `https://www.npmjs.com/package/use-outside-click`
- Install it: `npm install use-outside-click`

## Troubleshooting

### "Permission denied" during publish
- Check that you're logged in: `npm whoami`
- Verify NPM_TOKEN is set correctly in GitHub Secrets

### "Package name already taken"
- Change `name` in `package.json` to something unique
- Consider scoped packages: `@yourname/use-outside-click`

### Build errors
- Clear dist folder: `rm -rf dist`
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`
