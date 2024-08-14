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
          <b-col md="4" v-for="(sensor, index) in sortedSensors" :key="sensor._id" class="card">
            <b-card class="mb-4" :header="'Sensor ' + (index + 1)" header-bg-variant="primary" header-text-variant="white">
              <b-card-text>MAC Address: {{ sensor.sensorMac }}</b-card-text>
              <b-card-text>Angle: {{ sensor.angle }}</b-card-text>
              <b-card-text>Battery: {{ sensor.battery }} V</b-card-text>
              <b-card-text>Company: {{ sensor.company }}</b-card-text>
              <b-card-text>Flags: {{ sensor.flags }}</b-card-text>
              <b-card-text>Humidity: {{ sensor.humidity }} %</b-card-text>
              <b-card-text>Movement: {{ sensor.movement }}</b-card-text>
              <b-card-text>Protocol: {{ sensor.protocol }}</b-card-text>
              <b-card-text>Temperature: {{ sensor.temperature }} °C</b-card-text>
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
      sensors: [],
      socket: null,
      isSidebarCollapsed: false,
      username: "admin",
      macOrder: [
        "7cd9f410b223",
        "7cd9f414bb24",
        "7cd9f4117786",
        "7cd9f4103168",
        "7cd9f4139cdf"
      ]
    };
  },

  computed: {
    sortedSensors() {
      return this.macOrder.map(mac => 
        this.sensors.find(sensor => sensor.sensorMac === mac)
      ).filter(sensor => sensor !== undefined);
    }
  },

  created() {
    this.fetchInitialData();
    this.setupWebSocket();
  },

  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },

    fetchInitialData() {
      fetch('http://192.168.1.73:8081/sensor-data')
        .then(response => response.json())
        .then(data => {
          this.sensors = data;
        });
    },

    setupWebSocket() {
      const ws = new WebSocket('ws://192.168.1.73:8081/ws/');
      ws.onmessage = (event) => {
        try {
          const newSensorData = JSON.parse(event.data);
          this.updateSensorData(newSensorData);
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

    updateSensorData(newSensorData) {
      const index = this.sensors.findIndex(sensor => sensor.sensorMac === newSensorData.sensorMac);
      if (index !== -1) {
        this.$set(this.sensors, index, { ...this.sensors[index], ...newSensorData });
      }
    }
  },
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
