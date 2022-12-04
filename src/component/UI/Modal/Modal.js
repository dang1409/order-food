import { Fragment } from "react";
import classes from "./Modal.module.css";
import * as ReactDOM from "react-dom"

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

// tạo function component để pỏtal ra vị jtris cần
const ModalOverlays = (props) => {
  return (  
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

function Modal(props) {
  return (
  <Fragment>
  {/* Sử dụng method để dịch chuyển react Element ra vị trí cần  */}
    {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
    {ReactDOM.createPortal(
      <ModalOverlays>{props.children}</ModalOverlays>,
      portalElement
    )}
  </Fragment>
  )
}

export default Modal;
