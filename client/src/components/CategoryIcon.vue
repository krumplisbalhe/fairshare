<template>
  <div class="categoryIconContainer">
    <Trash v-if="category === 'trash'" />
    <Outside v-if="category === 'outside'" />
    <Floor v-if="category === 'floor'" />
    <Dishes v-if="category === 'dishes'" />
    <Bathroom v-if="category === 'bathroom'" />
    <Livingroom v-if="category === 'livingroom'" />
    <Kitchen v-if="category === 'kitchen'" />
    <Bedroom v-if="category === 'bedroom'" />
    <Laundry v-if="category === 'laundry'" />
    <Cleaning v-if="category === 'cleaning'" />
    <Other v-if="category === 'other'" />
  </div>
</template>

<script>
import Outside from '@/assets/icons/outside.svg'
import Trash from '@/assets/icons/trash.svg'
import Floor from '@/assets/icons/floor.svg'
import Dishes from '@/assets/icons/dishes.svg'
import Bathroom from '@/assets/icons/bathroom.svg'
import Livingroom from '@/assets/icons/livingroom.svg'
import Kitchen from '@/assets/icons/kitchen.svg'
import Bedroom from '@/assets/icons/bedroom.svg'
import Laundry from '@/assets/icons/laundry.svg'
import Cleaning from '@/assets/icons/cleaning.svg'
import Other from '@/assets/icons/other.svg'

export default {
  name: 'CategoryIcon',
  props: ['category'],
  components: {
    Outside,
    Trash,
    Floor,
    Dishes,
    Livingroom,
    Bathroom,
    Kitchen,
    Bedroom,
    Laundry,
    Cleaning,
    Other
  },
}
</script>

<style lang="scss" scoped>
.categoryIcon {
  width: 40px;
  height: 40px;

  path {
    fill: var(--inputTextColor);
    stroke: var(--inputTextColor);
  }

    > * {
      stroke-width: 0.5px;
    }
}
</style>
