export const artistMenu = [
  {
    iconName: 'icon-play-circle',
    label: 'Manage',
    route: '/media',
    routeSearch: '?mode=manage',
  },
  {
    iconName: 'icon-music-1',
    label: 'Songs',
    route: '/media',
    routeSearch: '?mode=songs',
  },
  {
    iconName: 'icon-videocam',
    label: 'Videos',
    route: '/media',
    routeSearch: '?mode=videos',
  },
];

export const userMenu = [
  {
    iconName: 'icon-play-circle',
    label: 'Albums',
    route: '/albums',
  },
  {
    iconName: 'icon-music-1',
    label: 'Songs',
    route: '/songs',
  },
  {
    iconName: 'icon-videocam',
    label: 'Videos',
    route: '/videos',
  },
];

export const favoriteMenu = [
  {
    iconName: 'icon-edit',
    label: 'Posts',
    route: '/favorite',
    routeSearch: '?mode=posts',
  },
  {
    iconName: 'icon-music-1',
    label: 'Songs',
    route: '/favorite',
    routeSearch: '?mode=songs',
  },
  {
    iconName: 'icon-videocam',
    label: 'Videos',
    route: '/favorite',
    routeSearch: '?mode=videos',
  },
];
