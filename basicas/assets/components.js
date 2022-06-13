app.component("oda-titulo",{props:{title:String,subtitle:String},setup(props,context){const ODA=inject("ODA");return ODA.title=props.title,ODA.subtitle=props.subtitle,{ODA:ODA}},template:'\n        <div class="py-5">\n            <h1 class="font-extrabold sm:text-5xl text-2xl  text-main">{{ODA.title}}</h1>\n            <h2 class="font-bold text-sec" v-if="ODA.subtitle">{{ODA.subtitle}}</h2>\n        </div>\n        '}),app.component("oda-instruccion",{props:{text:String},setup(props,context){const ODA=inject("ODA"),item=ref(),itemCount=ref(0),withsound=ref(!1),platformdata=document.body.getAttribute("data"),instructionaudio=ref();platformdata.includes("ASOMATE")&&(withsound.value=!0);const playing=computed((()=>!!instructionaudio.value&&instructionaudio.value.playing()));return onMounted((()=>{itemCount.value=ODA.modules.instructions.length,ODA.modules.instructions.push(item.value);const audiofilename="i"+(itemCount.value+1)+".mp3";console.log(audiofilename),instructionaudio.value=new Howl({src:[audiofilename]})})),{withsound:withsound,instructionaudio:instructionaudio,playing:playing,play:()=>{playing.value?instructionaudio.value.stop():instructionaudio.value.play()},item:item}},template:'\n        <div class="text-sec text-2xl my-20 flex items-center instructions" ref="item">\n            <template v-if="!withsound">\n                <span class="iconify w-18" data-icon="fxemoji:blackdiamondsuit"></span>\n            </template>\n            <template v-else>\n                <button @click="play()" :class="[\n                    \'rounded-full aspect-square w-12 shrink-0  flex justify-center items-center mr-2 text-md\',\n                    playing?\'bg-main\':\'bg-gray-100\'\n                ]">\n\n                    <div v-show="playing"><span  class="iconify aspect-square animate__animated animate__wobble" data-icon="fxemoji:speaker3soundwaves"></span></div>\n                    <div v-show="!playing"><span class="iconify aspect-square animate__animated animate__pulse animate__infinite" data-icon="fxemoji:speakeronesoundwave"></span></div>\n\n                </button>\n            </template>\n\n            <span v-textfn><slot></slot></span>\n        </div>\n        '}),app.component("oda-icon",{props:{name:String,class:String},setup:(props,context)=>({name:props.name,itemClass:props.class||""}),template:'\n        <span :class="[\'icon animate__animated animate__heartBeat\', itemClass]">\n            <span class="iconify aspect-square" :data-icon="name"></span>\n        </span>\n        '}),app.component("oda-finalizar",{props:{},setup(props,context){const RESULTS=inject("RESULTS"),finalized=ref(!1);return{finalize:()=>{s_win.play(),finalized.value=!0,emitter.emit("finalize")},finalized:finalized,RESULTS:RESULTS,reset:()=>{location.reload()}}},template:'\n        <div class="my-20 text-center">\n            <template v-if="!finalized">\n                <button class="\n                    font-extrabold\n                    px-12 py-6\n                    bg-clear\n                    text-sec\n                    text-3xl\n                    rounded-2xl\n                " @click="finalize" >Finalizar</button>\n            </template>\n            <template v-else>\n                <div class="text-center animate__animated animate__backInDown">\n                    <div class="font-extrabold text-4xl text-main">RESULTADOS</div>\n                    <div class="font-bold text-4xl text-isok mt-5">{{RESULTS.oks}} correctas</div>\n                    <div class="text-lg mt-3"> de {{RESULTS.oks+RESULTS.errors}} preguntas</div>\n                    <button class="mt-5 font-extrabold px-8 py-4 bg-clear text-white text-xl rounded-2xl " @click="reset" >Volver a intentar</button>\n                </div>\n            </template>\n        </div>\n        '}),app.component("util-result",{props:{result:Boolean},setup(props,context){const result=props.result,item=ref(null);return onMounted((()=>{item.value.parentNode.classList.add("relative","ring","ring-offset-4","rounded"),item.value.parentNode.classList.add(result?"ring-isok":"ring-notok")})),{result:result,item:item}},template:"\n        <div ref=\"item\" :class=\"[\n                'result', \n                result?'isok bg-isok':'notok bg-notok',\n                'absolute -top-4 -right-4',\n                'w-6 h-6 rounded-full text-white text-lg',\n                'flex justify-center items-center z-10'\n            ]\" >\n                <oda-icon name=\"uil:check\" v-if=\"result\" />\n                <oda-icon name=\"uil:times\" v-else />\n        </div>\n        "}),app.component("util-text",{props:{class:String,design:String},setup(props,context){const itemClass=ref(props.class||""),itemDesign=ref(props.design||1);1==itemDesign.value&&(itemClass.value+="  [text-shadow:1px_1px_0px_rgba(255,255,255,1),3px_3px_2px_rgba(0,0,0,0.15)]"),2==itemDesign.value&&(itemClass.value+="  relative before:content-[attr(data)] [text-shadow:0px_2px_0px_rgba(255,255,255,.8)]  before:absolute before:left-0 before:top-1  before:z-0 before:opacity-50 after:content-[attr(data)] after:absolute after:left-0 after:top-1.5  after:z-0 after:opacity-30  before:-z-10 after:-z-10  "),3==itemDesign.value&&(itemClass.value+="  bg-gradient-to-b from-main to-accent bg-clip-text [-webkit-text-fill-color:transparent]"),4==itemDesign.value&&(itemClass.value+="  bg-gradient-to-b from-sec to-clear bg-clip-text [-webkit-text-fill-color:transparent]"),5==itemDesign.value&&(itemClass.value+="  bg-gradient-to-b from-isok to-lime-400 bg-clip-text [-webkit-text-fill-color:transparent]"),6==itemDesign.value&&(itemClass.value+="  bg-gradient-to-b from-notok to-pink-400 bg-clip-text [-webkit-text-fill-color:transparent]");const item=ref(null),itemContent=ref("");return onMounted((()=>{itemContent.value=item.value.innerHTML})),{itemClass:itemClass,item:item,itemContent:itemContent}},template:'\n        <div class="util-text" :class="itemClass" :data="itemContent" ref="item">\n            <slot></slot>\n        </div>\n    '}),app.component("layout-grid",{props:{columns:String,columnsMd:String,gap:String,class:String},setup(props,context){const columns=props.columns||4;return{columns:columns,columnsMd:props.columnsMd||columns,gap:props.gap||2,itemClass:props.class||""}},template:"\n        <div :class=\"[\n            'layoutGrid',\n            'grid',\n            'grid-cols-'+columns,\n            'md:grid-cols-'+columnsMd,\n            'gap-'+gap,\n            'rounded-xl max-w-full',\n            itemClass\n        ]\">\n            <slot></slot>\n        </div>\n        "}),app.component("layout-box",{props:{class:String,design:[Number,String],img:String},setup(props,context){const itemDesign=ref(" rounded-xl ");if(null!=props.design){let boxdesign=" p-4 border border-gray-200 flex justify-center items-center aspect-square";props.design,"1"==props.design&&(boxdesign=" p-2 flex justify-center items-center"),"2"==props.design&&(boxdesign=" p-2"),itemDesign.value+=boxdesign}const itemClass=ref(props.class||"");props.img&&(itemClass.value+="w-full h-full bg-cover bg-no-repeat bg-center relative");return{itemClass:itemClass,itemDesign:itemDesign,itemBgImg:props.img?"background-image:url("+props.img+")":""}},template:'\n        <div :class="[\n            \'layoutBox max-w-full\',\n            itemDesign,\n            itemClass\n        ]"\n            :style="itemBgImg"\n        >\n            <slot></slot>\n        </div>\n        '}),app.component("layout-img",{props:{class:String,img:String,imgVariable:String},setup(props,context){const itemClass=ref(props.class||""),itemImg=ref(props.img),itemImgVariable=ref(props.imgVariable);return itemImgVariable.value&&(itemImg.value=itemImgVariable.value),{itemClass:itemClass,itemImg:itemImg}},template:'\n        <img :src="itemImg" :class="itemClass">\n        '}),app.component("module-check",{props:{answer:Number,class:String,options:Array,float:String,allok:Boolean,useclass:Boolean},setup(props,context){const ODA=inject("ODA"),RESULTS=inject("RESULTS"),finalized=ref(!1),result=ref(),options=["",...props.options],item=ref(null),itemClass=ref(props.class||""),itemCheckClass=ref(""),useclass=ref(props.useclass||!1);if(null==props.float||""==props.float);else{itemCheckClass.value+="absolute z-10 ";let pos="top-2 left-2";"topleft"==props.float&&(pos=" top-2 left-2 "),"topright"==props.float&&(pos=" top-2 right-2 "),"bottomleft"==props.float&&(pos=" bottom-2 left-2 "),"bottomright"==props.float&&(pos=" bottom-2 right-2 "),itemCheckClass.value+=pos}const active=ref(0);return emitter.on("finalize",(e=>{finalized.value=!0,props.allok||props.answer==active.value?(result.value=!0,RESULTS.oks++):(result.value=!1,RESULTS.errors++)})),onMounted((()=>{ODA.modules.check.push(item.value)})),{item:item,itemClass:itemClass,itemCheckClass:itemCheckClass,options:options,clicked:()=>{if(finalized.value)return!1;active.value+=1,s_select.play(),active.value>options.length-1&&(active.value=0)},active:active,finalized:finalized,result:result,useclass:useclass}},template:'\n        <div :class="[\n                \'moduleCheck\',\n                \'flex cursor-pointer items-center relative rounded\',\n                itemClass,\n                useclass?options[active]:\'\'\n            ]"\n            @click="clicked"\n            ref="item"\n        >\n            <util-result :result="result" v-if="finalized" />\n            <div :class="[\n                \'module-check-box\',\n                \'w-9 h-9 flex items-center justify-center mr-2 rounded-full\',\n                \'border-2 border-solid border-clear\',\n                \'bg-white shadow-oda\',\n                itemCheckClass\n            ]" v-if="!useclass">\n                <template v-for="(icon, index) in options">\n                    <template v-if="index==active ">\n                        <oda-icon :name="icon" v-if="icon"  />\n                    </template>\n                </template>\n            </div>\n            <slot></slot>\n        </div>\n        '}),app.component("module-drag",{props:{class:String,answer:String,liner:String,design:String,connector:String,allok:Boolean,onlyOk:Boolean,onlyError:Boolean},setup(props,context){const ODA=inject("ODA"),RESULTS=inject("RESULTS"),finalized=ref(!1),result=ref(null);(Math.random()+1).toString(36).substring(7);const item=ref(null),draggable=ref(),itemClass=(ref([]),ref(props.class||" ")),itemParent=ref(),liner=ref(null),connectorClass=ref(""),themeColors=tailwind.config.theme.extend.colors,themeColorsArray=Object.keys(themeColors),itemColor=ref(themeColors[themeColorsArray[Math.floor(5*Math.random())]]),hasLiner=null!=props.liner&&"0"!=props.liner&&0!=props.liner,hasConnector=null!=props.connector&&"0"!=props.connector&&0!=props.connector;onMounted((()=>{ODA.modules.drag.push(item.value),itemParent.value=item.value.parentNode,itemParent.value.classList.add("z-10"),draggable.value=Draggable.create(item.value,{autoScroll:1,onClick:function(e){return!finalized.value&&(item.value.parentNode!=itemParent.value&&(itemParent.value.appendChild(item.value),updateLiner("hide"),void updateFitty()))},onDrag:function(e){if(finalized.value)return!1;updateLiner("show"),updateLiner()},onDragEnd:function(e){if(finalized.value)return!1;let wasDropped=!1;for(let dropzone of ODA.modules.dropzone){let candrop=dropzone.__vueParentComponent.ctx.candrop();this.hitTest(dropzone,"50%")&&candrop?(dropzone.appendChild(item.value),gsap.to(item.value,{x:0,y:0,duration:0,onComplete:function(e){}}),s_select.play(),wasDropped=!0,updateFitty()):gsap.to(item.value,{x:0,y:0,duration:.3,onComplete:function(e){updateLiner()}})}wasDropped||item.value.parentNode==itemParent.value&&updateLiner("hide")}}),hasLiner&&(liner.value=new LeaderLine(itemParent.value,item.value,{dash:!0,color:itemColor.value}),liner.value.setOptions({startSocket:"auto",endSocket:"auto"}),window.addEventListener("scroll",AnimEvent.add((function(){updateLiner()})),!1),liner.value.hide("none"))}));const updateLiner=action=>{hasLiner&&(action?liner.value[action]("draw"):liner.value.position())},updateFitty=()=>{item.value.classList.contains("fitty")&&setTimeout((()=>{fitty.fitAll()}),250)};if(null==props.design||0==props.design||"0"==props.design||"1"==props.design&&(itemClass.value+=" bg-white rounded p-2 shadow-oda text-center border-2 border-grey-100 border-solid w-fit min-w-[4rem] max-w-full flex justify-center items-center"),hasConnector){itemClass.value=" w-6 h-6";let connectorColor=" border-["+itemColor.value+"] ";""!=props.connector&&(connectorColor=" border-["+themeColors[themeColorsArray[props.liner]]+"] "),connectorClass.value+=connectorColor}emitter.on("finalize",(e=>{finalized.value=!0,draggable.value[0].disable();let currentParent=item.value.parentNode;props.allok?(result.value=!0,RESULTS.oks++):""==props.answer?currentParent==itemParent.value?finalizeResult(!0):finalizeResult(!1):currentParent==itemParent.value?finalizeResult(!1):currentParent.__vueParentComponent.ctx.answer==props.answer?finalizeResult(!0):finalizeResult(!1)}));const finalizeResult=isok=>{if(isok){if(props.onlyError)return!1;result.value=!0,RESULTS.oks++}else{if(props.onlyOk)return!1;result.value=!1,RESULTS.errors++}};return{item:item,itemClass:itemClass,connectorClass:connectorClass,finalized:finalized,result:result,hasLiner:hasLiner,hasConnector:hasConnector}},template:'\n        <div :class="[\'moduleDrag\', itemClass]" ref="item">\n            <template v-if="finalized">\n                <util-result :result="result" v-if="!onlyOk && !onlyError" />\n                <util-result :result="result" v-else-if="result===false && onlyError" />\n                <util-result :result="result" v-else-if="result===true && onlyOk" />\n\n            </template>\n            \n            <slot></slot>\n            <div \n                :class="[\n                    \'module-drag-connector\',\n                    \'w-6 h-6 rounded-full bg-white border-4 shadow-oda\',\n                    connectorClass,\n                ]"\n                v-if="hasConnector"></div>\n        </div>\n        '}),app.component("module-drop",{props:{class:String,answer:String,design:String,limit:String,noArrow:Boolean,horizontal:[Boolean]},setup(props,context){const ODA=inject("ODA"),itemClass=ref(props.class||" "),veticalHorizontal=ref("flex-col");1==props.horizontal&&(console.log("horizontal"),veticalHorizontal.value="flex-row"),itemClass.value+=" p-1 flex justify-center items-center gap-2 "+veticalHorizontal.value+" ";const item=ref(null),dropLimits=ref(0),noArrow=props.noArrow||!1;"1"==props.design&&(itemClass.value+=" rounded-xl border-dashed border-2 border-accent"),"0"!=props.limit&&props.limit?dropLimits.value=parseInt(props.limit):dropLimits.value=0;return onMounted((()=>{ODA.modules.dropzone.push(item.value)})),{item:item,itemClass:itemClass,candrop:()=>{let result=!0;const children=item.value.children.length-1;return result=0==dropLimits.value||children<dropLimits.value,result},noArrow:noArrow}},template:'\n        <div :class="[\'moduleDrop relative\', itemClass]" ref="item">\n            <slot></slot>\n            <oda-icon :name="noArrow?\'\':\'uil:arrow-down\'" class="absolute z-0 text-xl opacity-30" />\n        </div>\n    '}),app.component("module-input",{props:{answer:String,class:String,placeholder:String,allok:Boolean},setup(props,context){const ODA=inject("ODA"),RESULTS=inject("RESULTS"),finalized=ref(!1),result=ref(),item=ref(null),itemClass=ref(props.class||""),active=ref(),theanswer=props.answer;return emitter.on("finalize",(e=>{finalized.value=!0;let activeEVAL=active.value?active.value.toLowerCase():"";activeEVAL=activeEVAL.replace(/\.\s*$/,"");let answerEVAL=theanswer.toLowerCase();answerEVAL=answerEVAL.replace(/\.\s*$/,""),props.allok||activeEVAL==answerEVAL?(result.value=!0,RESULTS.oks++):(result.value=!1,RESULTS.errors++)})),onMounted((()=>{ODA.modules.input.push(item.value)})),{item:item,itemClass:itemClass,active:active,finalized:finalized,result:result}},template:'\n        <div :class="[\n                \'moduleInput\',\n                \' inline-block \',\n                itemClass\n            ]"\n            ref="item"\n        >\n            <util-result :result="result" v-if="finalized" />\n            <input v-model="active" :placeholder="placeholder" :readonly="finalized"\n                class="text-center w-full rounded border-clear border-2 shadow-oda focus:ring focus:ring-main focus:ring-opacity-50 p-1">\n        </div>\n        '}),app.component("module-select",{props:{answer:[Boolean,String],class:String,allok:Boolean},setup(props,context){const ODA=inject("ODA"),RESULTS=inject("RESULTS"),finalized=ref(!1),result=ref(),item=ref(null),itemClass=ref(props.class||""),active=ref(!1);let theanswer=props.answer;"string"==typeof props.answer&&(theanswer="true"==props.answer);return emitter.on("finalize",(e=>{finalized.value=!0,props.allok||active.value==theanswer?(result.value=!0,RESULTS.oks++):(result.value=!1,RESULTS.errors++)})),onMounted((()=>{ODA.modules.select.push(item.value)})),{item:item,itemClass:itemClass,select:()=>{if(finalized.value)return!1;active.value=!active.value,s_select.play()},active:active,finalized:finalized,result:result}},template:"\n        <div :class=\"[\n                'moduleSelect',\n                'min-w-[2rem] min-h-[2rem] cursor-pointer',\n                'flex justify-center items-center',\n                itemClass\n            ]\"\n            ref=\"item\"\n            @click=\"select\"\n        >\n            <util-result :result=\"result\" v-if=\"finalized\" />\n            <div class=\"relative w-full h-full flex justify-center items-center\">\n                <div :class=\"[\n                    'module-select-outline w-full h-full',\n                    'absolute z-50',\n                    (active?'ring-main ring-4 rounded-full':'')\n                    ]\"></div>\n                    <slot></slot>\n                </div>\n        </div>\n        "}),app.component("module-choice",{props:{class:String,answer:Number,allok:Boolean,options:Array},setup(props,context){const ODA=inject("ODA"),RESULTS=inject("RESULTS"),finalized=ref(!1),result=ref(),item=ref(null),itemClass=ref(props.class||""),active=ref(null);return emitter.on("finalize",(e=>{if(finalized.value=!0,props.allok)return result.value=!0,RESULTS.oks++,!1;props.answer==active.value?(result.value=!0,RESULTS.oks++):(result.value=!1,RESULTS.errors++)})),onMounted((()=>{ODA.modules.choice.push(item.value)})),{item:item,itemClass:itemClass,clicked:index=>{if(finalized.value)return!1;s_select.play(),active.value=index},active:active,finalized:finalized,result:result}},template:'\n    <div :class="[\n        \'moduleChoice\',\n        \'flex justify-evenly items-center flex-wrap gap-2\',\n        itemClass,\n    ]"\n    \n    ref="item">\n        <util-result :result="result" v-if="finalized" />\n        <template v-for="(option, index) in options">\n            \n            <div :class="[\n                \'moduleChoice-option\',\n                \'p-2 rounded-xl cursor-pointer bg-white shadow-oda\',\n                (active==index ? \'border-4 border-sec border-solid\': \'\')\n            \n            ]" @click="clicked(index)">\n                <slot name="option" v-bind="option"></slot>\n            </div>\n        </template>\n    </div>\n    \n    '}),app.component("module-customcode",{props:{class:String},setup(props,context){const ODA=inject("ODA"),RESULTS=inject("RESULTS"),finalized=ref(!1),result=ref(),item=ref(null),itemClass=ref(props.class||"");ref(),props.answer;return emitter.on("finalize",(e=>{finalized.value=!0,props.allok?(result.value=!0,RESULTS.oks++):(result.value=!1,RESULTS.errors++)})),onMounted((()=>{ODA.modules.customcode.push(item.value)})),{item:item,itemClass:itemClass,finalized:finalized,result:result,ODA:ODA}},template:'\n        <div :class="[\n                \'moduleCustomCode\',\n                \' \',\n                itemClass\n            ]"\n            ref="item"\n        >\n            <util-result :result="result" v-if="finalized" />\n            <p>Custom {{ODA}} </p>\n        </div>\n        '}),app.component("action-repeater",{props:{class:String,options:Array},setup(props,context){inject("ODA"),inject("RESULTS"),ref(!1),ref();const options=props.options;return{item:ref(null),itemClass:ref(props.class||""),options:options}},template:'\n        \n            <template v-for="(option, index) in options">\n                <slot name="option" v-bind="option"></slot>\n            </template>\n\n        '});