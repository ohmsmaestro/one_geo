console.log("Start: file is being read");
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/CoordinateConversion",
  "components/MapInfoTools",
], function (
  esriConfig,
  Map,
  MapView,
  FeatureLayer,
  CoordinateConversion,
  MapInfotools
) {
  console.log("am staring up");
  const map = new Map({
    basemap: "arcgis-imagery", // Basemap layer service
    // basemap: "arcgis-topographic" // Basemap layer service
  });

  esriConfig.apiKey =
    "AAPK2e6c2c75d7f8427a92b9908081fa2837Y6F0WTNOlgLdXZSaU_lMO6EUxWmyOV2CTbBN891VKK6xdQ-g8mOYkFTrpgo2mmuC";

  const view = new MapView({
    map: map,
    center: [7.455, 9.0614], // Longitude, latitude
    zoom: 18, // Zoom level
    container: "viewDiv", // Div element
  });

  const parcelLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/DEafdQ70haZPW1TT/arcgis/rest/services/Parcel/FeatureServer/0",
    outFields: ["FID", "REG_NUMBER", "REG_DATE", "LEGAL_DESC"],
  });

  const beaconsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/DEafdQ70haZPW1TT/arcgis/rest/services/Beacons/FeatureServer/0",
    outFields: ["FID", "Name"],
    popupTemplate: {
      title: "<div class='bg-gray-500'>Beacons</div>",
      content: "<b>Feature ID:</b> {FID}<br><b>Beacon Name:</b> {Name}",
    },
  });

  map.addMany([parcelLayer, beaconsLayer]);

  view.when(() => {
    const mapInfoTools = new MapInfotools();
    mapInfoTools.getMap(map);
    mapInfoTools.getMapPoints(view.center);
    mapInfoTools.getView(view);
    mapInfoTools.getLayers([beaconsLayer, parcelLayer]);
    mapInfoTools.setModules();

    view.on("pointer-move", function (e) {
      const point = view.toMap(e);

      mapInfoTools.getMapPoints(point);
    });
  });

  const ccWidget = new CoordinateConversion({
    view: view,
  });

  view.ui.add(ccWidget, "bottom-left");
  ccWidget._expanded = true;

  console.log("am ending");
});

console.log("End : file is being read");
