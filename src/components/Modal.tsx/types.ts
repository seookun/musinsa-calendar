export interface ModalParameters<Props = any> {
  Component: (() => JSX.Element) | ((props: Props) => JSX.Element);
  props?: Props;
}

export interface ModalResponse<Payload = any> {
  result: boolean;
  payload: Payload;
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
