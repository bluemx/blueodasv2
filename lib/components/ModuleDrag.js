app.component('module-drag',{
    props: {
        class: String,
        answer: String,
        liner: String,
        design: String,
        connector: String,
        allok: Boolean,
        onlyOk: Boolean,
        onlyError: Boolean,
        dropzone: String,
        inmediate: Boolean,
    },
    setup (props, context) {
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref(null)
        const instance = getCurrentInstance();

        let uid = (Math.random() + 1).toString(36).substring(7);
        const item = ref(null)
        const draggable = ref()
        const dropzones = ref()

        const itemClass = ref(props.class || ' ')
        const itemParent = ref()
        const liner = ref(null)
        const connectorClass = ref('')

        const itemSlot = ref()

        const themeColors = tailwind.config.theme.extend.colors
        const themeColorsArray = Object.keys(themeColors)
        const itemColor = ref(themeColors[themeColorsArray[Math.floor(Math.random()*5)]])


        const hasLiner = (props.liner!=undefined && props.liner!="0" && props.liner!=0)
        const hasConnector = (props.connector!=undefined && props.connector!="0" && props.connector!=0)


        onMounted(()=>{
            ODA.modules.drag.push(item.value)
            itemParent.value = item.value.parentNode

            itemParent.value.classList.add('z-10')

            draggable.value = Draggable.create(item.value,{
                autoScroll:1,
                onClick: function(e) {
                    if(finalized.value){
                        return false
                    }
                    if(item.value.parentNode == itemParent.value){
                        return false
                    }
                    itemParent.value.appendChild(item.value)
                    updateLiner('hide')

                    updateFitty()
                },
                onDrag: function(e){
                    if(finalized.value){
                        return false
                    }
                    updateLiner('show')
                    updateLiner()
                },
                onDragEnd: function(e) {
                    if(finalized.value){
                        return false
                    }
                    let wasDropped = false
                    for(let dropzone of ODA.modules.dropzone){
                        
                    //for(let i in ODA.modules.dropzone){
                        let candrop = dropzone.__vueParentComponent.ctx.candrop(props.dropzone)
                        if (this.hitTest(dropzone, '50%') && candrop ) {
                            dropzone.appendChild(item.value)
                            gsap.to(item.value, {
                                x:0,y:0,
                                duration:0,
                                onComplete:function(e){}
                            })
                            s_select.play()
                            wasDropped = true
                            updateFitty()

                            if(props.inmediate){
                                inmediateFn()
                            }

                        } else {
                            gsap.to(item.value, {
                                x:0,y:0,
                                duration:0.3,
                                onComplete:function(e){updateLiner()}
                            })                            
                        }



                    }
                    if(!wasDropped){
                        if(item.value.parentNode == itemParent.value){
                            updateLiner('hide')
                        }
                    }
                    emitter.emit('stopModuleAudio')
                 }
            })

            
            

            if(hasLiner){
                liner.value = new LeaderLine(
                    itemParent.value,
                    item.value,
                    {
                        dash: true,
                        color: itemColor.value
                    }
                )
                
                liner.value.setOptions({startSocket: 'auto', endSocket: 'auto'})
                window.addEventListener('scroll', AnimEvent.add(function() {
                    updateLiner()
                }), false);
                liner.value['hide']('none')

            }

        })

       

        const updateLiner = (action) => {
            if(hasLiner){
                if(action){
                    liner.value[action]('draw')
                } else {
                    liner.value.position();
                }
            }
        }

        const updateFitty = () => {
            if(item.value.classList.contains('fitty')){
                setTimeout(()=>{
                    fitty.fitAll()
                }, 250)
            }
        }

        if(props.design==undefined || props.design==0 || props.design=="0"){

        } else if(props.design=="1"){
            itemClass.value += ' bg-white rounded p-2 shadow-oda text-center border-2 border-grey-100 border-solid w-fit min-w-[4rem] max-w-full flex justify-center items-center'
        }


        if(hasConnector){
            itemClass.value = ' w-6 h-6'
            let connectorColor = ' border-['+itemColor.value+'] '
            if(props.connector!=""){
                connectorColor = ' border-['+themeColors[themeColorsArray[props.liner]]+'] '
            }
            connectorClass.value += connectorColor
        }


        if(props.inmediate){
            if(props.answer!=""){
                RESULTS.okstotal += 1
            }
        }


        const inmediateFn = () => {
            if(finalizeFn()){
                result.value = true
                RESULTS.oks++
                finalized.value = true
                draggable.value[0].disable()
                s_ok.play()
                eventOk()
            } else {
                RESULTS.errors++
                s_error.play()
                itemParent.value.appendChild(item.value)
                eventError()
            }


        }

        const eventError = () => {
            if(instance.parent.ctx.eventError){
                instance.parent.ctx.eventError()
            }
        }
        const eventOk = () => {
            if(instance.parent.ctx.eventOk){
                instance.parent.ctx.eventOk()
            }
        }


        emitter.on('finalize', (e => {
            finalized.value = true
            draggable.value[0].disable()
            finalizeFn()
        }))


        const finalizeFn = () =>{
            let currentParent = item.value.parentNode
            let resultIs = false
            if(props.allok){
                finalizeResult(true)
            } else {
                if(props.answer==""){
                    //EMPTY ANSWER
                    if(currentParent == itemParent.value){
                        finalizeResult(true)
                        resultIs=true
                    } else {
                        finalizeResult(false)
                        resultIs=false
                    }
                } else {
                    //DIDNT MOVE PARENTNODE
                    if(currentParent == itemParent.value){
                        finalizeResult(false)
                        resultIs=false
                    } else {
                        if(currentParent.__vueParentComponent.ctx.answer == props.answer){
                            finalizeResult(true)
                            resultIs=true
                        } else {
                            finalizeResult(false)
                            resultIs=false
                        }
                    }
                }
            }
            return resultIs
        }

        const finalizeResult = (isok) => {
            if(props.inmediate){
                return false
            }
            if(isok){
                if(props.onlyError){
                    return false
                }
                result.value = true
                RESULTS.oks++
            } else {
                if(props.onlyOk){
                    return false
                }
                result.value = false
                RESULTS.errors++
            }
        }

        return {
            item,
            itemClass,
            connectorClass,
            finalized,
            result,
            hasLiner,
            hasConnector,
            itemSlot
        }
    },
    template: `
        <div :class="['moduleDrag', itemClass]" ref="item">
            <template v-if="finalized">
                <util-result :result="result" v-if="!onlyOk && !onlyError" />
                <util-result :result="result" v-else-if="result===false && onlyError" />
                <util-result :result="result" v-else-if="result===true && onlyOk" />

            </template>
            
            <slot ref="itemSlot"></slot>
            <div 
                :class="[
                    'module-drag-connector',
                    'w-6 h-6 rounded-full bg-white border-4 shadow-oda',
                    connectorClass,
                ]"
                v-if="hasConnector"></div>
        </div>
        `
})



