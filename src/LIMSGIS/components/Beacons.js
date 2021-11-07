define([
    "dojo/_base/declare",
    "components/Parcels",
    "esri/Graphic",
    "esri/rest/support/Query"
], function(declare, Parcel, Graphic, Query) {
    return declare(null, {
        view: null,
        container: null,
        layer: null,
        beacons: [],
        counter: 0,
        parcel: null,

        startup(view, layer, container){
            this.view = view
            this.layer = layer
            this.container = container

            this.displayBeacon()
        },

        displayBeacon(){
            const beacon = `<div id="beacon" class="menu ring-2 ring-gray-100 text-gray-100 bg-white pb-0.5 mb-1 drop-shadow-lg relative">
                <div id="beacon-menu" class="flex justify-between cursor-pointer px-2 py-1.5 bg-gray-600">
                    <h3 id="basemap-title" class="text-lg">Beacon</h3>

                    <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" class="hidden mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </div>

                <div id="beacon-container" class="px-2">
                    <div id="header" class="grid grid-cols-4 gap-4 my-2">
                        <div id="new-beacon" class="bg-blue-400 text-gray-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div id="edit-beacon" class="bg-blue-400 text-gray-100 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <div id="tasks" class="bg-blue-400  text-gray-700 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto my-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div id="tasks" class="border-2 border-blue-400 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-700 mx-auto my-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

            </div>`

            this.container.insertAdjacentHTML('beforeend', beacon)

            document.querySelector('#beacon-menu').addEventListener('click', function(){
                this.querySelectorAll('svg').forEach(svg => svg.classList.toggle('hidden'));
                document.querySelector('#beacon-container').classList.toggle('hidden');
            });

            const newBtn = document.querySelector('#new-beacon')
            newBtn.addEventListener('click', () => { 
                newBtn.classList.remove('bg-blue-400')
                newBtn.classList.add('bg-blue-600')
                this.newBeacon()
            })

            const editBtn = document.querySelector('#edit-beacon')
            editBtn.addEventListener('click', () => {
                editBtn.classList.remove('bg-blue-400')
                editBtn.classList.add('bg-blue-600')
                this.editBeacon()
            })
        },

        newBeacon(){
            if(!document.querySelector('#beacon-form')){

                const newBeacon = `<div class="bg-blue-300" id="beacon-form">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" id="beacon-form-close" class="h-6 w-6 absolute right-0 text-gray-600 bg-gray-50 rounded-full cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="top: 100px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <div class="flex justify-between text-white py-2 bg-blue-600 px-5 border-b-2 border-white">
                        <h4 class="">New Beacon</h4>

                        <svg xmlns="http://www.w3.org/2000/svg" id="upload" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>

                    <form class="shadow-md px-3 pt-6 pb-8 mb-4">

                        <div id="input-forms" class="mb-4">
                            <div class="grid grid-cols-7 gap-1 mb-1">
                                <div class="col-span-2">
                                    <label class="block text-gray-900 text-sm font-bold mb-0" for="username">Name</label>
                                    <input id="beacon-name" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Beacon Name">
                                </div>

                                <div class="col-span-2">
                                    <label class="block text-gray-900 text-sm font-bold mb-0" for="username">Longitude</label>
                                    <input id="longitude" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Longitude">
                                </div>

                                <div class="col-span-2">
                                    <label class="block text-gray-900 text-sm font-bold mb-0" for="username">Latitude</label>
                                    <input id="latitude" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Latitude">
                                </div>

                                <div class="pt-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 cursor-pointer more-beacon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            
                        </div>

                        <div id="upload-form" class="hidden">
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700">Upload Shapefile</label>
                                <div class="space-y-1 text-center">
                                    <div class="flex text-sm text-gray-600">
                                        <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 p-1 mt-1">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only">
                                        </label>
                                        <p class="pl-1.5 mt-1.5">or drag and drop</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button id="preview" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"> Preview </button>

                    </form>
                </div>`

                
                document.querySelector('#beacon-container').insertAdjacentHTML('beforeend', newBeacon);

                document.querySelector('#beacon-form-close').addEventListener('click', function(){
                    document.querySelector('#beacon-form').remove('hidden');
                    document.querySelector('#new-beacon').classList.add('bg-blue-400')
                    document.querySelector('#new-beacon').classList.remove('bg-blue-600')
                })

                document.querySelector('#upload').addEventListener('click', () => {
                    document.querySelector('#upload-form').classList.toggle('hidden')
                    document.querySelector('#input-forms').classList.toggle('hidden')
                })

                document.querySelector('#preview').addEventListener('click', () => {
                    
                    emptyForm = Array.from(document.querySelectorAll('#input-forms .grid')).filter( (el) => {
                        return (el.querySelector('#beacon-name').value == '' || el.querySelector('#longitude').value == '' || el.querySelector('#latitude').value == '')
                    })

                    if(emptyForm.length < 1){
                        if(document.querySelector('#empty-form')) document.querySelector('#empty-form').remove()

                        const result = Array.from(document.querySelectorAll('#input-forms .grid')).map( (el) => {
                            return { 
                                beaconName: el.querySelector('#beacon-name').value, 
                                longitude: el.querySelector('#longitude').value,
                                latitude: el.querySelector('#latitude').value
                            }
                        })
        
                        self.drawBeacons(result)
        
                        const parcel = new Parcel()
                        parcel.drawParcel(result, this.view)
        
                        const parcelForm = `<div id="parcel-form" class="mb-4">
                                <div class="flex justify-between my-3">
                                    <label class="w-2/5 text-gray-900 text-sm text-right font-bold mr-2 mt-1" for="username">Reg. No</label>
                                    <input id="reg-no" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline w-3/5" id="username" type="number" placeholder="Registration Number">
                                </div>
        
                                <div class="flex justify-between my-3">
                                    <label class="w-2/5 text-gray-900 text-sm text-right font-bold mr-2 mt-1" for="username">Reg. Date</label>
                                    <input id="reg-date" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline w-3/5" id="username" type="date" placeholder="Registration Date">
                                </div>
        
                                <div class="flex justify-between my-3">
                                    <label class="w-2/5 text-gray-900 text-sm text-right font-bold mr-2 mt-1" for="username">Legal Descr.</label>
                                    <textarea  id="legal-descr" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline w-3/5" id="username" type="text" placeholder="Legal Description"></textarea>
                                </div>
        
                                <div class="flex justify-between my-3">
                                    <label class="w-2/5 text-gray-900 text-sm text-right font-bold mr-2 mt-1" for="username">Category</label>
                                    <input id="category" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline w-3/5" id="username" type="text" placeholder="Category">
                                </div>
        
                                <div class="flex justify-between my-3">
                                    <label class="w-2/5 text-gray-900 text-sm text-right font-bold mr-2 mt-1" for="username">Land Use</label>
                                    <input id="land-use" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline w-3/5" id="username" type="text" placeholder="Land Use">
                                </div>
        
                                <div class="flex justify-between my-3">
                                    <label class="w-2/5 text-gray-900 text-sm text-right font-bold mr-2 mt-1" for="username">Land Type</label>
                                    <input id="land-type" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline w-3/5" id="username" type="text" placeholder="Land Type">
                                </div>
        
                                <div class="flex justify-between my-3">
                                    <label class="w-2/5 text-gray-900 text-sm text-right font-bold mr-2 mt-1" for="username">Calc. Area</label>
                                    <input id="calc-area" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline w-3/5" id="username" type="number" placeholder="Calculated Area">
                                </div>
        
                                <div class="flex justify-between my-3">
                                    <label class="w-2/5 text-gray-900 text-sm text-right font-bold mr-2 mt-1" for="username">Creat. Date</label>
                                    <input id="creation-date" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline w-3/5" id="username" type="date" placeholder="Creation Date">
                                </div>
        
                                <div class="flex justify-between my-3">
                                    <label class="w-2/5 text-gray-900 text-sm text-right font-bold mr-2 mt-1" for="username">Rel. Parcel</label>
                                    <input id="related-parcel" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline w-3/5" id="username" type="text" placeholder="Related Parcel">
                                </div>
        
                                <div class="flex justify-between my-3">
                                    <label class="w-2/5 text-gray-900 text-sm text-right font-bold mr-2 mt-1" for="username">Parcel No.</label>
                                    <input id="parcel-no" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline w-3/5" id="username" type="text" placeholder="Parcel Number">
                                </div>
                            </div>
                            <button id="commit" class="w-full bg-green-300 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-not-allowed" type="button"> Commit </button>`
        
                        if(!document.querySelector('#parcel-form')){
                            document.querySelector('form').insertAdjacentHTML('beforeend', parcelForm)
                        }
        
                        const commitBtn = document.querySelector('#commit')
                        commitBtn.classList.remove('bg-green-300', 'cursor-not-allowed')
                        commitBtn.classList.add('bg-green-500', 'hover:bg-green-700')
        
                        commitBtn.addEventListener('click', () => {
                            
                            const parcelInfo = {
                                regNo : document.getElementById('reg-no').value,
                                regDate : document.getElementById('reg-date').value,
                                legalDescr : document.getElementById('legal-descr').value,
                                category : document.getElementById('category').value,
                                landUse : document.getElementById('land-use').value,
                                landType : document.getElementById('land-type').value,
                                calcArea : document.getElementById('calc-area').value,
                                creationDate : document.getElementById('creation-date').value,
                                relatedParcel : document.getElementById('related-parcel').value,
                                parcelNo : document.getElementById('parcel-no').value,
                            }

                            this.addFeatures(result);
                            parcel.addFeatures(result, this.parcel, parcelInfo);
                        })

                    } else {
                        if(!document.querySelector('#empty-form')){
                            document.querySelector('#input-forms').insertAdjacentHTML('beforeend', '<p id="empty-form" class="mx-2 text-xs font-bold italic text-red-700">* All form fields must be filled!</p>')
                        }
                    }

                    
                })

                const beaconAction = () => {
                    document.querySelector('.more-beacon').addEventListener('click', function(){
                        const newForm = `<div class="grid grid-cols-7 gap-1 mb-1">
                            <div class="col-span-2">
                                <label class="block text-gray-900 text-sm font-bold mb-0" for="username">Name</label>
                                <input id="beacon-name" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Beacon Name">
                            </div>
        
                            <div class="col-span-2">
                                <label class="block text-gray-900 text-sm font-bold mb-0" for="username">Longitude</label>
                                <input id="longitude" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Longitude">
                            </div>
        
                            <div class="col-span-2">
                                <label class="block text-gray-900 text-sm font-bold mb-0" for="username">Latitude</label>
                                <input id="latitude" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Latitude">
                            </div>
        
                            <div class="pt-6">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 cursor-pointer more-beacon" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>`
                        
                        const parent = this.parentNode;
                        
                        this.remove('more-beacon');

                        parent.insertAdjacentHTML('beforeend', `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-900 delete-beacon cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>`)
                        
                        document.querySelector('#input-forms').insertAdjacentHTML('beforeend', newForm)

                        document.querySelectorAll('.delete-beacon').forEach( function(el){
                            el.addEventListener('click', function(){
                                this.parentNode.parentNode.remove()
                            })
                        })

                        beaconAction();
                    })
                    
                }

                beaconAction();
            }

        },

        getParcel(layer){
            this.parcel = layer
        },

        drawBeacons(results){
            results.forEach( (result) => {
                
                const polylineGraphic = new Graphic({
                    geometry: {
                        type: "point",
                        longitude: result.longitude,
                        latitude: result.latitude
                    },
    
                    symbol: {
                        type: "simple-marker",
                        color: [226, 119, 40],
                        width: 1
                    },
    
                    attributes: {
                        Name: result.beaconName,
                        Owner: "TransCanada"
                    }
                });

                this.view.graphics.add(polylineGraphic);
                this.view.center = [result.longitude, result.latitude]
            })
        },

        addFeatures(result){
            const graphics = result.map((beacon) => {
                return new Graphic({
                    geometry: {
                        type: "point",
                        longitude: beacon.longitude,
                        latitude: beacon.latitude
                    },

                    attributes: {
                        Name: beacon.beaconName,
                    }
                })
            }) 

            this.layer.applyEdits({addFeatures: graphics})
        },

        beaconList(){
            const query = new Query()
            query.where = "Category = 'A'";

            this.layer.queryFeatures(query)
            .then(function(parcels){
                console.log(parcels);
            });
        },

        editBeacon(){
            const selectBeacon = () => {
                this.view.on('click', (e) => {
                    const query = new Query()
                    query.geometry = this.view.toMap(e)
                    query.outFields = "*",
                    query.distance = 0.5,
    
                    this.layer.queryFeatures(query).then( response => {
                        if(response.features.length){
                            beaconEditForm(response.features[0])
                        }
                    })
                })
            }

            const beaconEditForm = (feature) => {
                if(document.querySelector('#beacon-form')){
                    console.log(document.querySelector('#beacon-form form'))
                }

                `<div class="bg-blue-300" id="beacon-form">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" id="beacon-form-close" class="h-6 w-6 absolute right-0 text-gray-600 bg-gray-50 rounded-full cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="top: 100px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <div class="flex justify-between text-white py-2 bg-blue-600 px-5 border-b-2 border-white">
                        <h4 class="">New Beacon</h4>

                        <svg xmlns="http://www.w3.org/2000/svg" id="upload" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>

                    <form class="shadow-md px-3 pt-6 pb-8 mb-4">

                        <div id="input-forms" class="mb-4">
                            <div class="grid grid-cols-7 gap-1 mb-1">
                                <div class="col-span-2">
                                    <label class="block text-gray-900 text-sm font-bold mb-0" for="username">Name</label>
                                    <input id="beacon-name" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Beacon Name">
                                </div>

                                <div class="col-span-2">
                                    <label class="block text-gray-900 text-sm font-bold mb-0" for="username">Longitude</label>
                                    <input id="longitude" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Longitude">
                                </div>

                                <div class="col-span-2">
                                    <label class="block text-gray-900 text-sm font-bold mb-0" for="username">Latitude</label>
                                    <input id="latitude" class="focus:border-blue-600 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Latitude">
                                </div>
 
                                <div class="pt-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 cursor-pointer more-beacon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            
                        </div>

                        <div id="upload-form" class="hidden">
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700">Upload Shapefile</label>
                                <div class="space-y-1 text-center">
                                    <div class="flex text-sm text-gray-600">
                                        <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 p-1 mt-1">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only">
                                        </label>
                                        <p class="pl-1.5 mt-1.5">or drag and drop</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button id="preview" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"> Preview </button>

                    </form>
                </div>`
                
            }

            document.querySelector('#beacon-container').insertAdjacentHTML('beforeend',
             `<div id="beacon-editing">
                <p class="text-blue-600">Select Beacon to be Edited</p>
            </div>`)

            selectBeacon();

            
        },


    })
});