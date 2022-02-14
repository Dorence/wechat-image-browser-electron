<template>
  <div class="container-fluid d-flex px-0" id="app">
    <div
      class="nav flex-column nav-pills"
      role="tablist"
      aria-orientation="vertical"
      :style="{ width: siderWidthValue + 'px' }"
    >
      <button
        v-for="i in items"
        :id="'app-t-' + i.i"
        :data-bs-target="'#app-m-' + i.i"
        :aria-controls="'app-m-' + i.i"
        class="nav-link"
        data-bs-toggle="pill"
        type="button"
        role="tab"
        aria-selected="false"
      >{{ i.t }}</button>
      <div>~</div>
      <div class="btn-group dropup">
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >Dropup</button>
        <ul class="dropdown-menu" id="app-d-user">
          <li>
            <a class="dropdown-item" href="#">Action</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Another action</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab-content m-3 w-100">
      <div
        class="tab-pane fade show active"
        id="app-m-home"
        role="tabpanel"
        aria-labelledby="app-t-home"
      >
        <h1>Hello World!</h1>
        <p>
          We are using Node.js
          <span id="node-version"></span>, Chromium
          <span id="chrome-version"></span>, and
          Electron
          <span id="electron-version"></span>.
        </p>
      </div>
      <div
        class="tab-pane fade"
        id="app-m-profile"
        role="tabpanel"
        aria-labelledby="app-t-profile"
      >...</div>
      <div class="tab-pane fade" id="app-m-video" role="tabpanel" aria-labelledby="app-t-video">...</div>
      <div
        class="tab-pane fade"
        id="app-m-settings"
        role="tabpanel"
        aria-labelledby="app-t-settings"
      >
        <app-layout />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import * as R from 'ramda';

import AppLayout from '../settings/AppSettings.vue'

const store = useStore();

const siderWidthValue = computed(() => R.path(['sider', 'width'], store.getters.ui));

const items = [
  { i: 'home', t: 'Home' },
  { i: 'profile', t: 'Profile' },
  { i: 'video', t: 'Video' },
  { i: 'settings', t: 'Settings' },
]

// console.log(this)
</script>
