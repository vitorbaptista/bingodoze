$(document).ready(function(){
        var termos = ["A gente ouçe", "Trankilo", "Intiligenti", "Mais milhó", "Fardamentas",
                      "Progama", "Pobremas", "Combustivé", "Eu não sô homi di mintira", "Nós coloquemu",
                      "Mais alto nivi", "Cássio", "PEC 300", "Isso não é verdade",
                      "Seu tempo acabou, candidato", "Vacina contra as drogas", "Mais uma inverdade candidato",
                      "Solucionamento", "Mudéstia", "Conexão 30", "Niuma", "Falei com Lula e Dilma...",
                      "Me atrapalhou tudo aí", "Fardamentas", "Ispicial"];

        fillCards();

        function fillCards(){
            var shuffle = function() { return 0.5 - Math.random() };
            var termos_shuffled = termos.sort(shuffle);

            for(var i = 0; i<=24; i++){
                // Pula a imagem de Maranhão
                if (i == 12)
                    continue;

                $('#cell'+i).html(termos_shuffled[i]);
            }
        }

        function checkBingo() {
            var horizontal = false;
            for (var i = 0; i <= 4; i++) {
                var esta_horizontal = true;
                for (var j = i; j <= 24; j += 5) {
                    if (!($('#cell'+j).hasClass('ativo')))
                        esta_horizontal = false;
                }
                horizontal = esta_horizontal;

                if (horizontal)
                    break;
            }

            var vertical = false;
            for (var i = 0; i <= 20; i += 5) {
                var esta_vertical = true;
                for (var j = i; j <= i + 4; j++) {
                    if (!($('#cell'+j).hasClass('ativo')))
                        esta_vertical = false;
                }

                vertical = esta_vertical;
                if (vertical)
                    break;
            }

            if (vertical || horizontal)
                $('#ganhou').html('GANHOU!');
            else
                $('#ganhou').html('');
        }

        $('td').click(function(){
                $(this).toggleClass('ativo');

                checkBingo();
         });
});
