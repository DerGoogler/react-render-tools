import { useRef as uf } from "react";

export type FindCallback<T> = (element: T) => void;
export type FindRefObject<T> = React.MutableRefObject<T | undefined> | React.RefObject<T>;

/**
 * **Usage**
 * ```ts
 * import { doc } from "googlers-tools";
 *
 * const htm = doc.findRef("container")?.innerHTML
 * console.log(htm)
 *
 * // Won't work!
 * doc.findRef("from")?.style.display = "dfsdf";
 *
 * // Works!
 * doc.findRef<HTMLDivElement>("from", e => {
 *  e.style.display = "none"
 * });
 *
 * ```
 * ----
 * @param ref
 * @param callback
 * @returns
 */
export function findRef<T = undefined>(ref: FindRefObject<T>, callback?: FindCallback<T>): void | T | undefined {
  let reff: FindRefObject<T>;
  if ((reff = ref)) {
    if (reff && reff.current) {
      if (typeof callback == "function") {
        callback(reff.current);
      } else {
        return reff.current;
      }
    }
  } else {
    return undefined;
  }
}

export function useRef<T = undefined>(initialValue: T | null): [React.RefObject<T>, (callback: FindCallback<T>) => void] {
  const Uf = uf<T>(initialValue);

  const caller = (callback: FindCallback<T>) => {
    findRef(Uf, callback);
  };

  return [Uf, caller];
}
