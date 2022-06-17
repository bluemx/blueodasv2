app.component('av-end', {
    props: {
       
    },
    setup (props, context){
        const ODA = inject('ODA')
        const restart = () => {
            location.hash = ""
            location.reload()
        }
        s_win.play()
        return{
            restart
        }
    },
    template: `
            <div class="absolute inset-7 bg-isok  flex justify-center items-center flex-col rounded-xl">
                <div class="font-extrabold text-white text-5xl mb-2">Felicidades</div>
                <div class="font-extrabold text-sec text-3xl mb-4">Completaste la actividad</div>
                <div><av-scorebox :points="100"></av-scorebox></div>
                <div @click="restart" class="cursor-pointer font-extrabold px-6 py-2 mt-5 bg-white text-isok text-lg rounded-2xl animate__animated animate__pulse animate__infinite">Repetir actividad</div>          
            </div>
    `
})