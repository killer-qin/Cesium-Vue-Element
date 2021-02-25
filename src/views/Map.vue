<template>
  <div>
    <div id="cesiumContainer" class="fullSize">
      <div id="toolbar">
        <table>
          <tbody>
            <tr>
              <td>Pixel Range</td>
              <td>
                <input
                  type="range"
                  min="1"
                  max="200"
                  step="1"
                  data-bind="value: pixelRange, valueUpdate: 'input'"
                />
                <input type="text" size="2" data-bind="value: pixelRange" />
              </td>
            </tr>
            <tr>
              <td>Minimum Cluster Size</td>
              <td>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  data-bind="value: minimumClusterSize, valueUpdate: 'input'"
                />
                <input
                  type="text"
                  size="2"
                  data-bind="value: minimumClusterSize"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <div id="loadingOverlay"><h1>Loading...</h1></div> -->
  </div>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
import { addToggleButton } from '@/Cesium-1.71/Apps/Sandcastle/Sandcastle-header'

export default {
  name: "Map",
  mounted () {
    this.init();
  },
  methods: {

    init () {
      var viewer = new Cesium.Viewer("cesiumContainer");

      var options = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
      };
      var dataSourcePromise = viewer.dataSources.add(
        Cesium.KmlDataSource.load(
          "http://localhost:3000/kml/facilities/facilities.kml",
          options
        )
      );
      dataSourcePromise.then(function (dataSource) {
        var pixelRange = 15;
        var minimumClusterSize = 3;
        var enabled = true;

        dataSource.clustering.enabled = enabled;
        dataSource.clustering.pixelRange = pixelRange;
        dataSource.clustering.minimumClusterSize = minimumClusterSize;

        var removeListener;

        var pinBuilder = new Cesium.PinBuilder();
        var pin50 = pinBuilder
          .fromText("50+", Cesium.Color.RED, 48)
          .toDataURL();
        var pin40 = pinBuilder
          .fromText("40+", Cesium.Color.ORANGE, 48)
          .toDataURL();
        var pin30 = pinBuilder
          .fromText("30+", Cesium.Color.YELLOW, 48)
          .toDataURL();
        var pin20 = pinBuilder
          .fromText("20+", Cesium.Color.GREEN, 48)
          .toDataURL();
        var pin10 = pinBuilder
          .fromText("10+", Cesium.Color.BLUE, 48)
          .toDataURL();

        var singleDigitPins = new Array(8);
        for (var i = 0; i < singleDigitPins.length; ++i) {
          singleDigitPins[i] = pinBuilder
            .fromText("" + (i + 2), Cesium.Color.VIOLET, 48)
            .toDataURL();
        }

        function customStyle () {
          if (Cesium.defined(removeListener)) {
            removeListener();
            removeListener = undefined;
          } else {
            removeListener = dataSource.clustering.clusterEvent.addEventListener(
              function (clusteredEntities, cluster) {
                cluster.label.show = false;
                cluster.billboard.show = true;
                cluster.billboard.id = cluster.label.id;
                cluster.billboard.verticalOrigin =
                  Cesium.VerticalOrigin.BOTTOM;

                if (clusteredEntities.length >= 50) {
                  cluster.billboard.image = pin50;
                } else if (clusteredEntities.length >= 40) {
                  cluster.billboard.image = pin40;
                } else if (clusteredEntities.length >= 30) {
                  cluster.billboard.image = pin30;
                } else if (clusteredEntities.length >= 20) {
                  cluster.billboard.image = pin20;
                } else if (clusteredEntities.length >= 10) {
                  cluster.billboard.image = pin10;
                } else {
                  cluster.billboard.image =
                    singleDigitPins[clusteredEntities.length - 2];
                }
              }
            );
          }

          // force a re-cluster with the new styling
          var pixelRange = dataSource.clustering.pixelRange;
          dataSource.clustering.pixelRange = 0;
          dataSource.clustering.pixelRange = pixelRange;
        }

        // start with custom style
        customStyle();

        var viewModel = {
          pixelRange: pixelRange,
          minimumClusterSize: minimumClusterSize,
        };
        Cesium.knockout.track(viewModel);

        var toolbar = document.getElementById("toolbar");
        Cesium.knockout.applyBindings(viewModel, toolbar);

        function subscribeParameter (name) {
          Cesium.knockout
            .getObservable(viewModel, name)
            .subscribe(function (newValue) {
              dataSource.clustering[name] = newValue;
            });
        }

        subscribeParameter("pixelRange");
        subscribeParameter("minimumClusterSize");

        addToggleButton("Enabled", true, function (checked) {
          dataSource.clustering.enabled = checked;
        });
        // cesium自带toolbar相关对象Sandcastle

        addToggleButton("Custom Styling", true, function (

        ) {
          customStyle();
        });

        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function (movement) {
          var pickedLabel = viewer.scene.pick(movement.position);
          if (Cesium.defined(pickedLabel)) {
            var ids = pickedLabel.id;
            if (Array.isArray(ids)) {
              for (var i = 0; i < ids.length; ++i) {
                ids[i].billboard.color = Cesium.Color.RED;
              }
            }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      });
      // let viewer = new Cesium.Viewer("cesiumContainer");

      // let imageryLayers = viewer.imageryLayers;

      // let googleMap = new Cesium.UrlTemplateImageryProvider({
      //   url: "http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}"
      // });


      // imageryLayers.addImageryProvider(googleMap);

      // // fly
      // viewer.camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(
      //     114.296063,
      //     30.55245,
      //     20000000
      //   ),
      //   orientation: {
      //     heading: Cesium.Math.toRadians(0),
      //     pitch: Cesium.Math.toRadians(-90),
      //     roll: 0.0
      //   },
      //   duration: 10 // fly time 10s
      // });
    }

  }
};
</script>

<style lang="scss" scoped>
// #cesiumContainer {
//   width: 100vw;
//   height: 100vh;
//   margin: 0;
//   padding: 0;
//   overflow: hidden;
// }
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
  background: rgba(211, 211, 211, 0.8);
  padding: 4px;
  border-radius: 4px;
}
#toolbar input {
  vertical-align: middle;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
