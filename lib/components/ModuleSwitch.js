app.component("module-switch", {
  props: {
    autoplay: String,
    class: String,
    navigation: Boolean,
    button: Boolean,
    arrows: [Boolean, String],
    buttonIcon: String,
  },
  setup(props, context) {
    const ODA = inject("ODA");
    const instance = getCurrentInstance();
    const item = ref();
    const itemClass = props.class || "";
    const contextSlots = ref();
    const ready = ref(true);

    const current = ref(0);

    const nextS = () => {
      readyTimer();
      if (current.value < contextSlots.value.length - 1) {
        current.value += 1;
        s_select.play()
      } else {
        current.value = 0;
      }
    };
    const prevS = () => {
      readyTimer();
      if (current.value > 0) {
        current.value -= 1;
        s_select.play()
      } else {
        current.value = contextSlots.value.length - 1;
      }
    };

    const readyTimer = () => {
      ready.value = false;
      setTimeout(() => {
        ready.value = true;
      }, 4);
    };

    const positionClass = ref("flex ");

    onMounted(() => {
      ODA.modules.switch.push(item.value);
      contextSlots.value = context.slots.default();
    });

    const completed = () => {
      if (instance.parent.ctx.eventCompleted) {
        instance.parent.ctx.eventCompleted();
      }
    };

    if (props.autoplay != "0" && props.autoplay != "") {
      setInterval(() => {
        nextS();
      }, parseInt(props.autoplay) * 1000);
    }

    return () =>
      h(
        "div",
        {
          ref: "item",
          class: ["moduleSwitch", itemClass],
        },

        

        //Change BTN
        [
          props.button
            ? h(
                "div",
                {
                  class: [
                    "bg-white w-7 h-7 rounded-full flex justify-center items-center shadow-oda hover:bg-gray-100  hover:scale-150 hover:shadow-lg duration-300",
                  ],
                  onClick(event) {
                    nextS();
                  },
                },
                h("span", { class: "iconify cursor-pointer", "data-icon": props.buttonIcon || "fxemoji:clockwiseleftrightarrows", })
              )
            : "",
          
            h("div", { class: ['flex justify-center items-center relative']},
              [
                //ARROW L
                (props.arrows!=undefined && props.arrows==true)?
                  h('div', {onClick(e){prevS()}, class:['absolute -left-8 moduleSwitchArrow bg-white w-6 h-6 rounded-full flex justify-center items-center shadow-oda hover:bg-gray-100  hover:scale-150 hover:shadow-lg duration-300']}, 
                    h("span", { class: "iconify cursor-pointer", "data-icon": "bxs:left-arrow" })
                  )
                : "",
                //CONTENT
                ready.value ? context.slots.default()[current.value] : "",
                //ARROW R
                (props.arrows!=undefined && props.arrows==true)?
                  h('div', {onClick(e){nextS()}, class:['absolute -right-8 moduleSwitchArrow bg-white w-6 h-6 rounded-full flex justify-center items-center shadow-oda hover:bg-gray-100  hover:scale-150 hover:shadow-lg duration-300']}, 
                    h("span", { class: "iconify cursor-pointer", "data-icon": "bxs:right-arrow" })
                  )
                : ""
              ]
            ),

          //NAVIGATION
          props.navigation
            ? h(
                "div",
                {
                  class: ["moduleSwitchNav flex justify-center gap-1"],
                },
                context.slots.default().map((item, index) => {
                  return h("div", {
                    onClick(event) {
                      current.value = index;
                      readyTimer();
                    },
                    class: [
                      "w-3 h-3 rounded-full bg-white cursor-pointer hover:shadow-oda",
                      current.value == index ? "bg-main shadow-oda" : "",
                    ],
                  });
                })
              )
            : "",
        ]




      );
  },
});
