import { Alert } from "../components/Alert.components";

import { getUsers, getRoles } from "../services/users";

const initialState = {
  usersList: [],
  usersTotal: 0,
  createUserModal: true,

  rolesList: [],
  rolesTotal: 0,
};

export default {
  namespace: "users",

  state: {
    ...initialState,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *getAllUsers({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getUsers, payload);
      if (success) {
        const list = raw?.data?.users;
        const total = raw?.data?.pagination?.total_record;
        yield put({
          type: "save",
          payload: { usersList: list, usersTotal: 9 },
        });
      } else {
        Alert.error(message);
      }
    },
    *getAllRoles({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getRoles, payload);
      if (success) {
        const list = raw?.data?.items;
        const total = raw?.data?.pagination?.total_record;
        yield put({
          type: "save",
          payload: { rolesList: list, rolesTotal: total },
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
