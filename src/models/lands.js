/* eslint-disable import/no-anonymous-default-export */
import { routerRedux } from 'dva/router';
import { Alert } from '../components/Alert.components';

import { getLands, postLand, postSubSequentTrans, getSubsequentTrans, getSubsequentTransById, getTDP } from '../services/lands';

import { storageLandsModel } from '../utils/constant';

const initialState = {
  landsList: [],
  landsTotal: 0,
  landData: {},
  assignOnwerModal: false,
  subsequentTransModal: false,
  subsequentTransList: [],
  subsequentTransTotal: 0,
  tdpData: {},
};

export default {
  namespace: 'lands',

  state: { ...initialState },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      try {
        let lands_model = localStorage.getItem(storageLandsModel);
        if (lands_model) {
          let data = JSON.parse(lands_model);
          dispatch({
            type: 'save',
            payload: data
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  },

  effects: {
    *createLand({ payload }, { call, put }) {
      const { raw, success, message } = yield call(postLand, payload);
      if (success) {
        yield put(routerRedux.push('/lands'));
        Alert.success(`You have successfully created a new plot.`);
      } else {
        Alert.error(message);
      }
    },
    *getAllLands({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getLands, payload);
      if (success) {
        const list = raw?.data?.plots;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: 'save',
          payload: { landsList: list, landsTotal: total }
        });
      } else {
        Alert.error(message);
      }
    },
    *getSingleLand({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getLands, payload);
      if (success) {
        const item = raw?.data?.plots[0];
        console.log({ item })
        if (item) {
          yield put({
            type: 'save',
            payload: { landData: item }
          });
        }
      } else {
        Alert.error(message);
      }
    },
    *createSubsequentTrans({ payload }, { call, put }) {
      const { raw, success, message } = yield call(postSubSequentTrans, payload);
      if (success) {
        yield put({ type: 'save', payload: { subsequentTransModal: false, landData: {} } })
        Alert.success(`You have successfully created a subsequent transaction.`);
      } else {
        Alert.error(message);
      }
    },
    *fetchAllSubsequentTrans({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getSubsequentTrans, payload);
      if (success) {
        const list = raw?.data?.subsequentTransList;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({ type: 'save', payload: { subsequentTransList: list, subsequentTransTotal: total } });
      } else {
        Alert.error(message);
      }
    },
    *fetchSubsequentTransById({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getSubsequentTransById, payload);
      if (success) {
        const list = raw?.data?.subtransation;
        yield put({ type: 'save', payload: { subsequentTransList: list } });
      } else {
        Alert.error(message);
      }
    },
    *fetchTDP({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getTDP, payload);
      if (success) {
        console.log({ raw });
        const item = raw?.data;
        yield put({ type: 'save', payload: { tdpData: item } });
      } else {
        Alert.error(message);
      }
    }
  },

  reducers: {
    save(state, action) {
      const newPayload = {
        ...state,
        ...action.payload
      };

      try {
        let data = JSON.stringify(newPayload);
        localStorage.setItem(storageLandsModel, data);
      } catch (err) {
        console.log(err);
      }

      return newPayload;
    }
  }
};
