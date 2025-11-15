# Path Structure
VicBts-WS/
 ├── apps/
 │   ├── public-web/                    # public site
 │   └── admin-portal/                  # CMS/admin (later)
 ├── libs/
 │   ├── shared/
 │   │   ├── ui/                        # design system: buttons, inputs, table, layout
 │   │   ├── util/                      # generic helpers (validators, date, etc.)
 │   │   ├── models/                    # shared interfaces & enums
 │   │   └── data-access/
 │   │       ├── api/                   # base Http client, interceptors, error handling
 │   │       ├── auth/                  # auth services, guards, remember-me/session
 │   │       ├── config/                # theming, nav, feature flags (runtime config)
 │   │       └── notifications/         # toast/snackbar, dialogs, confirmations
 │   ├── identity/
 │   │   ├── data-access/               # user/roles/permissions API
 │   │   └── feature-user-management/   # user/role management UI (shared)
 │   └── public-web/
 │       └── feature-shell/             # shell layout & routing for public-web
 ├── nx.json
 ├── package.json
 └── tsconfig.base.json


# angular projects 
Angular projects should be inside apps folder

# library projects
Library projects should be inside libs folder


# Theme or Style 
We have folder on root called "template-samples". It has html templates which would be reference for layout designing, I would like Copilot to reference it while create a theme/design of html components. 

# NX documentation
NX documentation can be found at following url: https://nx.dev/docs/getting-started/tutorials/angular-monorepo-tutorial

