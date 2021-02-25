<template>
  <div id="container" class="box">
    <div id="cesiumContainer">
      <div class="modelMenu">
        <div
          v-for="(item, index) in modelList"
          :key="index"
          class="modelItem"
          @click="changeModels(item.url)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";

export default {
  name: "models",
  data () {
    return {
      url: "http://localhost:3000/models/CesiumAir/Cesium_Air.glb",
      modelList: [
        {
          title: 'CesiumAir',
          url: 'http://localhost:3000/models/CesiumAir/Cesium_Air.glb'
        },
        {
          title: 'CesiumBalloon',
          url: 'http://localhost:3000/models/CesiumBalloon/CesiumBalloon.glb'
        },
        {
          title: 'CesiumMan',
          url: 'http://localhost:3000/models/CesiumMan/Cesium_Man.glb'
        },
        {
          title: 'CesiumMilkTruck',
          url: 'http://localhost:3000/models/CesiumMilkTruck/CesiumMilkTruck.glb'
        },
        {
          title: 'GroundVehicle',
          url: 'http://localhost:3000/models/GroundVehicle/GroundVehicle.glb'
        },
        {
          title: 'Pawns',
          url: 'http://localhost:3000/models/Pawns/Pawns.glb'
        },
        {
          title: 'ShadowTester',
          url: 'http://localhost:3000/models/ShadowTester/Shadow_Tester.glb'
        },
        {
          title: 'WoodTower',
          url: 'http://localhost:3000/models/WoodTower/Wood_Tower.glb'
        },

      ],
      Cesium: '',
      viewer: ''
    };
  },
  mounted () {

    // this.Cesium = this.cesium;
    // let viewer = new Cesium.Viewer("cesiumContainer");
    this.viewer = new Cesium.Viewer("cesiumContainer", {
      infoBox: false,
      selectionIndicator: false,
      shadows: true,
      shouldAnimate: true,
    });

    this.init();
  },
  methods: {
    changeModels (url) {
      this.url = url
      this.init()
    },
    init () {
      // let Cesium = this.Cesium;
      var viewer = this.viewer
      //地图源换成高德
      viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
      }))
      this.createModel(this.url, 5000.0, viewer, Cesium);

      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
    },
    createModel (url, height, viewer, Cesium) {
      viewer.entities.removeAll();
      var position = Cesium.Cartesian3.fromDegrees(120.15, 30.28, height);
      var heading = Cesium.Math.toRadians(135);
      var pitch = 0;
      var roll = 0;
      var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      var orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      );
      var entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
          uri: url,
          minimumPixelSize: 128,
          maximumScale: 20000,
        },
      });
      viewer.trackedEntity = entity;
    },
  },
};
</script>
 
<style lang='scss' scoped>
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.modelMenu {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 100px;
  text-align: center;
  height: 500px;
  z-index: 99;
  color: aqua;
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
}

.modelItem {
  cursor: pointer;
}
</style>