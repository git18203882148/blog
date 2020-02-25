<template>
  <div>
    <script :id="id" :src="src" async></script>
  </div>
</template>

<script>
export default {
  props: ["id", "src"]
};
</script>
