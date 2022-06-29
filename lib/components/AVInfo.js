app.component('av-info', {
    props: {
       title: String,
       interaction: String,
       autoplay: Boolean
    },
    setup (props, context){
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const item = ref()

        const animations = {
            drag: animation_drag,
            input: animation_input,
            press: animation_press,
            relation: animation_relation,
            select: animation_select,
            video: animation_video
        }

        const resultbox = computed (()=>{
            const points = ((100/ODA.modules.scenes.length)/RESULTS.okstotal)*RESULTS.oks
            return points
        })

        onMounted(()=>{

        })
        return{
            item,
            animations,
            resultbox
        }
    },
    template: `
    <div :class="[
        'avInfo',
        'w-full sm:w-1/4 bg-isok rounded-xl h-full p-2 flex flex-col justify-between'
        ]">
        
        <div class="text-beige text-center font-extrabold text-xl sm:text-2xl">
            {{title}}
        </div>

        <div class="text-white my-2 text-lg text-center leading-5">
            <slot></slot>
        </div>

        <div class="flex-grow"></div>
        <div class="grid grid-cols-2 items-center text-center">
            <div><av-scorebox :points="resultbox"></av-scorebox></div>
            <lottie-player autoplay loop :src="animations[interaction]" class="max-w-[8rem] mx-auto"></lottie-player>
        </div>

    </div>
    `
})
