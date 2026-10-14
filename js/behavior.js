import { setMainHeaderVisibility } from "./actions.js";
import { getScrollStatus } from "./navigation.js";


export function handleHeaderVisibility() {
  const scrollStatus = getScrollStatus();
  const showHeader   = actions.setMainHeaderVisibility;
  switch(scrollStatus) {
    case "down":
      showHeader(false);
      break;
    case "up":
      showHeader(true);
      break;
  }
}