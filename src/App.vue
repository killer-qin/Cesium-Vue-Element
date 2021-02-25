<template>
  <div id="app">
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <!-- router-link :to 相当于router.push(...) -->
      <router-link to="/bar">Hello</router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link to="/foo">Map</router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link to="/user/:id">User</router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link to="/model">Model</router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link to="/camera">Camera</router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link to="/building">Building</router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link to="/addpoint">addPoint</router-link>
      <el-divider direction="vertical"></el-divider>
      <router-link to="/CZML">CZML</router-link>
    </p>
    <router-view />
  </div>
</template>

<script>
window.onresize = () => {
  let RootFontSize = document.body.offsetWidth / 100;
  document.getElementsByTagName("html")[0].style.fontSize = RootFontSize + "px";
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
</style>
