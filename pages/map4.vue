<template>
    <!--  class="w-screen h-screen" -->
    <!-- <main> -->
    <head>
      <meta charset="utf-8" />
      <title>Mapbox Event : Directions</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <!-- Full Screen View -->
    <div class="main">
      <!-- Toggle Bar code -->
      <div class="left1 bg-gray">
        <div class="float-right">
          <button
            @click="getMapData()"
            class="rounded-xl p-2 bg-black text-white"
          >
            Refresh
          </button>
        </div>
        <br />
        <div class="">
          <h1 class="font-bold ml-2">Stored Events</h1>
          <br />
          <table class="">
            <tr>
              <th>Name</th>
              <th>Desc</th>
              <th>Toggle</th>
            </tr>
            <tr v-for="(data, index) in info.mapEventData" :key="data.id">
              <td>{{ index }} ) {{ data.name }}</td>
              <td>{{ data.desc }}</td>
              <td>
                <!-- id="{{index}}"  v-bind:value="data.coordinates"  v-model="info.checkedInfo" -->
                <input
                  type="checkbox"
                  name="dataEvent"
                  id="checkedData"
                  v-model="info.checkedInfo"
                  v-bind:value="data.geom.coordinates"
                  @change="showDataOnMap(index)"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <!-- Map  -->
      <div class="right1">
        <v-map class="w-full h-full" :options="state.map" @loaded="getMapData">
        </v-map>
      </div>
    </div>
    <!-- </main> -->
  </template>
  <script setup lang="ts">
  import VMap from "v-mapbox";
  import mapboxgl from "mapbox-gl";
  import MapboxDraw from "@mapbox/mapbox-gl-draw";
  const state = reactive({
    map: {
      accessToken:
        "pk.eyJ1Ijoic2F0eWEtYXV0aSIsImEiOiJjbDdwdnFqMWIwMWF3M3BxZ3dvaTZlNW5yIn0.wrAe-_808WZm-CBKVTwfIw",
      style: "mapbox://styles/mapbox/streets-v11?optimize=true",
      // center: [444.04931277036667, 26.266912177018096] as number[], //uses longitude, latitude
      center: [74.04931277036667, 18.266912177018096] as number[],
      zoom: 7,
      maxZoom: 22,
      // container: "map",
    } as mapboxgl.MapboxOptions,
  });
  let info = reactive({
    allData: [],
    checkedInfo: [],
    dataObject: {
      name: "",
      desc: "",
      coordinates: [],
    },
    pointsData: [],
    arr: [],
    mapEventData: [],
  });
  let value = reactive({
    type: "Polygon",
    crs: {
      type: "name",
      properties: {
        name: "EPSG:3857",
      },
    },
  });
  let db = reactive({
    dbObject: {
      name: "",
      desc: "",
      geom: {
        type: value.type,
        crs: value.crs,
        coordinates: [],
      },
    },
  });
  async function getMapData(map: mapboxgl.Map) {
    console.log("load ", map);
    // http://localhost:3050/map
    info.mapEventData = await $fetch("http://localhost:3050/map");
    console.log("all data", info.mapEventData);
    // // MapBox Draw Tool start
    var draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        point: true,
        polygon: true,
        line_string: true,
        trash: true,
      },
    });
    // Map#addControl takes an optional second argument to set the position of the control.
    // If no position is specified the control defaults to `top-right`. See the docs
    // for more details: https://docs.mapbox.com/mapbox-gl-js/api/#map#addcontrol
    map.addControl(draw, "top-right");
    // // MapBox Draw Tool end
    map.on("draw.create", function (e) {
      var drawMode = draw.getMode();
      console.log("draw Mode", drawMode);
      var drawnFeature = e.features[0];
      console.log("Feature Mode", drawnFeature);
      console.log("point", drawnFeature.geometry.coordinates[0][0]);
      let popupPoint = drawnFeature.geometry.coordinates[0][0];
      switch (drawMode) {
        case "draw_point":
          // Draw point here
          break;
        case "draw_polygon":
          console.log("Polygon is Drawn");
          myFunction();
          async function myFunction() {
            let text;
            let name = prompt("Please enter name:", "");
            let desc = prompt("Please enter Decription:", "");
            // let person = prompt("Please enter name:", "Harry Potter");
            if (name == null || name == "" || desc == null || desc == "") {
              text = "User cancelled the prompt.";
            } else {
              // text = "Hello " + name + "! How are you today?";
              info.dataObject.name = name;
              db.dbObject.name = name;
              info.dataObject.desc = desc;
              db.dbObject.desc = desc;
              info.dataObject.coordinates = drawnFeature.geometry.coordinates;
              info.allData.push(info.dataObject);
              db.dbObject.geom.coordinates = info.dataObject.coordinates;
              console.log("co Data", info.dataObject.coordinates);
              let response = await $fetch("http://localhost:3003/gisdata/polygon", {
                method: "POST",
                // body: payload,
                body: db.dbObject,
              });
              console.log("res", response);
              info.dataObject = {
                name: "",
                desc: "",
                coordinates: [],
              };
            }
            //
            console.log("Event Data", info.allData);
            map.on("click", function () {
              new mapboxgl.Popup()
                // .setLngLat([74.04931277036667, 19.266912177018096])
                //   .setLngLat([data.lat, data.lon])
                .setLngLat([popupPoint[0], popupPoint[1]])
                // .setHTML(show)
                .setHTML(name)
                .addTo(map);
            });
            //
            // document.getElementById("demo").innerHTML = text;
          }
          // confirm();
          // new mapboxgl.Popup()
          //   .setLngLat([74.04931277036667, 19.266912177018096])
          //   //   .setLngLat([data.lat, data.lon])
          //   // .setLngLat([popupPoint[0], popupPoint[1]])
          //   .setHTML("hello")
          //   .addTo(map);
          // styleView(map);
          console.log("Polygon is Drawn");
          // Draw polygon here
          break;
        case "draw_line_string":
          // Draw linestring here
          break;
        default:
          alert("no draw options");
          break;
      }
    });
    // let pointsData = [];
    // info.checkedInfo.map((ele) => {
    //   let arrFormat = [ele[0], ele[1]];
    //   info.pointsData.push(arrFormat);
    // });
    // console.log("coordinates", info.pointsData);
    // if (info.checkedInfo != null) {
    //   map.addSource("MyPolygon", {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [
    //         {
    //           type: "Feature",
    //           properties: {},
    //           geometry: {
    //             type: "Polygon",
    //             coordinates: [
    //               // info.arr,
    //               // info.pointsData,
    //               // info.pointsData.map((e) => {
    //               //   return e;
    //               // }),
    //               [
    //                 [73.70703125, 18.96818922264095],
    //                 [72.771484375, 16.46818922264095],
    //                 [72.771484375, 19.5271348225978],
    //                 [-73.70703125, 16.5271348225978],
    //                 // [74.04931277036667, 19.266912177018096],
    //                 [74.70703125, 20.46818922264095],
    //               ],
    //             ],
    //           },
    //         },
    //       ],
    //     },
    //   });
    //   map.addLayer({
    //     id: "MyPolygon",
    //     type: "fill",
    //     source: "MyPolygon", // reference the data source
    //     layout: {},
    //     paint: {
    //       "fill-color": "#0080FF", // blue color fill
    //       "fill-opacity": 0.5,
    //     },
    //   });
    //   //   //
    // }
  }
  function showDataOnMap(i) {
    console.log("Checked or Unchecked");
    let map: mapboxgl.Map;
    // styleView(map);
    //   console.log("changed", info.allData[i]);
    console.log("checked", info.checkedInfo);
    //   console.log("changed coordinates", info.allData[i].coordinates[i]);
    console.log("demo try", info.mapEventData[0].geom.coordinates);
    info.mapEventData[0].geom[0].coordinates.map((ele) => {
      console.log("try", ele);
      ele.map((e) => {
        console.log("inner", e[0], e[1]);
        let arrFormat = [e[0], e[1]];
        info.pointsData.push(arrFormat);
      });
    });
    console.log("coordinates for poly", info.pointsData);
    //   if (info.checkedInfo != null) {
    if (info.mapEventData != null) {
      styleView(map);
    }
    // console.log("specific",info.checkedInfo.);
    // info.checkedInfo.map((e) => {
    //   console.log("ele", e);
    //   info.arr = e;
    // });
  }
  function styleView(map) {
    // map.setStyle("mapbox://styles/mapbox/satellite-v9?optimize=true");
    // map.setStyle("mapbox://styles/mapbox/satellite-v9");
    console.log("style");
    // if (info.checkedInfo != null) {
    // polygon start
    map.addSource("MyPolygon", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                // info.arr,
                // info.pointsData,
                //   info.allData[0].coordinates[0],
                //   info.mapEventData[0].geom.coordinates,
                [
                  [73.70703125, 18.96818922264095],
                  [72.771484375, 16.46818922264095],
                  [72.771484375, 19.5271348225978],
                  // [-73.70703125, 16.5271348225978],
                  [74.04931277036667, 19.266912177018096],
                  [74.70703125, 20.46818922264095],
                ],
              ],
            },
          },
        ],
      },
    });
    map.addLayer({
      id: "MyPolygon",
      type: "fill",
      source: "MyPolygon", // reference the data source
      layout: {},
      paint: {
        "fill-color": "#0080FF", // blue color fill
        "fill-opacity": 0.5,
      },
    });
    //   polygon end
    // }
  }
  </script>
  <style>
  html,
  body {
    margin: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2C3E50;
  }
  .w-screen {
    width: 100vw;
  }
  .main {
    height: 100vh;
    width: 100vw;
  }
  .left1 {
    height: 100vh;
    width: 19vw;
    float: left;
  }
  .right1 {
    height: 100vh;
    width: 81vw;
    float: right;
    position: relative;
  }
  .h-screen {
    height: 100vh;
  }
  .h-full {
    height: 100%;
  }
  .w-full {
    width: 100%;
  }
  .bg-gray {
    background-color: cadetblue;
  }
  .zIndex {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1;
  }
  
  </style>
 