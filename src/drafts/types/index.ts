type ElementTypes = 'textarea' | 'textInput' | 'paragraph' | 'select' | 'title';
interface Element {
  type: ElementTypes;
  label: string;
  readOnlyFor?: number[];
  value: string | number | undefined;
  options?: any[];
}

interface Col {
  span?: number;
  start?: number;
  end?: number;
  element: Element;
}
export interface Row {
  colsNumber: number;
  gap: number | string;
  cols: Col[];
}
