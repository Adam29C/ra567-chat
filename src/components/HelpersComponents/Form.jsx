import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import Loader from '../Loader';
// import Loader from "./Loader";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { today, getActualDateFormate } from '../../Utils/Common_Date';
// import CustomDatePicker from './DatePickers';
import { useFormik, FieldArray, FormikProvider } from 'formik';
// col-form-label this class for input alignment apply on label
const ReusableForm = ({
  fromDate,
  fieldtype,
  formik,
  btn_name,
  title,
  VerifyMobileN,
  button_Size,
  Disable_Button,
  after_password_field,
  after_submit_button,
  after_text_field,
  btn_design,
  disabledSubmit,
  isLoading,
  show_submit,
  label_size,
  show_preview,
  after_submit_button1,
  show_clear,
  setUnable,
}) => {
  const location = useLocation();

  const [passwordVisible, setPasswordVisible] = useState({});
  let a = new Date();
  const [dateStates, setDateStates] = useState({});

  const [previews, setPreviews] = useState([]);

  const handleFileChange = (event, index, name) => {
    const file = event.target.files[0];

    formik.setFieldValue(name, file);

    // if (file) {
    //   const newPreviews = [...previews];
    //   newPreviews[index] = URL.createObjectURL(file);
    //   setPreviews(newPreviews);

    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     formik.setFieldValue(`${name}_base64`, reader.result);
    //   };
    //   reader.readAsDataURL(file);
    //   formik.setFieldValue(name, file);

    // }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="">
        <div
          className={`grid gap-4 ${title === 'addgroup' ? 'h-[65vh] overflow-y-scroll' : ''}`}
        >
          {fieldtype.map((field, index) => (
            <div
              key={index}
              className={`col-span-${field.col_size} ${field.Visiblity === 'hidden' ? 'hidden' : 'block'} ${field.hideField ? 'hidden' : ''}`}
            >
              {field.type === 'select' && (
                <>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor={field.name}
                  >
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    id={field.name}
                    {...formik.getFieldProps(field.name)}
                    disabled={field.disable}
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (field.onChange) field.onChange(e);
                    }}
                  >
                    <option value="" disabled>
                      Please Select {field.label}
                    </option>

                    {field.options.map((option) => {
                      return (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                  {formik.errors[field.name] && (
                    <p className="text-red-500 text-sm">
                      {formik.errors[field.name]}
                    </p>
                  )}
                </>
              )}

              {field.type === 'checkbox' &&
                field.options &&
                field.options.map((option) => (
                  <div
                    key={option.id}
                    className={` ${field.display ? 'flex' : 'hidden'}   items-center gap-2`}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      id={option.name}
                      {...formik.getFieldProps(option.name)}
                      defaultChecked={option.checked}
                    />
                    <label
                      htmlFor={option.name}
                      className="text-sm font-medium text-gray-700"
                    >
                      {option.name}
                    </label>
                  </div>
                ))}

              {field.type === 'msgbox' && (
                <div
                  className={` ${field.display ? 'flex' : 'hidden'}  flex-col space-y-2 `}
                >
                  <label
                    id={field.label}
                    // for="comment"
                    className={'text-sm font-medium text-gray-700'}
                  >
                    {field.label}
                  </label>
                  <textarea
                    id={field.label}
                    {...formik.getFieldProps(field.name)}
                    // defaultChecked={field.checked}
                    // name="comment"
                    rows="4"
                    className="h-[133px] p-2 border-2 rounded-md focus:ring text-dark-600 "
                  ></textarea>
                </div>
              )}

              {field.type === 'image' && (
                <div
                  className={`${field.display ? 'flex' : 'hidden'} flex-col space-y-2 `}
                >
                  <label
                    id={field.label}
                    htmlFor="upload"
                    className="text-sm font-medium text-gray-700"
                  >
                    Upload Image
                  </label>
                  <input
                    id={field.label}
                    //  {...formik.getFieldProps(field.name)}
                    type="file"
                    // name="upload"
                    accept="image/*"
                    className="p-2 border-2 rounded-md focus:ring text-blue-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      formik.setFieldValue(field.name, file);
                    }}
                  />
                </div>
              )}
              {field.type === 'radio' && field.options && (
                <div>
                  <p className="font-medium">{field.label}</p>
                  {field.options.map((option) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600"
                        id={option.label}
                        {...formik.getFieldProps(option.name)}
                        defaultChecked={option.checked}
                      />
                      <label
                        htmlFor={option.label}
                        className="text-sm font-medium text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {field.type === 'password' && (
                <>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor={field.name}
                  >
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={field.name}
                      type={passwordVisible[field.name] ? 'text' : 'password'}
                      placeholder={field.label}
                      {...formik.getFieldProps(field.name)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <i
                      className={`absolute right-3 top-3 cursor-pointer ${passwordVisible[field.name] ? 'fa fa-eye' : 'fa fa-eye-slash'}`}
                      onClick={() =>
                        setPasswordVisible((prev) => ({
                          ...prev,
                          [field.name]: !prev[field.name],
                        }))
                      }
                    ></i>
                  </div>
                  {formik.errors[field.name] && (
                    <p className="text-red-500 text-sm">
                      {formik.errors[field.name]}
                    </p>
                  )}
                </>
              )}

              {field.type === 'text' && (
                // <div className={` ${field.display ? '' : 'hidden'}`}>
                <div className={` ${field.display ? '' : 'hidden'}`}>
                  <label
                    className="  text-sm font-medium text-gray-700"
                    htmlFor={field.name}
                  >
                    {field.label} <span className="text-red-500">*</span>
                  </label>

                  <input
                    id={field.name}
                    type={'text'}
                    placeholder={field.label}
                    {...formik.getFieldProps(field.name)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />

                  {formik.errors[field.name] && (
                    <p className="text-red-500 text-sm">
                      {formik.errors[field.name]}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ReusableForm;
