<template>
  <div>
    <b-container>
      <page-loading :is-busy="isBusy" />
      <b-row v-if="!isBusy">
        <b-col>
          <p>
            <strong>
              {{ item?.name }}
            </strong>
            from
            <strong>
              {{ item?.retailer }}
            </strong>
            <br />
            {{ item?.description }}
          </p>
        </b-col>
        <b-col>
          <strong>Type:</strong> {{ item?.type }}
          <br />
          <strong>Brand:</strong> {{ item?.properties?.brand ?? '' }}
          <br />
          <strong>Model:</strong> {{ item?.properties?.model ?? '' }}
          <br />
          <strong>Size:</strong> {{ item?.properties?.size ?? '' }}
        </b-col>
      </b-row>
      <tagds-table
        v-if="!isBusy"
        :allow-expire="allowExpire"
        :allow-transfer="allowTransfer"
        :tagds="item?.tagds || []"
      />
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    item: {},
    isBusy: { type: Boolean },
    allowExpire: { type: Boolean },
    allowTransfer: { type: Boolean },
  },
  methods: {
    activeClicked() {},
    cancelClicked() {},
  },
};
</script>
