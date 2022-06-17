app.component('av-start', {
    props: {
       
    },
    setup (props, context){
        const ODA = inject('ODA')
        const start = () => {
            ODA.scene++
            s_end.play()
        }
        return{
            start
        }
    },
    template: `
            <div class="absolute inset-7 bg-isok  flex justify-center items-center rounded-xl">
                <div @click="start" class="cursor-pointer font-extrabold px-12 py-6 bg-white text-isok text-3xl rounded-2xl animate__animated animate__pulse animate__infinite">COMENZAR</div>          
            </div>
    `
})