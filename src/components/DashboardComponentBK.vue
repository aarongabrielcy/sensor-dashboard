<template>
  <div class="dashboard">
    <Topbar :username="username" @toggle-sidebar="toggleSidebar" />
    <Sidebar :isCollapsed="isSidebarCollapsed" />
    
    <div class="content" :class="{ 'content-expanded': isSidebarCollapsed }">
    <div class="d-flex justify-content-left align-items-left">
      <h3>Granja Umán LOTE 4</h3>
    </div>  
      <b-container fluid>
        <b-row>
          <b-col md="4" v-for="(sensor, index) in sensorData" :key="index">
            <b-card class="mb-4" :header="'Sensor ' + (index + 1)" header-bg-variant="primary" header-text-variant="white">
              <b-card-text>Angle: {{ sensorData.angle }}</b-card-text>
              <b-card-text>Battery: {{ sensorData.battery }}</b-card-text>
              <b-card-text>Company: {{ sensorData.company }}</b-card-text>
              <b-card-text>Flags: {{ sensorData.flags }}</b-card-text>
              <b-card-text>Humidity: {{ sensorData.humidity }}</b-card-text>
              <b-card-text>Movement: {{ sensorData.movement }}</b-card-text>
              <b-card-text>Protocol: {{ sensorData.protocol }}</b-card-text>
              <b-card-text>Temperature: {{ sensorData.temperature }}</b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Sidebar from './SidebarComponent.vue';
import Topbar from './TopbarComponent.vue';


export default {
  components: { Sidebar, Topbar },
  data() {
    return {
      sensorData: null,
      isSidebarCollapsed: false,
      username: "admin", // Este valor debe venir del login
      sensors: Array(6).fill({
        angle: "000000",
        battery: "6A",
        company: "9A08",
        flags: "B7",
        humidity: "3D",
        movement: "03BE",
        protocol: "01",
        temperature: "0990",
      }),
    };
  },
  created() {
    const ws = new WebSocket('ws://192.168.1.73:8081/ws/');
    ws.onmessage = (event) => {
      try {
        // Deserializar el string recibido en un objeto JSON
        this.sensorData = JSON.parse(event.data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    ws.onclose = () => {
      console.log('Conexión cerrada');
    };

    ws.onerror = (error) => {
      console.log('Error en WebSocket:', error);
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  margin-left: 250px;
  margin-top: 56px; /* Ajustar para la barra superior */
  transition: margin-left 0.3s;
  background-color: #f8f9fa;
}

.content-expanded {
  margin-left: 0;
}
</style>
