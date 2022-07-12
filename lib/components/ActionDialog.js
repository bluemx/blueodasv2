app.component('action-dialog', {
    props: {
        class: String,
        displayResult: Boolean
    },
    setup(props, context) {
        const dialog = ref(false)

        const itemClass = ref(props.class  ||  '')
        const displayEndResult = ref(false)

        const result = ref(null)

        const eventCompleted = () => {
            console.log('compl')

        };
        const eventOk = () => {
            dialog.value = false
            result.value = true
            if(props.displayResult){
                displayEndResult.value = true
            }
        };
        const eventError = () => {

        };

        return{
            dialog,
            itemClass,
            displayEndResult,
            result,
            eventCompleted,
            eventOk,
            eventError,
        }
    },
    template: `
        <div :class="['moduleDialog z-50', itemClass]">

            <div v-if="!dialog && !displayEndResult" @click="dialog=true" :class="['cursor-pointer bg-main rounded-full shadow-oda border-2 border-dotted border-sec py-1 px-8 w-full ']">
                <oda-icon class="text-3xl " name="icon-park-solid:click"></oda-icon>
                <util-result :result="result" v-if="result && !displayEndResult" />
            </div>
            <div v-show="dialog || displayEndResult" :class="[!displayEndResult?'absolute left-0 top-0 right-0 bottom-0 z-50 bg-sec/10 rounded-xl m-10 p-4  flex justify-center items-center':'']">
                
            <div v-if="!displayEndResult" class="absolute top-4 right-4 p-1 rounded-full w-8 h-8 bg-main shadow-oda flex z-50 justify-center items-center cursor-pointer" @click="dialog=false"><oda-icon class="" name="fxemoji:cancellationx"></oda-icon></div>
                
                <div class="animate__animated animate__rubberBand flex justify-center items-center border-4 border-dashed border-sec bg-white shadow-oda rounded-xl">
                    <slot></slot>
                </div>
            </div>
        </div>
    
    `
})