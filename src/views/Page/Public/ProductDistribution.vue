<template>
  <h1>Shanice Super Fat Product Distribution System</h1>
  <div class="flex ">
    <div >
      <h2>商品：</h2>
      <div class="flex m-1" v-for="productIndex of Object.keys(itemQuantities)">
        <label class="w-full mr-2">{{ itemNames[productIndex]['code'] }} {{ itemNames[productIndex]['name'] }} : </label>
        <input v-model="itemQuantities[productIndex]" type="number" class="w-3rem"
               @focus="inputRef[productIndex].select();"
               ref="inputRef"
               @keyup.enter="initial"
              @blur="testBlur(productIndex)"/>
      </div>
<!--      <Button @click="initial">Distribute</Button>-->
    </div>
    <Divider layout="vertical" />
    <div class="ml-4">
      <h2>商品分配結果：</h2>
      <div v-for="(box, index) in boxes" :key="index">
        Box {{ index + 1 }} = {{ getBoxItemsNames(box).join(', ') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, reactive, onMounted} from 'vue';
import Divider from "primevue/divider";

function testBlur(productIndex: number|string)
{
  if (typeof itemQuantities[productIndex] !== 'number')
    itemQuantities[productIndex] = 0;
}

// 定義15種品項的名稱和數量
const itemQuantities = reactive([0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    inputRef = ref([]),
    itemNames = ref([
      // {code: 'A1', name: 'Taro Jingsa'},
      {code: 'A2', name: 'Green Ruby'},
      {code: 'A3', name: 'Tiramisu'},
      {code: 'A4', name: 'Taro Single Yolk'},
      {code: 'B1', name: 'Pure Lotus'},
      {code: 'B2', name: 'Pure Lotus Single Yolk'},
      {code: 'B3', name: 'Pure Lotus Double Yolk'},
      {code: 'B4', name: 'Low Sugar White Lotus'},
      {code: 'B5', name: 'Low Sugar White Lotus 1 Yolk'},
      {code: 'C1', name: 'Supreme Mixed Nuts'},
      {code: 'C2', name: 'Precious Black'},
      {code: 'D1', name: 'Mixed Nuts'},
      {code: 'D2', name: 'Red Bean'},
      {code: 'D3', name: 'Pearl of Harmony'},
      {code: 'E1', name: 'Pandan Lotus'},
      {code: 'E2', name: 'Pearl of Prosperity'},
      {code: 'F1', name: 'Snow Skin Low Sugar White Lotus Single Yolk'},
      {code: 'F2', name: 'Snow Skin Signature Yam'},
      {code: 'F3', name: 'Snow Skin Strawberry'},
      {code: 'F4', name: 'Snow Skin Peachy Mango'},
      {code: 'F5', name: 'Dark Chocolate Truffle'},
      {code: 'F6', name: 'Snow Skin Pandan Custard'},
      {code: 'F7', name: 'Ultimate Musang King'},
      {code: 'F8', name: 'Black Gold'},
      {code: 'F9', name: 'Fruity Blueberry'},
    ]),
    // withYolk = ref(['B3', 'B2', 'B5', 'A4', 'D3', 'E2']),
    // newFlavour = ref(['A2', 'A3', 'A4']),
    // pandanFlavour = ref(['E1', 'E2']),
    // mixedNutFlavour = ref(['C1', 'D1']),
    boxCapacityOf4 = 4,
    boxCapacityOf2 = 2,
    itemsRemaining = ref<Array<any>>([]),
    boxes = ref<Array<any>>([]),
    totalItems = computed(() => itemQuantities.reduce((sum, qty) => sum + qty, 0));

onMounted(() => {
  initial();
});

function initial()
{
  boxes.value = [];
  if (totalItems.value <= 2)
  {
    itemQuantities.forEach((element, index) => {
      if (element > 0)
      {
        for(let i = 0; i < element; i++)
        {
          if (boxes.value.length === 0) {
            boxes.value.push([]);
          }
          boxes.value.forEach((box, boxIndex) => {
            if (box.length < boxCapacityOf2)
            {
              boxes.value[boxIndex].push(index);
            }
          });
        }
      }
    });
  }
  else if (totalItems.value <= 4)
  {
    itemQuantities.forEach((element, index) => {
      if (element > 0)
      {
        for(let i = 0; i < element; i++)
        {
          if (boxes.value.length === 0) {
            boxes.value.push([]);
          }
          boxes.value.forEach((box, boxIndex) => {
            if (box.length < boxCapacityOf4)
            {
              boxes.value[boxIndex].push(index);
            }
          });
        }
      }
    });
  }else{
    itemsRemaining.value = [...itemQuantities];
    boxes.value = distribute();
  }
}

function distribute()
{
  let boxArray: Array<any> = [], current = 0, itemToDistribute = [...itemQuantities];
  do{
    if (boxArray[current] === undefined)
      boxArray[current] = [];
    for (let j = 0; j < itemToDistribute.length; j++) {
      if (itemToDistribute[j] > 0 && boxArray[current].length < boxCapacityOf4) {
        boxArray[current].push(j);
        itemToDistribute[j]--;
      }
    }
    if (boxArray[current].length >= boxCapacityOf4) {
      boxArray[current].sort();
      current++;
    }
  }while(itemToDistribute.reduce((itemQuantities, val) => itemQuantities + val) > 0)

  return boxArray;
}

// 根據箱子中的商品索引，返回商品的名稱
const getBoxItemsNames = (box: number[]) => box.map((itemIndex) => itemNames.value[itemIndex]['code']);

</script>


<style scoped lang="scss">

</style>