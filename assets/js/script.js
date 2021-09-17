// busqueda  y recorrido de pokemones
$("document").ready(function () {
    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",
      type: "GET",
      dataType: "JSON",
      success: function (pokemones) {
        const lis = pokemones.results;
        const lisNombres = lis.map(function (el) {
          return el.name.toUpperCase();
        });
        // insertar los pokemones en el select
        lisNombres.forEach(function (element) {
          $("#selectPoke").append(
            `<option value="${element}">${element}</option>`
          );
        });
      }
    });
  
    // 
    $("#selectPoke").on("change", function (v) {
      const PokePoke = v.target.value;
      const selectedPoke = PokePoke.toLowerCase();

      fetchPokemonData(selectedPoke);

  // busqueda de imagenes
      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${selectedPoke}`,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
         
  // imagen frontal
          let PokemonFront = data.sprites.front_default;
          $("#PokeFront").attr("src", PokemonFront);
  // imagen trasera
          let PokemonBack = data.sprites.back_default;
          $("#PokeBack").attr("src", PokemonBack);
        

// DATOS
            // numero
            let PokeNumber = data.id;
            $('#numberPoke').text(PokeNumber);

          // nombre
          let nombrePoke = data.name.toUpperCase();
          $("#NamePoke").text(nombrePoke);
         
          // tipo
          let TipoPoke = data.types[0].type.name.toUpperCase();
            $('#typePoke').text(TipoPoke);


            // HABILIDAD

            var HabilidadPoke = data.abilities[0].ability.name.toUpperCase();
            $('#HabiPoke').text(HabilidadPoke);
          
                    
// ESTADISTICAS
    
          //  SALUD
         
          let SaludPoke = data.stats[0].base_stat;
          $("#healthPoke").text(SaludPoke);

          // PESO
           let PesoPoke = data.weight;
          $('#HeightPoke').text(PesoPoke + 'Kg');


          // ALTURA
          let AlturaPoke = data.height;
          $('#WeightPoke').text(AlturaPoke +'Mts');
            
          // ATAQUE
          let AtaquePoke= data.stats[3].base_stat;
          $("#AttackPoke").text(AtaquePoke);


          // DEFENSA

          let defensaPoke= data.stats[4].base_stat;
                $("#DefendingPoke").text(defensaPoke);

          // VELOCIDAD
          let VelocidadPoke = data.stats[5].base_stat;
          $("#SpeedPoke").text(VelocidadPoke);
                

 
           
          }
        });
      });
    });


  // GRAFICA
    var dict = {};
    var ctx = document.getElementById('chart-area').getContext('2d');

    function Draw(test)
    {
      console.log(test.length);

      var keys = Object.keys(test);
      var values = Object.values(test);

      
      console.log(keys);
      console.log(values);

      var data = {
            datasets: [{
              data: values,
              backgroundColor: palette('tol', values.length).map(function(hex) {
                return '#' + hex;
                
              
              })
            }],

  
            labels: keys
          };

      var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            
            options: {
              responsive: true
            }
          });

          
    }

    function fetchPokemonData(selectedPoke){

      dict = {};

      let url = "https://pokeapi.co/api/v2/pokemon/" + selectedPoke + "/"
      fetch(url)
      .then(response => response.json())
      .then(async function(data){
        if(data.types != null)
        {	
          
          for(var i=0;i<data.types.length;i++)
          {
            await fetchTypes(data.types[i].type.name, data.types[i].type.url);

            if(i == data.types.length-1)
            {
              console.log(dict.length);
              Draw(dict);
            }
          }
          
          
        }
      });
    }

    async function fetchTypes(name, typeUrl)
    {
      let url = typeUrl;
      
      await fetch(url)
      .then(response => response.json())
      .then(function(data){
        dict[name] = data.pokemon.length;
      });
    }
 
      
      
      
      
      
      
      
      