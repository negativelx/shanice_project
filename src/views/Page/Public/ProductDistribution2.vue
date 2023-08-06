<template>
  <div>
    <button @click="distributeItems">平均分配</button>
    <p>結果: {{ result }}</p>
    <p>餘: {{ remainder }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref<number[]>([4, 4, 4, 5, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0]);
let result: number[][] = [];
let remainder: number | string = '';

function distributeItems() {
  result = [];
  remainder = '';

  // 分配盒子的容量
  const capacities = [4, 2];
  const boxCount = capacities.length;
  const boxes: number[][] = Array.from({ length: boxCount }, () => []);

  // 開始遞迴分配
  if (distribute(0)) {
    // 將結果中的索引轉換為實際的物品數量
    result = result.map((boxIndexes) => boxIndexes.map((idx) => items.value[idx]));
  } else {
    remainder = '無法平均分配';
  }

  function distribute(itemIdx: number): boolean {
    if (itemIdx === items.value.length) {
      // 當所有物品都被分配完畢，檢查盒子容量是否平均分配
      for (const box of boxes) {
        const total = box.reduce((acc, curr) => acc + items.value[curr], 0);
        if (total !== capacities[0]) {
          return false;
        }
      }
      // 若盒子容量平均分配，則將盒子的索引存入結果中
      result.push(boxes.map((box) => box.slice()));
      return true;
    }

    // 遞迴分配物品到不同的盒子
    for (let i = 0; i < boxCount; i++) {
      const box = boxes[i];
      const capacity = capacities[i];

      if (box.length === 0 || box.reduce((acc, curr) => acc + items.value[curr], 0) + items.value[itemIdx] <= capacity) {
        box.push(itemIdx);
        if (distribute(itemIdx + 1)) {
          return true;
        }
        box.pop();
      }
    }

    return false;
  }
}
</script>
