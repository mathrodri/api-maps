
/* 
descrição: função que incializa as outras funções
autor: victor
entrada: {
	funções para capturar informações e inicializar o mapa
}
saida: insere o mapa na tela com todas as informações
*/

function initialize() {

	var map;

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

			// chama o mapa do google

			initMap();
		}, function(erro) {
			alert('Por favor, ative a localização em seu navegador');
		});
	} else {
		alert('seu navegador não suporta geolocalização, atualize-o para usar nossa aplicação');
	}

	/* 
	descrição: instancia o mapa e o serviço de busca por distância
	autor: matheus e daniela
	entrada: {
		função para instanciar o mapa e o serviço
	}
	saida: mapa e serviço instanciado
	*/

	function initMap() {

		// cria um novo mapa setando onde ele ira ficar na página, o zoom e o a posição inicial
		// autor: matheus
		// entrada: {
		//	  userLocation: latitute e longitude do usuário
		//    zoom: a a proximação do mapa
		// }
		// saida: mapa com a posição inicial e aproximação instanciada

        map = new google.maps.Map(document.getElementById('map'), {
          center: userLocation,
          zoom: 15
		});

		// instancia o serviço de busca por distância, passando a localização do usuário,
		// o raio de busca e o nome dos locais a serem encontrados
		// autor: daniela
		// entrada: {
		//	  userLocation: latitute e longitude do usuário
		//    radius: raio de busca
		//    name: nome para procurar locais com essa palavra no nome
		// }
		// saida: serviço com nome, raio de busca e posição instanciada
		
		var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: userLocation,
          radius: 5000,
          name: 'motel'
        }, criaMarkers); // chama função que insere os maracadores correspondentes ás localizações
	}

	/* 
	descrição: cria marcadores para os locais correspondentes á pesquisa
	autor: victor
	entrada: {
		result: são os locais encontrados
		status: status se a localização foi feita com sucesso ou não
	}
	saida: marcadores iniciados
	*/
	
	function criaMarkers(results, status) {

		// verifica se o serviço está disponível

        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
	}

	/* 
	descrição: seta o local, o tipo de marcador a ser colocado e as informações do mesmo
	autor: matheus e daniela
	entrada: {
		place: posição do marcador no mapa
	}
	saida: marcadores posicionado
	*/
	
	function createMarker(place) {
		
        var infowindow = new google.maps.InfoWindow();

		// posiciona os marcadores no mapa

        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
		});

		// seta a informação de cada marcador
		
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});
    }

}

/* 
	descrição: adiciona evento para chamar o mapa pelo botão
	autor: daniela
	entrada: {
		funcão para adicionar evento ao botão
	}
	saida: evento adicionado
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