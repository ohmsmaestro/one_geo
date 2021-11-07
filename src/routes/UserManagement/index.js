import { connect } from "dva";
import { createForm } from "rc-form";
import { UserManagement } from "./UserManagement";
import { routerRedux } from "dva/router";

const sampleData = [
  {
    lastname: "Omenesa",
    firstname: "Muhammed",
    middlename: "Ozigi",
    password: "123456",
    phone: "08065383352",
    email: "omenes2016@gmail.com",
    department: "ict",
    role_name: "admin",
    role_id: 1,
    photo: "",
  },
  {
    lastname: "Omenesa",
    firstname: "Muhammed",
    middlename: "Ozigi",
    password: "123456",
    phone: "08065383352",
    email: "omenes2016@gmail.com",
    department: "ict",
    role_name: "admin",
    role_id: 1,
    photo: "",
  },
  {
    lastname: "Omenesa",
    firstname: "Muhammed",
    middlename: "Ozigi",
    password: "123456",
    phone: "08065383352",
    email: "omenes2016@gmail.com",
    department: "ict",
    role_name: "admin",
    role_id: 1,
    photo: "",
  },
  {
    lastname: "Omenesa",
    firstname: "Muhammed",
    middlename: "Ozigi",
    password: "123456",
    phone: "08065383352",
    email: "omenes2016@gmail.com",
    department: "ict",
    role_name: "admin",
    role_id: 1,
    photo: "",
  },
  {
    lastname: "Omenesa",
    firstname: "Muhammed",
    middlename: "Ozigi",
    password: "123456",
    phone: "08065383352",
    email: "omenes2016@gmail.com",
    department: "ict",
    role_name: "admin",
    role_id: 1,
    photo: "",
  },
  {
    lastname: "Omenesa",
    firstname: "Muhammed",
    middlename: "Ozigi",
    password: "123456",
    phone: "08065383352",
    email: "omenes2016@gmail.com",
    department: "ict",
    role_name: "admin",
    role_id: 1,
    photo: "",
  },
  {
    lastname: "Omenesa",
    firstname: "Muhammed",
    middlename: "Ozigi",
    password: "123456",
    phone: "08065383352",
    email: "omenes2016@gmail.com",
    department: "ict",
    role_name: "admin",
    role_id: 1,
    photo: "",
  },
  {
    lastname: "Omenesa",
    firstname: "Muhammed",
    middlename: "Ozigi",
    password: "123456",
    phone: "08065383352",
    email: "omenes2016@gmail.com",
    department: "ict",
    role_name: "admin",
    role_id: 1,
    photo: "",
  },
  {
    lastname: "Omenesa",
    firstname: "Muhammed",
    middlename: "Ozigi",
    password: "123456",
    phone: "08065383352",
    email: "omenes2016@gmail.com",
    department: "ict",
    role_name: "admin",
    role_id: 1,
    photo: "",
  },
  {
    lastname: "Omenesa",
    firstname: "Muhammed",
    middlename: "Ozigi",
    password: "123456",
    phone: "08065383352",
    email: "omenes2016@gmail.com",
    department: "ict",
    role_name: "admin",
    role_id: 1,
    photo: "",
  },
];

const fetchActionURL = "users/getAllUsers";

export const mapStateToProps = (state, ownProps) => {
  const { loading, users } = state;
  const { usersList, usersTotal } = users;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    usersList,
    usersTotal,
    fetchActionURL,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getAllUsers(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    openCreateModal() {
      dispatch({ type: "users/save", payload: { createUserModal: true } });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(UserManagement));
