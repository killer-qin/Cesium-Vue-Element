<template>
  <div>
    <div id="cesiumContainer" class="fullSize">
      <div id="toolbar">
        <!-- <el-button class="modelItem" @click="flyToSanDiego()">
          flyTo
        </el-button> -->
        <div id="cameraChanged"></div>
        <div id="viewChanged">View Changed</div>
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
        <!-- <div
          v-for="(item, index) in modelList"
          :key="index"
          class="modelItem"
          @click="changeModels(item.url)"
        >
          {{ item.title }}
        </div> -->
      </div>
    </div>

    <!-- <div id="toolbar">
      <div id="viewChanged">View Changed</div>
      <div id="cameraChanged">
        <div class="modelItem" @click="flyToSanDiego()">flyTo</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";

export default {
  name: "Map",
  data () {
    return {
      options: [{
        value: 0,
        text: "Camera Options",
      },
      {
        value: 1,
        text: "Fly in a city",
        onselect: function () {
          this.reset();
          this.flyInACity();
          // Sandcastle.highlight(flyInACity);
        },
      },
      {
        value: 2,
        text: "Fly to San Diego",
        onselect: function () {
          this.reset();
          this.flyToSanDiego();
          // Sandcastle.highlight(flyToSanDiego);
        },
      },

      {
        value: 3,
        text: "View a Rectangle",
        onselect: function () {
          this.reset();
          this.viewRectangle();
          // Sandcastle.highlight(vie/wRectangle);
        },
      },

      {
        value: 4,
        text: "View in ICRF",
        onselect: function () {
          this.reset();
          this.viewInICRF();
          // Sandcastle.highlight(viewInICRF);
        },
      },

      {
        value: 5,
        text: "Camera changed event",
        onselect: function () {
          this.reset();
          this.cameraChanges();
          // Sandcastle.highlight(cameraChanges);
        },
      },
      {
        value: 6,
        text: "Fly from Los Angeles to Tokyo via Europe",
        onselect: function () {
          this.reset();
          this.flyOverLongitude();
          // Sandcastle.highlight(flyOverLongitude);
        },
      },
      {
        value: 7,
        text: "Look down during exaggerated flight",
        onselect: function () {
          this.reset();
          this.flyOverLongitudeWithPitch();
          // Sandcastle.highlight(flyOverLongitudeWithPitch);
        },
      },],
      viewer: '',
      scene: '',
      clock: '',
      referenceFramePrimitive: ''
    }
  },
  mounted () {
    this.viewer = new Cesium.Viewer("cesiumContainer");
    let imageryLayers = this.viewer.imageryLayers;
    let googleMap = new Cesium.UrlTemplateImageryProvider({
      url: "http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}"
    });
    imageryLayers.addImageryProvider(googleMap);
    this.scene = this.viewer.scene;
    this.clock = this.viewer.clock;

    // this.flyToSanDiego();
  },
  methods: {
    getSelectFun (value) {
      if (value == 0) {
        return 0;
      } else if (value == 1) {
        this.reset();
        this.flyInACity();
      } else if (value == 2) {
        this.reset();
        this.flyToSanDiego();
      } else if (value == 3) {
        this.reset();
        this.viewRectangle();
      } else if (value == 4) {
        this.reset();
        this.viewInICRF();
      } else if (value == 5) {
        this.reset();
        this.cameraChanges();
      } else if (value == 6) {
        this.reset();
        this.flyOverLongitude();
      } else {
        this.reset();
        this.flyOverLongitudeWithPitch();
      }
      // console.log(value)
      // data;
    },
    flyInACity () {
      // Sandcastle.declare(flyInACity);

      var camera = this.scene.camera;
      camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          -73.98580932617188,
          40.74843406689482,
          363.34038727246224
        ),
        complete: function () {
          setTimeout(function () {
            camera.flyTo({
              destination: Cesium.Cartesian3.fromDegrees(
                -73.98585975679403,
                40.75759944127251,
                186.50838555841779
              ),
              orientation: {
                heading: Cesium.Math.toRadians(200.0),
                pitch: Cesium.Math.toRadians(-50.0),
              },
              easingFunction: Cesium.EasingFunction.LINEAR_NONE,
            });
          }, 1000);
        },
      });
    },

    flyToSanDiego () {
      // Sandcastle.declare(flyToSanDiego);
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0),
      });
    },
    flyToHeadingPitchRoll () {
      // Sandcastle.declare(flyToHeadingPitchRoll);
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-122.22, 46.12, 5000.0),
        orientation: {
          heading: Cesium.Math.toRadians(20.0),
          pitch: Cesium.Math.toRadians(-35.0),
          roll: 0.0,
        },
      });
    },

    icrf (scene, time) {
      if (scene.mode !== Cesium.SceneMode.SCENE3D) {
        return;
      }

      var icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
      if (Cesium.defined(icrfToFixed)) {
        var camera = this.viewer.camera;
        var offset = Cesium.Cartesian3.clone(camera.position);
        var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
        camera.lookAtTransform(transform, offset);
      }
    },

    viewInICRF () {
      // Sandcastle.declare(viewInICRF);

      this.viewer.camera.flyHome(0);

      this.clock.multiplier = 3 * 60 * 60;
      this.scene.postUpdate.addEventListener(this.icrf);
      this.scene.globe.enableLighting = true;
    },

    cameraChanges () {
      console.log('cameraChanges');
    },

    flyOverLongitude () {
      // Sandcastle.declare(flyOverLongitude);
      this.losAngelesToTokyo();
    },

    // declare: function () {},

    flyOverLongitudeWithPitch () {

      // this.declare(flyOverLongitudeWithPitch);
      this.losAngelesToTokyo(true);
    },

    losAngelesToTokyo (adjustPitch) {
      var camera = this.scene.camera;

      var tokyoOptions = {
        destination: Cesium.Cartesian3.fromDegrees(
          139.8148,
          35.7142,
          20000.0
        ),
        orientation: {
          heading: Cesium.Math.toRadians(15.0),
          pitch: Cesium.Math.toRadians(-60),
          roll: 0.0,
        },
        duration: 20,
        flyOverLongitude: Cesium.Math.toRadians(60.0),
      };

      var laOptions = {
        destination: Cesium.Cartesian3.fromDegrees(
          -117.729,
          34.457,
          10000.0
        ),
        duration: 5,
        orientation: {
          heading: Cesium.Math.toRadians(-15.0),
          pitch: -Cesium.Math.PI_OVER_FOUR,
          roll: 0.0,
        },
      };

      laOptions.complete = function () {
        setTimeout(function () {
          camera.flyTo(tokyoOptions);
        }, 1000);
      };

      if (adjustPitch) {
        tokyoOptions.pitchAdjustHeight = 1000;
        laOptions.pitchAdjustHeight = 1000;
      }

      camera.flyTo(laOptions);
    },

    reset () {
      var viewChanged = document.getElementById("viewChanged");
      var cameraChanged = document.getElementById("cameraChanged");
      var removeStart;
      var removeEnd;
      var removeChanged;
      this.scene.completeMorph();
      this.viewer.entities.removeAll();
      this.scene.primitives.remove(this.referenceFramePrimitive);
      this.scene.tweens.removeAll();

      if (Cesium.defined(removeStart)) {
        removeStart();
        removeEnd();

        viewChanged.style.display = "none";

        removeStart = undefined;
        removeEnd = undefined;
      }

      if (Cesium.defined(removeChanged)) {
        removeChanged();
        removeChanged = undefined;

        cameraChanged.style.display = "none";
      }

      this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

      this.clock.multiplier = 1.0;
      this.scene.postUpdate.removeEventListener(this.icrf);
      this.scene.globe.enableLighting = false;
    },

    flyToLocation () {
      // Sandcastle.declare(flyToLocation);

      // Create callback for browser's geolocation
      function fly (position) {
        this.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            position.coords.longitude,
            position.coords.latitude,
            1000.0
          ),
        });
      }

      // Ask browser for location, and fly there.
      navigator.geolocation.getCurrentPosition(fly);
    },

    viewRectangle () {
      // Sandcastle.declare(viewRectangle);

      var west = -77.0;
      var south = 38.0;
      var east = -72.0;
      var north = 42.0;

      var rectangle = Cesium.Rectangle.fromDegrees(
        west,
        south,
        east,
        north
      );
      this.viewer.camera.setView({
        destination: rectangle,
      });

      // Show the rectangle.  Not required; just for show.
      this.viewer.entities.add({
        rectangle: {
          coordinates: rectangle,
          fill: false,
          outline: true,
          outlineColor: Cesium.Color.WHITE,
        },
      });
    },

    flyToRectangle () {
      // Sandcastle.declare(flyToRectangle);

      var west = -90.0;
      var south = 38.0;
      var east = -87.0;
      var north = 40.0;
      var rectangle = Cesium.Rectangle.fromDegrees(
        west,
        south,
        east,
        north
      );

      this.viewer.camera.flyTo({
        destination: rectangle,
      });

      // Show the rectangle.  Not required; just for show.
      this.viewer.entities.add({
        rectangle: {
          coordinates: rectangle,
          fill: false,
          outline: true,
          outlineColor: Cesium.Color.WHITE,
        },
      });
    },





  }
};
</script>

<style lang="scss" scoped>
#viewChanged,
#cameraChanged {
  display: none;
  background-color: red;
  color: white;
}
.modelItem {
  cursor: pointer;
}
</style>
