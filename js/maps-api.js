/* 
descrição: função que realiza o contato com a api
autor: victor
entrada: {
	funções para capturar informações e inicializar o mapa
}
saida: insere o mapa na tela com todas as informações
*/

function initialize() {

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

}

/* 
	descrição: adiciona evento para chamar o mapa pelo botão
	autor: daniela
	entrada: {}
	saida:
*/

function addEvent() {

	// captura o botão

	var btn = document.querySelector('button');

	// verifica se o botão já foi carregado

	if(typeof(btn) !== "undefined") {

		// adiciona evento click ao botão

		btn.addEventListener('click', function() {
			initialize();
		});
	} else {

		// chama a função novamente dentro de 1 segundo

		setTimeout(addEvent(), 1000);
	}

}