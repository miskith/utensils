import { IExtendingElementProps } from './interfaces/createElement.js';

/**
 * Method for creating Node element and assigning multiple parameters, event listeners & children in one method call
 *
 * @param tagName Node tag name
 * @param props List of attributes, event listeners or/and children to assign to the newly created element
 * @returns Resulting Node element
 */
export const createElement = <T = HTMLElement>(
  tagName: string,
  props?: Partial<Omit<T, 'children' | 'dataset' | 'style'>> & IExtendingElementProps,
): T => {
  const element: HTMLElement = document.createElement(tagName);

  if (props) {
    for (let key in props) {
      const value = (props as any)[key];

      if (key === 'role') {
        element.setAttribute(key, value);
      } else if (key === 'aria') {
        for (const [ariaKey, ariaValue] of Object.entries(props.aria!)) {
          element.setAttribute(`aria-${ariaKey}`, ariaValue);
        }
      } else if (props.style) {
        Object.assign(element.style, props.style);
      } else if (key === 'children') {
        const fragment = document.createDocumentFragment();
        props.children!.forEach((child: HTMLElement) => fragment.appendChild(child));
        element.appendChild(fragment);
      } else if (key === 'listeners') {
        for (let eventName in props.listeners!) {
          const functionList = (
            props.listeners![eventName] instanceof Array
              ? props.listeners![eventName]
              : [props.listeners![eventName]]
          ) as EventListenerOrEventListenerObject[];

          functionList.forEach((fn: EventListenerOrEventListenerObject) =>
            element.addEventListener(eventName, fn),
          );
        }
      } else if (key === 'dataset') {
        for (let datasetKey in props.dataset) {
          element.dataset[datasetKey] = props.dataset[datasetKey];
        }
      } else {
        (element as any)[key] = value;
      }
    }
  }

  return element as unknown as T;
};
