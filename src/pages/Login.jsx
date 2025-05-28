import React, { useState } from 'react';
import { json, NavLink, useNavigate } from 'react-router-dom';

import {
  TextField,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@mui/material';

import { IoEyeSharp } from 'react-icons/io5';
import { IoEyeOffSharp } from 'react-icons/io5';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas/loginSchema';
import { WrapperComponent } from '../layout/WrapperComponent';
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { setAuthUser } from '../Redux/features/user/userSlice';
import { LOGIN_URI_API } from '../services/auth.service';
const initialValues = {
  username: '',
  password: '',
};
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setLoading(true);

        const res = await LOGIN_URI_API(values);

        setLoading(false);
        if (res.status === 0) {
          toast.error(res.message, {
            position: 'top-right',
          });
        } else {
          console.log('res.data', res);

          dispatch(
            setAuthUser({
              // email: res.email,
              _id: res.data._id,
              role: res.data.role,
              name: res.data.name,
              mobile: res.data.mobile,
            })
          );

          localStorage.setItem(
            'info',
            JSON.stringify({
              _id: res.data._id,
              role: res.data.role,
              name: res.data.name,
              mobile: res.data.mobile,
            })
          );
          navigate('/');

          localStorage.setItem('token', res.yeLo);

          toast.success('Login successfully', {
            position: 'top-center',
          });
        }
      },
    });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {loading && (
        <div className="w-full flex justify-center items-center  fixed top-5 z-40">
          <span className="flex justify-center items-center gap-x-2  bg-slate-100 text-blue-700 shadow-md px-3 py-2 rounded-md">
            <span className="loading loading-spinner"></span>
            Loading...
          </span>
        </div>
      )}
      <div className="w-full h-auto md:h-dvh flex items-center justify-center bg-blue-100 ">
        <div className="bg-white w-full md:w-10/12 lg:w-6/12 pt-12 md:pt-0 flex flex-col md:flex-row items-center rounded shadow-md ">
          {/* ================== Login Input Fields ================== */}
          <div className="p-4 px-8 flex flex-col">
            <h3 className="text-2xl font-bold text-blue-900">Log in</h3>
            <p className="text-sm text-gray-400">
              Welcome user, please Log in to continue
            </p>

            <form
              action=""
              className="flex flex-col gap-y-1"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-y-1">
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-red-400 text-sm">
                  {errors.username && touched.username ? errors.username : null}
                </span>
              </div>

              <div className="flex flex-col gap-y-1">
                <FormControl variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <IoEyeOffSharp className="text-base text-gray-400" />
                          ) : (
                            <IoEyeSharp className="text-base text-gray-400" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <span className="text-red-400 text-sm">
                  {errors.password && touched.password ? errors.password : null}
                </span>
              </div>

              {loading ? (
                <button
                  className="flex justify-center items-center gap-x-2 login-color text-white py-1 rounded font-semibold  mt-3"
                  type="button"
                  disabled="disabled"
                >
                  <span className="loading loading-spinner loading-xs"></span>
                  Loading...
                </button>
              ) : (
                <button
                  className=" login-color text-white py-1 rounded font-bold  mt-3"
                  type="submit"
                >
                  Log in
                </button>
              )}
            </form>
          </div>

          {/* ================== Side picture ====================== */}
          <div className="w-10/12 md:w-6/12 flex items-center ">
            <div className="w-full">
              <img src="./images/login.png" alt="login" className="w-full" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default WrapperComponent()(Login);
