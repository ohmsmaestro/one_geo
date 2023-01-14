import { Alert } from "../components/Alert.components";
import { routerRedux } from "dva/router";

import {
  getParcels,
  getMyParcels,
  getParcelOwner,
  postAssignParcelOwner,
  postEncumbrance,
  postRectification,
  postAppraisal,
  getAppraisals,
  putAppraisal,
  getAppraisalType,
  getDeeds,
  postDeepRequest,
  putApproveDeed,
  getDeedNewOwner,
  getDeedOwners,
  getSingleDeed,
  postApplicationForm,
  getApplicationForms,
  postAssignOwner
} from "../services/parcels";

import { storageParcelsModel } from "../utils/constant";

const sample_applicationsFormsList = [
  {
    id: 0,
    createdBy: { firstName: 'Michael', lastName: 'Ijeh', middleName: 'Ifeanyi' },
    parcelNumber: "AD009455",
    description: 'Something is here ...... ',
    type: 'Application for Regularization of Title',
    status: 'OPEN'
  }
];

const initialState = {
  parcelsList: [],
  parcelsTotal: 0,
  parcelData: {},
  parcelOwner: {},
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

  deedList: [],
  deedTotal: 0,
  deedData: {},
  deedDecisionModal: false,
  deedNewOwner: {},

  applicationFormModal: false,
  applicationFormList: [],
  applicationFormTotal: 0,

  assignOwnerModal: false, // Toggle the assign owner modal
}

export default {
  namespace: "parcels",

  state: { ...initialState },

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
    *getAllMyParcels({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getMyParcels, payload);
      if (success) {
        const list = raw?.data?.parcels;
        const total = raw?.data?.totalRecord;
        yield put({
          type: "save",
          payload: { parcelsList: list, parcelsTotal: total },
        });
      } else {
        Alert.error(message);
        yield put({
          type: "save",
          payload: { parcelsList: [], parcelsTotal: 0 },
        });
      }
    },
    *getSingleParcel({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getParcels, payload);
      if (success) {
        const list = raw?.data?.parcels;
        const item = list[0] ? list[0] : {};
        if (item) {
          yield put({
            type: "save",
            payload: { parcelData: item },
          });
          yield put({ type: "archived/getParcelArchieved", payload: item });
        }
      } else {
        // Alert.error(message);
      }
    },
    *getParcelOwner({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getParcelOwner, payload);
      if (success) {
        const item = raw?.data;
        if (item) {
          yield put({
            type: "save",
            payload: { parcelOwner: item },
          });
        }
      } else {
        // Alert.error(message);
      }
    },
    *assignParcelOwner({ payload }, { call, put }) {
      const { success, message } = yield call(postAssignParcelOwner, payload);
      if (success) {
        Alert.success("Successfully Assigned a new owner");
        yield put({
          type: "save",
          payload: { assignOwnerModal: false, parcelData: {} },
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
        Alert.success("Successfully created a title defect.");
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

    *getAllDeedRequest({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getDeeds, payload);
      if (success) {
        const list = raw?.data?.deeds;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { deedList: list, deedTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },
    *getSingleDeed({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getSingleDeed, payload.id);
      if (success) {
        const item = raw?.data;
        const deed_response = yield call(getDeedOwners, item.id);
        if (deed_response.success) {
          const newOwner = deed_response.raw?.data?.newOwner;
          const oldOwner = deed_response.raw?.data?.oldOwner;

          yield put({
            type: "parcels/getSingleParcel",
            payload: { search: item.plotNumber },
          });
          yield put({
            type: "save",
            payload: {
              deedNewOwner: newOwner ? newOwner : {},
              parcelOwner: oldOwner ? oldOwner : {},
              deedData: item,
            },
          });
        } else {
          yield put({
            type: "save",
            payload: {
              deedData: {},
              deedNewOwner: {},
              parcelOwner: {},
            },
          });
          Alert.error(deed_response.message);
        }
      } else {
        Alert.error(message);
        yield put({
          type: "save",
          payload: { deedData: {} },
        });
        yield;
      }
    },
    *postDeepRequest({ payload }, { call, put }) {
      const { success, message, raw } = yield call(postDeepRequest, payload);
      if (success) {
        Alert.success("Deed Application has been created successfully.");
        yield put(routerRedux.push({ pathname: "/deeds" }));
      } else {
        Alert.error(message);
      }
    },
    *approveDeed({ payload }, { call, put, select }) {
      const { success, raw, message } = yield call(putApproveDeed, payload);
      if (success) {
        const data = raw?.data?.deed;
        const deedData = yield select(({ parcels }) => parcels.deedData);

        yield put({
          type: "save",
          payload: {
            deedDecisionModal: false,
            deedData: { ...deedData, ...data },
          },
        });
      } else {
        Alert.error(message);
      }
    },
    *getDeedNewOwner({ payload }, { call, put, select }) {
      const { raw, success, message } = yield call(getDeedNewOwner, payload);
      if (success) {
        const item = raw?.data;
        if (item) {
          yield put({
            type: "save",
            payload: { deedNewOwner: item },
          });
        }
      } else {
        // Alert.error(message);
      }
    },

    *createApplicationForm({ payload }, { call, put }) {
      const { success, message, raw } = yield call(postApplicationForm, payload);
      if (success) {
        Alert.success("Successfully created a new application");
        yield put({
          type: "save",
          payload: { applicationFormModal: false, parcelData: {} },
        });
      } else {
        Alert.error(message);
      }
    },
    *fetchAllApplicationForms({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getApplicationForms, payload);
      if (success) {
        const list = raw?.data?.otherApplications;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { applicationFormList: list, applicationFormTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },

    *createAssignOwner({payload}, { call, put}){
      const { raw, message, success } = yield call(postAssignOwner, payload);
      if(success){ 
        console.log({ raw });

      } else { 
        Alert.error(message)
      }
    }


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
