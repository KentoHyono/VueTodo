<script setup>
  import ListContentWithPinia from './components/ListContentWithPinia.vue';
  import AddTodoButtonFromAPI from './components/AddTodoButtonFromAPI.vue';
</script>

<template>
  <!-- <ListContent /> -->
   <v-app>
    <v-main class="ma-10">
      <ListContentWithPinia />
      <AddTodoButtonFromAPI />
    </v-main>
   </v-app>
</template>

<style scoped>

</style>
