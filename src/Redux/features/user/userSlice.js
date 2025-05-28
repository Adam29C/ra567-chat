import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authUser: {},
  otherUsers: [],
  updatedUsers: [],
  filterdShortcut: [],
  gertfilterdShortcut: '',

  selectedUser: null,
  onlineUsers: null,
  showReplay: false,
  showShortcut: false,
  PreviewImage: false,
  getDocuments: {},
  details: {},
  showTesting: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setOtherUsers12121: (state, action) => {
      state.otherUsers.push(...action.payload);
    },

    newUpdatedUsers: (state, action) => {
      state.otherUsers.push(action.payload);
    },
    setSelectedUsers: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    VisiblityReplay: (state, action) => {
      state.showReplay = action.payload;
    },
    ManageReplayDetails: (state, action) => {
      state.details = action.payload;
    },
    VisiblityPreviewImage: (state, action) => {
      state.PreviewImage = action.payload;
    },
    VisiblityShortcut: (state, action) => {
      state.showShortcut = action.payload;
    },
    SetShortcutMesg: (state, action) => {
      state.gertfilterdShortcut = action.payload;
    },
    VisiblityFilterdShortcut: (state, action) => {
      state.filterdShortcut = action.payload;
    },
    UploadDocument: (state, action) => {
      state.getDocuments = action.payload;
    },
    ManageShowTesting: (state, action) => {
      state.showTesting = action.payload;
    },
  },
});

export const {
  VisiblityReplay,
  UploadDocument,
  setAuthUser,
  setOtherUsers,
  setSelectedUsers,
  setOnlineUsers,
  ManageReplayDetails,
  VisiblityPreviewImage,
  newUpdatedUsers,
  ManageShowTesting,
  setOtherUsers12121,
  VisiblityShortcut,
  VisiblityFilterdShortcut,
  SetShortcutMesg,
} = userSlice.actions;

export default userSlice.reducer;
