/* eslint-disable import/no-anonymous-default-export */
import { routerRedux } from 'dva/router';
import { Alert } from '../components/Alert.components';

import { getLands, postLand } from '../services/lands';

import { storageLandsModel } from '../utils/constant';

const DummyPayload = [
  {
    plotId: 1,
    parcelNumber: '061',
    landSize: 56.78,
    landUse: 'Residential',
    landType: 'fland land',
    legalDescription: 'Not available',
    lga: 1,
    lastPaymentDate: '2020-01-01',
    amount: 34.9,
    paymentOfMethod: 'Bank',
    surveyPlanNumber: '009',
    surveyDate: '2020-01-01',
    surveyDesignation: 'Director',
    surveyorName: 'Akaramuda',
    surveyorGeneralDate: '2020-01-01',
    allocationNumber: '009',
    rofoNumber: '09999',
    lengthOfTerm: 99,
    rentRate: 90.99,
    commencementDate: '2020-01-01',
    rentRevision: 'uuuu',
    timeOfErection: '11:89',
    valueOfImprovement: 89.99,
    cofoNumber: '90999',
    executionDate: '2020-01-01',
    dateOfExpiration: '',
    registrationNumber: '567856789',
    regPage: 1,
    volumeNo: '09999',
    regDate: '2020-01-01',
    regTime: '11:90',
    assignedTo: {
      name: 'INC Company',
      registrationNumber: '5678765',
      registrationAddress: 'Arab road',
      registrationDate: '',
      residentialAddress: 'residentialAddress',
      contactAddress: 'contactAddress',
      phone: 'phone',
      email: 'email',
      officeAddress: 'no 23 off upper iweka',
      ownershipType: 'CORPORATE',
      nationality: 'Nigeria',
      contactPhone: '09088667755',
      contactName: 'Omenesa Muhammed Z',
      tin: '4567899876567890',
      faxNumber: '787879',
      correspondence: 'correspondence',
      typeOfBusiness: 'demand and suppply'
    }
  },
  {
    plotId: 4,
    parcelNumber: '001',
    landSize: 56.78,
    landUse: 'Agriculture',
    landType: 'fland land',
    legalDescription: 'Not available',
    lga: 1,
    lastPaymentDate: '2020-01-01',
    amount: 34.9,
    paymentOfMethod: 'Bank',
    surveyPlanNumber: '009',
    surveyDate: '2020-01-01',
    surveyDesignation: 'Director',
    surveyorName: 'Akaramuda',
    surveyorGeneralDate: '2020-01-01',
    allocationNumber: '009',
    rofoNumber: '09999',
    lengthOfTerm: 99,
    rentRate: 90.99,
    commencementDate: '2020-01-01',
    rentRevision: 'uuuu',
    timeOfErection: '11:89',
    valueOfImprovement: 89.99,
    cofoNumber: '90999',
    executionDate: '2020-01-01',
    dateOfExpiration: '',
    registrationNumber: '567856789',
    regPage: 1,
    volumeNo: '09999',
    regDate: '',
    regTime: '11:90',
    assignedTo: {
      name: 'INC Company',
      registrationNumber: '5678765',
      registrationAddress: 'Arab road',
      registrationDate: '',
      residentialAddress: 'residentialAddress',
      contactAddress: 'contactAddress',
      phone: 'phone',
      email: 'email',
      officeAddress: 'no 23 off upper iweka',
      ownershipType: 'CORPORATE',
      nationality: 'Nigeria',
      contactPhone: '09088667755',
      contactName: 'Omenesa Muhammed Z',
      tin: '4567899876567890',
      faxNumber: '787879',
      correspondence: 'correspondence',
      typeOfBusiness: 'demand and suppply'
    }
  },
  {
    plotId: 2,
    parcelNumber: '001',
    landSize: 56.78,
    landUse: 'Agriculture',
    landType: 'fland land',
    legalDescription: 'Not available',
    lga: 1,
    lastPaymentDate: '2020-01-01',
    amount: 34.9,
    paymentOfMethod: 'Bank',
    surveyPlanNumber: '009',
    surveyDate: '2020-01-01',
    surveyDesignation: 'Director',
    surveyorName: 'Akaramuda',
    surveyorGeneralDate: '2020-01-01',
    allocationNumber: '009',
    rofoNumber: '09999',
    lengthOfTerm: 99,
    rentRate: 90.99,
    commencementDate: '2020-01-01',
    rentRevision: 'uuuu',
    timeOfErection: '11:89',
    valueOfImprovement: 89.99,
    cofoNumber: '90999',
    executionDate: '2020-01-01',
    dateOfExpiration: '',
    registrationNumber: '567856789',
    regPage: 1,
    volumeNo: '09999',
    regDate: '',
    regTime: '11:90',
    assignedTo: {
      name: 'INC Company',
      registrationNumber: '5678765',
      registrationAddress: 'Arab road',
      registrationDate: '',
      residentialAddress: 'residentialAddress',
      contactAddress: 'contactAddress',
      phone: 'phone',
      email: 'email',
      officeAddress: 'no 23 off upper iweka',
      ownershipType: 'CORPORATE',
      nationality: 'Nigeria',
      contactPhone: '09088667755',
      contactName: 'Omenesa Muhammed Z',
      tin: '4567899876567890',
      faxNumber: '787879',
      correspondence: 'correspondence',
      typeOfBusiness: 'demand and suppply'
    }
  },
  {
    plotId: 3,
    parcelNumber: '001',
    landSize: 56.78,
    landUse: 'Agriculture',
    landType: 'fland land',
    legalDescription: 'Not available',
    lga: 1,
    lastPaymentDate: '2020-01-01',
    amount: 34.9,
    paymentOfMethod: 'Bank',
    surveyPlanNumber: '009',
    surveyDate: '2020-01-01',
    surveyDesignation: 'Director',
    surveyorName: 'Akaramuda',
    surveyorGeneralDate: '2020-01-01',
    allocationNumber: '009',
    rofoNumber: '09999',
    lengthOfTerm: 99,
    rentRate: 90.99,
    commencementDate: '2020-01-01',
    rentRevision: 'uuuu',
    timeOfErection: '11:89',
    valueOfImprovement: 89.99,
    cofoNumber: '90999',
    executionDate: '2020-01-01',
    dateOfExpiration: '',
    registrationNumber: '567856789',
    regPage: 1,
    volumeNo: '09999',
    regDate: '',
    regTime: '11:90',
    assignedTo: {
      name: 'INC Company',
      registrationNumber: '5678765',
      registrationAddress: 'Arab road',
      registrationDate: '',
      residentialAddress: 'residentialAddress',
      contactAddress: 'contactAddress',
      phone: 'phone',
      email: 'email',
      officeAddress: 'no 23 off upper iweka',
      ownershipType: 'CORPORATE',
      nationality: 'Nigeria',
      contactPhone: '09088667755',
      contactName: 'Omenesa Muhammed Z',
      tin: '4567899876567890',
      faxNumber: '787879',
      correspondence: 'correspondence',
      typeOfBusiness: 'demand and suppply'
    }
  },
];

