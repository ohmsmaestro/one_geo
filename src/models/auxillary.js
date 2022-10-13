import { Alert } from "../components/Alert.components";

import {
  getStates, getRequirements, getDefectTypes,
  getApplicationTypes,
} from "../services/auxillary";

const sampleTypes = [
  { value: 0, label: 'Application for Certificate of Occupancy' },
  { value: 1, label: 'Application for Right of Occupancy' },
  { value: 2, label: 'Application for Regularization of Title' },
  { value: 3, label: 'Application for Recertification' },
  { value: 4, label: 'Application for Deed of Mortgage' },
  { value: 5, label: 'Application for Deed of Assignment' },
  { value: 6, label: 'Application for Deed of Release' },
  { value: 7, label: 'Application for Lease of Property' },
  { value: 8, label: 'Application for Valuation of Property' },
  { value: 9, label: 'Application for Change of Name' },
  { value: 10, label: 'Application for True Certify Copy' },
  { value: 11, label: 'Application for Sub-lease' },
]

export default {
  namespace: "auxillary",

  state: {
    stateList: [],
    requirementList: {},
    stateTotal: 0,
    createLawModal: false,
    defectTypes: [],
    applicationFormTypes: [...sampleTypes]
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
        const list = raw?.data;
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
        const list = raw?.data?.defects;
        yield put({
          type: "save",
          payload: { defectTypes: list },
        });
      } else {
        Alert.error(message);
      }
    },
    *fetchApplicationFormTypes({ payload }, { call, put }) {
      const { success, message, raw } = yield call(getApplicationTypes, payload);
      if (success) {
        const list = raw?.data?.otherApplicationTypes;
        yield put({
          type: "save",
          payload: { applicationFormTypes: list },
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
