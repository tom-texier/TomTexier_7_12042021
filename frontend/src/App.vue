<template>
  <router-view></router-view>
</template>

<script>
import { onMounted } from "vue";
import { userIsLogged } from "./mixins/auth";
import router from "./router";

export default {
  name: "App",
  setup() {
    onMounted(() => {
      if (!userIsLogged()) return router.push("/login");
    });
  },
};
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

$primary-color: #FD2D01;
$secondary-color: #FFD7D7;

#app {
  font-family: "Poppins", sans-serif;
}

.section-container {
  max-width: 1250px;
  padding: 0 10px;
  margin: auto;
}

.row {
  display: flex;
}
</style>
