const usersMenu = [
  {
    title: " ",
    list: [
      // {
      //   icon: "icon-gauge",
      //   label: "Dashboard",
      //   pathname: "/dashboard",
      //   role: ["VIEW_PARCEL"],
      // },
      {
        icon: "icon-briefcase-1",
        label: "Plot",
        pathname: "/parcels",
        role: ["VIEW_PARCEL"],
      },
      {
        icon: "icon-forward-outline",
        label: "Plot Applications",
        pathname: "/application",
        role: ["VIEW_PARCEL"],
      },
      {
        icon: "icon-forward-outline",
        label: "Plot Appraisals",
        pathname: "/appraisal",
        role: ["VIEW_PARCEL"],
      },
      {
        icon: "icon-forward-outline",
        label: "Owners Entries",
        pathname: "/entries",
        role: ["VIEW_PARCEL"],
      },
      {
        icon: "icon-forward-outline",
        label: "Rectification Entries",
        pathname: "/rectification",
        role: ["VIEW_PARCEL"],
      },
      {
        icon: "icon-forward-outline",
        label: "Encumbrance Entries",
        pathname: "/encumbrance",
        role: ["VIEW_PARCEL"],
      },
      {
        icon: "icon-home",
        label: "Condo/Timeshare",
        pathname: "/timeshare",
        role: ["VIEW_TIMESHARE"],
      },
      {
        icon: "icon-home",
        label: "Survey/GIS",
        pathname: "/survey",
        role: ["VIEW_PARCEL"],
      },
      {
        icon: "icon-calculator",
        label: "Accounts",
        pathname: "/users",
        role: ["VIEW_ACCOUNT"],
      },
      {
        icon: "icon-folder",
        label: "Archived Documents",
        pathname: "/archived",
        role: ["VIEW_DOCUMENTS"],
      },
      {
        icon: "icon-briefcase",
        label: "Deeds Parties",
        pathname: "/deeds",
        role: ["VIEW_DEEDS"],
      },
      {
        icon: "icon-users",
        label: "Users Management",
        pathname: "/users",
        role: ["VIEW_USER"],
      },
      {
        icon: "icon-monitor",
        label: "Roles & Privileges",
        pathname: "/role-management",
        role: ["VIEW_USER"],
      },
    ],
  },
];

export default usersMenu;
