app.component("oda-titulo",{props:{title:String,subtitle:String},setup(props,context){const ODA=inject("ODA");return ODA.title=props.title,ODA.subtitle=props.subtitle,{ODA:ODA}},template:'\n        <div class="py-5">\n            <h1 class="font-extrabold text-5xl text-main">{{ODA.title}}</h1>\n            <h2 class="font-bold text-sec" v-if="ODA.subtitle">{{ODA.subtitle}}</h2>\n        </div>\n        '}),app.component("oda-instruccion",{props:{text:String},setup:(props,context)=>({}),template:'\n        <div class="text-sec text-2xl my-20 flex items-center instructions">\n            <span class="iconify" data-icon="fxemoji:blackdiamondsuit"></span>\n            <span v-textfn><slot></slot></span>\n        </div>\n        '}),app.component("oda-icon",{props:{name:String,class:String},setup:(props,context)=>({name:props.name,itemClass:props.class||""}),template:'\n        <span :class="[\'icon animate__animated animate__heartBeat\', itemClass]">\n            <span class="iconify aspect-square" :data-icon="name"></span>\n        </span>\n        '}),app.component("oda-finalizar",{props:{},setup(props,context){const RESULTS=inject("RESULTS"),finalized=ref(!1);return{finalize:()=>{s_win.play(),finalized.value=!0,emitter.emit("finalize")},finalized:finalized,RESULTS:RESULTS,reset:()=>{location.reload()}}},template:'\n        <div class="my-20 text-center">\n            <template v-if="!finalized">\n                <button class="\n                    font-extrabold\n                    px-12 py-6\n                    bg-clear\n                    text-sec\n                    text-3xl\n                    rounded-2xl\n                " @click="finalize" >Finalizar</button>\n            </template>\n            <template v-else>\n                <div class="text-center animate__animated animate__backInDown">\n                    <div class="font-extrabold text-4xl text-main">RESULTADOS</div>\n                    <div class="font-bold text-4xl text-isok mt-5">{{RESULTS.oks}} correctas</div>\n                    <div class="text-lg mt-3"> de {{RESULTS.oks+RESULTS.errors}} preguntas</div>\n                    <button class="mt-5 font-extrabold px-8 py-4 bg-clear text-white text-xl rounded-2xl " @click="reset" >Volver a intentar</button>\n                </div>\n            </template>\n        </div>\n        '}),app.component("util-result",{props:{result:Boolean},setup(props,context){const result=props.result,item=ref(null);return onMounted((()=>{item.value.parentNode.classList.add("relative","ring","ring-offset-4","rounded"),item.value.parentNode.classList.add(result?"ring-isok":"ring-notok")})),{result:result,item:item}},template:"\n        <div ref=\"item\" :class=\"[\n                'result', \n                result?'isok bg-isok':'notok bg-notok',\n                'absolute -top-4 -right-4',\n                'w-6 h-6 rounded-full text-white text-lg',\n                'flex justify-center items-center z-10'\n            ]\" >\n                <oda-icon name=\"uil:check\" v-if=\"result\" />\n                <oda-icon name=\"uil:times\" v-else />\n        </div>\n        "}),app.component("util-text",{props:{class:String,design:String},setup(props,context){const itemClass=ref(props.class||""),itemDesign=ref(props.design||1);1==itemDesign.value&&(itemClass.value+="  [text-shadow:1px_1px_0px_rgba(255,255,255,1),3px_3px_2px_rgba(0,0,0,0.15)]"),2==itemDesign.value&&(itemClass.value+="  relative before:content-[attr(data)] [text-shadow:0px_2px_0px_rgba(255,255,255,.8)]  before:absolute before:left-0 before:top-1  before:z-0 before:opacity-50 after:content-[attr(data)] after:absolute after:left-0 after:top-1.5  after:z-0 after:opacity-30  before:-z-10 after:-z-10  "),3==itemDesign.value&&(itemClass.value+="  bg-gradient-to-b from-main to-accent bg-clip-text [-webkit-text-fill-color:transparent]"),4==itemDesign.value&&(itemClass.value+="  bg-gradient-to-b from-sec to-clear bg-clip-text [-webkit-text-fill-color:transparent]"),5==itemDesign.value&&(itemClass.value+="  bg-gradient-to-b from-isok to-lime-400 bg-clip-text [-webkit-text-fill-color:transparent]"),6==itemDesign.value&&(itemClass.value+="  bg-gradient-to-b from-notok to-pink-400 bg-clip-text [-webkit-text-fill-color:transparent]");const item=ref(null),itemContent=ref("");return onMounted((()=>{itemContent.value=item.value.innerHTML})),{itemClass:itemClass,item:item,itemContent:itemContent}},template:'\n        <div class="util-text" :class="itemClass" :data="itemContent" ref="item">\n            <slot></slot>\n        </div>\n    '}),app.component("layout-grid",{props:{columns:String,columnsMd:String,gap:String,class:String},setup(props,context){const columns=props.columns||4;return{columns:columns,columnsMd:props.columnsMd||columns,gap:props.gap||2,itemClass:props.class||""}},template:"\n        <div :class=\"[\n            'layoutGrid',\n            'grid',\n            'grid-cols-'+columns,\n            'md:grid-cols-'+columnsMd,\n            'gap-'+gap,\n            'rounded-xl',\n            itemClass\n        ]\">\n            <slot></slot>\n        </div>\n        "}),app.component("layout-box",{props:{class:String,design:[Number,String],img:String},setup(props,context){const itemDesign=ref(" rounded-xl ");if(null!=props.design){let boxdesign=" p-4 border border-gray-200 flex justify-center items-center aspect-square";props.design,"1"==props.design&&(boxdesign=" p-2 flex justify-center items-center"),"2"==props.design&&(boxdesign=" p-2"),itemDesign.value+=boxdesign}const itemClass=ref(props.class||"");props.img&&(itemClass.value+="w-full h-full bg-cover bg-no-repeat bg-center relative");return{itemClass:itemClass,itemDesign:itemDesign,itemBgImg:props.img?"background-image:url("+props.img+")":""}},template:'\n        <div :class="[\n            \'layoutBox\',\n            itemDesign,\n            itemClass\n        ]"\n            :style="itemBgImg"\n        >\n            <slot></slot>\n        </div>\n        '}),app.component("layout-img",{props:{class:String,img:String},setup:(props,context)=>({itemClass:ref(props.class||""),itemImg:ref(props.img)}),template:'\n        <img :src="itemImg" :class="itemClass">\n        '}),app.component("module-check",{props:{answer:Number,class:String,options:Array,float:String},setup(props,context){const ODA=inject("ODA"),RESULTS=inject("RESULTS"),finalized=ref(!1),result=ref(),options=["",...props.options],item=ref(null),itemClass=ref(props.class||""),itemCheckClass=ref("");if(null==props.float||""==props.float);else{itemCheckClass.value+="absolute z-10 ";let pos="top-2 left-2";"topleft"==props.float&&(pos=" top-2 left-2 "),"topright"==props.float&&(pos=" top-2 right-2 "),"bottomleft"==props.float&&(pos=" bottom-2 left-2 "),"bottomright"==props.float&&(pos=" bottom-2 right-2 "),itemCheckClass.value+=pos}const active=ref(0);return emitter.on("finalize",(e=>{finalized.value=!0,props.answer==active.value?(result.value=!0,RESULTS.oks++):(result.value=!1,RESULTS.errors++)})),onMounted((()=>{ODA.modules.check.push(item.value)})),{item:item,itemClass:itemClass,itemCheckClass:itemCheckClass,options:options,clicked:()=>{if(finalized.value)return!1;active.value+=1,s_select.play(),active.value>options.length-1&&(active.value=0)},active:active,finalized:finalized,result:result}},template:'\n        <div :class="[\n                \'moduleCheck\',\n                \'flex cursor-pointer items-center relative\',\n                itemClass\n            ]"\n            @click="clicked"\n            ref="item"\n        >\n            <util-result :result="result" v-if="finalized" />\n            <div :class="[\n                \'module-check-box\',\n                \'w-9 h-9 flex items-center justify-center mr-2 rounded-full\',\n                \'border-2 border-solid border-clear\',\n                \'bg-white shadow-oda\',\n                itemCheckClass\n            ]">\n                <template v-for="(icon, index) in options">\n                    <template v-if="index==active ">\n                        <oda-icon :name="icon" v-if="icon"  />\n                    </template>\n                </template>\n            </div>\n            <slot></slot>\n        </div>\n        '}),app.component("module-drag",{props:{class:String,answer:String,liner:String,design:String,connector:String},setup(props,context){const ODA=inject("ODA"),RESULTS=inject("RESULTS"),finalized=ref(!1),result=ref();(Math.random()+1).toString(36).substring(7);const item=ref(null),draggable=ref(),itemClass=(ref([]),ref(props.class||" ")),itemParent=ref(),liner=ref(null),connectorClass=ref(""),themeColors=tailwind.config.theme.extend.colors,themeColorsArray=Object.keys(themeColors),itemColor=ref(themeColors[themeColorsArray[Math.floor(5*Math.random())]]);onMounted((()=>{ODA.modules.drag.push(item.value),itemParent.value=item.value.parentNode,draggable.value=Draggable.create(item.value,{onClick:function(e){return!finalized.value&&(item.value.parentNode!=itemParent.value&&(itemParent.value.appendChild(item.value),void updateLiner("hide")))},onDrag:function(e){if(finalized.value)return!1;updateLiner("show"),updateLiner()},onDragEnd:function(e){if(finalized.value)return!1;let wasDropped=!1;for(let dropzone of ODA.modules.dropzone)this.hitTest(dropzone,"50%")?(dropzone.appendChild(item.value),gsap.to(item.value,{x:0,y:0,duration:0,onComplete:function(e){}}),s_select.play(),wasDropped=!0):gsap.to(item.value,{x:0,y:0,duration:.3,onComplete:function(e){updateLiner()}});wasDropped||item.value.parentNode==itemParent.value&&updateLiner("hide")}}),null==props.liner&&"0"==props.liner||(""!=props.liner&&(itemColor.value=themeColors[themeColorsArray[props.liner]]),liner.value=new LeaderLine(itemParent.value,item.value,{dash:!0,color:itemColor.value}),liner.value.setOptions({startSocket:"auto",endSocket:"auto"}),window.addEventListener("scroll",AnimEvent.add((function(){updateLiner()})),!1),liner.value.hide("none"))}));const updateLiner=action=>{null!=props.liner&&(action?liner.value[action]("draw"):liner.value.position())};if(null!=props.design&&(null==props.design||0==props.design||"1"==props.design&&(itemClass.value+=" bg-white rounded p-2 shadow-oda text-center border-2 border-grey-100 border-solid w-fit min-w-[6rem] flex justify-center items-center")),null!=props.connector&&"0"!=props.connector){itemClass.value=" w-6 h-6";let connectorColor=" border-["+itemColor.value+"] ";""!=props.connector&&(connectorColor=" border-["+themeColors[themeColorsArray[props.liner]]+"] "),connectorClass.value+=connectorColor}return emitter.on("finalize",(e=>{finalized.value=!0,draggable.value[0].disable();let currentParent=item.value.parentNode;""==props.answer?currentParent==itemParent.value?(result.value=!0,RESULTS.oks++):(result.value=!1,RESULTS.errors++):currentParent==itemParent.value?(result.value=!1,RESULTS.errors++):currentParent.__vueParentComponent.ctx.answer==props.answer?(result.value=!0,RESULTS.oks++):(result.value=!1,RESULTS.errors++)})),{item:item,itemClass:itemClass,connectorClass:connectorClass,finalized:finalized,result:result}},template:'\n        <div :class="[\'moduleDrag\', itemClass]" ref="item">\n            <util-result :result="result" v-if="finalized" />    \n            <slot></slot>\n            <div \n                :class="[\n                    \'module-drag-connector\',\n                    \'w-6 h-6 rounded-full bg-white border-4 shadow-oda\',\n                    connectorClass,\n                ]"\n                v-if="connector!=undefined"></div>\n        </div>\n        \n        '}),app.component("module-drop",{props:{class:String,answer:String,design:String},setup(props,context){const ODA=inject("ODA"),itemClass=ref(props.class||" ");itemClass.value+=" p-1 flex justify-center items-center flex-col gap-2";const item=ref(null);return null!=props.design&&(itemClass.value+=" rounded-xl border-dashed border-2 border-accent bg-pastel1"),onMounted((()=>{ODA.modules.dropzone.push(item.value)})),{item:item,itemClass:itemClass}},template:'\n        <div :class="[\'moduleDrop relative\', itemClass]" ref="item">\n            <slot></slot>\n            <oda-icon name="uil:arrow-down" class="absolute z-0 text-xl opacity-30" />\n        </div>\n    '}),app.component("module-input",{props:{answer:String,class:String,placeholder:String},setup(props,context){const ODA=inject("ODA"),RESULTS=inject("RESULTS"),finalized=ref(!1),result=ref(),item=ref(null),itemClass=ref(props.class||""),active=ref(),theanswer=props.answer;return emitter.on("finalize",(e=>{finalized.value=!0;let activeEVAL=active.value?active.value.toLowerCase():"";activeEVAL=activeEVAL.replace(/\.\s*$/,"");let answerEVAL=theanswer.toLowerCase();answerEVAL=answerEVAL.replace(/\.\s*$/,""),console.log(activeEVAL,answerEVAL),activeEVAL==answerEVAL?(result.value=!0,RESULTS.oks++):(result.value=!1,RESULTS.errors++)})),onMounted((()=>{ODA.modules.input.push(item.value)})),{item:item,itemClass:itemClass,active:active,finalized:finalized,result:result}},template:'\n        <div :class="[\n                \'moduleInput\',\n                \'\',\n                itemClass\n            ]"\n            ref="item"\n        >\n            <util-result :result="result" v-if="finalized" />\n            <input v-model="active" :placeholder="placeholder" :readonly="finalized"\n                class="w-full rounded border-clear border-2 shadow-oda focus:ring focus:ring-main focus:ring-opacity-50 p-1">\n        </div>\n        '}),app.component("module-select",{props:{answer:[Boolean,String],class:String},setup(props,context){const ODA=inject("ODA"),RESULTS=inject("RESULTS"),finalized=ref(!1),result=ref(),item=ref(null),itemClass=ref(props.class||""),active=ref(!1);let theanswer=props.answer;"string"==typeof props.answer&&(theanswer="true"==props.answer);return emitter.on("finalize",(e=>{finalized.value=!0,active.value==theanswer?(result.value=!0,RESULTS.oks++):(result.value=!1,RESULTS.errors++)})),onMounted((()=>{ODA.modules.select.push(item.value)})),{item:item,itemClass:itemClass,select:()=>{if(finalized.value)return!1;active.value=!active.value,s_select.play()},active:active,finalized:finalized,result:result}},template:"\n        <div :class=\"[\n                'moduleSelect',\n                'min-w-[2rem] min-h-[2rem] cursor-pointer',\n                'flex justify-center items-center',\n                itemClass\n            ]\"\n            ref=\"item\"\n            @click=\"select\"\n        >\n            <util-result :result=\"result\" v-if=\"finalized\" />\n            <div class=\"relative w-full h-full flex justify-center items-center\">\n                <div :class=\"[\n                    'module-select-outline w-full h-full',\n                    'absolute z-50',\n                    (active?'ring-main ring-4 rounded-full':'')\n                    ]\"></div>\n                    <slot></slot>\n                </div>\n        </div>\n        "});