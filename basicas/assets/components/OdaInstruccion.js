app.component('oda-instruccion', {
    props: {
        text: String
    },
    setup (props, context){

        return{
        }
    },
    template: `
        <div class="text-sec text-2xl my-20 flex items-center instructions">
            <span class="iconify w-16" data-icon="fxemoji:blackdiamondsuit"></span>
            <span v-textfn><slot></slot></span>
        </div>
        `
})