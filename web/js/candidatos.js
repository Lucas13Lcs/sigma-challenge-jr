$(document).ready(function () {
    var url;
    var items;
    var array;
    var id;
    var isPresidente;
    var endereco;


    var dadosCandidato = {};
    var dadosVice = {};

    var abaDados;
    var nomeCandidato;
    var cpfCandidato;
    var dtNascimentoCandidato;
    var sexoCandidato;
    var estCivilCandidato;
    var cidadeCandidato;
    var estadoCandidato;
    var ufCandidato;

    var fotoCandidatoVice;

    var abaCargo;
    var cargoCandidato;
    var partidoCandidato;
    var numeroCandidato;
    var candidaturaCandidato;
    var descricaoCandidato;
    var anoCandidatura;

    var abaPartido;
    var nomePartido;
    var siglaPartido;
    var numeroPartido;
    var coligacaoPartido;
    var composicaoPartido;

    var abaVice;
    var nomeVice;
    var cpfVice;
    var dtNascimentoVice;
    var sexoVice;
    var estCivilVice;
    var cidadeVice;
    var estadoVice;
    var ufVice;

    loader(1);
    setReferences();
    bindClick();

    getParametros();
    getUrlCandidato();
    getDadosCandidato();

    function getParametros() {
        url = window.location.search.replace("?", "");
        items = url.split("&");
        array = {
            'id': items[0],
            'is': items[1]
        }

        if (!array['id'] || !array['is']) {
            console.log('Retorne a tela inicial');
            window.location.href = "index.html";
        } else {
            id = array.id.split("=")[1];
            isPresidente = array.is.split("=")[1];
        }


    }

    function getUrlCandidato() {
        if (isPresidente == 1) {
            endereco = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/BR/2022802018/candidato/' + id;
        } else {
            endereco = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/MT/2022802018/candidato/' + id;
        }
        console.log('endereco: ' + endereco);
    }

    function getUrlVice() {
        var url;
        if (isPresidente == 1) {
            url = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/BR/2022802018/candidato/' + dadosCandidato.vices[0].sq_CANDIDATO;
        } else {
            url = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/MT/2022802018/candidato/' + dadosCandidato.vices[0].sq_CANDIDATO;
        }
        console.log('url vice: ' + url);
        return url;
    }

    function getDadosCandidato() {

        $.ajax({
            url: endereco,
            method: 'get',
            success: function (data) {
                dadosCandidato = data;
                console.log(dadosCandidato);
                views(1);

                loader(2);

                if (dadosCandidato.cargo.nome == "Deputado Estadual" || dadosCandidato.cargo.nome == "Deputado Federal") {
                    //esconde a aba vice
                    console.log('Não tem vice');
                    abaVice.classList.add('hidden');
                } else {
                    console.log('Tem vice');
                    abaVice.classList.remove('hidden');
                    getDadosVice();
                }

            }
        });

    }

    function getDadosVice() {
        var urlVice = getUrlVice();
        $.ajax({
            url: urlVice,
            method: 'get',
            success: function (data) {
                dadosVice = data;
                console.log(dadosVice);
            }
        });
    }

    function setReferences() {
        abaDados = document.getElementById('abaDadosCandidato');
        abaCargo = document.getElementById('abaCargoCandidato');
        abaPartido = document.getElementById('abaPartidoCandidato');
        abaVice = document.getElementById('abaViceCandidato');

        /* aba dados pessoais*/
        nomeCandidato = document.getElementById('nomeCandidato');
        cpfCandidato = document.getElementById('cpfCandidato');
        dtNascimentoCandidato = document.getElementById('dtNascimentoCandidato');
        sexoCandidato = document.getElementById('sexoCandidato');
        estCivilCandidato = document.getElementById('estCivilCandidato');
        cidadeCandidato = document.getElementById('cidadeCandidato');
        estadoCandidato = document.getElementById('estadoCandidato');
        ufCandidato = document.getElementById('ufCandidato');
        fotoCandidatoVice = document.getElementById('fotoCandidatoVice');


        /* aba cargo */
        cargoCandidato = document.getElementById('cargoCandidato');
        partidoCandidato = document.getElementById('partidoCandidato');
        numeroCandidato = document.getElementById('numeroCandidato');
        candidaturaCandidato = document.getElementById('candidaturaCandidato');
        descricaoCandidato = document.getElementById('descricaoCandidato');
        anoCandidatura = document.getElementById('anoCandidato');

        /* aba partido */
        nomePartido = document.getElementById('nomePartido');
        siglaPartido = document.getElementById('siglaPartido');
        numeroPartido = document.getElementById('numeroPartido');
        coligacaoPartido = document.getElementById('coligacaoPartido');
        composicaoPartido = document.getElementById('composicaoPartido');

        /* aba vice */
        nomeVice = document.getElementById('nomeVice');
        cpfVice = document.getElementById('cpfVice');
        dtNascimentoVice = document.getElementById('dtNascimentoVice');
        sexoVice = document.getElementById('sexoVice');
        estCivilVice = document.getElementById('estCivilVice');
        cidadeVice = document.getElementById('cidadeVice');
        estadoVice = document.getElementById('estadoVice');
        ufVice = document.getElementById('ufVice');
    }

    function bindClick() {
        $(abaDados).click(clickAbaDados);
        $(abaCargo).click(clickAbaCargo);
        $(abaPartido).click(clickAbaPartido);
        $(abaVice).click(clickAbaVice);

        function clickAbaDados() {
            console.log('click aba dados!');
            views(1);
        }

        function clickAbaCargo() {
            console.log('Click aba cargo!');
            views(2);
        }

        function clickAbaPartido() {
            console.log('Click aba partido!');
            views(3);
        }

        function clickAbaVice() {
            console.log('Click aba vice');
            views(4);
        }

    }

    function views(param) {

        switch (param) {
            case 1:
                /* aba Dados*/
                $(nomeCandidato).val(dadosCandidato.nomeCompleto || '');
                $(cpfCandidato).val(cpf(dadosCandidato.cpf) || '');
                $(dtNascimentoCandidato).val(toRegionDate(dadosCandidato.dataDeNascimento) || '');
                $(sexoCandidato).val(dadosCandidato.descricaoSexo || '');
                $(estCivilCandidato).val(dadosCandidato.descricaoEstadoCivil || '');
                $(cidadeCandidato).val(dadosCandidato.nomeMunicipioNascimento || '');
                $(estadoCandidato).val(dadosCandidato.descricaoNaturalidade || '');
                $(ufCandidato).val(dadosCandidato.sgUfNascimento || '');
                $(fotoCandidatoVice).attr("src", dadosCandidato.fotoUrl || '');


                break;
            case 2:
                /* aba  Cargo */
                $(cargoCandidato).val(dadosCandidato.cargo.nome || '');
                $(partidoCandidato).val(dadosCandidato.partido.nome || '');
                $(numeroCandidato).val(dadosCandidato.partido.numero || '');
                $(candidaturaCandidato).val(dadosCandidato.descricaoSituacao || '');
                $(descricaoCandidato).val(dadosCandidato.descricaoTotalizacao || '');
                $(anoCandidatura).val(dadosCandidato.eleicao.ano || '');
                $(fotoCandidatoVice).attr("src", dadosCandidato.fotoUrl || '');

                break;
            case 3:
                /* aba  partido */
                $(nomePartido).val(dadosCandidato.partido.nome || '');
                $(siglaPartido).val(dadosCandidato.partido.sigla || '');
                $(numeroPartido).val(dadosCandidato.partido.numero || '');
                $(coligacaoPartido).val(dadosCandidato.nomeColigacao || '');
                $(composicaoPartido).val(dadosCandidato.composicaoColigacao || '');
                $(fotoCandidatoVice).attr("src", dadosCandidato.fotoUrl || '');

                break;
            case 4:
                /* aba  vice */
                $(nomeVice).val(dadosVice.nomeCompleto || '');
                $(cpfVice).val(cpf(dadosVice.cpf) || '');
                $(dtNascimentoVice).val(toRegionDate(dadosVice.dataDeNascimento) || '');
                $(sexoVice).val(dadosVice.descricaoSexo || '');
                $(estCivilVice).val(dadosVice.descricaoEstadoCivil || '');
                $(cidadeVice).val(dadosVice.nomeMunicipioNascimento || '');
                $(estadoVice).val(dadosVice.descricaoNaturalidade || '');
                $(ufVice).val(dadosVice.sgUfNascimento || '');
                $(fotoCandidatoVice).attr("src", dadosVice.fotoUrl || '');

                break;
        }
    }

    function loader(param) {
        if (param == 1) {
            //mostrar loader
            document.getElementById('idContainerPricipal').innerHTML = "<center><img src='img/loader.gif'></center>";
        } else {
            //esconder loader
            document.getElementById('idContainerPricipal').innerHTML = "";
        }
    }


    function toRegionDate(data) {

        if (data) {
            var dia = '',
                mes = '',
                ano = '';

            dia = data.substring(8, 10);
            mes = data.substring(5, 7);
            ano = data.substring(0, 4);

            return dia + '/' + mes + '/' + ano;
        } else {
            return '';
        }
    }

    function cpf(value) {
        var regChar = /\D/g;
        value = value.replace(regChar, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco de números)
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
        return value;
    }


});