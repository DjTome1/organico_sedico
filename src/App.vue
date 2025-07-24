<script setup>

  import { onMounted, ref } from 'vue'
  import left_panel from './components/left_panel.vue';
  import right_panel from './components/right_panel.vue';
  
  const rightPanelRef = ref(null)

  function handleSelectUser(perid) {
    console.log('Hai selezionato perid:', perid)
    rightPanelRef.value?.get_op_data(perid)
  }

</script>
 
<template>
  <left_panel @select_user="handleSelectUser"></left_panel>
  <right_panel ref="rightPanelRef"></right_panel>
</template>

