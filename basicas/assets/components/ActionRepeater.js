app.component('action-repeater', {
    props: {
        class: String,
        options: Array,
    },
    setup (props, context){
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref()

        const options = props.options

        const item = ref(null)
        const itemClass = ref(props.class || '')


        return{
            item,
            itemClass,
            options
        }
    },
    template: `
        <div :class="[
                'actionRepeater',
                itemClass,
            ]"
            ref="item"
        >
            {{options}}
            <template v-for="(option, index) in options">
                <slot name="option" v-bind="option"></slot>
            </template>
        </div>
        `
})