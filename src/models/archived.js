import { Alert } from "../components/Alert.components";

import { getArchived, getParcelArchieved } from "../services/archived";

const insitialState = {
  archivedList: [],
  archivedTotal: 0,
};

export default {
  namespace: "archived",

  state: { ...insitialState },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *getAllArchived({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getArchived, payload);
      if (success) {
        const list = raw?.data?.items;
        const total = raw?.data?.pagination?.total_record;
        yield put({
          type: "save",
          payload: { archivedList: list, archivedTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },

    *getParcelArchieved({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getParcelArchieved, payload);
      if (success) {
        const list = raw?.data?.items;
        const total = raw?.data?.pagination?.total_record;
        yield put({
          type: "save",
          payload: { archivedList: list, archivedTotal: total },
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
