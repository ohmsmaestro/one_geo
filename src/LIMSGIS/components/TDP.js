define([
    "dojo/_base/declare",
    "esri/rest/support/Query"
], function(declare, Query) {
    
    return declare(null, {
        view: null,
        container: null,
        layer: null,

        startup(view, container, layer){
            this.view = view
            this.container = container
            this.layer = layer

            this.displayTDP()
        },

        displayTDP(){
            const tdp = `<div id="beacon" class="menu ring-2 ring-gray-100 text-gray-100 bg-blue-400 pb-0.5 mb-1 drop-shadow-lg relative">
                <div id="beacon-menu" class="flex justify-between cursor-pointer px-2 py-1.5 bg-gray-600">
                    <h3 id="basemap-title" class="text-lg">TDP</h3>

                    <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" class="hidden mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </div>

                <div id="beacon-container" class="px-2">
                    <div id="header" class="my-2">
                        <label class="relative text-gray-400 focus-within:text-gray-600 block">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>

                            <input type="text" id="tdp-input" placeholder="Search Parcel" class="form-input border border-gray-300 focus:border-2 focus:border-blue-600 py-1 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none rounded">
                        </label>

                        <div id="parcel-list">
                        </div>

                    </div>
            </div>`

            this.container.insertAdjacentHTML('beforeend', tdp)

            this.tdpQuery()
        },

        tdpQuery(){
            const query = new Query()
            query.where = "1=1"
            query.outFields = "*"

            const tdpInput = document.querySelector('#tdp-input')
            tdpInput.addEventListener('input', () => {
                this.layer.queryFeatures(query).then( response => {
                    const features = response.features
                    features.forEach(x => console.log(x.attributes.ParcelNumber.includes(document.querySelector('#tdp-input').value)))
                })
            })
        }
    })
})