<template>
  <h1 class="mb-6">Moon Cake Distribution System</h1>

  <!------------------------------->
  <!--   Section Product Input   -->
  <!------------------------------->
  <div class="flex">
    <div class="w-3 w-25rem">
      <h2>Product Input：</h2>
      <div class="flex m-1 w-full border-1 my-1 p-1 border-round" v-for="productIndex of Object.keys(itemQuantities)">
        <label class="w-full mr-2"><span class="font-bold px-3">{{ itemNames[productIndex]['code'] }}</span> <span class="font-semibold">{{ itemNames[productIndex]['name'] }}</span> : </label>
        <input v-model="itemQuantities[productIndex]" type="number" class="w-3rem border-round-md border-black-alpha-30 "
               @focus="inputRef[productIndex].select();"
               ref="inputRef"
               @keyup.enter="initial"
               tabindex="1"
              @blur="testBlur(productIndex)"/>
<!--        <div class="flex justify-content-end ml-4">-->
<!--          <input  readonly type="number" class="w-3rem bg-gray-50 " :value="itemDistributed[productIndex]"/>-->
<!--        </div>-->
      </div>
      <Divider />
      <div class="flex m-1 mr-0 font-bold">
        <label class="w-full mr-3 text-right"><span class="font-bold">Total: </span> </label>
        <input readonly type="number" class="w-3rem select-none bg-indigo-50 border-round-md border-black-alpha-10" disabled :value="totalToDistribute"/>
<!--        <div class="flex justify-content-end ml-4">-->
<!--          <input readonly type="number" class="w-3rem bg-gray-50 " :value="totalDistributed" tabindex="0"/>-->
<!--        </div>-->
      </div>
      <div class="flex justify-content-end mt-4">
        <Button @click="initial">Distribute</Button>
      </div>
    </div>


    <Divider layout="vertical" />


    <!------------------------------------>
    <!--   Section Distributed Result   -->
    <!------------------------------------>
    <div class="ml-4 w-4">
      <div class="flex justify-content-between">
        <h2>Distribute Result：</h2>
        <Button class="h-3rem" :disabled="boxes.length === 0" @click="copyResult">Copy</Button>
      </div>
      <div v-if="boxes.length > 0" class="flex text-xl m-2 my-4 w-full border-1 border-round p-1 px-2" v-for="(box, index) in boxes" :key="index">
        <div class="flex font-semibold">Box {{ index + 1 }} = </div>
        <div class="flex  font-bold w-10 ml-3" >
          <div v-for="item of box" class="flex w-8rem">{{ getItemNames(Number(item)) }}({{getItemShortForm(Number(item))}})</div>
        </div>
      </div>
      <div v-else>
        <h3 class="text-2xl m-2 text-gray-500">-No Result-</h3>
      </div>
    </div>


    <Divider layout="vertical" />

    <!---------------------------------->
    <!--   Section Distributed Item   -->
    <!---------------------------------->
    <div class="ml-4">
      <h2>Item Distributed：</h2>
      <div class="flex justify-content-end">
        <Button class="h-3rem" :disabled="boxes.length === 0" @click="copyDistributed">Copy</Button>
      </div>
      <div v-if="Object.keys(itemDistributed).length > 0" class="flex m-1 border-1 border-round m-2 p-1" v-for="(count, index) in itemDistributed" :key="index">
        <div class="w-6 font-bold">{{ getItemNames(Number(index)) }}({{getItemShortForm(Number(index))}})： </div>
        <div class="text-right">{{ count }}</div>
<!--        <input readonly disabled type="number" class="w-3rem bg-indigo-50 border-round-md border-black-alpha-10" :value="count"/>-->
      </div>
      <div v-else>
        <h3 class="text-2xl m-2 text-gray-500">-No Result-</h3>
      </div>
      <Divider />
      <div class="flex m-1 font-bold border-1 border-round m-2 p-1">
        <span class="pr-2 w-6">Total:</span>
        <div class="text-right">{{ totalDistributed }}</div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed, ref, reactive, onMounted} from 'vue';
import Divider from "primevue/divider";
import Button from "primevue/button";

function testBlur(productIndex: number|string)
{
  if (typeof itemQuantities[productIndex] !== 'number')
    itemQuantities[productIndex] = 0;
}

