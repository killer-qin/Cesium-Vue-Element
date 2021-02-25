<template>
  <div>
    <div id="cesiumContainer" class="fullSize">
      <div id="toolbar">
        <!-- <div id="cameraChanged"></div>
        <div id="viewChanged">View Changed</div> -->
        <el-select
          v-model="options.value"
          placeholder="请选择"
          @change="getSelectFun"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
export default {
  data () {
    return {
      viewer: '',
      point: [{
        lon: -80.59777,
        lat: 36.66589
      }, {
        lon: -75.59777,
        lat: 35.66589
      }, {
        lon: -78.59777,
        lat: 34.665896
      }, {
        lon: -75.59777,
        lat: 34.665896
      }, {
        lon: 128.300254,
        lat: 37.665896
      }],
      options: [{
        value: 0,
        text: "Add point",
      },
      {
        value: 1,
        text: "Set point properties at creation",
      },
      {
        value: 2,
        text: "Change point properties",
      },
      {
        value: 3,
        text: "Add multiple points",
      },
      {
        value: 4,
        text: "Scale by viewer distance",
      },
      {
        value: 5,
        text: "Fade by viewer distance",
      },]
    }
  },
  mounted () {
    this.viewer = new Cesium.Viewer("cesiumContainer", {

    });
    let imageryLayers = this.viewer.imageryLayers;
    let googleMap = new Cesium.UrlTemplateImageryProvider({
      url: "http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}"
    });
    imageryLayers.addImageryProvider(googleMap);
    // this.scene = this.viewer.scene;
    // this.clock = this.viewer.clock;
  },
  methods: {
    getSelectFun (value) {
      if (value == 0) {
        this.addPoint();
      } else if (value == 1) {
        this.setPointProperties();
      } else if (value == 2) {
        this.changePointProperties();
      } else if (value == 3) {
        this.addMultiplePoints();
      } else if (value == 4) {
        this.scaleByDistance();
      } else {
        this.fadeByDistance();
      }
      // console.log(value)
    },

    addPoint () {
      // Sandcastle.declare(addPoint);
      this.point.forEach(item => {
        // console.log(item)
        this.viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat),
          point: {
            pixelSize: 10,
            color: Cesium.Color.YELLOW,
          },
        });
      });

    },
    setPointProperties () {
      // Sandcastle.declare(setPointProperties);

      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
          show: true, // default
          color: Cesium.Color.SKYBLUE, // default: WHITE
          pixelSize: 10, // default: 1
          outlineColor: Cesium.Color.YELLOW, // default: BLACK
          outlineWidth: 3, // default: 0
        },
      });
    },
    changePointProperties () {
      // Sandcastle.declare(changePointProperties);

      var entity = this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          -75.59777,
          40.03883,
          300000.0
        ),
        point: {
          pixelSize: 2,
        },
      });

      var point = entity.point;
      point.pixelSize = 20.0;
      point.color = Cesium.Color.YELLOW.withAlpha(0.33);
    },

    addMultiplePoints () {
      // Sandcastle.declare(addMultiplePoints);

      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
          color: Cesium.Color.RED,
          pixelSize: 8,
        },
      });
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-80.5, 35.14),
        point: {
          color: Cesium.Color.BLUE,
          pixelSize: 16,
        },
      });
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-80.12, 25.46),
        point: {
          color: Cesium.Color.LIME,
          pixelSize: 32,
        },
      });
    },

    scaleByDistance () {
      // Sandcastle.declare(scaleByDistance);

      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
          // pixelSize will multiply by the scale factor, so in this
          // example the size will range from 20px (near) to 5px (far).
          pixelSize: 10,
          scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
        },
      });
    },

    fadeByDistance () {
      // Sandcastle.declare(fadeByDistance);

      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        point: {
          pixelSize: 20,
          translucencyByDistance: new Cesium.NearFarScalar(
            1.5e2,
            1.0,
            1.5e7,
            0.2
          ),
        },
      });
    }
  }
}
</script>

<style lang="scss" scoped>
// #viewChanged,
// #cameraChanged {
//   display: none;
//   background-color: red;
//   color: white;
// }
// .modelItem {
//   cursor: pointer;
// }
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.toolbar {
  position: absolute;
  z-index: 99;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  background: rgba(211, 211, 211, 0.8);
  padding: 4px;
  border-radius: 4px;
}

//
</style>