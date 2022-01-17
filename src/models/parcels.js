import { Alert } from "../components/Alert.components";

import {
  getParcels,
  postEncumbrance,
  postRectification,
  postAppraisal,
  getAppraisals,
  putAppraisal,
  getAppraisalType,
} from "../services/parcels";

import { storageParcelsModel } from "../utils/constant";

export default {
  namespace: "parcels",

  state: {
    parcelsList: [],
    parcelsTotal: 0,
    parcelData: {},
    createParcel: false,
    rentModal: false,
    appraisalModal: false,
    appraisalTypes: [],
    encumbranceModal: false,
    rectificationModal: false,

    appraisalList: [],
    appraisalTotal: 0,
    appraisalReview: false,
    appraisalDetail: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      try {
        let parcels_model = localStorage.getItem(storageParcelsModel);
        if (parcels_model) {
          let data = JSON.parse(parcels_model);
          dispatch({
            type: "save",
            payload: data,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  effects: {
    *getAllParcels({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getParcels, payload);
      if (success) {
        const list = raw?.data?.parcels;
        const total = raw?.data?.totalRecord;
        yield put({
          type: "save",
          payload: { parcelsList: list, parcelsTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },

    *getSingleParcel({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getParcels, payload);
      if (success) {
        const list = raw?.data?.parcels;
        list[0] &&
          (yield put({
            type: "save",
            payload: { parcelData: list[0] },
          }));
      } else {
        Alert.error(message);
      }
    },

    *createRent({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getParcels, payload);
      if (success) {
        Alert.success("Successfully rented a parcel");
        yield put({
          type: "save",
          payload: { rentModal: false, parcelData: {} },
        });
      } else {
        Alert.error(message);
      }
    },

    *fetchAppraisalType({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getAppraisalType, payload);
      if (success) {
        const list = raw?.data?.appraisalTypes;
        yield put({
          type: "save",
          payload: { appraisalTypes: list },
        });
      } else {
        Alert.error(message);
      }
    },

    *createAppraisal({ payload }, { call, put }) {
      const { raw, success, message } = yield call(postAppraisal, payload);
      if (success) {
        Alert.success("Successfully appraised a parcel");
        yield put({
          type: "save",
          payload: { appraisalModal: false, parcelData: {} },
        });
      } else {
        Alert.error(message);
      }
    },
    *createEncumbrance({ payload }, { call, put }) {
      const { raw, success, message } = yield call(postEncumbrance, payload);
      if (success) {
        yield put({
          type: "save",
          payload: { encumbranceModal: false, parcelData: {} },
        });
        Alert.success("Successfully created an encumbrance.");
      } else {
        Alert.error(message);
      }
    },
    *createRectification({ payload }, { call, put }) {
      const { raw, success, message } = yield call(postRectification, payload);
      if (success) {
        yield put({
          type: "save",
          payload: { rectificationModal: false, parcelData: {} },
        });
        Alert.success("Successfully created a rectification.");
      } else {
        Alert.error(message);
      }
    },

    *getAllAppraisal({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getAppraisals, payload);
      if (success) {
        const list = raw?.data?.appraisals;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { appraisalList: list, appraisalTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },
    *approveAppraisal({ payload }, { call, put, select }) {
      const { raw, success, message } = yield call(putAppraisal, payload);
      if (success) {
        Alert.success("Appraisal review completed");
        const list = yield select(({ parcels }) => parcels.appraisalList);
        const existIndex = list.findIndex(
          (item) => item.id === payload?.parcels[0]?.id
        );
        if (existIndex > -1) {
          list[existIndex].status = payload.status;
        }

        yield put({
          type: "save",
          payload: {
            appraisalReview: false,
            appraisalDetail: {},
            appraisalList: list,
          },
        });
      } else {
        Alert.error(message);
      }
    },
  },

  reducers: {
    save(state, action) {
      const newPayload = {
        ...state,
        ...action.payload,
      };

      try {
        let data = JSON.stringify(newPayload);
        localStorage.setItem(storageParcelsModel, data);
      } catch (err) {
        console.log(err);
      }

      return newPayload;
    },
  },
};
