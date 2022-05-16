app.component('oda-finalizar', {
    props: {
    },
    setup (props, context){
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const finalize = () => {
            s_win.play()
            finalized.value = true
            emitter.emit('finalize')
        }
        const reset = () =>{
            location.reload() 
        }
        return{ 
            finalize,
            finalized,
            RESULTS,
            reset
         }
    },
    template: `
        <div class="my-5 text-center">
            <template v-if="!finalized">
                <button class="
                    font-extrabold
                    px-12 py-6
                    bg-clear
                    text-sec
                    text-3xl
                    rounded-2xl
                " @click="finalize" >Finalizar</button>
            </template>
            <template v-else>
                <div class="text-center animate__animated animate__backInDown">
                    <div class="font-extrabold text-4xl text-main">RESULTADOS</div>
                    <div class="font-bold text-4xl text-isok mt-5">{{RESULTS.oks}} correctas</div>
                    <div class="text-lg mt-3"> de {{RESULTS.oks+RESULTS.errors}} preguntas</div>
                    <button class="mt-5 font-extrabold px-8 py-4 bg-clear text-white text-xl rounded-2xl " @click="reset" >Volver a intentar</button>
                </div>
            </template>
        </div>
        `
})