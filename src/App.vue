<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-message-provider closable :duration="1000000">
        <!-- <n-theme-editor> -->
        <app-layout />
        <!-- </n-theme-editor> -->
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NLoadingBarProvider, NMessageProvider } from 'naive-ui'
// import { NThemeEditor } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
import AppLayout from './views/layout/AppLayout.vue'
</script>

<style>
</style>
