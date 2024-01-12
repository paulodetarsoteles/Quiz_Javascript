$(document).ready(function () {

    // Variável que vai armazenar as questões
    var questions = [{
        question: "Pergunta 1",
        choices: ["Opção 1", "Opção 2", "Opção 3"],
        correctAnswer: "Opção 1"
    }, {
        question: "Pergunta 2",
        choices: ["Opção 1", "Opção 2", "Opção 3"],
        correctAnswer: "Opção 2"
    }];

    // Variável que vai armazenar a quantidade de acertos
    var result = 0;

    // Variável que vai armazenar o HTML que os loops vão montar
    var questionsHTML = "";

    // Loop das questões
    for (var i = 0; i < questions.length; i++) {
        questionsHTML += '<div class="question" id="question' + (i + 1) + '">';
        questionsHTML += '<h4>' + questions[i].question + '</h4>';

        // Loop das escolhas
        for (var j = 0; j < questions[i].choices.length; j++) {
            questionsHTML += '<div class="form-check">';
            questionsHTML += '<input class="form-check-input" type="radio" name="q' + (i + 1) + '" value="' + questions[i].choices[j] + '">';
            questionsHTML += '<label class="form-check-label">' + questions[i].choices[j] + '</label>';
            questionsHTML += '</div>';
        }

        questionsHTML += '</div>';
    }

    // Reiniciar
    function reiniciarQuiz() {

        // Limpa as respostas
        $('.question').removeClass('correct-answer incorrect-answer');

        //Limpa o result e a div do result
        result = 0;
        $('.result').html('<div></div>');

        // Desmarca as seleções
        $('input[type="radio"]').prop('checked', false);

        // Oculta o finalizar
        $('#finishBtn').hide();

        // Ocultar o reiniciar
        $('#restartBtn').hide();

        // Mostrar o botão de verificar as respostas
        $('#submitBtn').show();
    }

    // Exibe o questionsHTML 
    $('#questions').html(questionsHTML);
    console.log('chamada do questions');

    // Função do botão de verificar as respostas
    $('#submitBtn').on('click', function () {

        // Validação se todas as perguntas foram respondidas
        var todasRespondidas = true;

        // az um loopinp pra verificar se todas foram respondidas
        for (var i = 0; i < questions.length; i++) {
            var resposta = $('input[name="q' + (i + 1) + '"]:checked').val();

            if (!resposta) {
                todasRespondidas = false;
                break;
            }
        }

        // Se alguma não foi respondida exibe o Alert
        if (!todasRespondidas) {
            alert('Por favor, responda todas as perguntas.');
            return;
        }

        // Verifica as respostas
        for (var i = 0; i < questions.length; i++) {
            var resposta = $('input[name="q' + (i + 1) + '"]:checked').val();

            if (resposta === questions[i].correctAnswer) {
                result++;
                $('#question' + (i + 1)).addClass('correct-answer');
            } else {
                $('#question' + (i + 1)).addClass('incorrect-answer');
            }
        }

        // Mostra o resultado
        $('.result').html('<div><p class="alert alert-info">Você acertou ' + result + ' de ' + questions.length + ' perguntas.</p></div>');

        // Esconde o botão de verificar respostas e 
        $('#submitBtn').hide();

        // Exiba os botões de reiniciar 
        $('#restartBtn').show();

        // Exiba os botões de finalizar
        $('#finishBtn').show();
    });

    // Botão de reiniciar
    $('#restartBtn').on('click', function () {
        reiniciarQuiz();
    });

    // Botão de finalizar (apenas fecha a aba)
    $('#finishBtn').addClass('btn btn-danger').on('click', function () {
        window.close();
    });
});
