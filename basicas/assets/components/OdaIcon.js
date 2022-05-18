app.component('oda-icon', {
    props: {
        name: String,
        class: String
    },
    setup (props, context){
        const name = props.name
        const itemClass = props.class || ''
        return{
            name,
            itemClass
        }
    },
    template: `
        <span :class="['icon inline animate__animated animate__heartBeat', itemClass]">
            <span class="iconify " :data-icon="name"></span>
        </span>
        `
})