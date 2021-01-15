<template>
  <div id="app">
    <vs-sidebar
      v-model="active"
      open
      >
      <template #header>
          <router-link to="/user" style="width: 100%;">
          <vs-row vs-type="flex" align="center" style="padding-left: 1rem; padding-top: 1rem; padding-bottom: 1rem;">
              <vs-avatar circle>
                <img src="https://sun9-40.userapi.com/mb_xnDM1buF3-5NL0WEP6bdZbszViXrGd0fdkQ/0MbyoFkIyoA.jpg" alt="">
              </vs-avatar>
              <a href="#" style="margin-left: 1.5rem; font-weight: 700;">Полина</a>
          </vs-row>
          </router-link>
      </template>
      <vs-sidebar-item to="/" id="home">
        <template #icon>
          <img height="24" class="icon" src="./assets/home-menu.svg" />
        </template>
        Главная
      </vs-sidebar-item>
      <vs-sidebar-item to="messages" id="messages">
        <template #icon>
          <img height="24" class="icon" src="./assets/msg-menu.svg" />
        </template>
        Сообщения
      </vs-sidebar-item>
      
    </vs-sidebar>
    <router-view style="margin-left: 260px;"/>
  </div>
</template>

<script>
import 'vuesax/dist/vuesax.css'
import 'boxicons'

export default {
  name: 'App',
  data:() => ({
    active: "",
  }),
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  },
  mounted() {
    this.active = this.currentRouteName;
    this.$vs.setColor('primary', '#FF8577')
  },
  watch: {
      $route(to) {
      this.active = to.name;
    }
  }
}
</script>

<style>
:root {
    --vs-primary: 255, 133, 119;
    --vs-secondary: 242, 242, 242;
    --vs-success: 23, 201, 100;
    --vs-danger: 242, 19, 93;
    --vs-warn: 254, 130, 0;
    --vs-dark: 36, 33, 69;
  }

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    display: block;
    background: none;
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .1);
    border-radius: 5px;
}

body {
  margin: 0;
  padding: 0;
}

* {
  font-family: 'Montserrat', sans-serif !important;
  letter-spacing: -0.02rem;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
}

.secondary {
  color: #b8b8b8;
}

.primary {
  color: #FF8577;
}

.bold {
  font-weight: bold;
}

a {
  text-decoration: none;
  color: var(--vs-primary);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  width: calc(100% - 260px);
  margin-left: 260px;
}

.icon {
  width: 25px;
  height: 25px;
  color: red;
}

.vs-sidebar__item__icon {
  min-width: 95px;
  height: 60px;
}

.vs-sidebar__item {
  margin: 20px 0;
}

.vs-sidebar__item__text {
  font-weight: 100;
}


</style>
