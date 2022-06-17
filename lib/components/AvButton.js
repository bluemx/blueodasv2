app.component('av-button', {
    props: {
        nextscene: [Boolean, String],
        nexttimeline: [Boolean, String],
        class: String
    },
    setup (props, context){
        const item = ref()
        const instance = getCurrentInstance();
        const ODA = inject('ODA')

        const action = () => {
            if(props.nextscene!=""){
                ODA.scene +=1 
            }
            if(props.nexttimeline!=""){
                ODA.timeline += 1
            }
        }

        return {
            item,
            action
        }
    },
    template: `
        <button ref="item" class="
            font-extrabold
            px-6 py-2
            bg-accent
            text-sec
            text-xl
            rounded-2xl
        " @click="action"><slot></slot></button>
       
    `


})