app.component('module-drop',{
    props: {
        class: String,
        answer: String,
        design: String,
        limit: String,
        noArrow: Boolean,
        horizontal: [Boolean],
        name: String
    },
    setup (props, context) {
        const ODA = inject('ODA')

        const itemClass = ref(props.class || ' ')
        
        const veticalHorizontal = ref('flex-col')
        if(props.horizontal==true){
            veticalHorizontal.value="flex-row"
        }

        itemClass.value += ' p-1 flex justify-center items-center gap-2 ' + veticalHorizontal.value + ' ' 
        
        const item = ref()
        const dropLimits = ref(0)

        const noArrow = props.noArrow || false

        if(props.design=="1"){
            itemClass.value += ' rounded-xl border-dashed border-2 border-accent'
        }

        if(props.limit=="0" || !props.limit){
            dropLimits.value = 0
        } else {
            dropLimits.value = parseInt(props.limit)
        }

        

        const candrop = (dropzoneGroup) => {
            if(dropzoneGroup != props.name){
                return false
            }
            let result = true    
            let children = 0        
            if(item.value){
                children = item.value.children.length - 1
                if(dropLimits.value==0){
                    result = true
                } else {
                    if(children<dropLimits.value){
                        result = true
                    } else {
                        result = false
                    }
                }
            } else {
                result = false
            }
            
            
            return result
        }



        onMounted(()=>{
            
            ODA.modules.dropzone.push(item.value)
        })

        return{
            item,
            itemClass,
            candrop,
            noArrow,
            
        }
    },
    template: `
        <div :class="['moduleDrop relative', itemClass]" ref="item">
            <slot></slot>
            <oda-icon :name="noArrow?'':'uil:arrow-down'" class="absolute z-0 text-xl opacity-30" />
        </div>
    `
})