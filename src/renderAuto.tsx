import React from "react";
import { createRoot } from "react-dom/client";

/**
 * React DOM render method to render the DOM and root element automatically. Requires React 18+ and an component with call syntax.
 * @param InitComponent {React.JSXElementConstructor} Uses the given component to render the DOM and the required HTML root element
 */
export function renderAuto<C extends React.JSXElementConstructor<React.ComponentProps<C>>, P extends React.ComponentProps<C>>(InitComponent: C, props?: P): void {
  const app = document.createElement(InitComponent.constructor.name!);
  document.body.prepend(app);
  let container;
  if (InitComponent instanceof React.Component) {
    container = document.querySelector<Element>(InitComponent.constructor.name!);
  } else {
    container = document.querySelector<Element>(InitComponent.name);
  }
  const root = createRoot(container!);
  // @ts-ignore
  root.render(<InitComponent {...props} />);
}
