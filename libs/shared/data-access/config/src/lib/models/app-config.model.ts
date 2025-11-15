import { ThemeConfig, NavItem } from '@vicbts/shared/models';

export interface AppConfig {
  appId: string;
  appName: string;
  logoUrl: string;
  theme: ThemeConfig;
  navigation: NavItem[];
  featureFlags: Record<string, boolean>;
  pageSize: number;
}
