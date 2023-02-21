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
      <template #cell(createdAt)="data">
        <div>
          <support-date :date="data.item.createdAt" />
        </div>
      </template>
      <template #cell(tagds)="data">
        <div>
          <b-badge variant="info"> {{ data.item.tagds.length }} total </b-badge>
          <b-badge variant="info">
            {{
              data.item.tagds.filter((tagd) => tagd.meta.resaleAllowed ?? false)
                .length
            }}
            available
          </b-badge>
        </div>
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
          key: 'id',
          label: 'Id',
        },
        {
          key: 'email',
          label: 'Email',
        },
        {
          key: 'createdAt',
          label: 'Created at',
        },
        {
          key: 'tagds',
          label: 'Tagds',
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
