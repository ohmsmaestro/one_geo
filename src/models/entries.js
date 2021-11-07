import { Alert } from "../components/Alert.components";

import {
  getEntries,
  getApplications,
  getApplicationDetail,
} from "../services/entries";

export default {
  namespace: "entries",

  state: {
    entriesList: [],
    entriesTotal: 0,
    applicationsList: [],
    applicationsTotal: 0,
    applicationDetail: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *getAllEntries({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getEntries, payload);
      if (success) {
        const list = raw?.data?.items;
        const total = raw?.data?.pagination?.total_record;
        yield put({
          type: "save",
          payload: { entriesList: list, entriesTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },
    *getAllApplications({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getApplications, payload);
      if (success) {
        const list = raw?.data?.items;
        const total = raw?.data?.pagination?.total_record;
        yield put({
          type: "save",
          payload: { applicationsList: list, applicationsTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },
    *getApplicationDetail({ payload }, { call, put }) {
      const { raw, success, message } = yield call(
        getApplicationDetail,
        payload
      );
      if (success) {
        yield put({
          type: "save",
          payload: { applicationDetail: raw },
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
