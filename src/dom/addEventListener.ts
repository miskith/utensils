export const addEventListener = (
  element: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement>,
  listeners: Record<string, EventListenerOrEventListenerObject | EventListenerOrEventListenerObject[]>
): void => {
  const elementList = (
    element instanceof Array || element instanceof HTMLCollection || element instanceof NodeList ?
      Array.from(element) :
      [element]
    ) as HTMLElement[];

  elementList.forEach((element: HTMLElement) => {
    for (let eventName in listeners) {
      const functionList = (
        listeners[eventName] instanceof Array ? listeners[eventName] : [listeners[eventName]]
      ) as EventListenerOrEventListenerObject[];

      functionList.forEach((fn: EventListenerOrEventListenerObject) => element.addEventListener(eventName, fn));
    }
  });
}
