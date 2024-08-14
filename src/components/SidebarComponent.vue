<template>
  <div :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
    <b-nav vertical class="flex-column">
      <b-nav-item href="#">
        <b-icon icon="house-door-fill"></b-icon> Devices
      </b-nav-item>
      <b-nav-item href="#">
        <b-icon icon="speedometer2"></b-icon> Dashboard
      </b-nav-item>
      <b-nav-item href="#">
        <b-icon icon="people-fill"></b-icon> Groups
      </b-nav-item>
      <b-nav-item href="#">
        <b-icon icon="file-earmark-text"></b-icon> Reports
      </b-nav-item>
      <b-nav-item href="#">
        <b-icon icon="gear-fill"></b-icon> Settings
      </b-nav-item>
      <!--<b-nav-item href="#">
        <b-icon icon="info-circle-fill"></b-icon> Information
      </b-nav-item>-->
    </b-nav>
  </div>
</template>

<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.sidebar {
  height: calc(100vh - 56px); /* Resto de la topbar */
  position: fixed;
  top: 56px;
  left: 0;
  width: 250px;
  background-color: #343a40;
  color: #fff;
  transition: transform 0.3s ease;
  z-index: 999;
  padding: 10px;
}

.sidebar-collapsed {
  transform: translateX(-250px); /* Mover fuera de la vista cuando está colapsada */
}
</style>
