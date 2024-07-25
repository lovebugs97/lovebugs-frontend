import { FC } from 'react';
import { ReactDivProps } from 'html-element-types';
import { MdClose } from 'react-icons/md';

type ModalProps = ReactDivProps & {
  open?: boolean;
};

export const Modal: FC<ModalProps> = ({ open, className: _className, ...props }) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');
  return <div {...props} className={className} />;
};

type ModalContentProps = ReactDivProps & {
  onClose: () => void;
};

export const ModalContent: FC<ModalContentProps> = ({ onClose, className: _className, children, ...props }) => {
  const className = ['modal-box', _className].join(' ');

  return (
    <div {...props} className={className}>
      <div className="absolute right-10 top-10">
        <button onClick={onClose} className="text-[36px] text-gray-300 hover:text-black">
          <MdClose />
        </button>
      </div>
      {children}
    </div>
  );
};

type ModalActionProps = ReactDivProps;

export const ModalAction: FC<ModalActionProps> = ({ className: _className, ...props }) => {
  const className = ['modal-action', _className].join(' ');
  return <div {...props} className={className} />;
};
