export interface ModalParameters {
  Component: () => JSX.Element;
  props?: any;
}

export interface ModalResponse {
  result: boolean;
  payload: any;
}

export interface ModalQueueNode extends ModalParameters {
  id: string;
  resolve: (value: ModalResponse | PromiseLike<ModalResponse>) => void;
}

export interface ModalProps {
  children: JSX.Element;
  props?: any;
  onCancel: () => void;
}
