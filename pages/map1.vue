<template>
    <div>
      <div class="flex">
        <main class="w-screen h-screen">
          <v-map class="w-full h-full" :options="data1.options" @loaded="onMapLoaded" />
          <div id="calculated-area"></div>
        </main>
        <div class="dislpay-arena">
          <div>List</div>
          <div>{{data1.data2}}</div>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import VMap from 'v-mapbox';
  import mapboxgl from 'mapbox-gl';
  import MapboxDraw from '@mapbox/mapbox-gl-draw';
 // import { text } from 'stream-consumers';
  const data1 = reactive({
    options: {
      accessToken:
        "pk.eyJ1IjoicGF1bDAyIiwiYSI6ImNsNmdnY2p0MTE3MTUzY24yd3d3djZ0cnYifQ.IwKuQR_eGwyojW3tckCTVQ",
      style: "mapbox://styles/mapbox/streets-v11?optimize=true",
      center: [73.8567, 18.5204],
      zoom: 11,
    } as mapboxgl.MapboxOptions,
    data2: []
  });
  // var coordinates = [-77.03171253204346, 38.91457788952212];
  // var description = "<button onclick=' + { this.handlePop } + '> Button</button>"
  function onMapLoaded(map: mapboxgl.Map) {
    var Draw = new MapboxDraw({
      displayControlsDefault: true,
      controls: {
        polygon: true,
        trash: true,
        line_string: true,
      },
      styles: [
        //linestring style
        {
          "id": "gl-draw-line",
          "type": "line",
          "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#0254A2",
            "line-dasharray": [0.2, 2],
            "line-width": 5
          }
        },
        //polygon stroke style
        {
          "id": "gl-draw-polygon-stroke-active",
          "type": "line",
          "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#0254A2",
            "line-dasharray": [0.2, 2],
            "line-width": 5
          }
        },
        // polygon fill style
        {
          "id": "gl-draw-polygon-fill",
          "type": "fill",
          "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
          "paint": {
            "fill-color": "#0254A2",
            "fill-outline-color": "#0254A2",
            "fill-opacity": 0
          }
        }
      ]
    })
    map.addControl(Draw, 'top-left');
    map.on('draw.create', updateArea)
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
      map.getCanvas().style.cursor = '';
    });
    function updateArea(e){
      console.log("clicked")
      const data = Draw.getAll();
      data1.data2.push(data);
      console.log(data["features"][0]["geometry"]["coordinates"][0]);
      map.on('click', 'gl-draw-polygon-fill.cold',function(e) {
        var description = "<form> Enter name: <input type='text'/></br> Enter Description:<input type='description'/><button id='view-full'>Submit</button></form > "
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(description)
          .addTo(map)
      });
    }
    function handlePop() {
      console.log("Helo")
    }
  }
  </script>
  <style>
  html,
  body {
    margin: 0;
  }
  .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0%;
  }
  .w-screen {
    width: 75%;
  }
  .h-screen {
    height: 100vh;
  }
  .dislpay-arena {
    background: #fdfafae9;
    box-shadow: 0px -3px 10px rgba(0, 58, 78, 0.1);
    border-radius: 5px;
    padding: 20px 30px;
    width: 35%;
  }
  .calculation-box {
    height: 75px;
    width: 150px;
    position: absolute;
    bottom: 40px;
    left: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 15px;
    text-align: center;
  }
  </style>