export const getElement = <T extends Element = HTMLElement>(
  parent: ParentNode,
  selector: string,
): T => {
  const element = parent.querySelector<T>(selector);

  if (!element) {
    throw new Error(`${selector} not found`);
  }

  return element;
};
