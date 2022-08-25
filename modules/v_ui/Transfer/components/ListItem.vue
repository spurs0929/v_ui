<template>
  <div
    v-for="item of data"
    :key="item.id"
    :class="['list-item', item.disabled ? 'disabled' : '']"
    :draggble="!item.disabled"
    @dragstart="dragItem(item)"
  >
    <input 
      type="checkbox"
      :disabled="item.disabled"
      :id="'checkbox-' + item.id"
      @click="checkboxClick($event.target.checked, leftOrRight, item)"
    >
    <label :for="'checkbox-' + item.id">{{ item.phone_name }}</label>
  </div>
</template>

<script setup>
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    },
    leftOrRight: {
      type: String,
      validator(val){
        return ['left', 'right'].includes(val);
      }
    }
  });

  const emit = defineEmits(['dragItem', 'checkboxClick']);

  const dragItem = (item) => {
    emit('dragItem', item);
  }

  const checkboxClick = (cheked, leftOrRight, item) => {
    emit('checkboxClick', cheked, leftOrRight, item);
  }

</script>

<style lang="scss" scoped>
  .list-item{
    display: flex;
    align-items: center;
    height: 30px;
    font-size: 12px;
    color: #666;

    &:disabled{
      opacity: .5;
    }
  }
</style>