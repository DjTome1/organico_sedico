<script setup>
  import { onMounted , ref } from 'vue'
  import user from './user.vue';
  import axios from 'axios';

  let is_users_loaded=ref(false);
  let user_list=ref([])
  let filter_list=ref({})

  let filtro_tx = ref('');
  let filtro_pl = ref('');
  let filtro_ar = ref('');
  let filtro_mo = ref('');
  let filtro_tu = ref('');

  onMounted(() => {
    get_users()
    get_filtri()
  })


  async function get_users(){
    try {
      let res = await axios.get('http://elcluxwavfep01.luxgroup.net/APP_SEF/organico/Sedico/API/get.php?get_user_list=1');
      user_list.value = Array.isArray(res.data) ? res.data : []
      is_users_loaded.value = true
    } catch (error) {
      is_users_loaded.value = true
    }
  }

  async function get_filtri(){
    try {
      let res = await axios.get('http://elcluxwavfep01.luxgroup.net/APP_SEF/organico/Sedico/API/get.php?get_filtri=1');
      filter_list.value = res.data
      console.log("Dati ricevuti:", filter_list.value)

    } catch (error) {
    }
  }

  //qua prendo il click in user e mando il get data in right_panel
  const emit = defineEmits(['select_user'])
  
  function handleSelectUser(perid) {
    emit('select_user', perid) // Riemetti verso App.vue

    let user_cards = document.querySelectorAll('.user_card');
    user_cards.forEach(card => {
      if(card.getAttribute('perid') === String(perid)) {
        console.log("Card selezionata:", card);
        card.classList.add('bg-base-200');
      } else {
        card.classList.remove('bg-base-200');
      }
    });
  }

  function filter_ops(){
    console.log("Filtri applicati:", filtro_tx.value, filtro_pl.value, filtro_ar.value, filtro_mo.value, filtro_tu.value);
    // Implementa la logica di filtraggio qui


    let cont_user_cards = document.querySelector('.cont_user_cards');
    let user_cards = document.querySelectorAll('.user_card');
    let plant_val=filtro_pl.value.toLowerCase();
    let area_val=filtro_ar.value.toLowerCase();
    let prestazione_val=filtro_tu.value.toLowerCase();
    let mod_orario_val=filtro_mo.value.toLowerCase();
    let search_val=filtro_tx.value.toLowerCase();

    cont_user_cards.style.display = 'none'; 

    user_cards.forEach(card => {
      let plant = card.getAttribute('plant').toLowerCase();
      let area = card.getAttribute('area').toLowerCase();
      let prestazione = card.getAttribute('prestazione').toLowerCase();
      let mod_orario = card.getAttribute('mod_orario').toLowerCase();
      let nome = card.querySelector('.text-primary').textContent.toLowerCase();

      if (
          (plant.includes(plant_val) || plant_val === '') &&
          (area.includes(area_val) || area_val === '') &&
          (prestazione.includes(prestazione_val) || prestazione_val === '') &&  
          (mod_orario.includes(mod_orario_val) || mod_orario_val === '') &&
          (card.textContent.toLowerCase().includes(search_val) || search_val === '')
        ) {
        card.style.display = '';
      } else {                                                                                                                                                                                                                                                                                                                                                                                            
        card.style.display = 'none';
      }
    })

    cont_user_cards.style.display = ''; 
  }
</script>

<template>
  <div class="card bg-base-100 col-span-2 lg:col-span-1 row-span-5 m-1 shadow-sm">
    <div class="card-body p-3 overflow-hidden">
      <h1 class="w-full text-center font-bold text-lg my-1">Filtri</h1>

      <div class="card grid grid-cols-2 grid-rows-3 gap-0.5 ">
        <label class="input input-sm col-span-2 w-full">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="search" class="grow" placeholder="Cerca Qui" @change="filter_ops()" v-model="filtro_tx"/>
        </label>

        <fieldset class="fieldset">          
          <select class="select select-sm" id="filtro_pl" @change="filter_ops()" v-model="filtro_pl">
            <option value="">Seleziona Un Plant</option>
            <option v-for="plant in filter_list.lista_plant" :value="`${plant}`">{{plant}}</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <select class="select select-sm" id="filtro_ar" @change="filter_ops()" v-model="filtro_ar">
            <option value="">Seleziona Un Area</option>
            <option v-for="area in filter_list.lista_area" :value="`${area}`">{{area}}</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <select class="select select-sm" id="filtro_mo" @change="filter_ops()" v-model="filtro_mo">
            <option value="">Seleziona Un Modello Orario</option>
            <option v-for="mod_orario in filter_list.lista_mod_orari" :value="`${mod_orario}`">{{mod_orario}}</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <select class="select select-sm" id="filtro_tu" @change="filter_ops()" v-model="filtro_tu">
            <option value="">Seleziona Una Prestazione</option>
            <option v-for="prestazione in filter_list.prestazioni" :value="`${prestazione}`">{{prestazione}}</option>
          </select>
        </fieldset>
      </div>

      <div class="divider">Lista Operatori</div>

      <div class="card w-full h-full">
        <div class="card-body overflow-y-auto overflow-x-hidden rounded-box p-0 cont_user_cards" v-if="is_users_loaded">
          <user v-for="usr in user_list" :dati_op="usr" @select_user="handleSelectUser"></user>
        </div>

        <div class="card-body overflow-y-auto overflow-x-hidden rounded-box p-0 flex items-center" v-if="!is_users_loaded">
          <span class="loading loading-bars loading-xl"></span>
          <p>Caricamento Operatori In Corso</p>
        </div>
      </div>
    </div>
  </div>
</template>

