export default function ({ $axios, store }) {
  if (process.client) {
    const token = store.state.token;
    if (token) {
      $axios.setToken(token, 'Bearer');
    }
    $axios.onRequest(() => {
      const actor = store.state.actor;
      if (actor) {
        $axios.setHeader('Tagd-Act-As', 'reseller:' + actor);
      }
    });
  }
}
