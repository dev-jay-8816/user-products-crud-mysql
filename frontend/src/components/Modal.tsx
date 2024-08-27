import React, { FC, ReactNode } from 'react'

interface IModal {
  isOpen: boolean;
  title: string;
  // submitButtonTitle?: string;
  children: ReactNode;
  // onSubmit: () => void;
  onClose: () => void;
}

const Modal: FC<IModal> = ({
  isOpen = false,
  title = 'Add',
  // submitButtonTitle = 'Save',
  children,
  onClose,
  // onSubmit
}) => {
  return (
    isOpen ? (
      <>
        <div className={`modal fade show`} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">{title}</h1>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                {children}
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={onSubmit}>{submitButtonTitle}</button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>
    ) : (<></>)
  )
}

export { Modal }
