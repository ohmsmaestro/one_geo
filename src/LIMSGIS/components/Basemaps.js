define([
    "dojo/_base/declare",
], function(declare) {
    return declare(null, {
        map: null,
        container: null,
        basemapType: null,
        constructor(){
            // const parent = document.querySelector('#mapInfoTools');
            // console.log(this.map);
        },

        getMap(map){
            this.map = map;
        },

        setBasemap(basemap){
            this.map.basemap = this.basemapType;
        },

        getContainer(container){
            const self = this
            this.container = container;

            this.container.insertAdjacentHTML('beforeend', `<div id="basemaps" class="menu ring-2 ring-gray-100 text-gray-100 bg-gray-500 drop-shadow-lg">
                <div id="basemap-menu" class="flex justify-between cursor-pointer px-2 py-1.5 bg-gray-600">
                    <h3 id="basemap-title" class="text-lg">Basemaps</h3>

                    <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" class="hidden mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </div>
                <ul class="hidden py-4">
                    <li id="arcgis-imagery" class="text-md text-center mb-4">
                        <img src="../assets/images/basemaps/arcgis-imagery.jpeg" class="h-20 w-24 mx-auto mb-1 border-4 border-gray-700 rounded cursor-pointer" alt="ArcGIS Imagery Basemap">Arcgis Imagery
                    </li>
                    <li id="arcgis-charted-territory" class="text-md text-center mb-4">
                        <img src="../assets/images/basemaps/charted-territory.jpeg" alt="Charted Territory Basemap"  class="h-20 w-24 mx-auto mb-1  cursor-pointer">Charted Territory
                    </li>
                    <li id="arcgis-colored-pencil" class="text-md text-center mb-4">
                        <img src="../assets/images/basemaps/colored-pencil.jpeg" alt="Colored Pencil Basemap"  class="h-20 w-24 mx-auto mb-1  cursor-pointer">Colored Pencil
                    </li>
                    <li id="arcgis-streets" class="text-md text-center mb-4">
                        <img src="../assets/images/basemaps/streets.jpg" alt="Colored Pencil Basemap"  class="h-20 w-24 mx-auto mb-1 cursor-pointer">Streets
                    </li>
                    <li id="arcgis-nova" class="text-md text-center mb-4">
                        <img src="../assets/images/basemaps/nova.jpeg" alt="Colored Pencil Basemap"  class="h-20 w-24 mx-auto mb-1 cursor-pointer">Nova
                    </li>
                    <li id="arcgis-oceans" class="text-md text-center mb-4">
                        <img src="../assets/images/basemaps/oceans.jpeg" alt="Colored Pencil Basemap"  class="h-20 w-24 mx-auto mb-1 cursor-pointer">Oceans
                    </li>
                    <li id="arcgis-community" class="text-md text-center mb-4">
                        <img src="../assets/images/basemaps/community.jpeg" alt="Colored Pencil Basemap"  class="h-20 w-24 mx-auto mb-1 cursor-pointer">Community
                    </li>
                    <li id="osm-dark-gray" class="text-md text-center mb-4">
                        <img src="../assets/images/basemaps/dark-gray.jpg" alt="Colored Pencil Basemap"  class="h-20 w-24 mx-auto mb-1 cursor-pointer">OpenStreetMap (Dark Gray Canvas)
                    </li>
                    <li id="osm-light-gray" class="text-md text-center">
                        <img src="../assets/images/basemaps/light-gray.jpg" alt="Colored Pencil Basemap"  class="h-20 w-24 mx-auto mb-1 cursor-pointer">OpenStreetMap (Light Gray Canvas)
                    </li>
                </ul>
            </div>`)

            document.querySelector('#basemap-menu').addEventListener('click', function(){
                this.querySelectorAll('svg').forEach(function(svg){
                    svg.classList.toggle('hidden')
                })

                document.querySelector('#basemaps ul').classList.toggle('hidden');
            })

            document.querySelectorAll('#basemaps li').forEach(function(li){
                li.addEventListener('click', function(){
                    const prev = document.querySelector('#basemaps li img.border-4');
                    prev.classList.remove('border-4', 'rounded', 'border-gray-700');
                    this.querySelector('img').classList.add('border-4', 'rounded', 'border-gray-700');
                    self.basemapType = li.getAttribute('id');

                    self.setBasemap()
                })
            });
        }
    })
})