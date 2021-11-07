define([
    "dojo/_base/declare",
    "components/Legend",
    "components/Basemaps",
    "components/Beacons",
    "components/Laterals",
    "components/Parcels",
    "components/TDP"
], function(declare, Legend, Basemaps, Beacons, Laterals, Parcels, TDP) {
    return declare(null, {
        container: null,
        latitude: null,
        longitude: null,
        event: null,
        map: null,
        view: null,
        layers: null,
        parcel: null,

        constructor(){
            const container = `<div id="mapInfoTools" class="bg-blue-100 w-100 border-1 border-gray-600"></div>`

            document.querySelector("#legend").innerHTML = container
            this.container = document.querySelector('#mapInfoTools');

        //    this.setPoints()
        },

        getMapPoints(point){
            this.longitude = point.longitude;
            this.latitude = point.latitude;

            // document.querySelector('#points h3').innerHTML = 'Cursor Point'
            // document.querySelector('#longitude').innerHTML = this.longitude
            // document.querySelector('#latitude').innerHTML = this.latitude
        },

        getMap(map){
            this.map = map
        },

        getView(view){
            this.view = view
        },
        
        getLayers(layers){
            this.layers = layers
        },

        setModules(){
            // this.setBasemap()
            this.setLegend()
            this.setBeacon()
            // this.setLateral()
            this.setParcel()
            this.SetTDP()
        },

        setLegend(){
            const legend = new Legend({
                view: this.view,
                container: this.container,
                layers: this.layers,
            });

            legend.startup(this.view, this.container, this.layers)
            // legend.getView(this.view)
            // legend.getContainer(this.container)
            // legend.getLayers(this.layers)
        },

        setPoints(){
            const point = `<div id="points" class="menu ring-2 ring-gray-100 text-gray-100 bg-gray-500 drop-shadow-lg">
                <h3 class="text-lg bg-gray-600 px-2 py-1.5">Map Center</h3>
                <ul class="px-2 py-1">
                    <li class="text-md mb-1">Longitude: <span id="longitude"></span></li>
                    <li class="text-md">Latitude: <span id="latitude"></span></li>
                </ul>
            </div>`
            
            document.querySelector('#bottom-left').insertAdjacentHTML('afterbegin', point)

            this.getMapPoints(point);
        },

        setLateral(){
            const lateral = new Laterals();
            lateral.getLayers(this.layers);
            lateral.getView(this.view)

            lateral.getContainer(this.container)
        },

        setParcel(){
            this.parcel = new Parcels();
            this.parcel.startup(this.view, this.layers[1], this.container);
        },

        setBeacon(){
            const beacon = new Beacons();
            beacon.startup(this.view, this.layers[0], this.container);
            beacon.getParcel(this.layers[1])
        },

        setBasemap(){
            const basemaps = new Basemaps()
            basemaps.getMap(this.map)
            basemaps.getContainer(this.container)
        },

        SetTDP(){
            const tdp = new TDP()
            tdp.startup(this.view, this.container, this.layers[1])
        }
    })
});