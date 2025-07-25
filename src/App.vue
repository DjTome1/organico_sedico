<script setup>

  import { onMounted, ref } from 'vue'
  import left_panel from './components/left_panel.vue';
  import right_panel from './components/right_panel.vue';
  import navbar from './components/navbar.vue';
  
  const rightPanelRef = ref(null)

  function handleSelectUser(perid) {
    console.log('Hai selezionato perid:', perid)
    rightPanelRef.value?.get_op_data(perid)
  }

</script>
 
<template>
  <navbar user_name="User" is_logged="true"></navbar>
  <div class="w-full h-dvh overflow-hidden grid grid-cols-5 grid-rows-5 gap-1">
    <left_panel @select_user="handleSelectUser"></left_panel>
    <right_panel ref="rightPanelRef"></right_panel>
   </div>
</template>

