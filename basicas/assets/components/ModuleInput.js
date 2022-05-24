app.component('module-input', {
    props: {
        answer: String,
        class: String,
        placeholder: String
    },
    setup (props, context){
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref()

        const item = ref(null)
        const itemClass = ref(props.class || '')
        const active = ref()
        
        const theanswer = props.answer


        emitter.on('finalize', (e => {
            finalized.value = true
            let activeEVAL = active.value ? active.value.toLowerCase() : ''
            activeEVAL = activeEVAL.replace(/\.\s*$/, "")
            let answerEVAL = theanswer.toLowerCase()
            answerEVAL = answerEVAL.replace(/\.\s*$/, "")
            
            console.log(activeEVAL, answerEVAL)

            if(activeEVAL == answerEVAL){
                result.value = true
                RESULTS.oks++
            } else {
                result.value = false
                RESULTS.errors++
            }
        }))

        onMounted(()=>{
            ODA.modules.input.push(item.value)
        })

        return{
            item,
            itemClass,
            active,
            finalized,
            result
        }
    },
    template: `
        <div :class="[
                'moduleInput',
                '',
                itemClass
            ]"
            ref="item"
        >
            <util-result :result="result" v-if="finalized" />
            <input v-model="active" :placeholder="placeholder" :readonly="finalized"
                class="w-full rounded border-clear border-2 shadow-oda focus:ring focus:ring-main focus:ring-opacity-50 p-1">
        </div>
        `
})