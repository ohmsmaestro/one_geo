define([
    "dojo/_base/declare",
    "esri/geometry/Polygon",
    "esri/rest/support/Query",
    "esri/Graphic"
], function(declare, Polygon, Query, Graphic) {
    return declare(null, {
        view: null,
        container: null,
        layer: null,

        startup(view, layer, container){
            this.view = view
            this.layer = layer
            this.container = container

            this.displayParcel()
            this.layer.popupTemplate = this.popup()
        },

        displayParcel(){
            const parcel = `<div id="parcel" class="menu ring-2 ring-gray-100 text-gray-100 bg-gray-500 drop-shadow-lg">
                <div id="parcel-menu" class="flex justify-between cursor-pointer px-2 py-1.5 bg-gray-600">
                    <h3 id="basemap-title" class="text-lg">Parcel</h3>

                    <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-6 w-6" fill="none" containerBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" class="hidden mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </div>

                <div id="parcel-container" class="hidden p-2">
                    Parcel Operations Come here
                    Moving on from here, and will be doing more soonest!
                    Parcel Operations Come here
                    Moving on from here, and will be doing more soonest!
                    Parcel Operations Come here
                    Moving on from here, and will be doing more soonest!
                    Parcel Operations Come here
                    Moving on from here, and will be doing more soonest!
                </div>

            </div>`

            this.container.insertAdjacentHTML('beforeend', parcel)

            document.querySelector('#parcel-menu').addEventListener('click', function(){
                this.querySelectorAll('svg').forEach(svg => svg.classList.toggle('hidden'));
                document.querySelector('#parcel-container').classList.toggle('hidden');
            });

        },

        drawParcel(result, view){
            const rings = result.map(x => [x.longitude, x.latitude])
            
            const polygon = new Polygon({
                hasZ: false,
                hasM: false,
                rings: rings
            });

            const graphic = new Graphic({
                geometry: polygon,
                symbol: { type: "simple-fill" }
            });

            view.graphics.add(graphic);
        },

        addFeatures(result, layer, parcelInfo){
            const rings = result.map(x => [x.longitude, x.latitude])
            const graphics = [];
            const graphic = new Graphic({
                geometry: new Polygon({
                    hasZ: false,
                    hasM: false,
                    rings: rings
                }),

                attributes: {
                    REG_NUMBER: parcelInfo.regNo,
                    REG_DATE: parcelInfo.regDate,
                    LEGAL_DESC: parcelInfo.legalDescr,
                    CATEGORY: parcelInfo.category,
                    LAND_USE: parcelInfo.landUse,
                    LAND_TYPE: parcelInfo.landType,
                    CALCULATED: parcelInfo.calcArea,
                    CREATION_D: parcelInfo.creationDate,
                    RELATED_PA: parcelInfo.relatedParcel,
                    ParcelNumber: parcelInfo.parcelNo
                }
            })

            graphics.push(graphic)

            layer.applyEdits({addFeatures: graphics})
        },

        parcelList(){
            const query = new Query()
            query.where = "1=1";
            query.outFields = "*"

            this.layer.queryFeatures(query)
            .then(function(parcels){
                console.log(parcels.features);
            });
        },

        popup(){
            return {
                title: "Parcel",
                content:
                `<div id="parcel-info">
                    <ul>
                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Feature ID:</span> <span class="col-span-5">{FID}</span>
                        </li>

                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Registration Number:</span> <span class="col-span-5">{REG_NUMBER}</span>
                        </li>

                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Registration Date:</span> <span class="col-span-5">{REG_DATE}</span>
                        </li>

                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Legal Description:</span> <span class="col-span-5">{LEGAL_DESC}</span>
                        </li>

                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Category:</span> <span class="col-span-5"> {CATEGORY} </span>
                        </li>

                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Category:</span> <span class="col-span-5"> {CATEGORY} </span>
                        </li>

                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Land Use:</span> <span class="col-span-5"> {LAND_USE} </span>
                        </li>
                        
                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Land Type:</span> <span class="col-span-5"> {LAND_TYPE} </span>
                        </li>
                        
                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Calculated Area:</span> <span class="col-span-5"> {CALCULATED} </span>
                        </li>

                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Creation Date:</span> <span class="col-span-5"> {CREATION_D} </span>
                        </li>
                        
                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Related Parcel:</span> <span class="col-span-5"> {RELATED_PA} </span>
                        </li>
                        
                        <li class="grid grid-cols-8 gap-1 border-b border-gray-300 py-2">
                            <span class="col-span-3 text-right mr-2 font-bold"> Parcel Number:</span> <span class="col-span-5"> {ParcelNumber} </span>
                        </li>
                    </ul>

                    <p id="preview" class="w-1/4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 text-center cursor-pointer"> Edit </p>
                </div>`,
                actions: [{
                    title: "Edit feature",
                    id: "edit-this",
                    className: "esri-icon-edit"
                }]
            }
        }
    })
});