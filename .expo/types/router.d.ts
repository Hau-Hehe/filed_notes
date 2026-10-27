/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)/login` | `/(tabs)` | `/(tabs)/` | `/(tabs)/export` | `/(tabs)/map` | `/_sitemap` | `/export` | `/login` | `/map` | `/modal`;
      DynamicRoutes: `/note/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/note/[id]`;
    }
  }
}
