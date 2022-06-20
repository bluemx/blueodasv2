app.component('av-activity', {
    props: {
       class: String
    },
    setup (props, context){
        const ODA = inject('ODA')
        const item = ref()

        const itemClass = props.class || ''


        onMounted(()=>{

        })
        return{
            item,
            itemClass
        }
    },
    template: `
    <div :class="[
        'AVActivity',
        'rounded-xl h-full flex justify-center items-center flex-col w-full',
        itemClass
        ]">
        <slot></slot>
    </div>
    `
})