export const adminMenu = [
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
        role: ["VIEW_PLOT"],
      },
      {
        icon: "icon-forward-outline",
        label: "Plot Applications",
        pathname: "/application",
        role: ["VIEW_PLOT_APPLCIATION"],
      },
      {
        icon: "icon-forward-outline",
        label: "Plot Appraisals",
        pathname: "/appraisal",
        role: ["REVIEW_APPRAISAL"],
      },
      {
        icon: "icon-forward-outline",
        label: "Owners Entries",
        pathname: "/owners",
        role: ["VIEW_PLOT"],
      },
      {
        icon: "icon-forward-outline",
        label: "Rectification Entries",
        pathname: "/rectification",
        role: ["VIEW_RECTIFICATION"],
      },
      {
        icon: "icon-forward-outline",
        label: "Defect Entries",
        pathname: "/encumbrance",
        role: ["VIEW_ENCUMBRANCE"],
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
        role: ["VIEW_GIS_PLOT"],
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
        role: ["VIEW_PLOT_PENDING"],
      },
      {
        icon: "icon-briefcase",
        label: "Deeds",
        pathname: "/deeds",
        role: ["VIEW_PLOT"],
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

export const usersMenu = [
  {
    title: " ",
    list: [
      {
        icon: "icon-briefcase-1",
        label: "My Plot",
        pathname: "/parcels",
        role: [],
      },
      {
        icon: "icon-forward-outline",
        label: "Plot Applications",
        pathname: "/application",
        role: [],
      },
    ],
  },
];
