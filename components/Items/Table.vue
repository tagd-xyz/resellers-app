<template>
  <div>
    <page-loading :is-busy="isBusy" />
    <b-table
      v-if="!isBusy"
      striped
      hover
      small
      :fields="fields"
      :items="items"
      @row-clicked="rowClicked"
      style="cursor: pointer"
    >
      <template #cell(nameAndDesc)="data">
        <strong>
          {{ data.item.name }}
        </strong>
        <br />
        <small>
          {{ data.item.description }}
        </small>
      </template>
      <template #cell(Details)="data">
        <small>
          Brand: {{ data.item.properties.brand ?? '' }}
          <br />
          Model: {{ data.item.properties.model ?? '' }}
          <br />
          Size: {{ data.item.properties.size ?? '' }}
        </small>
      </template>
      <template #cell(tagds)="data">
        {{ data.item.tagds?.length || 0 }} Tag(s)
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    isBusy: Boolean,
    items: Array,
  },

  emits: ['itemClicked'],

  data() {
    return {
      fields: [
        {
          key: 'nameAndDesc',
          label: 'Item',
          thStyle: { width: '65%' },
        },
        {
          key: 'Details',
          label: 'Details',
        },
        {
          key: 'tagds',
          label: 'Tags',
        },
      ],
    };
  },

  methods: {
    rowClicked(record, index) {
      this.$emit('itemClicked', record, index);
    },
  },
};
</script>
