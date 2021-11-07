import { Alert } from "../components/Alert.components";

import { getParcels } from "../services/parcels";

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

    *createAppraisal({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getParcels, payload);
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
