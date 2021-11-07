import { routerRedux } from "dva/router";
import axios from "axios";
import {
  postLogin,
  postSignup,
  postForgotPassword,
  postResetPassword,
  postLogOut,
} from "../services/authentication";
import { Alert } from "../components/Alert.components";

import {
  storageToken,
  storageRefeshToken,
  storageProfile,
} from "../utils/constant";

const initialState = {
  profile: {},
  regForm: {},
  regStep: 1,
};

export default {
  namespace: "authentication",

  state: { ...initialState },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      //Persist token details logic
      try {
        let profile = localStorage.getItem(storageProfile);
        if (profile) {
          let profileData = JSON.parse(profile);
          dispatch({
            type: "save",
            payload: { profile: profileData },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { raw, success, message } = yield call(postLogin, payload);
      if (success) {
        const data = raw?.data;
        const token = data ? data.jwtToken : "";
        localStorage.setItem(storageToken, token);
        localStorage.setItem(storageProfile, JSON.stringify(data));
        yield put(routerRedux.push({ pathname: "/parcels" }));
      } else {
        Alert.error(message);
      }
    },
    *signup({ payload }, { call, put }) {
      const { raw, success, message } = yield call(postSignup, payload);
      if (success) {
        console.log(raw);
      } else {
        Alert.error(message);
      }
    },
    *forgotPassword({ payload }, { call, put }) {
      const { raw, success, message } = yield call(postForgotPassword, payload);
      if (success) {
        Alert.success(
          "Password reset initiated successfully. An email has been sent to your mail"
        );
        yield put(routerRedux.push({ pathname: "/login" }));
      } else {
        Alert.error(message);
      }
    },
    *resetPassword({ payload }, { call, put }) {
      const { raw, success, message } = yield call(postResetPassword, payload);
      if (success) {
        Alert.success("Password reset successfully. Please proceed to login");
        yield put(routerRedux.push({ pathname: "/login" }));
      } else {
        Alert.error(message);
      }
    },
    *logOut({ payload }, { call, put }) {
      const { refresh_token } = payload;
      call(postLogOut, { refresh_token });
      localStorage.clear();
      yield put(routerRedux.push("/login"));
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
