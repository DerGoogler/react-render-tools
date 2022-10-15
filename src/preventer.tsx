import React from "react";

export namespace preventer {
  export type EventHandlersMap = {
    [K in keyof GlobalEventHandlersEventMap]: keyof GlobalEventHandlersEventMap[K];
  };
  export type Args = keyof EventHandlersMap | Array<keyof EventHandlersMap>;
  export type Callback = (e: Event) => void;
  export interface Props {
    children?: React.ReactNode;
    prevent: Args;
    callback?: Callback;
  }
}

/**
 * Prevents event listener
 * @param prevent {Array<string>} `["contextmenu", "mousedown"]` or just a string
 * @param callback {Function}
 *
 * @sample
 * ```ts
 * import { preventer } from "react-render-tools";
 *
 * // Or preventer(["mosuedown", "contextmenu"])
 * preventer("contextmenu");
 *
 * // With callback function
 * preventer("contextmenu", (e) => {
 *  console.log("contextmenu prevented");
 * })
 * ```
 */
export function preventer(prevent: preventer.Args, callback?: preventer.Callback): void {
  if (Array.isArray(prevent)) {
    prevent.map(item => {
      window.addEventListener(item, (e: Event) => {
        e.preventDefault();
        if (typeof callback == "function") {
          callback(e);
        }
      });
    });
  } else {
    window.addEventListener(prevent, (e: Event) => {
      e.preventDefault();
      if (typeof callback == "function") {
        callback(e);
      }
    });
  }
}

/**
 * All elements inside this component will have an prevent
 * @param props
 * @returns
 */
export function Preventer(props: preventer.Props) {
  const reference = React.useRef<HTMLDivElement>(null);
  const { prevent, callback, children } = props;

  React.useEffect(() => {
    if (Array.isArray(prevent)) {
      prevent.map(item => {
        reference.current?.addEventListener(item, (e: Event) => {
          e.preventDefault();
          if (typeof callback == "function") {
            callback(e);
          }
        });
      });
    } else {
      reference.current?.addEventListener(prevent, (e: Event) => {
        e.preventDefault();
        if (typeof callback == "function") {
          callback(e);
        }
      });
    }
  });

  return <div ref={reference} children={children} />;
}
