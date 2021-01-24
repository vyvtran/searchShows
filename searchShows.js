const form = document.querySelector('#searchForm');


const resetImages = () => {
    const allImages = document.querySelectorAll('IMG');

    for (let currentImage of allImages) {
        currentImage.remove();
    }
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    resetImages();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}