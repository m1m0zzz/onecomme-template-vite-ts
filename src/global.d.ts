import type { OneSDK } from "@onecomme.com/onesdk"

declare global {
  interface Window {
    OneSDK?: OneSDK
  }
}

export {}
