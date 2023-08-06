<template>
  <h1>Shanice Super Fat Product Distribution System</h1>
  <div class="flex ">
    <div >
      <h2>商品：</h2>
      <div class="flex m-1" v-for="productIndex of Object.keys(itemQuantities)">
        <label class="w-full mr-2">{{ itemNames[productIndex]['code'] }} {{ itemNames[productIndex]['name'] }} : </label>
        <input v-model="itemQuantities[productIndex]" type="number" class="w-3rem" @keyup="updateItemRemaining"
               @focus="inputRef[productIndex].select();"
               ref="inputRef"
              @blur="testBlur(productIndex)"/>
      </div>
    </div>
    <Divider layout="vertical" />
    <div class="ml-4">
      <h2>商品分配結果：</h2>
      <div v-for="(box, index) in boxes" :key="index">
        箱子 {{ index + 1 }} = {{ getBoxItemsNames(box).join(', ') }}
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
const itemQuantities = reactive([0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    inputRef = ref([]),
    itemNames = ref([
      {code: 'A1', name: 'Taro Jingsa'},
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
    boxCapacityOf4 = 4,
    boxCapacityOf2 = 2,
    itemsRemaining = ref([]),
    boxes = ref([]),
    boxCount4 = computed(() => Math.floor(itemQuantities.reduce((sum, qty) => sum + qty, 0) / boxCapacityOf4)),
    boxCount2 = computed(() => Math.floor(itemQuantities.reduce((sum, qty) => sum + qty, 0) / boxCapacityOf2));

onMounted(() => {
  console.log(remainingItems);
  itemsRemaining.value = [...itemQuantities];
  boxes.value = distribute();
});

function updateItemRemaining()
{
  itemsRemaining.value = [...itemQuantities];
  itemsRemaining.value.forEach((element, index) => {
    if (typeof element === 'string') {
      itemsRemaining.value[index] = 0;
    } else if (typeof element !== 'number' || element <= 0) {
      itemsRemaining.value[index] = 0;
    }
  });
  boxes.value = distribute();
}


// 定義箱子的容量
const boxCapacity1 = 4; // 裝4個產品的箱子
const boxCapacity2 = 2; // 裝2個產品的箱子

// 計算兩種箱子的數量
const numOfBoxes1 = computed(() => Math.floor(itemQuantities.reduce((sum, quantity) => sum + quantity, 0) / boxCapacity1));
const numOfBoxes2 = computed(() => Math.floor(itemQuantities.reduce((sum, quantity) => sum + quantity, 0) / boxCapacity2));

const remainingItems = computed(() => {
  const remaining: number[] = [];
  for (let i = 0; i < itemQuantities.length; i++) {
    const quantity = itemQuantities[i];
    const numOfBoxesToUse = Math.min(numOfBoxes1.value, Math.floor(quantity / boxCapacity1));
    const remainder = quantity - numOfBoxesToUse * boxCapacity1;
    for (let j = 0; j < remainder; j++) {
      remaining.push(i + 1); // 因為這里的索引對應品項1到品項15，所以要加1
    }
  }
  return remaining;
});

function distribute()
{
  const boxArray: number[][] = [];
  let totalItemsRemaining = itemsRemaining.value.reduce((sum, qty) => sum + qty, 0);

  // 將商品分配到能裝下4個的箱子
  for (let i = 0; i < boxCount4.value; i++) {
    const boxItems: number[] = [];
    for (let j = 0; j < itemQuantities.length; j++) {
      if (itemsRemaining.value[j] > 0 && boxItems.length < boxCapacityOf4) {
        boxItems.push(j);
        itemsRemaining.value[j]--;
        totalItemsRemaining--;
      }
    }
    boxArray.push(boxItems);
  }

  // 將商品分配到能裝下2個的箱子
  for (let i = 0; i < boxCount2.value; i++) {
    const boxItems: number[] = [];
    for (let j = 0; j < itemQuantities.length; j++) {
      if (itemsRemaining.value[j] > 0 && boxItems.length < boxCapacityOf2) {
        boxItems.push(j);
        itemsRemaining.value[j]--;
        totalItemsRemaining--;
      }
    }
    boxArray.push(boxItems);
  }

  // 如果仍有餘數，則將餘數加入最後一個箱子
  if (totalItemsRemaining > 0) {
    const remainderBox: number[] = [];
    for (let i = 0; i < itemQuantities.length; i++) {
      while (itemsRemaining.value[i] > 0) {
        remainderBox.push(i);
        itemsRemaining.value[i]--;
        totalItemsRemaining--;
      }
    }
    boxArray.push(remainderBox);
  }
  return boxArray;
}

// 餘數
const remainder = computed(() => {
  const remainingItems: number[] = [];
  for (let i = 0; i < itemQuantities.length; i++) {
    for (let j = 0; j < itemsRemaining.value[i]; j++) {
      remainingItems.push(i);
    }
  }
  return remainingItems;
});

// 根據箱子中的商品索引，返回商品的名稱
const getBoxItemsNames = (box: number[]) => box.map((itemIndex) => itemNames.value[itemIndex]['code']);
const getRemainingItemsNames = computed(() => remainder.value.map((itemIndex) => itemNames.value[itemIndex]['code']));

function formatItems() {
}

const param = computed(() => {
  const formattedItems = {};
  for (let i = 0; i < itemNames.value.length; i++) {
    const {code, name} = itemNames.value[i];
    formattedItems[code] = itemQuantities[i];
  }
  return formattedItems;
});
</script>


<style scoped lang="scss">

</style>