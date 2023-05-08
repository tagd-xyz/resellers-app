<template>
  <div class="q-pa-lg">
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical>
          <q-tab name="bars" icon="bar_chart" label="Bars" />
          <q-tab name="lines" icon="show_chart" label="Lines" />
          <q-tab name="pie" icon="pie_chart" label="Pie" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="bars">
            <div class="text-h4 q-mb-md">Bars</div>
            <Bars />
          </q-tab-panel>

          <q-tab-panel name="lines">
            <div class="text-h4 q-mb-md">Lines</div>
            <Lines />
          </q-tab-panel>

          <q-tab-panel name="pie">
            <div class="text-h4 q-mb-md">Pie</div>
            <Pie />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script setup>
import Bars from './components/Bars.vue';
import Lines from './components/Lines.vue';
import Pie from './components/Pie.vue';

import { onMounted, ref } from 'vue';

const tab = ref('bars');
const splitterModel = ref(10);

onMounted(() => {
  console.log('mounted');
});
</script>
