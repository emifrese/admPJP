import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className="fixed top-0 lef-0 w-full z-20 h-screen bg-black bg-opacity-75" onClick={props.onClose} />;
};

const ModalOverlay = ({children}) => {
  return (
    <div className="flex justify-center items-center max-w-full">
      <div className="flex justify-center rounded-xl fixed top-12 p-4 z-30 text-center animate-modal-animation">
        <>{children}</>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    return (
      <>
        {ReactDOM.createPortal(
          <Backdrop onClose={props.Toggle} />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          portalElement
        )}
      </>
    );
  };

export default Modal;
