import { routerRedux } from "dva/router";
import { Alert } from "../components/Alert.components";

import {
  getUsers,
  postUser,
  getRoles,
  postRole,
  putRole,
  getAllPermissions,
  getUserDetails,
} from "../services/users";

import { storageUsersModel } from "../utils/constant";

const initialState = {
  usersList: [],
  usersTotal: 0,
  createUserModal: false,
  usersDetail: {}, // user detail on profile

  rolesList: [],
  rolesTotal: 0,
  roleData: {},
  roleEditMode: false,

  permissionList: [],
};

export default {
  namespace: "users",

  state: {
    ...initialState,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      try {
        let users_model = localStorage.getItem(storageUsersModel);
        if (users_model) {
          let data = JSON.parse(users_model);
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
    *getAllUsers({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getUsers, payload);
      if (success) {
        const list = raw?.data?.users;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { usersList: list, usersTotal: total },
        });
      } else {
        Alert.error(message);
      }
    },

    *postCreateUser({ payload }, { call, put, select }) {
      const { raw, message, success } = yield call(postUser, payload);
      if (success) {
        const data = raw?.data ? raw.data : {};
        const oldList = yield select(({ users }) => users.usersList);
        const newList = [data, ...oldList];

        yield put({
          type: "save",
          payload: { createUserModal: false, usersList: newList },
        });
        Alert.success("User account is successfully created");
      } else {
        Alert.error(message);
      }
    },

    *getAllRoles({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getRoles, payload);
      if (success) {
        const list = raw?.data?.roles;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: "save",
          payload: { rolesList: list, rolesTotal: 2 },
        });
      } else {
        Alert.error(message);
      }
    },
    *postCreateRole({ payload }, { call, put }) {
      const { raw, message, success } = yield call(postRole, payload);
      if (success) {
        Alert.success("Role was successfully created");
        yield put(routerRedux.push({ pathname: "/role-management" }));
      } else {
        Alert.error(message);
      }
    },
    *putEditRole({ payload }, { call, put }) {
      const { raw, message, success } = yield call(putRole, payload);
      if (success) {
        Alert.success("Role was successfully edited");
        yield put(routerRedux.push({ pathname: "/role-management" }));
      } else {
        Alert.error(message);
      }
    },

    *getAllPermissions({ payload }, { call, put }) {
      const { raw, message, success } = yield call(getAllPermissions, payload);
      if (success) {
        const list = raw?.data?.pages;
        yield put({
          type: "save",
          payload: {
            permissionList: list,
          },
        });
      } else {
        Alert.error(message);
      }
    },

    *getUserDetails({ payload }, { call, put }) {
      const { raw, message, success } = yield call(getUserDetails, payload);
      if (success) {
        const data = raw?.data;
        yield put({
          type: "save",
          payload: {
            usersDetail: data,
          },
        });
      } else {
        Alert.error(message);
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
        localStorage.setItem(storageUsersModel, data);
      } catch (err) {
        console.log(err);
      }

      return newPayload;
    },
  },
};
