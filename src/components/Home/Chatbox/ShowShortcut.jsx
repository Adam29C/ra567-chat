import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetShortcutMesg } from '../../../Redux/features/user/userSlice';

const ShowShortcut = () => {
  const dispatch = useDispatch();
  const showShortcut = useSelector((state) => state.user.showShortcut);
  const filterdShortcut = useSelector((state) => state.user.filterdShortcut);

  const setShortcutMsg = (items) => {
    dispatch(SetShortcutMesg(items));
  };
  return (
    <div>
      <div
        className={` flex justify-center items-center bg-gray-200 ${showShortcut ? 'block' : 'hidden'}`}
      >
        <div className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] flex justify-between items-center   rounded-full shadow min-w-[250px]">
          <div className="flex items-center justify-between bg-white rounded-[1vw]  p-3 w-full">
            <div className="flex flex-col ">
              {/* <span className="text-green-900 font-semibold text-sm"></span> */}
              <ul className="h-10 overflow-y-scroll">
                {filterdShortcut &&
                  filterdShortcut?.map((items, index) => {
                    return (
                      <li key={index} onClick={() => setShortcutMsg(items)}>
                        {items.message}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowShortcut;
