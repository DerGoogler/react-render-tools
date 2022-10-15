import ReactDOM from "react-dom";

/**
 * React DOM legacy render method
 * @param component
 * @param element
 * @param callback
 */
export function renderLegacy(component: React.DOMElement<React.DOMAttributes<Element>, Element>, element: string, callback?: () => void): void {
  ReactDOM.render(component, document.querySelector<Element>(element), callback);
}
