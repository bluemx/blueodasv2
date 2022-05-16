app.component('oda-icon', {
    props: {
        name: String
    },
    setup (props, context){
        const name = props.name
        return{
            name
        }
    },
    template: `
        <span class="icon inline animate__animated animate__heartBeat">
            <span class="iconify " :data-icon="name"></span>
        </span>
        `
})