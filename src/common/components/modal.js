import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, onClose, children, allowClose }) {
  const [overlaystyle, setOverlayStyle] = useState("opacity-0");
  const [modalstyle, setModalStyle] = useState("opacity-0 scale-95");

  const [modalCount, setModalCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (modalCount > 0) {
      document.body.classList.add("locked");
    } else {
      document.body.classList.remove("locked");
    }
  }, [modalCount]);

  useEffect(() => {
    if (open) {
      setModalVisible(true);
    }
  }, [open]);

  const customClose = () => {
    setModalVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const modalcontent = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { customClose });
    }
    return child;
  });

  useEffect(() => {
    if (open) {
      setModalCount((prevCount) => prevCount + 1);
    }
  }, [open]);

  return (
    <>
      {open &&
        createPortal(
          <>
            <div
              id="overlay"
              className={`absolute top-0 left-0 w-screen h-screen z-50 bg-black transition-all duration-200 ease-linear ${
                modalVisible ? "opacity-30" : "opacity-0"
              }`}
              onClick={allowClose ? customClose : () => {}}
            ></div>
            <div
              id="modal"
              className={`z-50 rounded-3xl bg-[color:var(--bg-panel)] dark:shadow-md transition-all duration-200 ease-linear transform ${
                modalVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {modalcontent}
            </div>
          </>,
          document.body
        )}
    </>
  );
}

export default Modal;
