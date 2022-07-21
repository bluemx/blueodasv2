app.component("action-variable", {
    props: {
        name: String,
        value: String,
        okIs: String,
        visible: Boolean,
        showValue: Boolean
    },
    setup(props, context) {
        const RESULTS = inject('RESULTS')
        const eventVariables = inject("eventVariables");
        const okEmited = ref(false)

        let thename = props.name
        let theval = props.value
        
        if(!isNaN(props.value)){
            theval = parseFloat(props.value)
        }

        eventVariables.value[thename] = theval

        if(props.okIs) {
            RESULTS.okstotal++
        }

        watch(
            ()=>eventVariables.value[thename],
            ()=> {

                if(props.okIs) {
                    if(eval(eventVariables.value[thename] + props.okIs)){
                        if(!okEmited.value){
                            RESULTS.oks++
                            okEmited.value = true
                        }
                    }
                }
            }
        )

        
        
        return {
            eventVariables,
            thename,
            okEmited
        }
    },
    template: `
        <div v-if="visible">

            <template v-if="!showValue">
                { 
                    {{thename}} : {{eventVariables[thename]}},
                    ok: {{okEmited}}
                }
            </template>
            <template v-else>
                {{eventVariables[thename]}}
            </template>
        </div>
    `
})