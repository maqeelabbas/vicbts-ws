# 🚀 Quick Start Guide

Get your VicBts monorepo up and running in 5 minutes!

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Configure `apps/public-web`

### Update `apps/public-web/src/app/app.config.ts`:

```typescript
import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService, initializeApp } from '@vicbts/shared/data-access/config';
import { API_CONFIG } from '@vicbts/shared/data-access/api';
import { publicWebRoutes } from '@vicbts/public-web/feature-shell';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(publicWebRoutes),
    provideHttpClient(),
    { provide: API_CONFIG, useValue: { baseUrl: 'http://localhost:3000' } },
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => 
        initializeApp(configService, 'public-web'),
      deps: [ConfigService],
      multi: true,
    },
  ],
};
```

### Update `apps/public-web/src/main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { PublicShellComponent } from '@vicbts/public-web/feature-shell';
import { appConfig } from './app/app.config';

bootstrapApplication(PublicShellComponent, appConfig)
  .catch((err) => console.error(err));
```

---

## Step 3: Add Logo (Optional)

Place your logo file at:
```
apps/public-web/src/assets/logo.png
```

---

## Step 4: Set Up Mock API (Development)

Create `apps/public-web/proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

Update `apps/public-web/project.json`:

```json
{
  "targets": {
    "serve": {
      "options": {
        "proxyConfig": "apps/public-web/proxy.conf.json"
      }
    }
  }
}
```

**Create a mock server** (optional - for testing config loading):

```typescript
// mock-server.js
const express = require('express');
const app = express();

app.get('/api/config/:appId', (req, res) => {
  res.json({
    appId: req.params.appId,
    theme: {
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      mode: 'light',
    },
    navigation: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Dashboard', path: '/dashboard', permission: 'dashboard:view' },
    ],
    featureFlags: {
      enableDashboard: true,
      enableNotifications: false,
    },
    pageSize: 20,
  });
});

app.listen(3000, () => console.log('Mock API running on :3000'));
```

Run it: `node mock-server.js`

---

## Step 5: Run the App!

```bash
npx nx serve public-web
```

Open your browser to: **http://localhost:4200**

---

## ✅ Verify It Works

You should see:
- ✅ Header with navigation (Home, About, Dashboard)
- ✅ Home page with feature showcase
- ✅ Theme applied (primary color visible)
- ✅ Console shows config loaded successfully

---

## 🛠️ Common Tasks

### Generate a New Component
```bash
npx nx g @nx/angular:component --name=my-feature --project=ui --export
```

### Add a New Route
Edit `libs/public-web/feature-shell/src/lib/public-web.routes.ts`:

```typescript
{
  path: 'contact',
  component: ContactPageComponent,
  title: 'Contact Us',
}
```

### Test Your Code
```bash
npx nx test feature-shell
npx nx run-many -t test  # All projects
```

### Lint Your Code
```bash
npx nx lint feature-shell
npx nx run-many -t lint  # All projects
```

### View Dependency Graph
```bash
npx nx graph
```

---

## 📚 Important Files

- **`MONOREPO-SETUP-COMPLETE.md`** - Full documentation
- **`APP-SETUP-GUIDE.md`** - Detailed shell integration guide
- **`Theme-Style-Template-Reference.md`** - Design system reference

---

## 🆘 Troubleshooting

### Issue: Cannot find module '@vicbts/...'
**Solution:** Check `tsconfig.base.json` has the path alias configured.

### Issue: ESLint module boundary error
**Solution:** Check tags in `project.json` are in array format:
```json
"tags": ["type:feature", "scope:public-web"]
```
Not: `"tags": ["type:feature scope:public-web"]`

### Issue: ConfigService doesn't load
**Solution:** Ensure APP_INITIALIZER is configured in `app.config.ts` and proxy is set up for `/api/config`.

### Issue: Nx command not found
**Solution:** Use `npx nx` or install globally: `npm i -g nx`

---

## 🎉 You're Ready!

Your monorepo is configured and ready for development. Start building features!

**Need more details?** See `MONOREPO-SETUP-COMPLETE.md` for comprehensive documentation.
