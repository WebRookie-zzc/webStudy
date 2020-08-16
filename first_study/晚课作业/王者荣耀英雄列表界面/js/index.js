function init(heros, type) {
    heroSlide(heros);
    render(filter(heros, 'type',''));
}

init(heros, heroTypes);