// 定義15種品項的名稱和數量
const itemQuantities = reactive([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    inputRef = ref([]),
    itemNames = ref([
      // {code: 'A1', name: 'Taro Jingsa', shortForm: 'TJ'},
      {code: 'A2', name: 'Green Ruby', shortForm: 'GR'},
      {code: 'A3', name: 'Tiramisu', shortForm: 'TU'},
      {code: 'A4', name: 'Taro Single Yolk', shortForm: 'TSY'},
      {code: 'B1', name: 'Pure Lotus', shortForm: 'PL'},
      {code: 'B2', name: 'Pure Lotus Single Yolk', shortForm: 'PLSY'},
      {code: 'B3', name: 'Pure Lotus Double Yolk', shortForm: 'PLDY'},
      {code: 'B4', name: 'Low Sugar White Lotus', shortForm: 'LSWL'},
      {code: 'B5', name: 'Low Sugar White Lotus 1 Yolk', shortForm: 'LSWLSY'},
      {code: 'C1', name: 'Supreme Mixed Nuts', shortForm: 'SMN'},
      {code: 'C2', name: 'Precious Black', shortForm: 'PB'},
      {code: 'D1', name: 'Mixed Nuts', shortForm: 'MN'},
      {code: 'D2', name: 'Red Bean', shortForm: 'RB'},
      {code: 'D3', name: 'Pearl of Harmony', shortForm: 'POH'},
      {code: 'E1', name: 'Pandan Lotus', shortForm: 'PN'},
      {code: 'E2', name: 'Pearl of Prosperity', shortForm: 'POP'},
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
    sequence = ref(['B3', 'B2', 'B5', 'A4', 'D3', 'E2', 'A2', 'A3', 'A4', 'E1', 'C1', 'D1']),
    totalToDistribute = computed(() => itemQuantities.reduce((itemQuantities, val) => itemQuantities + val)),
    boxCapacityOf4 = 4,
    boxCapacityOf2 = 2,
    itemsRemaining = ref<Array<any>>([]),
    boxes = ref<Array<any>>([]),
    totalBox = ref<number>(0),
    itemDistributed = ref<Object>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    totalDistributed = computed(() => {
      let total = 0;
      Object.values(itemDistributed.value).forEach((values) => {
        total += values;
      });
      return total;
    }),
    totalItems = computed(() => itemQuantities.reduce((sum, qty) => sum + qty, 0));

onMounted(() => {
  initial();
});

function getItemIdxByCode(code: string)
{
  return itemNames.value.findIndex((item) => item.code === code);
}

function copyResult()
{
  let input = '';
  if (boxes.value.length === 0)
    return;
  boxes.value.forEach((box: Array<any>, index) => {
    input += `Box ${index + 1} \t `;
    box.forEach((itemIndex, idx) => {
      input += `${getItemNames(itemIndex)} (${getItemShortForm(itemIndex)})`;
      if (idx !== box.length - 1)
        input += `\t`;
    });
    input += `\n`;
  });
  navigator.clipboard.writeText(input)
      .then(() => {
      })
      .catch((error) => {
        console.error('复制失败：', error);
      });

}

function copyDistributed()
{
  let input = '';
  if (boxes.value.length === 0)
    return;
  Object.keys(itemDistributed.value).forEach((itemIndex) => {
    input += `${getItemNames(Number(itemIndex))} (${getItemShortForm(Number(itemIndex))}) \t ${itemDistributed.value[itemIndex]}\n`;
  });
  navigator.clipboard.writeText(input)
      .then(() => {
      })
      .catch((error) => {
        console.error('复制失败：', error);
      });

}

function initial()
{
  boxes.value = [];
  itemDistributed.value = [];
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
    totalBox.value = Math.ceil(totalItems.value / boxCapacityOf4);
    for(let i=0; i < totalBox.value; i++)
    {
      boxes.value.push([]);
    }
    itemsRemaining.value = [...itemQuantities];
    boxes.value = distribute();
  }
}
function distribute()
{
  const retain = totalItems.value % boxCapacityOf4;
  let boxArray: Array<any> = [], current = 0, itemToDistribute = [...itemQuantities], sequenceFirst = false;

  do{
    if (!sequenceFirst) {
      sequenceFirst = true;
      sequence.value.forEach((itemCode) => {
        const itemIdx = getItemIdxByCode(itemCode);
        do {
          if(itemToDistribute[itemIdx] <= 0)
            continue;
          const currentBoxIdx = current % totalBox.value;
          if (currentBoxIdx === boxArray.length - 1 && retain > 0 && boxArray[currentBoxIdx].length >= retain) {
            current++;
          } else {
            if (boxArray[currentBoxIdx] === undefined)
              boxArray[currentBoxIdx] = [];
            if (boxArray[currentBoxIdx].length >= boxCapacityOf4) {
              current++;
            }else{
              if (boxArray[currentBoxIdx].length < boxCapacityOf4 && itemToDistribute[itemIdx] > 0) {
                boxArray[currentBoxIdx].push(itemIdx);
                if (itemDistributed.value[itemIdx] === undefined)
                  itemDistributed.value[itemIdx] = 0;
                itemDistributed.value[itemIdx]++;
                itemToDistribute[itemIdx]--;
              }
              current++;
            }
          }
        } while (itemToDistribute[itemIdx] > 0)
      });
    }

    for(let i = 0; i < boxes.value.length; i++)
    {

      if (i === boxArray.length - 1 && retain > 0 && boxArray[i].length >= retain)
      {
        break;
      }else {
        if (boxArray[i] === undefined)
          boxArray[i] = [];
        for (let j = 0; j < itemToDistribute.length; j++) {
          if (itemDistributed.value[j] === undefined)
            itemDistributed.value[j] = 0;
          if (itemToDistribute[j] > 0 && boxArray[i].length < boxCapacityOf4) {
            boxArray[i].push(j);
            itemDistributed.value[j]++;
            itemToDistribute[j]--;
          }
        }
      }
      // if (boxArray[i].length >= boxCapacityOf4) {
      //   boxArray[i].sort();
      // }
    }
  }while(itemToDistribute.reduce((itemQuantities, val) => itemQuantities + val) > 0)

  return boxArray;
}

// 根據箱子中的商品索引，返回商品的名稱
// const getBoxItemsNames = (box: number[]) => box.map((itemIndex) => itemNames.value[itemIndex]['code']);
const getItemNames = (itemIndex: number) => itemNames.value[itemIndex]['code'];

const getItemShortForm = (itemIndex: number) => itemNames.value[itemIndex]['shortForm'];

</script>


<style scoped lang="scss">

</style>