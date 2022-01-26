<template>
  <div>
    <Nav />
    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="col col-12">Home</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
  name: 'Home',
  components: { Nav },
  data: () => ({}),
  watch: {},
  computed: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 3.25rem;
}
</style>
