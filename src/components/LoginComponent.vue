<template>
  <b-container fluid class="d-flex justify-content-center align-items-center min-vh-100 login-container">
    <b-row no-gutters class="login-card">
      <b-col md="6" class="left-section text-white d-flex flex-column justify-content-center align-items-center">
        <h1 class="welcome-text">TELEMETRÍA IoT</h1>
        <img src="../assets/circuit_1.png" alt="Logo" class="logo mb-4"/>

        <p>Please sign in to your account to get started!</p>
      </b-col>
      <b-col md="6" class="right-section p-5">
        <h2 class="login-title">LOGIN</h2>
        <b-form @submit.prevent="handleLogin" class="align-items-left">
          <b-form-group label="User" label-for="user-input"  >
            <b-form-input
              id="user-input"
              v-model="user"
              type="text"
              placeholder="Enter username"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Password" label-for="password-input">
            <b-form-input
              id="password-input"
              v-model="password"
              type="password"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" block class="mt-4">LOGIN</b-button>
        </b-form>
        <div class="text-center mt-3">
          <p>Don't have an account yet? <b-link href="#">Register</b-link></p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    handleLogin() {
      if (this.user === 'admin' && this.password === 'admin') {
          this.$router.push('/dashboard');
        } else {
          alert('Invalid credentials');
        }
    }
  }
};
</script>

<style scoped>
.login-container {
  background-color: #f2f7ff;
}

.login-card {
  max-width: 900px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.left-section {
  background-color: #007bff; /* Azul similar */
  /*text-align: center;*/
}

.right-section {
  background-color: white;
}

.welcome-text {
  font-size: 2rem;
  font-weight: bold;
}

.login-title {
  color: #007bff;
  font-weight: bold;
}

b-form-input {
  border-radius: 50px;
}

b-button {
  border-radius: 50px;
}
</style>
