<template>
  <div>
    <div class="main-div">
      <div class="left-div"></div>
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

var arr = [];
function onMapLoaded(map: mapboxgl.Map) {
  var Draw = new MapboxDraw();
  map.addControl(Draw, "top-left");

  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
    defaultMode: "draw_polygon",
  });
  map.addControl(draw);
  map.on("draw.create", updateArea);
  map.on("draw.delete", updateArea);
  map.on("draw.update", updateArea);
  function updateArea(e: any) {
    //  map.on("dblclick", (e) => {
    //   new mapboxgl.Marker({
    //    // color: "#" + (Math.random().toString(16) + "87CEEB").substring(2, 8),
    //     draggable: true,
    //   })
    //     .setLngLat([e.lngLat.lng, e.lngLat.lat])
    //     .addTo(map);
    //   console.log(`A click event has occurred at ${e.lngLat}`);
    // });
    const data = draw.getAll();
    var x = draw.getAll();
    arr.push(x);
    console.log(x["features"][0]["geometry"]["coordinates"][0]);
    //console.log(x['features'][0]['geometry']['id'][0]);
    console.log("polygon data  coordinates", x);
    const answer = document.getElementById("calculated-area");
  }
  console.log("get all coordinates", arr);

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

</style>
