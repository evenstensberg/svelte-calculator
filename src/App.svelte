<script lang="ts">
  let name: string = "Hello";
</script>

<div class="flex-container">
  <h1>{name} World</h1>
</div>

<style lang="scss">
  .flex-container {
    & h1 {
      color: gray;
    }
  }
</style>
