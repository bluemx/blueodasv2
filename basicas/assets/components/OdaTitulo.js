app.component('oda-titulo', {
    props: {
        title: String,
        subtitle: String,
    },
    setup (props, context){
        const ODA = inject('ODA')
        
        ODA.title = props.title
        ODA.subtitle = props.subtitle

        return{
            ODA
        }
    },
    template: `
        <div class="py-5">
            <h1 class="font-extrabold sm:text-5xl text-2xl  text-main">{{ODA.title}}</h1>
            <h2 class="font-bold text-sec" v-if="ODA.subtitle">{{ODA.subtitle}}</h2>
        </div>
        `
})