mapboxgl.accessToken = 'pk.eyJ1IjoiZGF1cmVuY2hpayIsImEiOiJja3VtZG5sc3kzcXN2MzFtb2M4ZmFqcnkwIn0.1vqd4yRj8i98jKzupMKN2w';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [2.3364, 48.86091],
    zoom: 15.75,
    attributionControl: false,
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.AttributionControl({
    customAttribution: 'daurepchik'
}));

const markers = [
    [2.3364, 48.86091],
    [2.3333, 48.8602],
    [2.3397, 48.8607],
    [2.3330, 48.8619],
    [2.3365, 48.8625]
]

for (let i in markers) {
    if (i == 0) {
        new mapboxgl.Marker({
            color: "#171717",
        })
            .setLngLat(markers[i])
            .addTo(map);
    } else {
        new mapboxgl.Marker({
            color: "#757575",
        })
            .setLngLat(markers[i])
            .addTo(map);
    }
}