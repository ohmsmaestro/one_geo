import { Alert } from "../components/Alert.components";

import {
  getEntries,
  getApplications,
  getApplicationDetail,
  getRectifications,
  getRectificationDetail,
  getRectificationFile,
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
    { fieldName: "LAND_USE", value: "my new name" },
    { fieldName: "CATEGORY", value: "my new last name" },
    { fieldName: "REG_NUMBER", value: "my new reg number" },
    { fieldName: "LAND_TYPE", value: "my new name" },
  ],
};

const payload_get_rectification = [
  {
    id: 1,
    entity: "PARCEL",
    entityId: "PARCEL_NUMBER",
    fileName: "1.pdf",
    createdBy: "personal",
    createdAt: "2020-08-24 14:32:20",
    description: "something is here .....",

    fields: [
      { fieldName: "LAND_USE", newValue: "PUBLIC", oldValue: "PRIVATE" },
      { fieldName: "CATEGORY", newValue: "B", oldValue: "C" },
      { fieldName: "REG_NUMBER", newValue: "2345678", oldValue: "342233" },
      { fieldName: "LAND_TYPE", newValue: "EDUCATIONAL", oldValue: "HEALTH" },
    ],
  },
  {
    id: 1,
    entity: "PARCEL",
    entityId: "PARCEL_NUMBER",
    fileName: "1.pdf",
    createdBy: "personal",
    createdAt: "2020-08-24 14:32:20",
    description: "something is here .....",

    fields: [
      { fieldName: "LAND_USE", newValue: "PUBLIC", oldValue: "PRIVATE" },
      { fieldName: "CATEGORY", newValue: "B", oldValue: "C" },
      { fieldName: "REG_NUMBER", newValue: "2345678", oldValue: "342233" },
      { fieldName: "LAND_TYPE", newValue: "EDUCATIONAL", oldValue: "HEALTH" },
    ],
  },
  {
    id: 1,
    entity: "PARCEL",
    entityId: "PARCEL_NUMBER",
    fileName: "1.pdf",
    createdBy: "personal",
    createdAt: "2020-08-24 14:32:20",
    description: "something is here .....",

    fields: [
      { fieldName: "LAND_USE", newValue: "PUBLIC", oldValue: "PRIVATE" },
      { fieldName: "CATEGORY", newValue: "B", oldValue: "C" },
      { fieldName: "REG_NUMBER", newValue: "2345678", oldValue: "342233" },
      { fieldName: "LAND_TYPE", newValue: "EDUCATIONAL", oldValue: "HEALTH" },
    ],
  },
  {
    id: 1,
    entity: "PARCEL",
    entityId: "PARCEL_NUMBER",
    fileName: "1.pdf",
    createdBy: "personal",
    createdAt: "2020-08-24 14:32:20",
    description: "something is here .....",

    fields: [
      { fieldName: "LAND_USE", newValue: "PUBLIC", oldValue: "PRIVATE" },
      { fieldName: "CATEGORY", newValue: "B", oldValue: "C" },
      { fieldName: "REG_NUMBER", newValue: "2345678", oldValue: "342233" },
      { fieldName: "LAND_TYPE", newValue: "EDUCATIONAL", oldValue: "HEALTH" },
    ],
  },
  {
    id: 1,
    entity: "PARCEL",
    entityId: "PARCEL_NUMBER",
    fileName: "1.pdf",
    createdBy: "personal",
    createdAt: "2020-08-24 14:32:20",
    description: "something is here .....",

    fields: [
      { fieldName: "LAND_USE", newValue: "PUBLIC", oldValue: "PRIVATE" },
      { fieldName: "CATEGORY", newValue: "B", oldValue: "C" },
      { fieldName: "REG_NUMBER", newValue: "2345678", oldValue: "342233" },
      { fieldName: "LAND_TYPE", newValue: "EDUCATIONAL", oldValue: "HEALTH" },
    ],
  },
  {
    id: 1,
    entity: "PARCEL",
    entityId: "PARCEL_NUMBER",
    fileName: "1.pdf",
    createdBy: "personal",
    createdAt: "2020-08-24 14:32:20",
    description: "something is here .....",

    fields: [
      { fieldName: "LAND_USE", newValue: "PUBLIC", oldValue: "PRIVATE" },
      { fieldName: "CATEGORY", newValue: "B", oldValue: "C" },
      { fieldName: "REG_NUMBER", newValue: "2345678", oldValue: "342233" },
      { fieldName: "LAND_TYPE", newValue: "EDUCATIONAL", oldValue: "HEALTH" },
    ],
  },
  {
    id: 1,
    entity: "PARCEL",
    entityId: "PARCEL_NUMBER",
    fileName: "1.pdf",
    createdBy: "personal",
    createdAt: "2020-08-24 14:32:20",
    description: "something is here .....",

    fields: [
      { fieldName: "LAND_USE", newValue: "PUBLIC", oldValue: "PRIVATE" },
      { fieldName: "CATEGORY", newValue: "B", oldValue: "C" },
      { fieldName: "REG_NUMBER", newValue: "2345678", oldValue: "342233" },
      { fieldName: "LAND_TYPE", newValue: "EDUCATIONAL", oldValue: "HEALTH" },
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

    rectificationList: payload_get_rectification,
    rectificationTotal: 5,
    rectificationDetailModal: false, // Toggle detail modal on rectification

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
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
