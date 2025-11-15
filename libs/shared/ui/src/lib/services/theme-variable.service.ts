import { Injectable } from '@angular/core';
import { ThemeConfig } from '@vicbts/shared/models';

@Injectable({ providedIn: 'root' })
export class ThemeVariableService {
  applyTheme(theme: ThemeConfig): void {
    const root = document.documentElement;

    root.style.setProperty('--color-primary-600', theme.primaryColor);
    
    const hsl = this.hexToHSL(theme.primaryColor);
    
    root.style.setProperty('--color-primary-50', this.hslToString(hsl.h, hsl.s, 95));
    root.style.setProperty('--color-primary-100', this.hslToString(hsl.h, hsl.s, 90));
    root.style.setProperty('--color-primary-200', this.hslToString(hsl.h, hsl.s, 80));
    root.style.setProperty('--color-primary-300', this.hslToString(hsl.h, hsl.s, 70));
    root.style.setProperty('--color-primary-400', this.hslToString(hsl.h, hsl.s, 60));
    root.style.setProperty('--color-primary-500', this.hslToString(hsl.h, hsl.s, 50));
    root.style.setProperty('--color-primary-700', this.hslToString(hsl.h, hsl.s, 40));
    root.style.setProperty('--color-primary-800', this.hslToString(hsl.h, hsl.s, 30));
    root.style.setProperty('--color-primary-900', this.hslToString(hsl.h, hsl.s, 20));

    root.setAttribute('data-theme', theme.mode);
    root.setAttribute('data-layout', theme.layout);
    root.setAttribute('data-content-width', theme.contentWidth);

    if (theme.mode === 'dark') {
      root.style.setProperty('--bg-default', '#1a1d21');
      root.style.setProperty('--bg-surface', '#2b2f34');
      root.style.setProperty('--text-primary', '#e0e0e0');
      root.style.setProperty('--text-secondary', '#a1acb8');
      root.style.setProperty('--text-tertiary', '#8592a3');
      root.style.setProperty('--border-light', '#3b4046');
    } else {
      root.style.setProperty('--bg-default', '#f8f9fa');
      root.style.setProperty('--bg-surface', '#ffffff');
      root.style.setProperty('--text-primary', '#1a1d21');
      root.style.setProperty('--text-secondary', '#566a7f');
      root.style.setProperty('--text-tertiary', '#8592a3');
      root.style.setProperty('--border-light', '#d9dee3');
    }
  }

  private hexToHSL(hex: string): { h: number; s: number; l: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  private hslToString(h: number, s: number, l: number): string {
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
}
