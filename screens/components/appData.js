import { createContext } from "react";

export default createContext({
  polls: {},
  reload: () => null,
  setOnboarding: () => null,
  showOnboarding: false
})