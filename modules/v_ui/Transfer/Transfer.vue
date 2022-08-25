<template>
  <div>
    <!-- 切換品牌 -->
    <div>
      <selector
        :data="options"
        @select-change="setIndex"
      ></selector>
    </div>
    <!-- transfer box -->
    <div class="transfer-box">
      <!-- leftListData -->
      <div 
        class="box left-list"
        @dragover.prevent
        @drop="removeRightListData([ dragedItem ])"
      >
        <list-title
          :title="leftTitle"
        ></list-title>
        <div>
          <list-item
            :data="leftListData"
            left-or-right="left"
            @checkbox-click="setCheckedData"
            @drag-item="setDragedItem"
          ></list-item>
        </div>
      </div>
      <div class="box button-group">
        <button 
          :disabled="transferBtnDisabled.left"
          @click="removeRightListData(checkedData.right)"
        >&lt;</button>
        <button
          :disabled="transferBtnDisabled.right"
          @click="addRightListData(checkedData.left)"
        >&gt;</button>
      </div>
      <!-- rightListData -->
      <div 
        class="box right-list"
        @dragover.prevent
        @drop="addRightListData([ dragedItem ])"  
      >
         <list-title
          :title="rightTitle"
        ></list-title>
        <div>
          <list-item
            :data="rightListData"
            left-or-right="right"
            @checkbox-click="setCheckedData"
            @drag-item="setDragedItem"
          ></list-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import ListItem from './components/ListItem'; 
  import ListTitle from './components/ListTitle';
  import Selector from './components/selector';
  import { useIndex, useComputedData, useRightListData, useCheckedData, useDragedItem } from './extends/hook';

  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    },
    rightTitle: {
      type: String,
      default: '已選擇'
    }
  });

  const options = props.data.map(({ title }) => title);
  const [ tarIndex, setIndex ] = useIndex(0);
  const [ checkedData, addCheckedData, removeCheckedData ] = useCheckedData();
  const [ rightListData, addRightListData, removeRightListData ] = useRightListData([], checkedData);
  const [ dragedItem, setDragedItem ] = useDragedItem();
  const { leftTitle, leftListData, transferBtnDisabled } = useComputedData(props.data, tarIndex, rightListData, checkedData);

  const setCheckedData = (checked, name, item) => {
    checked ? addCheckedData(name, item) : removeCheckedData(name, item.id);    
  }


</script>

<style lang="scss" scoped>
  .transfer-box{
    display: flex;
    flex-direction: row;
    width: 360px;
    height: 300px;

    .box{
      width: 120px;
      height: 100%;
      border: solid 1px #ddd;

      &.button-group{
        display: flex;
        justify-content: center;
        align-items: center;

        button{
          border: none;
          outline: none;
          width: 38px;
          height: 38px;
          background-color: #632adf;
          color: #fff;
          margin: 5px;

          &:disabled{
            opacity: .5;
          }
        }

      }
    }
  }
</style>