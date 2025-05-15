import { cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

function Window({ children, close, className }) {
  const ref = useOutsideClick(close);

  return createPortal(
    <div className="bg-opacity-50 animate-fadeIn justify-centertransition-all fixed inset-0 z-30 flex items-center duration-300">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div
        ref={ref}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gray-100 p-8 shadow-lg transition-all ${className}`}
      >
        <button
          onClick={close}
          className="absolute top-3 right-4 transform rounded-sm border-none bg-none p-1 transition-all"
        >
          <HiXMark className="text-primary-900 h-6 w-6 hover:text-red-500" />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Window;
