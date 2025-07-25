<script setup>
    import { ref,onMounted } from 'vue';
    import axios from 'axios';

    const cognome_nome = ref('')
    const perid = ref(null)
    const cid = ref(null)
    const reparto = ref('')
    const prestazione = ref('')
    const modello_orario = ref('')
    const turno = ref('')

    const html_skill_matrix = ref([])
    //--------------------------------------------
    let skill_matrix = ref({});
    let is_skill_matrix_loaded = ref(false);

    let strutt_data = ref([]);
    let turno_filter = ref([]);
    let is_strutt_data_loaded = ref(false);

    let op_id = ref('');
    let op_data = ref([]);

    onMounted(() => {
        get_skill_matrix();
        get_strutt_data();
    });

    async function get_skill_matrix() {
        try {
            let res = await axios.get('http://elcluxwavfep01.luxgroup.net/APP_SEF/organico/Sedico/API/get.php?get_skill_list=1');
            skill_matrix.value = res.data
            is_skill_matrix_loaded.value = true;

            Object.keys(skill_matrix.value).forEach((key, index) => {
                if (!html_skill_matrix.value[key]) {
                    html_skill_matrix.value[key] = Array(10).fill('');
                }
            });

            console.log("Skill", html_skill_matrix);
        } catch (error) {
            console.error("Error fetching skill matrix:", error);
            is_skill_matrix_loaded.value = true;
        }
    }

    async function get_strutt_data() {
        try {
            let res = await axios.get('http://elcluxwavfep01.luxgroup.net/APP_SEF/organico/Sedico/API/get.php?get_sructure_data=1');
            strutt_data.value = res.data
            is_strutt_data_loaded.value = true;

        } catch (error) {
            console.error("Error fetching Strutt:", error);
            is_strutt_data_loaded.value = true;
        }
    }

    async function get_op_data(per_id) {
        fill_html_skill_matrix()

        try {
            let res = await axios.get(`http://elcluxwavfep01.luxgroup.net/APP_SEF/organico/Sedico/API/get.php?get_op_data=${per_id}`);
            op_data.value = res.data;
            op_id.value = perid;

            console.log("Dati Operatore:", op_data.value);

            cognome_nome.value=op_data.value.dati_op.cognome_nome ?? '';
            perid.value = String(op_data.value.dati_op.perid ?? '')
            cid.value = String(op_data.value.dati_op.cid ?? '')
            reparto.value=op_data.value.dati_op.reparto ?? '';
            prestazione.value=op_data.value.dati_op.prestazione ?? '';
            turno.value=op_data.value.dati_op.turno_layout ?? '';
            modello_orario.value=op_data.value.dati_op.nome_turno ?? '';

            op_data.value.skill_matrix.forEach((matrix) => {

                let index=matrix.db_name.trim()

                for(let i=1; i<=10; i++){
                    let array_index = i-1;
                    let sk_index = `SK${i+1}`;

                    if(matrix[sk_index]!='' && matrix[sk_index]!=null){

                        if (!html_skill_matrix.value[index]) {
                            html_skill_matrix.value[index] = Array(10).fill('');
                        }
                        html_skill_matrix.value[index][array_index] = matrix[sk_index]
                    }

                }
                
            });

        } catch (error) {
            console.error("Error fetching operator data:", error);
        }
    }

    function fill_html_skill_matrix(){
        Object.keys(skill_matrix.value).forEach((key, index) => {
            html_skill_matrix.value[key] = Array(10).fill('');
        });
    }

    //esporto la funzione get_op_data per poterla richiamare da altri componenti
    defineExpose({
        get_op_data
    });

    function save_data_mod_orari(){
        console.log("Salvataggio Dati Mod Orari:", perid.value, prestazione.value, modello_orario.value, turno.value);
    }

    function save_skill_matrix() {
        console.log("Salvataggio Skill Matrix:", perid.value, html_skill_matrix.value);
        // Implementa la logica di salvataggio qui
    }

    function save_dati_anagrafici() {
        console.log("Salvataggio Dati Anagrafici:", cognome_nome.value, perid.value, cid.value, reparto.value);
        // Implementa la logica di salvataggio qui
    }



</script>

