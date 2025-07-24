<script setup>
    import { ref, onMounted } from 'vue';

    const props = defineProps(['dati_op'])

</script>

<template>
    <div class="card bg-base-100  w-full h-[120px] min-h-[120px] max-h-[120px] overflow-hidden border border-base-300 cursor-pointer user_card"
        turno="{{props.dati_op.turno}}"
        pti="{{props.dati_op.PTI}}"
        t4y="{{props.dati_op.T4Y}}"
        mod_orario="{{props.dati_op.nome_turno}}"
        plant="{{props.dati_op.plant}}"
        area="{{props.dati_op.area}}"
        reparto="{{props.dati_op.reparto}}"
        perid="{{props.dati_op.perid}}"
        @click="$emit('select_user', props.dati_op.perid)"
    >
        <div class="card-body p-2 flex flex-col">
            <div class="flex flex-row w-full h-3/4">
                <div class="w-[50px] me-1 h-full bg-base-300 rounded-box flex justify-center items-center col-span-1">
                    <p class="text-primary font-bold w-full text-center">{{props.dati_op.nome.split(' ')[0][0]}}.{{props.dati_op.nome.split(' ')[1][0]}}</p>
                </div>

                <div class="cont_dati w-full h-full flex flex-col col-span-4">
                    <p class="text-primary font-bold">{{props.dati_op.nome}}</p>
                    <p class="text-info">{{props.dati_op.plant}}</p>
                    <p class="text-info">{{props.dati_op.reparto}}</p>
                </div>
                             
            </div>

            <div class="cont_badges felx flex-col w-full col-span-5 h-[25px]">

                <div class="badge badge-error me-1" v-if="props.dati_op.turno=='Manca'">#{{props.dati_op.turno}} Turno</div>
                <div class="badge badge-soft badge-info me-1" v-if="props.dati_op.turno=='Notte'">#{{props.dati_op.turno}}</div>
                <div class="badge badge-soft badge-primary me-1" v-if="props.dati_op.turno=='Turno'">#{{props.dati_op.turno}}</div>
                <div class="badge badge-soft badge-accent me-1" v-if="props.dati_op.turno=='Fisso'">#{{props.dati_op.turno}} / Giornata</div>

                <div class="badge badge-soft badge-secondary me-1" v-if="props.dati_op.PTI==1">#PTI</div>
                <div class="badge badge-soft badge-secondary me-1" v-if="props.dati_op.T4Y==1">#T4Y</div>
                <div class="badge badge-warning me-1" v-if="props.dati_op.stato_utente=='Cancellato'">#Cancellato</div>
            </div>
        </div>
    </div>
</template>