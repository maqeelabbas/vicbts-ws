# TODO: Complete Public Web App Integration

This checklist outlines the remaining steps to integrate the feature-shell into the public-web application.

---

## ✅ Completed

- [x] Created all shared libraries (ui, util, models, data-access)
- [x] Created identity domain (data-access, feature-user-management)
- [x] Created public-web feature-shell with routing
- [x] Fixed all ESLint module boundary rules
- [x] Fixed all project.json tag formats
- [x] All tests passing
- [x] All linting passing

---

## 📋 Remaining Tasks

### 1. Update `apps/public-web/src/app/app.config.ts`

**Current state:** Default Angular configuration  
**Required action:** Add providers for routing, HTTP, ConfigService, and APP_INITIALIZER

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
    {
      provide: API_CONFIG,
      useValue: { baseUrl: 'http://localhost:3000' },
    },
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

**File location:** `apps/public-web/src/app/app.config.ts`

---

### 2. Update `apps/public-web/src/main.ts`

**Current state:** Bootstraps AppComponent  
**Required action:** Bootstrap PublicShellComponent instead

**Option A (Recommended):** Direct shell bootstrap
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { PublicShellComponent } from '@vicbts/public-web/feature-shell';
import { appConfig } from './app/app.config';

bootstrapApplication(PublicShellComponent, appConfig)
  .catch((err) => console.error(err));
```

**Option B:** Keep root AppComponent (more flexible)
```typescript
// Keep current main.ts, but update app.ts:
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
```

**File location:** `apps/public-web/src/main.ts` (and optionally `apps/public-web/src/app/app.ts`)

---

### 3. Create Proxy Configuration (Development)

**Current state:** No proxy configuration  
**Required action:** Create proxy.conf.json to route /api calls to backend

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

**File location:** `apps/public-web/proxy.conf.json`

Then update `apps/public-web/project.json`:
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

---

### 4. Create Mock API Server (Optional but Recommended)

**Current state:** No backend  
**Required action:** Create simple Express server for development

Create `mock-api-server.js` in workspace root:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Configuration endpoint
app.get('/api/config/:appId', (req, res) => {
  console.log(`Config requested for: ${req.params.appId}`);
  res.json({
    appId: req.params.appId,
    theme: {
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      mode: 'light',
      customCss: {
        '--border-radius': '8px',
        '--spacing-unit': '8px',
      }
    },
    navigation: [
      { label: 'Home', path: '/', icon: 'home' },
      { label: 'About', path: '/about', icon: 'info' },
      { 
        label: 'Dashboard', 
        path: '/dashboard', 
        icon: 'dashboard',
        permission: 'dashboard:view' 
      },
      {
        label: 'Identity',
        path: '/identity',
        icon: 'people',
        children: [
          { 
            label: 'Users', 
            path: '/identity/users',
            permission: 'users:read' 
          }
        ]
      }
    ],
    featureFlags: {
      enableDashboard: true,
      enableNotifications: false,
      enableUserManagement: true,
    },
    pageSize: 20,
  });
});

// Mock authentication endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin123') {
    res.json({
      id: '1',
      username: 'admin',
      email: 'admin@vicbts.com',
      firstName: 'Admin',
      lastName: 'User',
      roles: [
        {
          id: 'admin',
          name: 'Administrator',
          permissions: [
            { resource: 'dashboard', action: 'view' },
            { resource: 'users', action: 'read' },
            { resource: 'users', action: 'write' },
          ]
        }
      ],
      isActive: true,
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`📍 Config endpoint: http://localhost:${PORT}/api/config/public-web`);
});
```

**File location:** `mock-api-server.js`

**Install Express:**
```bash
npm install --save-dev express
```

**Run the server:**
```bash
node mock-api-server.js
```

---

### 5. Add Logo Asset

**Current state:** No logo  
**Required action:** Add logo.png file

**File location:** `apps/public-web/src/assets/logo.png`

Or update PublicShellComponent template to remove logo reference if not needed.

---

### 6. Test the Integration

**Run the app:**
```bash
# Terminal 1: Start mock API (if using)
node mock-api-server.js

# Terminal 2: Start Angular app
npx nx serve public-web
```

**Open browser:** http://localhost:4200

**Expected behavior:**
- ✅ App loads without errors
- ✅ Console shows: "Configuration loaded successfully for: public-web"
- ✅ Header displays with navigation links
- ✅ Home page renders with feature cards
- ✅ Theme colors are applied (indigo/purple)
- ✅ Clicking "About" navigates to About page
- ✅ Clicking "Dashboard" redirects to /login (if not authenticated)

---

## 🧪 Verification Checklist

After completing the above steps, verify:

- [ ] App serves without errors: `npx nx serve public-web`
- [ ] No console errors related to missing modules
- [ ] ConfigService successfully loads configuration
- [ ] Theme is applied (check computed styles for `--primary-color`)
- [ ] Navigation renders in header
- [ ] Routing works (navigate between Home/About/Dashboard)
- [ ] Dashboard route is protected by authGuard
- [ ] All lint checks pass: `npx nx lint public-web`
- [ ] All tests pass: `npx nx test public-web`

---

## 📚 Reference Documentation

- **Setup Guide:** `QUICK-START.md` - 5-minute setup instructions
- **Complete Docs:** `MONOREPO-SETUP-COMPLETE.md` - Full documentation
- **Shell Integration:** `libs/public-web/feature-shell/APP-SETUP-GUIDE.md` - Detailed guide
- **Architecture:** `ARCHITECTURE.md` - Visual dependency graphs

---

## 🆘 Troubleshooting

### Issue: "Cannot find module '@vicbts/...'"
**Solution:** The imports are correct. Just need to update app.config.ts and main.ts as shown above.

### Issue: "Config failed to load"
**Solution:** 
1. Ensure mock API server is running
2. Check proxy configuration is set up
3. Verify URL in browser console network tab

### Issue: Navigation doesn't show
**Solution:**
1. Check console for ConfigService load confirmation
2. Verify mock API returns navigation array
3. Check browser DevTools → Network → XHR → /api/config/public-web

### Issue: Theme not applied
**Solution:**
1. Open DevTools → Elements → :root
2. Check for CSS variables like --primary-color
3. If missing, ConfigService.applyTheme() may not be running

---

## 🎯 Next Steps After Integration

Once the basic integration is complete:

1. **Add More Routes:** Extend `publicWebRoutes` with additional pages
2. **Implement Real Auth:** Replace mock login in AuthService with actual API
3. **Add Identity Routes:** Lazy-load identity features
4. **Customize Theme:** Modify theme configuration in mock API
5. **Add Feature Flags:** Use ConfigService.isFeatureEnabled() to toggle features
6. **Build Admin Portal:** Create second app following same pattern

---

## ✨ Tips

- Use `npx nx graph` to visualize your architecture
- Run `npx nx affected:test` after changes to test only affected projects
- Enable Nx Cloud for distributed caching: `npx nx connect-to-nx-cloud`
- Use `npx nx generate` shortcuts: `npx nx g` instead of full command

---

**Status:** Ready for integration! All libraries are built, tested, and linted. Just need to wire up the app.

**Estimated time:** 10-15 minutes following the steps above.
