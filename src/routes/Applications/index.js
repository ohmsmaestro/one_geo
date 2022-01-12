import { connect } from "dva";
import { Applications } from "./Applications";
import { routerRedux } from "dva/router";

const sampleData = [
  {
    id: 1,
    application_number: "APP-23454345",
    full_name: "Ijeh Michael Ifeanyi",
    email: "ban@ban.com",
    comments: 0,
    created_at: "30-09-2021 14:32:00",
    status: "PENDING_REVIEW",
  },
  {
    id: 2,
    application_number: "APP-23454345",
    full_name: "Ijeh Michael Ifeanyi",
    email: "ban@ban.com",
    comments: 0,
    created_at: "30-09-2021 14:32:00",
    status: "PENDING_ALLOCATION",
  },
  {
    id: 3,
    application_number: "APP-23454345",
    full_name: "Ijeh Michael Ifeanyi",
    email: "ban@ban.com",
    comments: 0,
    created_at: "30-09-2021 14:32:00",
    status: "REJECTED",
  },
  {
    id: 4,
    application_number: "APP-23454345",
    full_name: "Ijeh Michael Ifeanyi",
    email: "ban@ban.com",
    comments: 0,
    created_at: "30-09-2021 14:32:00",
    status: "ALLOCATED",
  },
  {
    id: 5,
    application_number: "APP-23454345",
    full_name: "Ijeh Michael Ifeanyi",
    email: "ban@ban.com",
    comments: 0,
    created_at: "30-09-2021 14:32:00",
    status: "PENDING_REVIEW",
  },
  {
    id: 6,
    application_number: "APP-23454345",
    full_name: "Ijeh Michael Ifeanyi",
    email: "ban@ban.com",
    comments: 0,
    created_at: "30-09-2021 14:32:00",
    status: "PENDING_ALLOCATION",
  },
  {
    id: 7,
    application_number: "APP-23454345",
    full_name: "Ijeh Michael Ifeanyi",
    email: "ban@ban.com",
    comments: 0,
    created_at: "30-09-2021 14:32:00",
    status: "REJECTED",
  },
  {
    id: 8,
    application_number: "APP-23454345",
    full_name: "Ijeh Michael Ifeanyi",
    email: "ban@ban.com",
    comments: 0,
    created_at: "30-09-2021 14:32:00",
    status: "ALLOCATED",
  },
];

const fetchActionURL = "entries/getAllApplications";

const date = {
  data: {
    pagination: { totalPage: 1, page: 1, totalRecord: 5 },
    applications: [
      {
        createdAt: "2022-01-11",
        approved: false,
        id: "APP-000000000005",
        applicantName: "Omenesa Muhammed Zainab",
        signupId: 1,
        email: "omenesa2012@gmail.com",
        status: "APPROVED",
      },
      {
        createdAt: "2022-01-11",
        approved: false,
        id: "APP-000000000006",
        applicantName: "Omenesa Muhammed Zainab",
        signupId: 2,
        email: "omenesa2017@gmail.com",
        status: "PENDING",
      },
      {
        createdAt: "2022-01-11",
        approved: false,
        id: "APP-000000000007",
        applicantName: "asvda vsfbsv vsva",
        signupId: 3,
        email: "bans@abjva.com",
        status: "PENDING",
      },
      {
        createdAt: "2022-01-11",
        approved: false,
        id: "APP-000000000008",
        applicantName: "JAMES EDWARD FRED",
        signupId: 4,
        email: "ijehmichael24@gmail.com",
        status: "PENDING",
      },
    ],
  },
  meta: {
    message: "OK",
    status: "200",
    info: "Request processed successfully",
  },
};

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const { applicationsList, applicationsTotal } = entries;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    applicationsList,
    applicationsTotal,
    fetchActionURL,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname, search) {
      dispatch(routerRedux.push({ pathname, search }));
    },
    getAllApplications(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
