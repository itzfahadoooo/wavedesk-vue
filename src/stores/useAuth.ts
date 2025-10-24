// composables/useAuth.ts
// import { inject } from "vue"
import { auth } from "../composables/Auth"

export function useAuth() {
  // For Vue, just return the reactive auth object
  return auth
}
