<template>
  <el-menu-item
    v-for="(tag, index) in tags[1]"
    :index="tag.value"
    @click="chooseMenu(tag)"
  >
    <el-icon
      ><setting />
      <span v-show="isMobileFlag" style="font-size: 5px; font-style: normal">
        {{ tag.label }}
      </span>
    </el-icon>
    <!-- <template #title v-show="!isMobileFlag">
          <span v-show="!isMobileFlag">
            {{ tag.label }}
          </span>
        </template> -->
  </el-menu-item>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array
    }
  },
  mounted() {
    console.log(this.tags)
  }
}
</script>

<style></style>
