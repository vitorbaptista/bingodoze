$(document).ready(function(){
        var masks = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096,
                     8192, 16384, 32768, 65536, 131072, 262144, 524288,
                     1048576, 2097152, 4194304, 8388608, 16777216]

        var termos = ["A gente ouçe", "Trankilo", "Intiligenti", "Mais milhó", "Fardamentas",
                      "Progama", "Pobremas", "Combustivi", "Eu não sô homi di mintira", "Nós coloquemu",
                      "Mais alto nivi", "Cássio", "PEC 300", "Isso não é verdade",
                      "Seu tempo acabou, candidato", "Vacina contra as drogas", "Mais uma inverdade, candidato",
                      "Solucionamento", "Mudéstia", "Conexão 30", "Niuma", "Falei com Lula e Dilma...",
                      "Me atrapalhou tudo aí", "Fardamentas", "Ispicial", "Ispicializada", "Minerial",
                      "Devo dizer que", "Binifício", "Na realidade", "Ranquingui", "Poço de Águas Profundas",
                      "Ricurso", "Probema", "Descobrir o céu com a peneira", "Canidato", "Ispicialmente",
                      "Reconstrução é construção", "Ricibi", "Crementino Fraga", "Governo Anterior",
                      "A minha assessoria", "Herança Maldita", "Os milhores"];

        var dialog_bingo = $("#dialog-bingo").dialog({modal: true, resizable: false, autoOpen: false});

        init();

        function init() {
            var seed = window.location.hash.replace(/-.*/, '');

            if (seed == '') {
                seed = '#' + Math.floor(Math.random() * 1000000);
                window.location = window.location + seed;
            }

            var mask = parseInt(window.location.hash.replace(seed + '-', ''), 16);
            maskToCartela(mask);
            $('#nova-cartela').attr('href', window.location.href.replace(/#.*/g, ''));

            fillCards(seed);
        }

        function cartelaToMask() {
            var mask = 0;

            for (var i = 0; i <= 24; i++) {
                if ($('#cell'+i).hasClass('ativo'))
                    mask |= masks[i];
            }

            return mask;
        }

        function maskToCartela(mask) {
            for (var i = 0; i <= 24; i++) {
                if (mask & masks[i])
                    $('#cell'+i).addClass('ativo');
            }
        }

        function fillCards(seed){
            Math.seedrandom(seed);
            var shuffle = function() { return 0.5 - Math.random(); };
            var termos_shuffled = termos.sort(shuffle);

            for(var i = 0; i<=24; i++){
                // Pula a imagem de Maranhão
                if (i == 12)
                    continue;

                $('#cell'+i).html(termos_shuffled[i]);
            }
        }

        function bingo() {
            var tweet_message = "BINGO! Ganhei no #BingoDoZe com a cartela " + window.location + " (via @bingodoze)";
            tweet_message = urlencode(tweet_message);
            var dialog_message = "<p>Parabéns, você ganhou!<br/>";
            dialog_message += "<a href='http://twitter.com/?status=" + tweet_message + "' target='_blank'>Compartilhe pelo twitter.</a></p>";
            $('#dialog-bingo').html(dialog_message);

            dialog_bingo.dialog('open');
        }

        function urlencode(str) {
            // http://kevin.vanzonneveld.net

            str = (str+'').toString();
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
                                           replace(/\)/g, '%29').replace(/\*/g, '%2A');
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
                bingo();
        }

        $('td').click(function(){
                $(this).toggleClass('ativo');
                var mask = cartelaToMask().toString(16);
                var href_without_mask = window.location.href.replace(/-.*/g, '');
                window.location.href = href_without_mask + '-' + mask;

                checkBingo();
         });


});
