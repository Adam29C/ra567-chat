import React, { useRef, useEffect } from 'react';

const Pophover = ({ open, setOpen, body, customClass }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      {open && (
        <div
          className={`w-40 absolute p-2 shadow-2xl rounded-md z-50 bg-white ${customClass}`}
        >
          <ul className="flex flex-col text-black py-2">{body}</ul>
        </div>
      )}
    </div>
  );
};

export default Pophover;
