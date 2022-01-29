function slickSlider(slideNumber) {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slideNumber,
        slidesToScroll: slideNumber,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };
    return settings;
}

export default slickSlider;
