import React, { useContext, ReactNode } from "react";
import { AppContext } from "../context/GlobalContext";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const modalContext = useContext(AppContext);

  if (modalContext === null) {
    throw new Error("useContext must be used within an AppProvider");
  }

  const { isOpen } = modalContext;

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full max-w-[500px] h-full bg-white shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
