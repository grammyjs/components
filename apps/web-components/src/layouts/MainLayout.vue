<template>
  <q-layout>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition appear enter-active-class="animated fadeIn">
          <div>
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, watch } from 'vue';
import { useWebAppTheme } from 'vue-tg';

const $q = useQuasar();

// Update theme

const { colorScheme } = useWebAppTheme();

watch(colorScheme, (scheme) => {
  $q.dark.set(scheme === 'dark');
});

onMounted(() => $q.dark.set(colorScheme.value === 'dark'));
</script>

<style>
.loader {
  display: none;
}
</style>
