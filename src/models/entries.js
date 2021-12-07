import { Alert } from "../components/Alert.components";

import {
  getEntries,
  getApplications,
  getApplicationDetail,
  getRectifications,
  getEncumbrances,
  postTerminateEncumbrance,
} from "../services/entries";

const payload_create_rectification = {
  entity: "PARCEL",
  entityId: "PARCEL_NUMBER",
  file: "file_base64",
  fileFormat: "pdf",
  description: "something is here .....",
  fields: [
    { fieldName: "firstName", value: "my new name" },
    { fieldName: "lastName", value: "my new last name" },
    { fieldName: "regNumber", value: "my new reg number" },
    { fieldName: "firstName", value: "my new name" },
  ],
};

const payload_get_rectification = [
  {
    id: 1,
    entity: "PARCEL",
    entityId: "PARCEL_NUMBER",
    fileName: "1.pdf",
    createdBy: "personal",
    createdAt: "2020-08-24",
    description: "something is here .....",

    fields: [
      { fieldName: "firstName", value: "my new name" },
      { fieldName: "lastName", value: "my new last name" },
      { fieldName: "regNumber", value: "my new reg number" },
      { fieldName: "firstName", value: "my new name" },
    ],
  },
];

const paylaod_get_more_detail = [
  {
    fieldName: "firstName",
    newValue: "new_value_is_here",
    oldValue: "old_value_is_here",
  },
];

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

    encumbranceList: [],
    encumbranceTotal: 0,
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

    *getAllRectification({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getRectifications, payload);
      if (success) {
        const list = raw?.data?.items;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { rectificationList: list, rectificationTotal: total },
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
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
