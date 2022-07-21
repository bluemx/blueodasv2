app.component('av-scene', {
    props: {
       class: String,
       automaticScene: [String, Boolean],
       endAudio: [String, Boolean],
       forceOks: [Number, Boolean]
    },
    setup (props, context){
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')

        

        const item = ref()
        const itemClass = props.class || ''
        const thisScene = ref(0)
        const ready = ref(false)

        const endAudioSound = ref()


        const loadingNextScene = ref(false)
        



        watch(
            ()=>RESULTS.oks,
            ()=>{
                console.log('oks', RESULTS.oks, 'okstotal', RESULTS.okstotal)
                if(loadingNextScene.value){
                    return false
                }
                if(ODA.scene != thisScene.value){
                    return false
                }
                
                if(props.automaticScene===undefined || props.automaticScene === true){    
                    setTimeout(()=>{
                        
                        if(!allTimelineOks()){
                            return false
                        }
                        // AL READY TO MOVE NEXT
                        loadingNextScene.value = true
                        if(endAudioSound.value==undefined){
                            automaticNextScene()
                        } else {
                            endAudioSound.value.play()
                        }
                    }, 250)
                }

                /*
                    const points = (100/RESULTS.okstotal)*RESULTS.oks
                    if(points == 100){
                        if(props.automaticScene===undefined || props.automaticScene === true){
                            loadingNextScene.value = true
                            //automaticNextScene()
                            
                        }
                    }
                */
            }
        )

        const allTimelineOks = () => {
            let result = true
            if(props.forceOks!=0){
                result = props.forceOks == RESULTS.oks
            } else {
                result = RESULTS.okstotal == RESULTS.oks
            }
            
            return result
        }

        const inLasTimeline = () => {
            return ODA.timelineTotal == ODA.timeline
        }



        

        const automaticNextScene = () => {
            
            if(ODA.scene != thisScene.value){
                return false
            }
            if(RESULTS.okstotal==0){
                return false
            }
            
            
            

            setTimeout(()=>{
                console.log('loadingNext', loadingNextScene.value)                
                console.log('timeline', ODA.timeline, '/',ODA.timelineTotal)                
           
                if(loadingNextScene.value && ODA.timelineTotal == ODA.timeline){

                    let allmuted = true
                    for(var hw in Howler._howls){
                        if(Howler._howls[hw].playing() && Howler._howls[hw]._state == 'loaded' ){
                            allmuted = false
                        }
                    }
                    if(allmuted){
                        nextScene()

                    } else {
                        reautomaticNextScene()
                    }
                } else {
                    reautomaticNextScene()
                }
            }, 500)
        }

        const reautomaticNextScene = () => {
            setTimeout(()=>{
                automaticNextScene()
            },500)
        }

        const endAudioFN = () => {
            if(props.endAudio!=undefined && props.endAudio!=""){


                let file = props.endAudio
                if(audiovariables.includes(file)){
                    console.log(eval(file))
                    endAudioSound.value = eval(file)
                    endAudioSound.value.on('end', function () {
                        automaticNextScene()
                    })

                } else {
                    endAudioSound.value = new Howl({
                        src: [props.endAudio],
                        format: ["mp3"],
                        autoplay: false,
                        onend: function () {
                            automaticNextScene()
                        }
                    })
                }
                
                
                



            }
        }
        


        const nextScene = () => {
            ODA.scene = ODA.scene+1
        }


        onMounted(()=>{
            thisScene.value = ODA.modules.scenes.length
            ODA.modules.scenes.push(item.value)
            ready.value = true
            ODA.timeline = 0
            endAudioFN()
        })

       
        const initScene = () => {
            RESULTS.oks= 0
            RESULTS.errors= 0
            RESULTS.okstotal= 0
            ODA.timeline = 0
            ODA.timelineTotal = 0
            loadingNextScene.value = false
        }
        watch(
            ()=>ODA.scene,
            () => {
                if(ODA.scene == thisScene.value){
                    initScene()
                }
            }
        )

        return{
            item,
            thisScene,
            ODA,
            ready,
            itemClass,
            loadingNextScene,

        }
    },
    template: `
    <Transition mode="out-in" enter-active-class="animate__animated animate__jackInTheBox "  >
        <div ref="item" v-if="ODA.scene == thisScene && ready" 
            :class="[
                'flex w-full h-full py-2 flex-col sm:flex-row relative',
                itemClass
            ]">
            
            <slot></slot>
            
            <div :class="[
                'timelineCounter',
                'absolute top-1 right-1  flex justify-center items-center gap-0.5 p-0.5'
            ]">
                <div style="font-size:8px;" class="opacity-10">{{ODA.timeline}}/{{ODA.timelineTotal}}</div>
            </div>
            
            <div v-if="loadingNextScene" :class="['absolute right-2 bottom-2 animate-bounce']">
                <oda-icon name="fxemoji:whiteheavycheckmark"></oda-icon>
            </div>

        </div>
    </Transition>
    `
})