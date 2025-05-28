const apiRoutes = {
  LOGIN_URI: `/user/WebLogin`,
  USERS_URI: `/user/all`,
  MASSAGES_BY_USERS_ID_URI: `/message/get`,
  SEARCH_USERS_UPI: `/user/search`,
  PING_USERS_UPI: `/user/ping`,

  GET_BANK_LIST: `fund-request/bankList`,
  GET_UPI_LIST: `upiList`,
  ADD_POINT_URI: `addCreditDebitPoint`,
  GET_BROADCAST_MSGS_LIST: `shortcut-messasge/all`,
  GET_SHORTCUT_MSGS_LIST: `shortcut-messasge/all`,
  REMOVE_SHORTCUT_MSGS_LIST: `shortcut-messasge/delete`,
  UPDATE_SHORTCUT_MSGS_LIST: `shortcut-messasge/update`,
  CREATE_SHORTCUT_MSGS_LIST: `shortcut-messasge/create`,
  GET_UPLOAD_DOCUMENT_LINK: `/message/upload`,
  GET_AllBROADCAST_MSGS_LIST: `broadcast-messasge/all`,
  REMOVE_BROADCAST_MSGS_LIST: `broadcast-messasge/delete`,
  CREATE_BROADCAST_MSGS_LIST: `broadcast-messasge/send`,

  GET_SHORTCUT_MSGS_LIST: `shortcut-messasge/all`,
  UPDATE_SHORTCUT_MSGS_LIST: `shortcut-messasge/update`,
  FETCH_SHORTCUT_MSGS_LIST: `shortcut-messasge/fetchshort`,

  // signupURI: `${import.meta.env.VITE_APP_API_KEY}/user/signup`,
  // loginURI: `${import.meta.env.VITE_APP_API_KEY}/user/login`,
  // resetpasswordURI: `${import.meta.env.VITE_APP_API_KEY}/user/resetpassword`,
  // userprofileURI: `${import.meta.env.VITE_APP_API_KEY}/user/userprofile`,
  // updateUserProfileURI: `${import.meta.env.VITE_APP_API_KEY}/user/updateuser`,
  // getAllUserURI: `${import.meta.env.VITE_APP_API_KEY}/user/alluserprofile`,
  // deleteUserProfileURI: `${import.meta.env.VITE_APP_API_KEY}/user/deleteuser`,
  // changeProfileImageURI: `${import.meta.env.VITE_APP_API_KEY}/user/uploadprofilepic`,
  // deleteProfileImageURI: `${import.meta.env.VITE_APP_API_KEY}/user/deleteprofilepic`,

  // selectedUserMessages: `${import.meta.env.VITE_APP_API_KEY}/message/receive`,
  // sendMessages: `${import.meta.env.VITE_APP_API_KEY}/message/send`,

  // aiURI: `${import.meta.env.VITE_APP_API_KEY}/ai/ask`,
};

export { apiRoutes };
