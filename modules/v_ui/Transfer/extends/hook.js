// 將方法寫成鉤子(hook)函數

import { ref, reactive, computed } from 'vue';

export function useIndex(initIndex){
  const tarIndex = ref(initIndex);

  function setIndex(newIndex){
    tarIndex.value = Number(newIndex);
  }

  return [
    tarIndex, 
    setIndex
  ]
}

export function useRightListData(initialData, checkedData){
  const rightListData = ref(initialData);

  // 移動資料到右側列表
  function addRightListData(newData){
    rightListData.value = [
      ...rightListData.value,
      ...newData
    ];

    // 清空左側暫存區
    checkedData.left = [];
  }

  // 移動資料到左側列表 
  function removeRightListData(newData){
    newData.forEach(newItem => {
      rightListData.value = rightListData.value.filter(item => item.id !== newItem.id);
    });

    // 清空右側暫存區
    checkedData.right = [];
  }

  return [
    rightListData,
    addRightListData,
    removeRightListData
  ]
}

export function useCheckedData(){
  // 暫存區容器
  const checkedData = reactive({
    left: [],
    right: []
  });

  // 新增資料到容器中
  function addCheckedData(name, item){
    switch(name){
      case 'left':
        checkedData.left.push(item);
        break;
      case 'right':
        checkedData.right.push(item);
        break;
      default:
        break;    
    }
  }

  // 從容器中移除資料
  function removeCheckedData(name, id){
    switch(name){
      case 'left':
        checkedData.left = checkedData.left.filter(item => item.id !== id);
        break;
      case 'right':
        checkedData.right = checkedData.right.filter(item => item.id !== id);
        break;
      default:
        break;    
    }
  }

  return [
    checkedData,
    addCheckedData,
    removeCheckedData
  ]
}

export function useDragedItem(){
  const dragedItem = ref(null);

  function setDragedItem(item){
    dragedItem.value = item;
  }

  return [
    dragedItem,
    setDragedItem
  ]
}

// computed hooks
export function useComputedData(data, tarIndex, rightListData, checkedData){
  const leftTitle = computed(() => data[tarIndex.value].title);

  const leftListData = computed(() => {
    const { data: currentData } = data[tarIndex.value];

    return currentData.filter(item => {
      if(!rightListData.value.find(({ id }) => item.id === id)){
        return item;
      }
    });
  });

  const transferBtnDisabled = computed(() => ({
    left: checkedData.right.length === 0,
    right: checkedData.left.length === 0
  }));

  return {
    leftTitle,
    leftListData,
    transferBtnDisabled
  }
}