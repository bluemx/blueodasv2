app.component('av-scene', {
    props: {
       class: String
    },
    setup (props, context){
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')

        

        const item = ref()
        const itemClass = props.class || ''
        const thisScene = ref(0)
        const ready = ref(false)

        const loadingNextScene = ref(false)

        watch(
            ()=>RESULTS.oks,
            ()=>{
                    const points = (100/RESULTS.okstotal)*RESULTS.oks
                    if(points == 100){
                        loadingNextScene.value = true
                        automaticNextScene()
                    }

            }
        )


        const automaticNextScene = () => {
            if(ODA.scene != thisScene.value){
                return false
            }
            if(RESULTS.okstotal==0){
                return false
            }
            setTimeout(()=>{
                if(loadingNextScene.value && ODA.timelineTotal == ODA.timeline){
                    let allmuted = true
                    for(var hw in Howler._howls){
                        if(Howler._howls[hw].playing() && Howler._howls[hw]._state == 'loaded' ){
                            allmuted = false
                        }
                    }
                    if(allmuted){
                        ODA.scene = ODA.scene+1
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

        onMounted(()=>{
            thisScene.value = ODA.modules.scenes.length
            ODA.modules.scenes.push(item.value)
            ready.value = true
            ODA.timeline = 0
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
            loadingNextScene
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
                'absolute bottom-4 left-3  flex justify-center items-center gap-0.5 p-0.5'
            ]">

            <template v-for="i in ODA.timelineTotal+1">
                <span @click="ODA.timeline = i-1" :class="[
                    ODA.timeline+1>=i?'bg-slate-500':'bg-slate-500/40',
                    'w-1 h-2 rounded'
                ]"></span>
            </template>
            
            
            </div>
            
            <div v-if="loadingNextScene" :class="['absolute right-2 bottom-2 animate-bounce']">
                <oda-icon name="fxemoji:whiteheavycheckmark"></oda-icon>
            </div>

        </div>
    </Transition>
    `
})