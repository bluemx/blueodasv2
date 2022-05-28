app.component('module-choice', {
    props: {
        class: String,
        answer: Number,
        allok: Boolean,
        options: Array
    },
    setup(props, context) {
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref()

        const item = ref(null)
        const itemClass = ref(props.class || '')

        const active = ref(null)

        const clicked = (index) => {
            if(finalized.value){
                return false
            }
            s_select.play()
            active.value = index
        }

        emitter.on('finalize', (e=>{
            finalized.value = true
            if(props.allok){
                result.value = true
                RESULTS.oks++
                return false
            }

            if(props.answer == active.value){
                result.value = true
                RESULTS.oks++
            } else {
                result.value = false
                RESULTS.errors++
            }

        }))
    
        onMounted(() => {
          ODA.modules.choice.push(item.value)  
        })

        return{
            item,
            itemClass,
            clicked,
            active,
            finalized,
            result
        }
    },
    template: `
    <div :class="[
        'moduleChoice',
        'flex justify-evenly items-center flex-wrap gap-2',
        itemClass,
    ]"
    
    ref="item">
        <util-result :result="result" v-if="finalized" />
        <template v-for="(option, index) in options">
            
            <div :class="[
                'moduleChoice-option',
                'p-2 rounded-xl cursor-pointer bg-white shadow-oda',
                (active==index ? 'border-4 border-sec border-solid': '')
            
            ]" @click="clicked(index)">
                <slot name="option" v-bind="option"></slot>
            </div>
        </template>
    </div>
    
    `
})