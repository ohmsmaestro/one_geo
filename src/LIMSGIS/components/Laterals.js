define([
    "dojo/_base/declare"
], function(declare) {
    return declare(null, {
        view: null,
        container: null,
        layer: null,

        getView(view){
            this.view = view
        },

        displayLateral(){
            const lateral = `<div id="lateral" class="menu ring-2 ring-gray-100 text-gray-100 bg-gray-500 drop-shadow-lg">
                <div id="lateral-menu" class="flex justify-between cursor-pointer px-2 py-1.5 bg-gray-600">
                    <h3 id="basemap-title" class="text-lg">Lateral</h3>

                    <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" class="hidden mt-0.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </div>

                <div id="lateral-container" class="hidden p-2">
                    Lateral Operations Come Here
                </div>

            </div>`

            this.container.insertAdjacentHTML('beforeend', lateral)

            document.querySelector('#lateral-menu').addEventListener('click', function(){
                this.querySelectorAll('svg').forEach(svg => svg.classList.toggle('hidden'));
                document.querySelector('#lateral-container').classList.toggle('hidden');
            });
        },

        getContainer(container){
            this.container = container
            this.displayLateral()
        },

        getLayers(layers){
            this.layers = layers[0];
        }
    })
});