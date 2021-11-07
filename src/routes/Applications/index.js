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

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const { applicationsList, applicationsTotal } = entries;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    applicationsList: sampleData,
    applicationsTotal: 5,
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
