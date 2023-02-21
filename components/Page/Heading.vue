<template>
  <b-row>
    <b-col>
      <h3>
        <slot name="title" />
      </h3>
    </b-col>
    <b-col class="text-right">
      <slot name="actions" />
    </b-col>
  </b-row>
</template>
