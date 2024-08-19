interface ModalWrapperProps {
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  closeModal: Function;
}

/**
 * @param props - Any Components needed to be wrapped
 *
 * @returns ModalWrapper that darkens and blurs background; Used for multiple overlay components
 */
export const ModalWrapper = (props: ModalWrapperProps) => {
  return (
    <div
      data-testid="modal-wrapper"
      onClick={(e) => {
        e.stopPropagation();
        props.closeModal();
      }}
      className="absolute duration-200 ease-in-out w-full h-full backdrop-blur-sm bg-opacity-10 flex items-center justify-center"
      style={{
        opacity: props.isOpen ? "100%" : "0%",
        top: props.isOpen ? "0px" : "-100%",
      }}
    >
      <div
        className="bg-white special-shadow w-6/12 flex-col p-5 rounded-2xl z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
};
