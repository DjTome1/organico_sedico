<script setup>
    import { ref,onMounted } from 'vue';
    import axios from 'axios';

    let skill_matrix = ref({});
    let is_skill_matrix_loaded = ref(false);

    let op_id = ref('');
    let op_data = ref([]);

    onMounted(() => {
        get_skill_matrix() ;
    });

    async function get_skill_matrix() {
        try {
            let res = await axios.get('http://elcluxwavfep01.luxgroup.net/APP_SEF/organico/Sedico/API/get.php?get_skill_list=1');
            skill_matrix.value = res.data
            is_skill_matrix_loaded.value = true;

            console.log("Skill Matrix Data:", skill_matrix.value);
        } catch (error) {
            console.error("Error fetching skill matrix:", error);
            is_skill_matrix_loaded.value = true;
        }
    }


</script>

<template>
    <div class="tabs tabs-box bg-base-100 col-span-3 md:col-span-4 row-span-5 m-1 shadow-sm">
        <!-- -------------------[op data]-------------------- -->
        <label class="tab">
            <input type="radio" name="my_tabs_1" class="tab" aria-label="Dati Anagrafici Operatore" checked/>
            <i class="fa-solid fa-id-card text-neutral me-1"></i> Dati Anagrafici Operatore
        </label>

        <div class="tab-content bg-base-100 border-base-300 p-6 ">
            <h1 class="font-bold text-xl mb-5">Stai Modificando I Dati Dell'Operatore <b class="text-primary">{{555}}</b> - <b class="text-secondary">{{123}}</b></h1>

            <div class="collapse collapse-plus bg-base-100 border border-base-300 mb-1" >
                <input type="radio" name="my-accordion-1"/>
                <div class="collapse-title font-semibold"><i class="fa-solid fa-id-card text-accent me-1"></i> Dati Anagrafici Operatore</div>
                <div class="collapse-content text-sm">
                    <div class="overflow-x-auto">
                    </div>
                </div>
             </div>

            <div class="collapse collapse-plus bg-base-100 border border-base-300 mb-1">
                <input type="radio" name="my-accordion-1" checked="checked"/>
                <div class="collapse-title font-semibold"><i class="fa-solid fa-business-time text-accent me-1"></i> Gestione Moduli Orario</div>
                <div class="collapse-content text-sm">
                    <div class="overflow-x-auto grid grid-cols-3 gap-2">
                        <label class="select my-1 w-full" id="prest"> 
                            <span class="label"><i class="fa-solid fa-user-tag"></i> Prestazione</span>
                            <select id="prestazione">
                                <option>Personal</option>
                                <option>Business</option>
                            </select>
                        </label>

                        <label class="select my-1 w-full" id="mod_orario">
                            <span class="label"><i class="fa-solid fa-user-clock"></i> Modello Orario</span>
                            <select>
                                <option>Personal</option>
                                <option>Business</option>
                            </select>
                        </label>
                    

                        <label class="select my-1 w-full" id="turno">
                            <span class="label"><i class="fa-solid fa-people-line"></i> Turno</span>
                            <select>
                                <option>Personal</option>
                                <option>Business</option>
                            </select>
                        </label>

                        <div class="div col-span-2"></div>
                        <button class="btn btn-sm btn-soft w-1/3">Salva Dati</button>
                    </div>
                </div>
            </div>

            <div class="collapse collapse-plus bg-base-100 border border-base-300 mb-1">
                <input type="radio" name="my-accordion-1" />
                <div class="collapse-title font-semibold"><i class="fa-solid fa-handshake-angle text-accent  me-1"></i> Gestione Prestiti</div>
                <div class="collapse-content text-sm">
                    <div class="overflow-x-auto">
                    </div>
                </div>
            </div>
        </div>


        <!-- -------------------[skill matrix]-------------------- -->
         <label class="tab">
            <input type="radio" name="my_tabs_1" class="tab" aria-label="Gestione Skill Matrix" />
            <i class="fa-solid fa-table-cells text-neutral  me-1"></i> Gestione Skill Matrix
        </label>

        <div class="tab-content bg-base-100 border-base-300 p-6">
            <h1 class="font-bold text-xl mb-5">Stai Modificando I Dati Dell'Operatore <b class="text-primary">{{555}}</b> - <b class="text-secondary">{{123}}</b></h1>
            <div class="collapse collapse-plus bg-base-100 border border-base-300 mb-1" v-for="(skill, index) in skill_matrix" :key="index">
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
                                    <td v-for="i in 10">
                                        <select class="select select-sm" :id="`sk${i}_${index}`">
                                            <option disabled selected>Seleziona Una Skill</option>
                                            <option v-for="sk in skill.skill_list" :value="`${sk.idx}`">{{sk.nome}}</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>