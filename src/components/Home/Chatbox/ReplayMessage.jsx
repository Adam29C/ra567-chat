import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VisiblityReplay } from '../../../Redux/features/user/userSlice';

const ReplayMessage = ({ setShowReplayBox, ShowReplayBox }) => {
  const [first, setfirst] = useState('block');
  const dispatch = useDispatch();

  const showReplay = useSelector((state) => state.user.showReplay);
  const details = useSelector((state) => state.user.details);

  // console.log('showReplay', showReplay);

  return (
    <>
      <div
        className={` flex justify-center items-center rounded-4  px-1 bg-gray-200 ${showReplay ? 'block' : 'hidden'}`}
      >
        <div className=" w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] flex justify-between items-center    shadow min-w-[250px]">
          <div className="flex items-center justify-between bg-gray-300  p-2  w-full">
            <div className=" h-[60px] overflow-y-scroll flex flex-col ">
              <span className="text-green-900 font-semibold text-sm">
                {details?.username}
              </span>
              <span className="text-black text-base">{details?.message}</span>
            </div>
            <button
              className="text-gray-600 hover:text-black"
              onClick={() => dispatch(VisiblityReplay(false))}
            >
              ✖
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplayMessage;
