$(document).ready(function(){
        var termos = ["A gente ouçe", "Trankilo", "Intiligenti", "Mais milhó", "Fardamentas",
                      "Progama", "Problemas", "Combustivé", "Eu não sô homi di mintira", "Nós coloquemu",
                      "Mais alto nivi", "Cássio", "PEC 300", "Isso não é verdade",
                      "Seu tempo acabou, candidato", "Vacina contra as drogas", "Mais uma inverdade candidato",
                      "Solucionamento", "Mudéstia", "Conexão 30", "Niuma", "Falei com Lula e Dilma...",
                      "Me atrapalhou tudo aí", "Fardamentas"];

        fillCards();

        function fillCards(){
            var shuffle = function() { return 0.5 - Math.random() };
            var termos_shuffled = termos.sort(shuffle);

            for(var i = 0; i<termos.length; i++){
                $('#cell'+i).html(termos_shuffled[i]);
            }
        }

        $('#newCard').click(function(){
                fillCards();
        });

        $('td').click(function(){
                var toggle = this.style;
                toggle.backgroundColor = toggle.backgroundColor? "":"#333";
                toggle.color = toggle.color? "":"#fff";
         });

});

