import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Modal from './Modal';
import { ModalParameters, ModalQueueNode, ModalResponse } from './types';

const modalQueue: ModalQueueNode[] = [];

let forceUpdate: (() => void) | null = null;

export function modal<Prop, Payload>(params: ModalParameters<Prop>) {
  return new Promise<ModalResponse<Payload>>((resolve) => {
    modalQueue.push({
      id: uuid(),
      resolve,
      ...params,
    });

    forceUpdate?.();
  });
}

function closeModal(modal: ModalQueueNode, response: ModalResponse) {
  const index = modalQueue.findIndex((v) => v === modal);

  if (index > -1) {
    modal.resolve(response);
    modalQueue.splice(index, 1);

    forceUpdate?.();
  }
}

function ModalContainer() {
  const [modals, setModals] = useState<ModalQueueNode[]>([]);

  useEffect(() => {
    forceUpdate = () => {
      setModals([...modalQueue]);
    };

    return () => {
      forceUpdate = null;
    };
  });

  const onOk = (modal: ModalQueueNode, payload?: any) => {
    closeModal(modal, {
      result: true,
      payload,
    });
  };

  const onCancel = (modal: ModalQueueNode, payload?: any) => {
    closeModal(modal, {
      result: false,
      payload,
    });
  };

  return (
    <>
      {modals.map((modal) => (
        <Modal key={modal.id} onCancel={() => onCancel(modal)}>
          <modal.Component
            {...modal.props}
            onOk={(payload?: any) => onOk(modal, payload)}
            onCancel={(payload?: any) => onCancel(modal, payload)}
          />
        </Modal>
      ))}
    </>
  );
}

export default ModalContainer;
