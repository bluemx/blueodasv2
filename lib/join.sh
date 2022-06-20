#terser mitt.js howler.js dom-to-image.js vue.prod.js anim-event.min.js anim-event.min.js leader-line.js gsap.min.js Draggable.min.js tailwind.js --compress --timings -o ../libs.js &&
cd jslibs/ &&
terser mitt.js howler.js dom-to-image.js vue.prod.js anim-event.min.js anim-event.min.js leader-line.js gsap.min.js Draggable.min.js fitty.js lottie-player.js bodymovin.js lottie-interactivity.js plyr.js spltjs.js  tailwind.js anime.js fworks.js --timings -o ../libs.js &&
cd ../ &&
cd components/ &&
terser OdaTitulo.js OdaInstruccion.js OdaIcon.js OdaFinalizar.js Utilities.js LayoutGrid.js LayoutBox.js LayoutImg.js ModuleCheck.js ModuleDrag.js ModuleInput.js ModuleSelect.js ModuleChoice.js ModuleCustomCode.js ModuleAudiotext.js ModuleLottie.js ActionRepeater.js ActionDelay.js ActionTimeline.js AVStart.js AVEnd.js AVScene.js AVInfo.js AVActivity.js AVScorebox.js AVButton.js  --compress --timings -o ../components.js &&
echo 'End'
