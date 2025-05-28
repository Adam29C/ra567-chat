import React, { useState, useEffect } from 'react';
import { LuMenu } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import MenuComponent from './MenuComponent';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { showProfile } from '../../../Redux/features/profileBtn/profileBtnSlice';
import { useNavigate } from 'react-router-dom';
const ProfileHeader = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // const { name } = JSON.parse(localStorage.getItem('info')) || [];
  const info = JSON.parse(localStorage.getItem('info') || '{}');
  const { name } = info;

  useEffect(() => {
    // console.log('info', token);
    if (token === 'undefined' || token === 'null') {
      toast.error('Your Session Expired. Please Login Again.');
      // console.log('token', token);

      localStorage.removeItem('token');
      localStorage.removeItem('info');
      navigate('/login', { replace: true });
    }
  }, [token]);

  const abcd = () => {
    let alertShown = false;

    const checkTokenExpiry = () => {
      let interval = setInterval(() => {
        let now = new Date();
        if (now.getHours() === 23 && now.getMinutes() === 59) {
          if (!alertShown) {
            alert('Your Session Expired. Please Login Again.');
            alertShown = true;
          }

          localStorage.removeItem('token');
          localStorage.removeItem('info');
          navigate('/login', { replace: true });

          clearInterval(interval);
        }
      }, 1000);
    };

    checkTokenExpiry();
  };

  useEffect(() => {
    abcd(navigate);
  }, [navigate]);

  // const [profileBtn, setProfileBtn] = useState(false);
  // const profileBtn = useSelector((state) => state.showProfileBtn.value);

  const darkMode = useSelector((state) => state.darkTheme.value);
  const authUser = useSelector((state) => state.user.authUser);
  const dispatch = useDispatch();

  return (
    <div className="  w-full flex py-2 sh-[13vh] h-fit relative bg-none">
      <div className="w-[100%] flex flex-row-reverse items-center   ">
        <MenuComponent />
        <div
          className={` w-[75%] md:w-[70%] lg:w-[73%]  flex justify-center items-center gap-x-2   rounded-md  `}
        >
          <div
            className="w-[20%] h-12 md:h-10 lg:h-12 rounded-full  text-white ms-2"
            style={{
              backgroundImage: `./images/default_profile.png`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <img
              src={authUser?.profilePic || './images/default_profile.png'}
              alt="profile"
              srcSet=""
              className="w-full rounded-full"
            />
          </div>
          <div className="w-[80%] truncate">
            <h4 className="fw-bold text-white ">{name}</h4>
            <p
              className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
