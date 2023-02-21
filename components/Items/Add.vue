<template>
  <b-form>
    <b-row>
      <b-col>
        <b-form-group
          id="input-group-slug"
          label="Tagd"
          label-for="input-slug"
          description="i.e. MPP9-PMM5-Q68Q-QWC8"
        >
          <b-form-input
            id="input-slug"
            v-model="form.slug"
            @input="$emit('update', form)"
            placeholder="Enter the Tagd of the item"
            required
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  layout: 'default',
  emits: ['updated'],
  data() {
    return {
      form: {
        slug: '',
      },
    };
  },
  computed: {
  },
  methods: {},
};
</script>
