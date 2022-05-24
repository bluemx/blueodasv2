app.component('module-select', {
    props: {
        answer: [Boolean, String],
        class: String,
    },
    setup (props, context){
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref()

        const item = ref(null)
        const itemClass = ref(props.class || '')
        
        const active = ref(false)
        
        let theanswer = props.answer
        if(typeof props.answer == 'string'){
           theanswer = (props.answer == 'true')
        }

        const select = () => {
            if(finalized.value){
                return false
            }
            active.value = !active.value
            s_select.play()

        }

        emitter.on('finalize', (e => {
            finalized.value = true
            

            if(active.value == theanswer){
                result.value = true
                RESULTS.oks++
            } else {
                result.value = false
                RESULTS.errors++
            }
        }))

        onMounted(()=>{
            ODA.modules.select.push(item.value)
        })

        return{
            item,
            itemClass,
            select,
            active,
            finalized,
            result
        }
    },
    template: `
        <div :class="[
                'moduleSelect',
                'min-w-[2rem] min-h-[2rem] cursor-pointer',
                'flex justify-center items-center',
                itemClass
            ]"
            ref="item"
            @click="select"
        >
            <util-result :result="result" v-if="finalized" />
            <div class="relative w-full h-full flex justify-center items-center">
                <div :class="[
                    'module-select-outline w-full h-full',
                    'absolute z-50',
                    (active?'ring-main ring-4 rounded-full':'')
                    ]"></div>
                    <slot></slot>
                </div>
        </div>
        `
})