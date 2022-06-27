app.component('module-audio', {
    props: {
        audio: String,
        class: String,
        autoplay: Boolean,
        loop: Boolean,
        volume: Number,
        visible: Boolean
    },
    setup (props, context){
        const ODA = inject('ODA')
        const instance = getCurrentInstance();
        const item = ref()
        const itemClass = props.class || ''

        
        const audio = ref()
  
        const playing = computed( () => {
            if(audio.value){
                return audio.value.playing()
            } else {
                return false
            }
            return
        })

        
        const play = ()  => {
            if(playing.value){
                audio.value.stop()
                return false
            }

            audio.value.play()
            
        }
        
        
        onMounted(()=>{
            ODA.modules.audiotext.push(item.value)
            audio.value = new Howl({ 
                src: [ props.audio ],
                format: ['mp3'],
                loop: props.loop == undefined ? false : props.loop,
                volume: props.volume == undefined ? false : props.volume,
                onplay: function () {
                },
                onend: function () {
                    completed()
                },
                onstop: function () {
                    completed()
                },
                onload: function () {
                    let autoplay = props.autoplay==undefined ? true : props.autoplay
                    if(autoplay){
                        play()
                    } else {
                    }
                }
            })
        })

        
        const completed = () => {
            if(instance.parent.ctx.eventCompleted){
                instance.parent.ctx.eventCompleted()
            }
        }

        return {
            item,
            itemClass,
            play,
            playing
        }
    },
    template: `
    <div :class="[
        'moduleAudio text-center',
        itemClass
    ]" ref="item">
        <button v-if="visible" @click="play()" :class="[
            'mx-auto rounded-full aspect-square w-8 shrink-0  flex justify-center items-center ',
            playing?'bg-main':'bg-gray-100'
        ]">
            <div v-show="playing"><span  class="iconify aspect-square animate__animated animate__wobble text-[16px]" data-icon="fxemoji:speaker3soundwaves"></span></div>
            <div v-show="!playing"><span class="iconify aspect-square animate__animated animate__pulse animate__infinite text-[16px]" data-icon="fxemoji:speakeronesoundwave"></span></div>
        </button>
    </div>
    `
})