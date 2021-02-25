
<template>
  <div id="cesiumContainer" class="fullSize">
    <div id="toolbar">
      <el-button type="info" plain @click="satellite">Satellite</el-button>
      <el-button type="info" plain @click="vehicle">Vehicle</el-button>
    </div>
  </div>
</template>
<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
export default {
  data () {
    return {
      viewer: ''
    }
  },
  mounted () {
    this.viewer = new Cesium.Viewer("cesiumContainer", {
      shouldAnimate: true,
    });
    let imageryLayers = this.viewer.imageryLayers;
    let googleMap = new Cesium.UrlTemplateImageryProvider({
      url: "http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}"
    });
    imageryLayers.addImageryProvider(googleMap);
  },
  methods: {
    satellite () {
      this.viewer.dataSources.add(
        Cesium.CzmlDataSource.load("http://localhost:3000/CZML/simple.czml")
      );

      this.viewer.camera.flyHome(0);
    },
    vehicle () {
      this.viewer.dataSources.add(
        Cesium.CzmlDataSource.load("http://localhost:3000/CZML/Vehicle.czml")
      );

      this.viewer.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(-116.52, 35.02, 95000),
        orientation: {
          heading: 6,
        },
      });
    },

    reset () {
      this.viewer.dataSources.removeAll();
    }

  },

}
</script>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

#toolbar {
  position: absolute;
  z-index: 99;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
}
</style>