$(document).ready(function(){
        var termos = ["A gente ouçe", "Trankilo", "Intiligenti", "Mais milhó", "Fardamentas",
                      "Progama", "Pobremas", "Combustivé", "Eu não sô homi di mintira", "Nós coloquemu",
                      "Mais alto nivi", "Cássio", "PEC 300", "Isso não é verdade",
                      "Seu tempo acabou, candidato", "Vacina contra as drogas", "Mais uma inverdade, candidato",
                      "Solucionamento", "Mudéstia", "Conexão 30", "Niuma", "Falei com Lula e Dilma...",
                      "Me atrapalhou tudo aí", "Fardamentas", "Ispicial"];

        var $dialog_bingo = $("#dialog-bingo").dialog({modal: true, resizable: false, autoOpen: false});

        init();

        function init() {
            var seed = window.location.hash;

            if (seed == '') {
                seed = '#' + Math.floor(Math.random() * 1000);
                window.location = window.location + seed;
            }

            var tweet_message = "BINGO! Ganhei no #BingoDoZe com a cartela " + window.location + "! (por @vitorbaptista)";
            var dialog_message = "<p>Parabéns, você ganhou!<br/>Compartilhe no twitter.</p>";
            dialog_message += "<p><a class='twitter-share-button' data-count='horizontal' data-related='vitorbaptista' data-text='" + tweet_message;
            dialog_message += "' data-url='http://labs.vitorbaptista.com/bingodoze/' href='http://twitter.com/share'>";
            dialog_message += "Tweet</a></p>";
            $('#dialog-bingo').html(dialog_message);

            fillCards(seed);
        }

        function fillCards(seed){
            var shuffle = function() { return 0.5 - Math.seedrandom(seed) };
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
                $dialog_bingo.dialog('open');
        }

        $('td').click(function(){
                $(this).toggleClass('ativo');

                checkBingo();
         });


});
