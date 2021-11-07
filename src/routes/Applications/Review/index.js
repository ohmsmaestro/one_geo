import { connect } from "dva";
import { Review } from "./Review";
import { routerRedux } from "dva/router";
import qs from "query-string";

const sampleData = {
  id: 1,
  application_number: "APP-23454345",
  last_name: "Ijeh",
  first_name: "Michael",
  middle_name: "Ifeanyi",
  email: "ban@ban.com",
  state: { name: "Delta" },
  lga: { name: "Ika North-East" },
  comments: 0,
  created_at: "30-09-2021 14:32:00",
  status: "PENDING_REVIEW",
  identification: "International Passport",
  files: [
    {
      name: "Prove of State of Origin",
      type: "pdf",
    },
    {
      name: "Prove of LGA",
      type: "pdf",
    },
    {
      name: "Prove of Identification",
      type: "jpg",
    },
    {
      name: "Prove of Rent",
      type: "pdf",
    },
    {
      name: "Prove of Ownership",
      type: "doc",
    },
    {
      name: "Prove of Marriage",
      type: "pdf",
    },
  ],
};

const fetchActionURL = "entries/getApplicationDetail";

export const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const { loading, entries } = state;
  const { applicationDetail } = entries;
  const isLoading = loading.effects[fetchActionURL];
  const { params } = match;
  return {
    isLoading,
    applicationDetail: sampleData,
    params,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getApplicationDetail(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
