app.component('oda-instruccion', {
    props: {
        text: String
    },
    setup (props, context){
        const ODA = inject('ODA')
        const item = ref()
        const itemCount = ref(0)

        const withsound = ref(false)
        const platformdata = document.body.getAttribute('data')
        const instructionaudio = ref()


        if(platformdata.includes('ASOMATE')){
            withsound.value = true
        }

        const playing = computed( () => {
            if(instructionaudio.value){
                return instructionaudio.value.playing()
            } else {
                return false
            }
            return
        })
        const play = () => {
            if(playing.value){
                instructionaudio.value.stop()
            } else {
                instructionaudio.value.play()
            }
        }
        
        onMounted(()=>{
            itemCount.value = ODA.modules.instructions.length
            ODA.modules.instructions.push(item.value)
            const audiofilename = 'i'+(itemCount.value+1)+'.mp3'
            console.log(audiofilename)
            instructionaudio.value = new Howl({ src: [ audiofilename ] });
        })

        return{
            withsound,
            instructionaudio,
            playing,
            play,
            item
        }

    },
    template: `
        <div class="text-sec text-2xl my-20 flex items-center instructions" ref="item">
            <template v-if="!withsound">
                <span class="iconify w-18" data-icon="fxemoji:blackdiamondsuit"></span>
            </template>
            <template v-else>
                <button @click="play()" :class="[
                    'rounded-full aspect-square w-12 shrink-0  flex justify-center items-center mr-2 text-md',
                    playing?'bg-main':'bg-gray-100'
                ]">

                    <div v-show="playing"><span  class="iconify aspect-square animate__animated animate__wobble" data-icon="fxemoji:speaker3soundwaves"></span></div>
                    <div v-show="!playing"><span class="iconify aspect-square animate__animated animate__pulse animate__infinite" data-icon="fxemoji:speakeronesoundwave"></span></div>

                </button>
            </template>

            <span v-textfn><slot></slot></span>
        </div>
        `
})