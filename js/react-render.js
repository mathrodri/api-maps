// cria um componente react

ReactDOM.render(

        // cria a estrutura html

        <main>
            <h1>Encontre o Motel</h1>
            <p> 
                Está precisando de um lugar mais reservado ? <br/>
                Encontre a solução mais próxima de você !
            </p>
            <button>Localizar</button>
            <div id="map">
            </div>
        </main>,

        // seta onde ira ser colocada a estrutura

        document.getElementById('root')
      );