<template>
    <div class="tabs tabs-box bg-base-100 col-span-3 lg:col-span-4 row-span-5 m-1 shadow-sm">
    <!-- -------------------[op data]-------------------- -->
        <label class="tab">
            <input type="radio" name="my_tabs_1" class="tab" aria-label="Dati Anagrafici Operatore" checked/>
            <i class="fa-solid fa-id-card text-neutral me-1"></i> Dati Anagrafici Operatore
        </label>

        <div class="tab-content bg-base-100 border-base-300 p-6 " v-if="is_strutt_data_loaded">
            <h1 class="font-bold text-xl mb-5">Stai Modificando I Dati Dell'Operatore <b class="text-primary">{{op_data.cognome_nome}}</b> - <b class="text-secondary">{{op_data.perid}}</b></h1>

            <div class="collapse collapse-plus collapse-open bg-base-100 border border-base-300 mb-1" >
                <input type="radio" name="my-accordion-1" checked/>
                <div class="collapse-title font-semibold"><i class="fa-solid fa-id-card text-accent me-1"></i> Dati Anagrafici Operatore</div>
                <div class="collapse-content text-sm">

                    <div class="overflow-x-auto grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-2 p-1">
                        <label class="input my-1 w-full" id="prest"> 
                            <span class="label"><i class="fa-solid fa-user"></i> Cognome Nome</span> 
                            <input type="text" class="" placeholder="Cognome Nome" v-model="cognome_nome" required />
                        </label>

                        <label class="input my-1 w-full" id="perid"> 
                            <span class="label"><i class="fa-solid fa-id-card-clip"></i> Perid</span>
                            <input type="tel" minlength="8" maxlength="8" pattern="15[0-9]*" class="input validator" placeholder="15XXXXXX" v-model="perid" required />
                        </label>

                        <label class="input my-1 w-full"> 
                            <span class="label"><i class="fa-solid fa-id-badge"></i> CID</span>
                            <input type="tel" minlength="8" maxlength="8" pattern="15[0-9]*" class="input validator" placeholder="15XXXXXX" v-model="cid" required />
                        </label>

                        <label class="select my-1 w-full" id="prest"> 
                            <span class="label"><i class="fa-solid fa-location-dot"></i> Reparto</span>
                            <select id="reparto" v-model="reparto">
                                <option disabled selected>Seleziona Un Reparto</option>
                                <option v-for="aree in strutt_data.aree" :value="`${aree.dettaglio}`">{{aree.dettaglio}}</option>
                            </select>
                            
                        </label>
                        <div class="div hidden md:col-span-1 xl:col-span-3  md:block"></div>
                        <button class="btn btn-sm btn-soft w-1/3 ms-auto" @click="save_dati_anagrafici()">Salva Dati</button>
                    </div>

                </div>
             </div>

            <div class="collapse collapse-plus collapse-open bg-base-100 border border-base-300 mb-1 ">
                <input type="radio" name="my-accordion-1"/>
                <div class="collapse-title font-semibold"><i class="fa-solid fa-business-time text-accent me-1"></i> Gestione Moduli Orario</div>
                <div class="collapse-content text-sm">
                    <div class="overflow-x-auto grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-2 p-1" >
                        <label class="select my-1 w-full" id="prest"> 
                            <span class="label"><i class="fa-solid fa-user-tag"></i> Prestazione</span>
                            <select id="prestazione" v-model="prestazione">
                                <option disabled selected>Seleziona Una Prestazione</option>
                                <option v-for="prest in strutt_data.mod_orari" :value="`${prest.prestazione}`">{{prest.prestazione}}</option>
                            </select>
                        </label>

                        <label class="select my-1 w-full" id="mod_orario">
                            <span class="label"><i class="fa-solid fa-user-clock"></i> Modello Orario</span>
                            <select id="modello_orario" v-model="modello_orario">
                                <option disabled selected>Seleziona Un Modello Orario</option>
                                <option v-for="mod_orario in strutt_data.turni" :value="`${mod_orario.Nome_Turno}`">{{mod_orario.Nome_Turno}}</option>
                            </select>
                        </label>
                    

                        <label class="select my-1 w-full" id="turno">
                            <span class="label"><i class="fa-solid fa-people-line"></i> Turno</span>
                            <select id="turno" v-model="turno">
                                <option disabled selected>Seleziona Un Turno</option>
                                <option v-for="turno in strutt_data.turno_filter" :value="`${mod_orario.Nome_Turno}`">{{mod_orario.Nome_Turno}}</option>
                            </select>
                        </label>

                        <div class="div hidden md:col-span-1 xl:col-span-2  md:block"></div>
                        <button class="btn btn-sm btn-soft w-1/3 ms-auto" @click="save_data_mod_orari()">Salva Dati</button>
                    </div>
                </div>
            </div>

            <div class="collapse collapse-plus collapse-open bg-base-100 border border-base-300 mb-1">
                <input type="radio" name="my-accordion-1" />
                <div class="collapse-title font-semibold"><i class="fa-solid fa-handshake-angle text-accent  me-1"></i> Gestione Prestiti</div>
                <div class="collapse-content text-sm">
                    <div class="overflow-x-auto grid grid-cols-3 gap-2 p-1">
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-content bg-base-100 border-base-300 p-6" v-if="!is_strutt_data_loaded">
            <span class="loading loading-bars loading-xl"></span>
            <p>Caricamento Dati In Corso</p>
        </div>


    <!-- -------------------[skill matrix]-------------------- -->
        <label class="tab mb-1">
            <input type="radio" name="my_tabs_1" class="tab" aria-label="Gestione Skill Matrix"/>
            <i class="fa-solid fa-table-cells text-neutral  me-1"></i> Gestione Skill Matrix
        </label>

        <div class="tab-content bg-base-100 border-base-300 p-6">
            <h1 class="font-bold text-xl mb-5">Stai Modificando I Dati Dell'Operatore <b class="text-primary">{{op_data.cognome_nome}}</b> - <b class="text-secondary">{{op_data.perid}}</b></h1>

            <div class="collapse collapse-plus collapse-open bg-base-100 border border-base-300 mb-1" v-for="(skill, index) in skill_matrix" :key="index">
                <input type="radio" name="my-accordion"/>
                <div class="collapse-title font-semibold"><i class="fa-solid fa-tags text-accent"></i> Skill Matrix {{skill.nome_clean}}</div>
                <div class="collapse-content text-sm">
                    <div class="overflow-x-auto">
                        <table class="table">
                            <!-- head -->
                            <thead>
                                <tr>
                                    <th v-for="i in 10" class="text-center">SK{{i}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr>
                                    <td v-for="i in 10" class="p-1">
                                        <select class="select select-sm" :id="`sk${i}_${index}`" v-model="html_skill_matrix[index][i - 1]">
                                            <option value="">Seleziona Una Skill</option>
                                            <option v-for="sk in skill.skill_list" :value="`${sk.idx}`">{{sk.nome}}</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="flex justify-end absolute bottom-6 right-6 w-full">
                <button class="btn btn-sm btn-soft w-1/5 ms-auto" @click="save_skill_matrix()">Salva Skill Matrix</button>
            </div>
        </div>

    </div>
</template>