app.component('module-choice', {
    props: {
        class: String,
        answer: Number,
        allok: Boolean,
        options: Array,
        inmediate: Boolean,
        displayOk: Boolean
    },
    setup(props, context) {
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref()
        const instance = getCurrentInstance();

        const item = ref(null)
        const itemClass = ref(props.class || '')

        const active = ref(null)

        const clicked = (index) => {
            if(finalized.value){
                return false
            }
            active.value = index
            s_select.play()
            if(props.inmediate){
                inmediateFn()
            } else {
            }
        }


        const inmediateFn = () => {
            if(props.answer == active.value){
                result.value = true
                RESULTS.oks++
                finalized.value = true
                s_ok.play()
                eventOk()
            } else {
                s_error.play()
                active.value = null
                RESULTS.errors++
                eventError()
            }
        }


        const eventError = () => {
            if(instance.parent.ctx.eventError){
                instance.parent.ctx.eventError()
            }
        }
        const eventOk = () => {
            if(instance.parent.ctx.eventOk){
                instance.parent.ctx.eventOk()
            }
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
        if(props.inmediate){
            RESULTS.okstotal += 1
        }

        const isVisible = (index) => {
            let visibility = true
            if(props.displayOk && finalized.value){
                if(active.value != index){
                    visibility = false
                }
            } 
            return visibility
        }
        

        return{
            item,
            itemClass,
            clicked,
            active,
            finalized,
            result,
            isVisible
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
            ]" 
            v-if="isVisible(index)"
            @click="clicked(index)">
                <slot name="option" v-bind="option"></slot>
            </div>
        </template>
    </div>
    
    `
})