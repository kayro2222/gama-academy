var dataApi;

window.onload = async function(){
	await getData();
	await map();
}

async function getData(){
	await fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
	.then(async response => await response.json())
	.then(async data => {
		dataApi = await data.filter(res => {
			res.lat = '-6.23' + Math.floor(1000 + Math.random() * 9000);
			res.lon = '-35.05' + Math.floor(1000 + Math.random() * 9000);
			return res;
		});
		console.log('dataApi', dataApi);

		buildHtml(dataApi);

	})
	.catch(error => console.error(error))
}

async function buildHtml(dataApi){
	var htmlFormatted = '';

	await dataApi.filter(data => {
		htmlFormatted += '<div class="card">'+
		'<div class="card-img">'+
		'<img src="'+data.photo+'" alt="">'+
		'</div>'+
		'<div class="card-info">'+
		'<div class="house-info">'+
		'<b>SUPERHOST</b>'+
		'<p>'+data.property_type+'</p>'+
		'</div>'+
		'<div class="house-description">'+
		'<h2>'+data.name+'</h2>'+
		'</div>'+
		'<div class="house-equipment">'+
		'2 hóspedes · 1 quarto · 1 cama · 1 banheiro e meio · Ar-condicionado · Wifi · Cozinha'+
		'</div>'+
		'</div>'+
		'<div class="price-info">'+
		'<div class="rating">'+
		'<i class="fa fa-star"></i>'+
		'4,73<span class="rating-qtd">(134)</span>'+
		'</div>'+
		'<div class="price">'+
		'<b>R$'+data.price+',00</b>/noite'+
		'</div>'+
		'</div>'+
		'</div>';
	});

	document.getElementById('content').innerHTML = htmlFormatted;
}

async function map(){
	var mymap = L.map('mapid').setView([-6.2350229, -35.0500914], 14.0);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2F5cm8yMjIyIiwiYSI6ImNrYTFqdTlmaTAxZWgzZXBqNW9ydW1icjEifQ.aUiQc-5sJvP1lXJM_n4skQ', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'your.mapbox.access.token'
	}).addTo(mymap);

	await dataApi.filter(data => {
		L.marker([data.lat, data.lon]).addTo(mymap);
	});
}


	

	