$( "#radio" ).controlgroup({
    create: () => {
        $( "#btnColor" ).data(
            {
                'sliderRed': 0,
                'sliderGreen': 0,
                'sliderBlue': 0,
                'active': true,
            }
        );
        $( "#btnBg" ).data(
            {
                'sliderRed': 255,
                'sliderGreen': 255,
                'sliderBlue': 255,
                'active': false,
            }
        );

    }
});
$( "#sliderRed" ).slider({
    min: 0,
    max: 255,
    step: 1,
});
$( "#sliderGreen" ).slider({
    min: 0,
    max: 255,
    step: 1,
});
$( "#sliderBlue" ).slider({
    min: 0,
    max: 255,
    step: 1,
    create: () => {
        refreshSliders();
    }
});


$( "input" ).on("click", e => {
    $( `input:not(${e.target.id})` ).data({'active': false});
    $( e.target ).data({'active': true});
    refreshSliders();
})

$( '[class~="slider"]' ).on("slidechange", (e, ui) => handleSliderChange(e, ui));

function refreshSliders() {
    const activeInput = $( "#btnColor" ).data().active === true ? $( "#btnColor" ) : $( "#btnBg" );
    $( "#sliderRed" ).slider("value", activeInput.data("sliderRed"));
    $( "#sliderGreen" ).slider("value", activeInput.data("sliderGreen"));
    $( "#sliderBlue" ).slider("value", activeInput.data("sliderBlue"));
}

function handleSliderChange(e, ui) {
    const activeInput = $( "#btnColor" ).data().active === true ? $( "#btnColor" ) : $( "#btnBg" );
    const cssProp = activeInput[0].id === 'btnColor' ? 'color' : 'backgroundColor';
    activeInput.data(e.target.id.toString(), ui.value);
    $( "section.text" ).css(cssProp, `rgb(${activeInput.data("sliderRed")}, ${activeInput.data("sliderGreen")}, ${activeInput.data("sliderBlue")})`);
}