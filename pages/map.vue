<!-- <template>
  <div>
    <div class="main-div">
      <div class="left-div"></div>
      <div class="calculation-box center">
          <h6>Coordinates</h6>
          <div id="calculated-area"></div>
        </div>
      <div class="right-div">
        
        <v-map :options="state.map" @loaded="onMapLoaded"></v-map>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VMap from "v-mapbox";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
const state: any = reactive({
  map: {
    accessToken:
      "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ",
    style: "mapbox://styles/mapbox/streets-v11?optimize=true",
    center: [80.93902587890625, 26.841533092305998] as number[], //uses longitude, latitude
    zoom: 9,
  },
});

//var arr = [];
function onMapLoaded(map: mapboxgl.Map) {
  var draw = new MapboxDraw();
  map.addControl(draw, "top-left");

  
  map.on("draw.create", updateArea);
  // map.on('draw.delete', updateArea);
  // map.on('draw.update', updateArea);
  function updateArea(e) {
    const geomData = draw.getAll();
    const answer = document.getElementById("calculated-area");
    console.log(answer);
    answer.innerHTML = e["features"][0]["geometry"]["coordinates"][0];
  }
//   map.on('click', (e) => {
// new mapboxgl.Popup()
// .setLngLat(e.lngLat)
// .setHTML(e["features"][0]["geometry"]["coordinates"][0])
// .addTo(map);
// });
}
</script>

<style>
.left-div {
  height: 100vh;
  width: 19vw;
  background-color: rgb(119, 83, 138);
  float: left;
  
}
.right-div {
  height: 100vh;
  width: 81vw;
  float: right;
}
.main-div {
  height: 100vh;
  width: 100vw;
}
 .calculation-box {
  height: 75px;
  width: 20%;
  position: absolute;
  /* bottom: px; */
 
  background-color: rgba(248, 245, 245, 0.792);
  padding: 20px;
  text-align: center;
} 
h6 {
  font-family: "Open Sans";
  margin-top: 0px;
  margin-left: -100px;
  font-size: 15px;
}

/* .center {
margin: auto;
width: 60%;
border: 5px solid #FFFF00;
padding: 10px;
} */


.mapboxgl-popup {
max-width: 400px;
font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
</style> -->


<template>
  <div>
    <div class="main-div">
      <div class="left-div">
        <!-- <div>{{state.geomData}}</div> -->
        <h3></h3>
        <ul>
          <li v-for="(item, index) in state.geomData" :key="index">
            <input type="checkbox" @click="getdata(index)" />
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="right-div">
        <v-map :options="state.map" @loaded="onMapLoaded"></v-map>
        <nav id="menu"></nav>
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VMap from "v-mapbox";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
const state = reactive({
  map: {
    accessToken:
      "pk.eyJ1IjoibWF5dXJ3YWtpa2FyIiwiYSI6ImNsNmdjdGxwbjBiNGMzY282bWh0dng2c2kifQ.y-m4-zQKOeOOnDG5I1u6ng",
    style: "mapbox://styles/mapbox/streets-v11?optimize=true",
    center: [80.93902587890625, 26.841533092305998],
    zoom: 11,
  },
  // geomData: [],
  //layersName: "",
});
// function getdata(e) {
//   console.log(state.geomData[0]);
 
// }

function onMapLoaded(map: mapboxgl.Map) {
  
//   map.addControl(new mapboxgl.NavigationControl());
  var Draw = new MapboxDraw();
  map.addControl(Draw, "top-right");
  // map.on("draw.create", updateArea);

  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
}));


  
  // function updateArea(e) {

  //   map.on('click',function(e) {
  //       var description= "<form onSubmit='return false;'> Enter cityName: <input type='text'/></br> <button id='view-full' >Submit</button></form > "
  //       new mapboxgl.Popup()
  //         .setLngLat(e.lngLat)
  //         .setHTML(description)
  //         .addTo(map)
  //     });

  //   const data = Draw.getAll();
  //     state.geomData.push(data);


     // function add_element_to_array()

    // state.layearName = state.layearName ;
    //console.log(data["features"][0]["geometry"]["coordinates"][0]);
    // create object
   // let name = prompt("Enter the City Name ");
    
       
    // let coordinates = e.features[0].geometry.coordinates;
    // let types = e.features[0].geometry.type;
    // let data = {
    //  // name: `${name}`,
    // //   description: `${description}`,
    //   type: `${types}`,
    //   coordinates: `${coordinates}`,
    // };
    
    // // geomData push in array
    // state.geomData.push(data);
    // console.log(coordinates);
    // console.log(types);

//     function hide() {
//     let markers = state.geomData
//     for (let i = 0; i < markers.length; i++) 
//         markers[i].style.visibility = "hidden";
//     }
// }

// function show() {
//     let markers = state.geomData
//     for (let i = 0; i < markers.length; i++) {
//         markers[i].style.visibility = "visible";
    
//     }
// }

    }
    
   
  
//   console.log(state.geomData);

 


</script>
<style>
.left-div {
  height: 100vh;
  width: 19vw;
  background-color: rgb(119, 83, 138);
  float: left;
  
}
.right-div {
  height: 100vh;
  width: 81vw;
  float: right;
}
.main-div {
  height: 100vh;
  width: 100vw;
}

/* .mapboxgl-popup {
    max-width: 400px;
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
} */

</style>