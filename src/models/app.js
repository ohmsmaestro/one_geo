let initialState = {
  collaspe: false,
  float: false,
  pageTitle: "",
  nightMode: false,
  openFileViewer: false,
  file: {},
};

export default {
  namespace: "app",

  state: { ...initialState },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {},

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    reset(state, action) {
      return { ...state, ...initialState };
    },
  },
};
