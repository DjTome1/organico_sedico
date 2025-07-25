<script setup>
    import { ref } from 'vue'


    defineProps({
        user_name:String,
        is_logged:Boolean,
    })


    function send_to_page(item){ router.push('/' + item);} 


</script>


<template>

   <div class="navbar bg-base-100 shadow-sm z-9999 w-full mb-0 h-50px col-span-5 h-[50px]">
        <div class="navbar-start block"><img src="/logo_EL.png" class='lux_logo h-5 pl-2 ' style="mix-blend-mode: difference;"> </div>

        <div class="navbar-center" >
        </div>  

        <div class="navbar-end flex justify-end items-center">

            <div class="dropdown dropdown-end ">
                <div tabindex="0" role="button" class="btn btn-neutral m-1 shadow-none" aria-label="theme selector">
                    Theme Selector
                </div>
                <ul tabindex="0" class="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
                    <li>Chiari</li>
                    <li><input type="radio" name="theme-dropdown" class="theme-controller w-full btn btn-sm btn-ghost justify-start" aria-label="light" value="light" /></li>
                    <li><input type="radio" name="theme-dropdown" class="theme-controller w-full btn btn-sm btn-ghost justify-start" aria-label="bumblebee" value="bumblebee" /></li>
                    <li><input type="radio" name="theme-dropdown" class="theme-controller w-full btn btn-sm btn-ghost justify-start" aria-label="emerald" value="emerald" /></li>
                    <li><input type="radio" name="theme-dropdown" class="theme-controller w-full btn btn-sm btn-ghost justify-start" aria-label="pastel" value="pastel" /></li>
                    <li><input type="radio" name="theme-dropdown" class="theme-controller w-full btn btn-sm btn-ghost justify-start" aria-label="winter" value="winter" /></li>
                    <li>Scuri</li>
                    <li><input type="radio" name="theme-dropdown" class="theme-controller w-full btn btn-sm btn-ghost justify-start" aria-label="sunset" value="sunset" /></li>
                    <li><input type="radio" name="theme-dropdown" class="theme-controller w-full btn btn-sm btn-ghost justify-start" aria-label="dracula" value="dracula" /></li>
                    <li><input type="radio" name="theme-dropdown" class="theme-controller w-full btn btn-sm btn-ghost justify-start" aria-label="business" value="business" /></li>
                    <li><input type="radio" name="theme-dropdown" class="theme-controller w-full btn btn-sm btn-ghost justify-start" aria-label="forest" value="forest" /></li>
                </ul>
            </div>

        </div>
    </div>
    

</template>


    