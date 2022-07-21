app.component("action-conditional", {
    props: {
        variable: String,
        showIf: String,
        hideIf: String,
    },
    setup(props, context) {
        const RESULTS = inject('RESULTS')
        const eventVariables = inject("eventVariables");

        const visibility = ref()
        const visibilityFn = (thevariable) => {
            
            let visible = true

            if(props.showIf){
                visible = false
                if( eval(thevariable.toString() + props.showIf) ){
                    visible = true
                }
            }
            if(props.hideIf){
                if( eval(thevariable + props.hideIf) ){
                    visible = false
                }
            }

            return visible
        }

        onMounted(()=>{  
            visibility.value = visibilityFn(eventVariables.value[props.variable])
        })


        watch(
            ()=> eventVariables.value[props.variable],
            (newV, oldV)=>{
                visibility.value = visibilityFn(newV)
            }, {deep:true}
        )

                
        return {
            visibility,
        }
    },
    template: `
        <div v-if="visibility">
            <slot></slot>
        </div>
    `
})