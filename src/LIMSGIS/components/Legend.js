define([
    "dojo/_base/declare",
    "esri/widgets/Legend"
], function(declare, Legend) {
    return declare(null, {
        startup(view, container, layers){
            this.view = view;
            this.container = container;
            this.layers = layers;

            this.getContainer(container);
            this.displayLegend(view, layers);
        },

        displayLegend(view, layers){
           new Legend({
                view: this.view,
                container: document.querySelector("#legend-container"),
                basemapLegendVisible: false,
                style: {
                    type: "classic",
                    layout: "stack"
                },
                layerInfos: [
                  {
                    layer: layers[0],
                    title: "Beacons"
                  },
                  {
                    layer: layers[1],
                    title: "Parcels"
                  }
                ]
            });
        },

        getContainer(container){
            const legend = `<div id="legend" class="menu ring-2 ring-gray-100 text-gray-100 bg-gray-500 drop-shadow-lg">
                <div id="legend-menu" class="flex justify-between cursor-pointer px-2 py-1.5 bg-gray-600">
                    <h3 id="basemap-title" class="text-lg">Legend</h3>

                    <svg xmlns="http://www.w3.org/2000/svg" class="hidden mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </div>

                <div id="legend-container"></div>

            </div>`

            container.insertAdjacentHTML('beforeend', legend)

            document.querySelector('#legend-menu').addEventListener('click', function(){
                this.querySelectorAll('svg').forEach(svg => svg.classList.toggle('hidden'));
                document.querySelector('#legend-container').classList.toggle('hidden');
            });
        },
    })
});