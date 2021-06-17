$(document).ready(function() {

    $(".button").click(function () { 
        const numeroIngresadoDelSuperHero = $(".numeroSuperHero").val();
        console.log(numeroIngresadoDelSuperHero);
        validarNumeroIngresado(numeroIngresadoDelSuperHero);
        $(".numeroSuperHero").val("");
        getNumeroDeSuperHero(numeroIngresadoDelSuperHero)
    });

    function validarNumeroIngresado(numeroDeSuperHeroIngresado) {
        const validacion = /^[0-9]{1,3}$/
        const valorTexto = true
        if(validacion.test(numeroDeSuperHeroIngresado) == false){
            alert("Debes ingresar un numero con un maximo de 3 digitos");
        }      
    }

    const getNumeroDeSuperHero = (numeroDeSuperHero) => {
        $.ajax ({
            type: "GET",
            url: "https://superheroapi.com/api.php/10221427051608855/" + numeroDeSuperHero,
            dataType: "json",
            success: function (dataDelHero){
                console.log(dataDelHero)
                $("#info_SupeHero").show();

                const imagenDelHero = dataDelHero.image.url;
                $("#hero-img").attr("src", imagenDelHero);
                const nombreDelSuperHero = dataDelHero.name;
                $("#nombre_hero").text("Nombre: " + nombreDelSuperHero )
                
                const conexionesDelSuperHero = dataDelHero.connections;
                $("#conexiones").text("Conexiones: " + conexionesDelSuperHero["group-affiliation"]);

                const ocupacionDelSuperHero = dataDelHero.work;
                $("#ocupacion").text("Ocupación: " + ocupacionDelSuperHero["occupation"]);

                const primeraAparicionDelHero = dataDelHero.biography;
                $("#primera_aparicion").text("Primera aparicion: " + primeraAparicionDelHero["first-appearance"])

                const alturaDeSuperHero = dataDelHero.appearance.height;
                $("#altura").text("Altura: " + alturaDeSuperHero.join(" inch - "));

                const pesoDelSuperHero = dataDelHero.appearance.weight;
                $("#peso").text("Peso: " + pesoDelSuperHero.join(" - "));

                const alianzasDelSuperHero = dataDelHero.biography;
                $("#alianzas").text("Alianzas: " + alianzasDelSuperHero.aliases);

                const publicacionDelHero = dataDelHero.biography.publisher;
                $("#publicado").text("Publicado por: " + publicacionDelHero)
                
                const estadisticasDePoder = dataDelHero.powerstats;
                console.log(estadisticasDePoder)

                const statsCombat = {
                    y: estadisticasDePoder.combat,
                    label: "Combat"
                }
                const statsDurability = {
                    y: estadisticasDePoder.durability,
                    label: "Durability"
                }
                const statsIntelligence = {
                    y: estadisticasDePoder.intelligence,
                    label: "Intelligence"
                }
                const statsPower = {
                    y: estadisticasDePoder.power,
                    label: "Power"
                }
                const statsSpeed = {
                    y: estadisticasDePoder.speed,
                    label: "Speed"
                }
                const statStrength = {
                    y: estadisticasDePoder.strength,
                    label: "Strength"
                }
                const dataPoints = [
                    statsCombat,
                    statsDurability,
                    statsIntelligence,
                    statsPower,
                    statsSpeed,
                    statStrength,
                ];
                console.log(dataPoints)
                renderChart(dataPoints, nombreDelSuperHero)
            }
        });
    };

    const renderChart = (dataPoints, nombreDelSuperHero) => {
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: `Estadisticas de ${nombreDelSuperHero}`
            },
            data: [{
                    type: "pie",
                    startAngle: 25,
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabel: "{label} - {y}",
                    dataPoints: dataPoints
                }]
        });
        chart.render();
    };
    
});

