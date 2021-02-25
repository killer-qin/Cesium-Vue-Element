<template>
  <div id="cesiumContainer" class="fullSize"></div>
</template>
<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
export default {
  mounted () {
    this.init();
  },
  methods: {
    init () {
      var viewer = new Cesium.Viewer("cesiumContainer", {
        terrainProvider: Cesium.createWorldTerrain(),
      });

      var tileset = new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(40866),
      });

      viewer.scene.primitives.add(tileset);
      viewer.zoomTo(tileset);
    }
  },
}
</script>