/* eslint-disable import/no-anonymous-default-export */
import { routerRedux } from "dva/router";
import { Alert } from "../components/Alert.components";

import {
  getEntries,
  getApplications,
  getMyApplications,
  postApplication,
  getApplicationDetail,
  putApplication,
  getApplicationFile,
  getRectifications,
  getRectificationDetail,
  getRectificationFile,
  getEncumbrances,
  getEncumbranceFile,
  putTerminateEncumbrance,
  getEncumbranceDetail,
  postAllocateParcel,
  getOwners,
  getOwnerById,
} from "../services/entries";

export default {
  namespace: "entries",

  state: {
    entriesList: [],
    entriesTotal: 0,
    entryData: {},

    ownersList: [],
    ownersTotal: 0,
    ownersDetail: {},

    applicationsList: [],
    applicationsTotal: 0,
    applicationDetail: {},
    decisionModal: false,
    allocateModal: false,

    rectificationList: [],
    rectificationTotal: 0,
    rectificationDetailModal: false, // Toggle detail modal on rectification

    encumbranceList: [],
    encumbranceTotal: 0,
    encumbranceDetailModal: false, // Toggle detail modal on encumbrance
    terminateModal: false,
  },

  subscriptions: {
    setup() {
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

    *getAllOwnersEntries({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getOwners, payload);
      if (success) {
        const list = raw?.data?.owners;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { ownersList: list, ownersTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },
    *getLandOwner({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getOwnerById, payload);
      if (success) {
        const item = raw?.data
        yield put({
          type: "save",
          payload: { ownersDetail: item, },
        })
      } else {
        Alert.error(message);
      }
    },

    *postApplication({ payload }, { call, put }) {
      const { success, message } = yield call(postApplication, payload);
      if (success) {
        Alert.success("Application has been created successfully.");
        yield put(routerRedux.push({ pathname: "/application" }));
      } else {
        Alert.error(message);
      }
    },
    *getAllApplications({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getApplications, payload);
      if (success) {
        const list = raw?.data?.applications;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { applicationsList: list, applicationsTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },
    *getAllMyApplications({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getMyApplications, payload);
      if (success) {
        const list = raw?.data?.applications;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { applicationsList: list, applicationsTotal: total || 10 },
        });
      } else {
        Alert.error(message);
      }
    },
    *getApplicationDetail({ payload }, { call, put }) {
      // Fetch application details
      const detail_response = yield call(getApplications, {
        page: 1,
        size: 1,
        search: payload.id,
      });

      if (detail_response.success) {
        const details = detail_response.raw?.data?.applications[0];
        console.log(details);
        // fetch applciation requirement list uploaded
        const { raw, success, message } = yield call(
          getApplicationDetail,
          payload
        );
        const data = raw?.data ? raw?.data : {};
        if (success) {
          yield put({
            type: "save",
            payload: { applicationDetail: { ...payload, ...data, ...details } },
          });
        } else {
          Alert.error(message);
          yield put({
            type: "save",
            payload: { applicationDetail: { ...payload, ...details } },
          });
        }
      } else {
        Alert.error(detail_response.message);
        yield put({
          type: "save",
          payload: { applicationDetail: {} },
        });
      }
    },
    *approveApplication({ payload }, { call, put, select }) {
      const { success, raw, message } = yield call(putApplication, payload);
      if (success) {
        const data = raw?.data?.application;
        let applicationDetail = yield select(
          ({ entries }) => entries.applicationDetail
        );
        yield put({
          type: "save",
          payload: {
            decisionModal: false,
            applicationDetail: { ...applicationDetail, ...data },
          },
        });
      } else {
        Alert.error(message);
      }
    },
    *allocateParcel({ payload }, { call, put }) {
      const { success, raw, message } = yield call(postAllocateParcel, payload);
      if (success) {
        const data = raw?.data?.application;
        Alert.success("Application is successfully allocated.");
        yield put({
          type: "save",
          payload: {
            allocateModal: false,
            applicationDetail: { ...data },
          },
        });
      } else {
        Alert.error(message);
      }
    },

    *getAllRectification({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getRectifications, payload);
      if (success) {
        const list = raw?.data?.rectifications;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { rectificationList: list, rectificationTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },
    *getRectificationDetail({ payload }, { call, put }) {
      const { raw, success, message } = yield call(
        getRectificationDetail,
        payload.id
      );
      if (success) {
        const detail = raw?.data?.detail;
        const newPayload = { ...payload, fields: detail };

        yield put({
          type: "save",
          payload: { entryData: newPayload },
        });

        yield put({
          type: "entries/getRectificationFile",
          payload: newPayload,
        });
      } else {
        Alert.error(message);
      }
    },

    *getRectificationFile({ payload }, { call, put }) {
      const { raw, success, message } = yield call(
        getRectificationFile,
        payload.fileName
      );
      if (success) {
        console.log({ raw });
        const data = raw?.data ? raw?.data : {};
        yield put({
          type: "save",
          payload: { entryData: { ...payload, ...data } },
        });
      } else {
        Alert.error(message);
      }
    },

    *getAllEncumbrance({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getEncumbrances, payload);
      if (success) {
        const list = raw?.data?.encumbrances;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { encumbranceList: list, encumbranceTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },
    *terminateEncumbrance({ payload }, { call, put, select }) {
      const { success, message, raw } = yield call(
        putTerminateEncumbrance,
        payload
      );

      if (success) {
        const data = raw?.data ? raw.data : {};
        const oldList = yield select(({ entries }) => entries.encumbranceList);
        const newList = oldList.map((item) => {
          if (item.id === data.id) {
            return { ...item, ...data };
          } else {
            return item;
          }
        });
        console.log({ newList });

        yield put({
          type: "save",
          payload: {
            encumbranceList: newList,
            entryData: {},
            terminateModal: false,
          },
        });
      } else {
        Alert.error(message);
      }
    },
    *getEncumbranceDetail({ payload }, { call }) {
      const { success, raw, message } = yield call(
        getEncumbranceDetail,
        payload.id
      );
      if (success) {
        console.log(raw);
      } else {
        Alert.error(message);
      }
    },

    *getEncumbranceFile({ payload }, { call, put }) {
      const { raw, success, message } = yield call(
        getEncumbranceFile,
        payload.fileName
      );
      if (success) {
        const data = raw?.data ? raw?.data : {};
        yield put({
          type: "save",
          payload: { entryData: { ...payload, ...data } },
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
