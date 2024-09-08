import { useEffect } from "react";
import { getHotkeyMatcher } from "@/lib/parseHotKey/parseHotKey";

function shouldFireEvent(
  event: KeyboardEvent,
  tagsToIgnore: string[] | undefined = ["INPUT", "TEXTAREA", "SELECT"],
  triggerOnContentEditable = false,
) {
  if (event.target instanceof HTMLElement) {
    if (triggerOnContentEditable) {
      return !tagsToIgnore.includes(event.target.tagName);
    }

    return (
      !event.target.isContentEditable &&
      !tagsToIgnore.includes(event.target.tagName)
    );
  }

  return true;
}

interface HotkeyItemOptions {
  preventDefault?: boolean;
}

export type HotkeyItem = [
  string,
  (event: KeyboardEvent) => void,
  HotkeyItemOptions?,
];

export function useHotkeys(
  hotkeys: HotkeyItem[],
  tagsToIgnore: string[] | undefined = ["INPUT", "TEXTAREA", "SELECT"],
  triggerOnContentEditable: boolean | undefined = false,
) {
  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      hotkeys.forEach(
        ([hotkey, handler, options = { preventDefault: true }]) => {
          if (
            getHotkeyMatcher(hotkey)(event) &&
            shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)
          ) {
            if (options.preventDefault) {
              event.preventDefault();
            }

            handler(event);
          }
        },
      );
    };

    document.documentElement.addEventListener("keydown", keydownListener);
    return () =>
      document.documentElement.removeEventListener("keydown", keydownListener);
  }, [hotkeys]);
}
