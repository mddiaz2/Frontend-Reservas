<template>
  <div id="app">
    <AppHeader v-if="showHeader" />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "App",
  components: {
    AppHeader,
  },
  setup() {
    const route = useRoute();

    // Definir rutas donde el Header NO se debe mostrar
    const hiddenRoutes = ["/", "/login", "/register"];

    // Oculta el Header si la ruta actual está en la lista de rutas ocultas
    const showHeader = computed(() => !hiddenRoutes.includes(route.path));

    return { showHeader };
  },
};
</script>
