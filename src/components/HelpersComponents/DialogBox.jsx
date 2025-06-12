// import React, { useState, useEffect, useRef } from 'react';
// import { RxCross2 } from 'react-icons/rx';
// const DialogBox = ({
//   title,
//   body,
//   modal_id,
//   setOpenModal,
//   OpenModal,
//   Modal_width,
// }) => {
//   const modalRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && e.target === modalRef.current) {
//         modalRef.current.close();
//         setOpenModal(false);
//       }
//     };

//     if (modalRef.current) {
//       modalRef.current.addEventListener('click', handleClickOutside);
//     }

//     return () => {
//       if (modalRef.current) {
//         modalRef.current.removeEventListener('click', handleClickOutside);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (OpenModal) {
//       document.getElementById(modal_id).showModal();
//     } else {
//       document.getElementById(modal_id).close();
//       setOpenModal(false)
//     }
//   }, [OpenModal]);

//   return (
//     <>
//       <dialog ref={modalRef} id={modal_id} className="modal">
//         <div className={`modal-box`} style={{ maxWidth: Modal_width }}>
//           <div className="flex justify-between border-b-2 border-darks-600">
//             <span className="text-xl">{title}</span>
//             <button onClick={() => modalRef.current.close()}>
//               <RxCross2 className="text-2xl" />
//             </button>
//           </div>

//           {body}

//         </div>
//       </dialog>
//     </>
//   );
// };

// export default DialogBox;

import React, { useEffect, useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';

const DialogBox = ({
  title,
  body,
  modal_id,
  setOpenModal,
  OpenModal,
  Modal_width,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && e.target === modalRef.current) {
        modalRef.current.close();
        setOpenModal(false);
      }
    };

    if (modalRef.current) {
      modalRef.current.addEventListener('click', handleClickOutside);
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener('click', handleClickOutside);
      }
    };
  }, [setOpenModal]);

  useEffect(() => {
    if (OpenModal && modalRef.current) {
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [OpenModal]);

  return (
    <dialog ref={modalRef} id={modal_id} className="modal">
      {/* <div className="modal-box" style={{ maxWidth: Modal_width ? Modal_width : "100%" }}> */}
      <div className="modal-box w-full lg:w-[40%]">
        <div className="flex justify-between border-b-2 border-darks-600 pb-2">
          <span className="text-xl">{title}</span>
          <button
            onClick={() => {
              modalRef.current.close();
              setOpenModal(false);
            }}
          >
            <RxCross2 className="text-2xl" />
          </button>
        </div>
        {body}
      </div>
    </dialog>
  );
};

export default DialogBox;
