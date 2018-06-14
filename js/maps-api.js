
/* 
descrição: Testa se o navegador possui geolocalização
autor: victor
entrada: {
	navigator: objeto que contem informações e funções nativas do navegador
	geolocation: objeto que contem funções para geolocalização
}
saida: informa se o navegador possui geolocalização
*/

if('geolocation' in navigator) {
	
	/* 
	descrição: captua a localização do usuário
	autor: victor
	entrada: {
		position: objeto que contem as informações de localização
	}
	saida: latitude e longitude do usuário
	*/
	
	navigator.geolocation.getCurrentPosition(function(position){

		// armazena a latitude e longitude do usuário

		var userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};

		// exibe a latitude e longitude

		alert('latitude: ' + userLocation.lat + ' longitude: ' + userLocation.lng);
	}, function(erro) {
		alert('Por favor, ative a localização em seu navegador');
	});
} else {
	alert('seu navegador não suporta geolocalização, atualize-o para usar nossa aplicação');
}