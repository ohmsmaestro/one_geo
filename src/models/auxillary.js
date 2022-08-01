import { Alert } from "../components/Alert.components";

import { getStates, getRequirements, getDefectTypes } from "../services/auxillary";

export default {
  namespace: "auxillary",

  state: {
    stateList: [],
    requirementList: [],
    stateTotal: 0,
    createLawModal: false,
    defectTypes: []
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
    *getAllRequirements({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getRequirements, payload);
      if (success) {
        const list = raw?.data?.requirements;
        yield put({
          type: "save",
          payload: { requirementList: list },
        });
      } else {
        Alert.error(message);
      }
    },
    *getAllDefectTypes({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getDefectTypes, payload);
      if (success) {
        const list = raw?.data?.types;
        yield put({
          type: "save",
          payload: { defectTypes: list },
        });
      } else {
        Alert.error(message);
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