const DummySingleLand = {
  plotId: 1,
  parcelNumber: '061',
  landSize: 56.78,
  landUse: 'Residential',
  landType: 'fland land',
  legalDescription: 'Not available',
  lga: 1,
  lastPaymentDate: '2020-01-01',
  amount: 34.9,
  paymentOfMethod: 'Bank',
  surveyPlanNumber: '009',
  surveyDate: '2020-01-01',
  surveyDesignation: 'Director',
  surveyorName: 'Akaramuda',
  surveyorGeneralDate: '2020-01-01',
  allocationNumber: '009',
  rofoNumber: '09999',
  lengthOfTerm: 99,
  rentRate: 90.99,
  commencementDate: '2020-01-01',
  rentRevision: 'uuuu',
  timeOfErection: '11:89',
  valueOfImprovement: 89.99,
  cofoNumber: '90999',
  executionDate: '2020-01-01',
  dateOfExpiration: '',
  registrationNumber: '567856789',
  regPage: 1,
  volumeNo: '09999',
  regDate: '2020-01-01',
  regTime: '11:90',
  assignedTo: {
    name: 'INC Company',
    registrationNumber: '5678765',
    registrationAddress: 'Arab road',
    registrationDate: '',
    residentialAddress: 'residentialAddress',
    contactAddress: 'contactAddress',
    phone: 'phone',
    email: 'email',
    officeAddress: 'no 23 off upper iweka',
    ownershipType: 'CORPORATE',
    nationality: 'Nigeria',
    contactPhone: '09088667755',
    contactName: 'Omenesa Muhammed Z',
    tin: '4567899876567890',
    faxNumber: '787879',
    correspondence: 'correspondence',
    typeOfBusiness: 'demand and suppply'
  }

}

const initialState = {
  landsList: [],
  landsTotal: 0,
  landData: {},
  assignOnwerModal: false,
};

export default {
  namespace: 'lands',

  state: { ...initialState },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      try {
        let lands_model = localStorage.getItem(storageLandsModel);
        if (lands_model) {
          let data = JSON.parse(lands_model);
          dispatch({
            type: 'save',
            payload: data
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  },

  effects: {
    *createLand({ payload }, { call, put }) {
      const { raw, success, message } = yield call(postLand, payload);
      if (success) {
        yield put(routerRedux.push('/lands'));
        Alert.success(`You have successfully created a new plot.`);
      } else {
        Alert.error(message);
      }
    },
    *getAllLands({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getLands, payload);
      if (success) {
        const list = raw?.data?.plots;
        const total = raw?.data?.pagination?.totalRecord;
        yield put({
          type: 'save',
          payload: { landsList: list, landsTotal: total }
        });
      } else {
        Alert.error(message);
      }
    },
    *getSingleLand({ payload }, { call, put }) {
      const { raw, success, message } = yield call(getLands, payload);
      if (success) {
        const item = raw?.data?.lands[0];
        if (item) {
          yield put({
            type: 'save',
            payload: { landData: item ?? {} }
          });
          yield put({ type: "archived/getParcelArchieved", payload: item });
        }
      } else {
        Alert.error(message);
      }
    },
  },

  reducers: {
    save(state, action) {
      const newPayload = {
        ...state,
        ...action.payload
      };

      try {
        let data = JSON.stringify(newPayload);
        localStorage.setItem(storageLandsModel, data);
      } catch (err) {
        console.log(err);
      }

      return newPayload;
    }
  }
};
