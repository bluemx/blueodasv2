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
        <span :class="['icon animate__animated animate__heartBeat', itemClass]">
            <span class="iconify aspect-square" :data-icon="name"></span>
        </span>
        `
})