app.component('module-customcode', {
    props: {
        class: String,
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
            
            if(props.allok){
                result.value = true
                RESULTS.oks++
            } else {

                
                    result.value = false
                    RESULTS.errors++

            }
        }))

        onMounted(()=>{
            ODA.modules.customcode.push(item.value)
        })

        return{
            item,
            itemClass,
            finalized,
            result,
            ODA
        }
    },
    template: `
        <div :class="[
                'moduleCustomCode',
                ' ',
                itemClass
            ]"
            ref="item"
        >
            <util-result :result="result" v-if="finalized" />
            <p>Custom {{ODA}} </p>
        </div>
        `
})