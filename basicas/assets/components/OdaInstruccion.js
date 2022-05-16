app.component('oda-instruccion', {
    props: {
        text: String
    },
    setup (props, context){

        return{
        }
    },
    template: `
        <div class="text-sec text-2xl my-5 flex items-center instructions">
            <span class="iconify" data-icon="fxemoji:blackdiamondsuit"></span>
            <span v-textfn><slot></slot></span>
        </div>
        `
})