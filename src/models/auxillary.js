import { Alert } from "../components/Alert.components";

import { getStates } from "../services/auxillary";

export default {
  namespace: "auxillary",

  state: {
    stateList: [],
    stateTotal: 0,
    createLawModal: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *getAllStates({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getStates, payload);
      if (success) {
        const list = raw?.data?.states;
        yield put({
          type: "save",
          payload: { stateList: list },
        });
      } else {
        Alert.error(message);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
