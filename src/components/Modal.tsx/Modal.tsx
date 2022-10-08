import { ModalProps } from './types';

function Modal(props: ModalProps) {
  return (
    <div className="Modal">
      <div className="Modal__dim" />
      <div className="Modal__content">
        <button className="Modal__content__close" onClick={() => props.onCancel()} />
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
