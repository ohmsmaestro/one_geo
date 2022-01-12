import { routerRedux } from "dva/router";
import { Alert } from "../components/Alert.components";

import {
  getEntries,
  getApplications,
  postApplication,
  getApplicationDetail,
  getRectifications,
  getRectificationDetail,
  getRectificationFile,
  getEncumbrances,
  getEncumbranceFile,
  postTerminateEncumbrance,
  getEncumbranceDetail,
} from "../services/entries";

export default {
  namespace: "entries",

  state: {
    entriesList: [],
    entriesTotal: 0,
    entryData: {},

    applicationsList: [],
    applicationsTotal: 0,
    applicationDetail: {},

    rectificationList: [],
    rectificationTotal: 0,
    rectificationDetailModal: false, // Toggle detail modal on rectification

    encumbranceList: [],
    encumbranceTotal: 0,
    encumbranceDetailModal: false, // Toggle detail modal on encumbrance
    terminateModal: false,
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

    *postApplication({ payload }, { call, put }) {
      const { success, raw, message } = yield call(postApplication, payload);
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
        }
      } else {
        Alert.error(detail_response.message);
        yield put({
          type: "save",
          payload: { applicationDetail: {} },
        });
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
    *getRectificationDetail({ payload }, { call, put, select }) {
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

    *getRectificationFile({ payload }, { call, put, select }) {
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
        postTerminateEncumbrance,
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
        const closed_data = {
          close: true,
          closedBy: "Jante Adebowale",
          dateClosed: "2021-12-07",
          description: "sample close",
          fileFormat: "pdf",
          fileName: "04.pdf",
          id: 4,
        };
      } else {
        Alert.error(message);
      }
    },
    *getEncumbranceDetail({ payload }, { call, put }) {
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

    *getEncumbranceFile({ payload }, { call, put, select }) {
      const { raw, success, message } = yield call(
        getEncumbranceFile,
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
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
