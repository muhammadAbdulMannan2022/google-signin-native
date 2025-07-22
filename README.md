# 🚀 Google Login + Stripe Template for Expo

This is a starter **Expo** project configured for:

- 🔐 Google Sign-In (OAuth2)
- 💳 Stripe Payment Integration

Built using [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) and designed for quick start with authentication and payments in React Native apps.

---

## 📁 Project Structure Setup

### ✅ Create a `keys` Folder

Inside the project root, create a folder named `keys`, then add a file named `keys.ts` (or `keys.js` if not using TypeScript).

**`keys/keys.ts`**
```ts
export const WEB_CLIENT_ID = 'your-web-client-id.apps.googleusercontent.com';
export const IOS_CLIENT_ID = 'your-ios-client-id.apps.googleusercontent.com';
