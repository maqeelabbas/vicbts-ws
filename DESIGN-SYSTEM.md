# Design System Documentation

## Overview

Complete implementation of the Materialize-based design system for the VicBts Angular application. The design system includes:

- **SCSS Token Files**: Colors, spacing, typography, border radius, elevation
- **Theme System**: Root theme file with global base styles and CSS custom properties
- **SCSS Mixins**: Fluid typography, responsive spacing, section utilities
- **Section Components**: Hero, Features, Section Title, Call-to-Action

## Token Files

### 1. Colors (`_colors.scss`)

**Location**: `libs/shared/ui/src/lib/theme/_colors.scss`

**Features**:
- Primary colors (#666cff) with 9 variants (50-900)
- Secondary colors (#8592a3) with 9 variants
- Status colors (success, warning, error, info)
- Gray scale (50-900)
- Text colors (primary, secondary, tertiary)
- Background colors (default, surface, elevated)
- Border colors
- CSS custom properties for runtime theming
- Dark theme support via `[data-theme='dark']`

**Usage**:
```scss
@import '@shared/ui/theme/colors';

.my-component {
  background-color: $color-primary-500;
  color: var(--text-primary);
}
```

### 2. Spacing (`_spacing.scss`)

**Location**: `libs/shared/ui/src/lib/theme/_spacing.scss`

**Features**:
- Base unit: 4px (0.25rem)
- Spacing scale (0-32 steps)
- Named spacing (xs, sm, md, lg, xl, 2xl, 3xl)
- Section padding (matching template section-py pattern)
- Container padding (responsive)
- Gap scale
- CSS custom properties

**Usage**:
```scss
@import '@shared/ui/theme/spacing';

.my-component {
  padding: $spacing-xl;
  gap: var(--spacing-md);
}
```

### 3. Typography (`_typography.scss`)

**Location**: `libs/shared/ui/src/lib/theme/_typography.scss`

**Features**:
- Font families (Inter primary, monospace)
- Font weights (light to bold: 300-700)
- Font sizes (xs to 5xl: 12px-60px)
- Line heights (tight to loose)
- Heading sizes (h1-h6)
- Body text defaults
- Lead text styles
- CSS custom properties

**Usage**:
```scss
@import '@shared/ui/theme/typography';

.my-component {
  font-family: $font-family-primary;
  font-size: var(--font-size-lg);
  font-weight: $font-weight-semibold;
}
```

### 4. Border Radius (`_radius.scss`)

**Location**: `libs/shared/ui/src/lib/theme/_radius.scss`

**Features**:
- Radius scale (none to 3xl: 0-32px)
- Circular radius (50rem)
- Pill radius (9999px)
- Component-specific radii (button, card, input, badge, modal, dropdown, tooltip)
- CSS custom properties

**Usage**:
```scss
@import '@shared/ui/theme/radius';

.my-component {
  border-radius: $radius-xl;
  border-radius: var(--radius-card);
}
```

### 5. Elevation (`_elevation.scss`)

**Location**: `libs/shared/ui/src/lib/theme/_elevation.scss`

**Features**:
- Shadow levels (none, xs to 2xl)
- Component-specific shadows (card, dropdown, modal, navbar, toast, button)
- Hover states
- CSS custom properties

**Usage**:
```scss
@import '@shared/ui/theme/elevation';

.my-component {
  box-shadow: $elevation-card;
  
  &:hover {
    box-shadow: var(--elevation-card-hover);
  }
}
```

## Theme System

### Root Theme File (`theme.scss`)

**Location**: `libs/shared/ui/src/lib/theme/theme.scss`

**Features**:
- Imports all token files
- Global box-sizing reset
- Base body styles (font, color, background)
- Heading styles (h1-h6)
- Paragraph styles
- Link styles with hover and focus states
- List styles
- Image styles
- Button reset

**Usage**:

Import in your application's global styles:

```scss
// apps/public-web/src/styles.scss
@import '@shared/ui/theme/theme';
```

Or import in Angular component:

```scss
// component.scss
@import '@shared/ui/theme/theme';
```

## SCSS Mixins

**Location**: `libs/shared/ui/src/lib/theme/_mixins.scss`

### 1. Fluid Typography

Scales font-size smoothly between min and max viewport widths.

```scss
@mixin fluid-type($min-font-size, $max-font-size, $min-vw: 320px, $max-vw: 1920px)
```

**Usage**:
```scss
@import '@shared/ui/theme/mixins';

.hero-title {
  @include fluid-type($font-size-3xl, $font-size-5xl);
}
```

### 2. Responsive Spacing

Applies different spacing values at different breakpoints.

```scss
@mixin responsive-spacing($property, $mobile, $tablet, $desktop)
```

**Usage**:
```scss
.section {
  @include responsive-spacing(padding-top, 3rem, 5rem, 6.25rem);
}
```

### 3. Section Padding

Matches template section-py pattern (mobile: 3rem, tablet: 5rem, desktop: 6.25rem).

```scss
@mixin section-padding()
```

**Usage**:
```scss
.my-section {
  @include section-padding();
}
```

### 4. Container

Creates a responsive container with max-width and padding.

```scss
@mixin container($max-width: 1200px)
```

**Usage**:
```scss
.container {
  @include container();
}

.narrow-container {
  @include container(900px);
}
```

### 5. Flexbox Center

Centers content using flexbox.

```scss
@mixin flex-center($direction: row)
```

**Usage**:
```scss
.centered-box {
  @include flex-center();
}

.vertical-center {
  @include flex-center(column);
}
```

### 6. Absolute Center

Centers an element using absolute positioning.

```scss
@mixin absolute-center()
```

**Usage**:
```scss
.overlay-content {
  @include absolute-center();
}
```

### 7. Truncate Text

Truncates text with ellipsis (single or multi-line).

```scss
@mixin truncate($lines: 1)
```

**Usage**:
```scss
.single-line {
  @include truncate();
}

.three-lines {
  @include truncate(3);
}
```

### 8. Focus Ring

Adds accessible focus outline.

```scss
@mixin focus-ring($color: var(--color-primary-500), $offset: 2px)
```

**Usage**:
```scss
button:focus-visible {
  @include focus-ring();
}
```

### 9. Media Query Helpers

```scss
@mixin mobile-only { @media (max-width: 767px) { @content; } }
@mixin tablet { @media (min-width: 768px) { @content; } }
@mixin desktop { @media (min-width: 1200px) { @content; } }
```

**Usage**:
```scss
.responsive-box {
  width: 100%;
  
  @include tablet {
    width: 50%;
  }
  
  @include desktop {
    width: 33.333%;
  }
}
```

### 10. Section Title

Creates section header with icon and title (matching template pattern).

```scss
@mixin section-title()
```

**Usage**:
```scss
.section-header {
  @include section-title();
}
```

## Section Components

### 1. VHeroSectionComponent

**Selector**: `<v-hero-section>`

**Purpose**: Landing page hero section with title, subtitle, CTA buttons, and optional image.

**Inputs**:
- `title?: string` - Hero title
- `subtitle?: string` - Hero subtitle
- `badge?: string` - Badge text above title
- `imageSrc?: string` - Hero image source
- `imageAlt?: string` - Hero image alt text (default: '')
- `backgroundImage?: string` - Background image URL
- `alignment?: 'left' | 'center'` - Text alignment (default: 'center')

**Content Projection**:
- `[hero-title]` - Custom title content
- `[hero-description]` - Custom description content
- `[hero-actions]` - CTA buttons

**Usage**:
```html
<v-hero-section
  title="Welcome to VicBts"
  subtitle="Your solution for business management"
  badge="NEW"
  alignment="center">
  <div hero-actions>
    <button class="btn btn-primary">Get Started</button>
    <button class="btn btn-secondary">Learn More</button>
  </div>
</v-hero-section>
```

**Advanced Usage**:
```html
<v-hero-section
  [imageSrc]="heroImage"
  imageAlt="Dashboard preview"
  backgroundImage="/assets/bg-pattern.svg">
  <h1 hero-title>
    Build <span class="highlight">Amazing</span> Apps
  </h1>
  <p hero-description>
    Enterprise-grade platform with cutting-edge technology.
  </p>
  <div hero-actions>
    <button class="btn btn-lg btn-primary">Start Free Trial</button>
    <button class="btn btn-lg btn-outline">View Demo</button>
  </div>
</v-hero-section>
```

### 2. VFeatureSectionComponent

**Selector**: `<v-feature-section>`

**Purpose**: Display grid of features with icons, titles, and descriptions.

**Inputs**:
- `sectionTitle?: string` - Section title
- `sectionDescription?: string` - Section description
- `sectionIcon?: string` - Section icon class (e.g., 'ri-star-line')
- `features: Feature[]` - Array of features (required)
- `columns?: 2 | 3 | 4` - Number of columns (default: 3)

**Feature Interface**:
```typescript
interface Feature {
  icon: string;       // Icon class (e.g., 'ri-rocket-line')
  title: string;      // Feature title
  description: string; // Feature description
}
```

**Usage**:
```typescript
// component.ts
features: Feature[] = [
  {
    icon: 'ri-rocket-line',
    title: 'Fast Performance',
    description: 'Lightning-fast load times for optimal user experience.'
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Secure',
    description: 'Enterprise-grade security to protect your data.'
  },
  {
    icon: 'ri-refresh-line',
    title: 'Auto-Sync',
    description: 'Automatic synchronization across all devices.'
  }
];
```

```html
<!-- component.html -->
<v-feature-section
  sectionTitle="Why Choose Us"
  sectionDescription="Discover the features that make our platform stand out"
  sectionIcon="ri-star-fill"
  [features]="features"
  [columns]="3">
</v-feature-section>
```

### 3. VSectionTitleComponent

**Selector**: `<v-section-title>`

**Purpose**: Reusable section header with optional icon.

**Inputs**:
- `title?: string` - Section title
- `description?: string` - Section description
- `icon?: string` - Icon class
- `alignment?: 'center' | 'left'` - Alignment (default: 'center')

**Content Projection**:
- `[title]` - Custom title content
- Default slot - Custom content below description

**Usage**:
```html
<v-section-title
  title="Our Services"
  description="Comprehensive solutions for your business needs"
  icon="ri-briefcase-line">
</v-section-title>
```

**Advanced Usage**:
```html
<v-section-title
  icon="ri-team-line"
  alignment="left">
  <h2 title>
    Meet Our <span class="gradient-text">Expert Team</span>
  </h2>
  <p>World-class professionals dedicated to your success.</p>
  <a href="/team" class="link">View All Members →</a>
</v-section-title>
```

### 4. VCallToActionComponent

**Selector**: `<v-call-to-action>`

**Purpose**: Call-to-action section with gradient background.

**Inputs**:
- `title?: string` - CTA title
- `description?: string` - CTA description
- `alignment?: 'horizontal' | 'vertical'` - Layout alignment (default: 'horizontal')

**Content Projection**:
- `[cta-title]` - Custom title content
- `[cta-description]` - Custom description content
- `[cta-actions]` - CTA buttons

**Usage**:
```html
<v-call-to-action
  title="Ready to Get Started?"
  description="Join thousands of satisfied customers today"
  alignment="horizontal">
  <div cta-actions>
    <button class="btn btn-white">Start Free Trial</button>
    <button class="btn btn-outline-white">Contact Sales</button>
  </div>
</v-call-to-action>
```

**Vertical Layout**:
```html
<v-call-to-action alignment="vertical">
  <h2 cta-title>Transform Your Business Today</h2>
  <p cta-description>
    Get started in minutes with our easy onboarding process.
  </p>
  <div cta-actions>
    <button class="btn btn-lg btn-white">Get Started</button>
  </div>
</v-call-to-action>
```

## Component Library Integration

All section components are exported from `@shared/ui`:

```typescript
import {
  VHeroSectionComponent,
  VFeatureSectionComponent,
  VSectionTitleComponent,
  VCallToActionComponent
} from '@shared/ui';

@Component({
  // ...
  imports: [
    VHeroSectionComponent,
    VFeatureSectionComponent,
    VSectionTitleComponent,
    VCallToActionComponent
  ]
})
export class MyComponent { }
```

## Complete Landing Page Example

```typescript
// landing-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  VHeroSectionComponent,
  VFeatureSectionComponent,
  VCallToActionComponent,
  Feature
} from '@shared/ui';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    VHeroSectionComponent,
    VFeatureSectionComponent,
    VCallToActionComponent
  ],
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {
  features: Feature[] = [
    {
      icon: 'ri-dashboard-line',
      title: 'Intuitive Dashboard',
      description: 'Beautiful and easy-to-use interface.'
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Advanced Analytics',
      description: 'Powerful insights for better decisions.'
    },
    {
      icon: 'ri-team-line',
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team.'
    }
  ];
}
```

```html
<!-- landing-page.component.html -->
<v-hero-section
  title="Build Amazing Applications"
  subtitle="Enterprise-grade platform for modern teams"
  badge="NEW RELEASE">
  <div hero-actions>
    <button class="btn btn-lg btn-primary">Get Started</button>
    <button class="btn btn-lg btn-outline">Learn More</button>
  </div>
</v-hero-section>

<v-feature-section
  sectionTitle="Why Choose Our Platform"
  sectionDescription="Everything you need to succeed"
  sectionIcon="ri-star-fill"
  [features]="features"
  [columns]="3">
</v-feature-section>

<v-call-to-action
  title="Ready to Transform Your Business?"
  description="Join thousands of companies already using our platform"
  alignment="horizontal">
  <div cta-actions>
    <button class="btn btn-white btn-lg">Start Free Trial</button>
    <button class="btn btn-outline-white btn-lg">Contact Sales</button>
  </div>
</v-call-to-action>
```

```scss
// landing-page.component.scss
@import '@shared/ui/theme/theme';
@import '@shared/ui/theme/mixins';

.btn {
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-button);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  transition: all 0.3s ease;
  
  &-primary {
    background-color: var(--color-primary-600);
    color: white;
    border: none;
    
    &:hover {
      background-color: var(--color-primary-700);
      box-shadow: var(--elevation-button-hover);
    }
  }
  
  &-outline {
    background-color: transparent;
    color: var(--color-primary-600);
    border: 2px solid var(--color-primary-600);
    
    &:hover {
      background-color: var(--color-primary-50);
    }
  }
  
  &-white {
    background-color: white;
    color: var(--color-primary-600);
    border: none;
    
    &:hover {
      box-shadow: var(--elevation-button-hover);
    }
  }
  
  &-outline-white {
    background-color: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  &-lg {
    padding: var(--spacing-lg) var(--spacing-2xl);
    font-size: var(--font-size-lg);
  }
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.highlight {
  color: var(--color-primary-600);
}
```

## Responsive Design

All components are fully responsive with three breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1199px
- **Desktop**: ≥ 1200px

Section padding adjusts automatically:
- Mobile: 3rem (48px)
- Tablet: 5rem (80px)
- Desktop: 6.25rem (100px)

## Icon System

Components support RemixIcon classes. Install RemixIcon:

```html
<!-- In your index.html or app shell -->
<link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
```

Common icons:
- `ri-star-line`, `ri-star-fill`
- `ri-rocket-line`, `ri-rocket-fill`
- `ri-shield-check-line`, `ri-shield-check-fill`
- `ri-dashboard-line`, `ri-dashboard-fill`
- `ri-team-line`, `ri-team-fill`
- `ri-briefcase-line`, `ri-briefcase-fill`

## Dark Theme Support

Colors include dark theme overrides. Enable dark theme by adding `data-theme="dark"` to the `<html>` tag:

```typescript
// theme-toggle.service.ts
export class ThemeToggleService {
  setTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
```

## Best Practices

1. **Always import from @shared/ui**: Use TypeScript path aliases
2. **Use CSS custom properties in components**: Enables runtime theming
3. **Use SCSS variables in SCSS files**: For compile-time calculations
4. **Use mixins for responsive design**: Ensures consistency
5. **Follow BEM naming**: For custom classes not in the design system
6. **Test on all breakpoints**: Mobile-first approach

## File Structure

```
libs/shared/ui/src/lib/
├── theme/
│   ├── _colors.scss           # Color tokens
│   ├── _spacing.scss          # Spacing tokens
│   ├── _typography.scss       # Typography tokens
│   ├── _radius.scss           # Border radius tokens
│   ├── _elevation.scss        # Shadow/elevation tokens
│   ├── _mixins.scss           # SCSS utility mixins
│   └── theme.scss             # Root theme file
├── v-hero-section/
│   ├── v-hero-section.component.ts
│   └── v-hero-section.component.scss
├── v-feature-section/
│   ├── v-feature-section.component.ts
│   └── v-feature-section.component.scss
├── v-section-title/
│   ├── v-section-title.component.ts
│   └── v-section-title.component.scss
└── v-call-to-action/
    ├── v-call-to-action.component.ts
    └── v-call-to-action.component.scss
```

## Summary

The design system provides:

✅ **6 SCSS token files** - colors, spacing, typography, radius, elevation, mixins
✅ **1 theme root file** - global styles and imports
✅ **4 section components** - hero, features, section title, CTA
✅ **CSS custom properties** - runtime theming support
✅ **Dark theme support** - built-in via data-theme attribute
✅ **Responsive design** - mobile-first with 3 breakpoints
✅ **Accessibility** - proper ARIA, keyboard support, focus states
✅ **Type safety** - TypeScript interfaces for all inputs
✅ **Content projection** - flexible customization
✅ **Module boundaries** - respects ESLint rules (type:ui)

The design system is production-ready and tested (lint ✓, test ✓).
