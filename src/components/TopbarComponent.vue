<template>
    <b-navbar type="dark" variant="dark" class="topbar">
      <!-- Botón del menú (sandwich) a la izquierda -->
      <b-button @click="toggleSidebar" variant="primary" class="mr-3">
        <b-icon icon="list"></b-icon>
      </b-button>
      
      <!-- Nombre de usuario y botón de logout a la derecha -->
      <div class="ml-auto d-flex align-items-center">
        <b-navbar-text class="mr-3">{{ username }}</b-navbar-text>
        <b-button @click="logout" variant="outline-light">
          Logout
        </b-button>
      </div>
    </b-navbar>
  </template>
  
  <script>
  export default {
    props: {
      username: {
        type: String,
        default: "User"
      }
    },
    methods: {
      toggleSidebar() {
        this.$emit("toggle-sidebar");
      },
      logout() {
        // Aquí puedes agregar la lógica de logout, como limpiar tokens o sesiones
      this.$router.push('/'); // Redirige al login

      }
    }
  };
  </script>
  
  <style scoped>
  .topbar {
    height: 56px;
    position: fixed;
    width: 100%;
    z-index: 1000;
    top: 0;
    padding: 10px;
    margin: 0;
  }
  
  .ml-auto {
    margin-left: auto !important;
  }
  
  .mr-3 {
    margin-right: 1rem !important;
    color:#fff;
  }
  </style>
  