cd libs/js/ &&
terser tailwind.js mitt.js howler.js dom-to-image.js vue.prod.js --compress --timings -o ../../libs.js &&
cd ../../ &&
cd components/ &&
terser OdaTitulo.js OdaInstruccion.js OdaIcon.js OdaFinalizar.js Utilities.js LayoutGrid.js LayoutBox.js ModuleCheck.js   --compress --timings -o ../components.js &&
echo 'End'
