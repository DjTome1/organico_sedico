<script setup>
  import { onMounted , ref } from 'vue'
  import user from './user.vue';
  import axios from 'axios';

  let is_users_loaded=ref(false);
  let user_list=ref([])


  onMounted(() => {
    console.log("Mounted!")
    get_users()
  })


  async function get_users(){
    try {
      let res = await axios.get('http://elcluxwavfep01.luxgroup.net/APP_SEF/organico/Sedico/API/get.php?get_user_list=1');
      user_list.value = Array.isArray(res.data) ? res.data : []

      console.log("Dati ricevuti:", user_list.value)

      is_users_loaded.value = true
    } catch (error) {
      is_users_loaded.value = true
    }
  }


</script>

<template>
  <div class="card bg-base-100 col-span-2 md:col-span-1 row-span-5 m-1 shadow-sm">
    <div class="card-body p-3 overflow-hidden">
      <h1 class="w-full text-center font-bold text-lg my-1">Filtri</h1>

      <div class="card grid grid-cols-2 grid-rows-3 gap-0.5 ">
        <label class="input input-sm col-span-2 w-full">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="search" class="grow" placeholder="Cerca Qui" />
        </label>

        <fieldset class="fieldset">          
          <select class="select select-sm" id="filtro_pl">
            <option disabled selected>Seleziona Un Plant</option>
            <option value="pl">pl</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <select class="select select-sm" id="filtro_ar">
            <option disabled selected>Seleziona Un Area</option>
            <option value="ar">ar</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <select class="select select-sm" id="filtro_mo">
            <option disabled selected>Seleziona Un Modello Orario</option>
            <option value="ar">ar</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <select class="select select-sm" id="filtro_tu">
            <option disabled selected>Seleziona Un Turno</option>
            <option value="ar">ar</option>
          </select>
        </fieldset>
      </div>

      <div class="divider">Lista Operatori</div>

      <div class="card w-full h-full">
        <div class="card-body overflow-y-auto overflow-x-hidden rounded-box p-0" v-if="is_users_loaded">
          <user v-for="usr in user_list" :dati_op="usr"></user>
        </div>

        <div class="card-body overflow-y-auto overflow-x-hidden rounded-box p-0 flex items-center" v-if="!is_users_loaded">
          <span class="loading loading-bars loading-xl"></span>
          <p>Caricamento Operatori In Corso</p>
        </div>
      </div>
    </div>
  </div>
</template>

