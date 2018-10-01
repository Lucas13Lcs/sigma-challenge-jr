$(document).ready(function () {

    var dropdownCargo;
    var arrayDropdownCargo;

    var tempoNotificacao;

    var btnToggleMenu;
    var dropdown;
    var divPrincipal;

    var btnBuscar;
    var nomeCandidato;
    var numeroCandidato;

    var alerta;
    var mensagemErro;

    var itensLista;

    var objBusca = {
        nomeCompleto: '',
        numero: '',
        sigla: ''
    };
    var arrCandidatos = new Array();
    var filtrados = new Array();

    setReferences();
    initDropDown();
    bindClick();

    function setReferences() {

        btnToggleMenu = document.getElementById('btnToggleMenu');
        dropdown = document.getElementById('dropCargo');

        divPrincipal = document.getElementById('slides-item-principal');

        alerta = document.getElementById('alertaErro');
        mensagemErro = document.getElementById('mensagemErro');

        btnBuscar = document.getElementById('btnBuscarCargo');
        nomeCandidato = document.getElementById('nomeCandidatoBusca');
        numeroCandidato = document.getElementById('numeroCandidatoBusca');

        itensLista = document.getElementById('itensLista');

    }

    function bindClick() {
        dropdownCargo.bindClick(clickDropdownCargo);
        $(btnBuscar).click(clickBucarCargo);

        dropdown.addEventListener('mouseover', function () {
            $('#barra-navegacao').css({ 'height': '231px' });
        });

        dropdown.addEventListener('mouseout', function () {
            $('#barra-navegacao').css({ 'height': '40px' });
        });


        function clickDropdownCargo(pos) {
            $('#nomeCargo').text(arrayDropdownCargo[pos]);
            console.log('cargoSelect: ' + arrayDropdownCargo[pos]);
            alerta.classList.add('hidden');
            arrCandidatos = [];

            console.log('pegou aqui');
            $('#barra-navegacao').css({ 'height': '229px' });

        }

        function clickBucarCargo() {
            objBusca = Object.assign({});

            alerta.classList.add('hidden');

            if (objBusca.cargo != 'Cargos') {

                objBusca.cargo = dropdownCargo.getEscolhida();
                objBusca.nomeCandidato = $(nomeCandidato).val();
                objBusca.numeroCandidato = $(numeroCandidato).val();

                showHideDiv(1);
                loadLista();
            } else {
                showMessagem('Selecione um cargo !')
                divPrincipal.classList.remove('hidden');
            }

        }

    }

    function initDropDown() {

        arrayDropdownCargo = ['Cargos', 'Presidente', 'Governador', 'Senador', 'Deputado Federal', 'Deputado Estadual'];
        dropdownCargo = new DropdownWidget('dropCargo', arrayDropdownCargo, arrayDropdownCargo[0], true);
        dropdownCargo.init();

    }

    function loadLista() {
        limparLista();
        loader(1);

        var endereco;

        arrayDropdownCargo = ['Cargos', 'Presidente', 'Governador', 'Senador', 'Deputado Federal', 'Deputado Estadual'];
        endereco = null;

        switch (objBusca.cargo) {
            case 'Cargos':
                console.log('Cargos');
                endereco = null;
                break;
            case 'Presidente':
                console.log('Presidente');
                endereco = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/BR/2022802018/1/candidatos';
                break;
            case 'Governador':
                console.log('Governador');
                endereco = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/MT/2022802018/3/candidatos';
                break;
            case 'Senador':
                console.log('Senador');
                endereco = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/MT/2022802018/5/candidatos';
                break;
            case 'Deputado Federal':
                console.log('Deputado Federal');
                endereco = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/MT/2022802018/6/candidatos';
                break;
            case 'Deputado Estadual':
                console.log('Deputado Estadual');
                endereco = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/MT/2022802018/7/candidatos';
                break;
        }

        if (endereco != null) {
            arrCandidatos = [];
            $.ajax({
                url: endereco,
                method: 'get',
                success: function (data) {
                    ///////////////////////////////////////////////////
                    loader(2);
                    ///////////////////////////////////////////////////
                    console.log('data: \n');
                    console.log(data);
                    if (data) {
                        for (var i = 0; i < data.candidatos.length; i++) {
                            arrCandidatos.push(data.candidatos[i]);
                        }
                    }

                    if (!objBusca.nomeCandidato == '' && !objBusca.numeroCandidato == '') {
                        //buscar pelo nome e pelo número
                        console.log('data.cargo.nome: ' + data.cargo.nome);
                        console.log('\ndropdownCargo.getEscolhida(): ' + dropdownCargo.getEscolhida());
                        if (data.cargo.nome == dropdownCargo.getEscolhida()) {

                            filtrados = arrCandidatos.filter(function (rest) {
                                if ((rest.nomeCompleto.toLowerCase().indexOf(objBusca.nomeCandidato.toLowerCase()) != -1) && rest.numero == objBusca.numeroCandidato) {
                                    return rest
                                }
                            });

                            if (filtrados.length == 0) {
                                showMessagem('Nenhum dado encontrado!');
                                showHideDiv(2);
                            } else {
                                limparLista();
                                writeItem(filtrados[0]);
                            }

                        }
                    } else if (!objBusca.nomeCandidato == '') {
                        //buscar pelo nome
                        console.log('objBusca.nomeCandidato.toLowerCase(): ' + objBusca.nomeCandidato.toLowerCase());

                        filtrados = arrCandidatos.filter(function (rest) {
                            return rest.nomeCompleto.toLowerCase().indexOf(objBusca.nomeCandidato.toLowerCase()) != -1;
                        });

                        limparLista();
                        for (var i = 0; i < filtrados.length; i++) {
                            console.log(filtrados[i].nomeCompleto);
                            writeItem(filtrados[i]);
                        }

                        if (filtrados.length == 0) {
                            showMessagem('Nenhum dado encontrado!');
                            showHideDiv(2);
                        }

                        filtrados = [];
                        console.log('filtrados: ' + filtrados);


                    } else if (!objBusca.numeroCandidato == '') {
                        //buscar pelo número
                        console.log('objBusca.numeroCandidato: ' + objBusca.numeroCandidato);

                        var cont = 0;
                        arrCandidatos.find(function (data) {
                            if (data.numero == objBusca.numeroCandidato) {
                                limparLista();
                                writeItem(data);
                                ++cont;
                            }
                        });

                        if (cont == 0) {
                            showMessagem('Nenhum dado encontrado!');
                            showHideDiv(2);
                        }

                    } else {
                        for (var i = 0; i < data.candidatos.length; i++) {
                            writeItem(arrCandidatos[i]);
                        }
                    }

                }
            });
        } else {

            showMessagem('Selecione um cargo!');
            loader(2);
            showHideDiv(2);
        }


    }


    function writeItem(obj) {

        var isPresidente = dropdownCargo.getEscolhida() == "Presidente" ? 1 : 2;
        console.log('isPresidente: ' + isPresidente);

        var tr =
            '<a class="list-group-item" href="candidatos.html?id=' + obj.id + '&is=' + isPresidente + '">' +
            '<div class="row">' +
            '<div class="col-sm-7 col-md-7 col-lg-7">' +
            '<span class="nomeCandidato">' + obj.nomeCompleto + '</span>' +
            '</div>' +
            '<div class="col-sm-2 col-md-2 col-lg-2">' +
            '<div>' + obj.numero + '</div>' +
            '</div>' +
            '<div class="col-sm-3 col-md-3 col-lg-3">' +
            '<div>' + obj.partido.sigla + '</div>' +
            '</div>' +
            '</div>' +
            '</a>';

        $(itensLista).append(tr);
    }

    function limparLista() {
        $(itensLista).html('');
        //document.getElementById('itensLista').innerHTML = '';
    }

    function loader(param) {
        if (param == 1) {
            //mostrar loader
            document.getElementById('itensLista').innerHTML = "<center><img src='img/loader.gif'></center>";
        } else {
            //esconder loader
            document.getElementById('itensLista').innerHTML = "";
        }
    }

    function showHideDiv(param) {

        switch (param) {
            case 1:
                divPrincipal.classList.add('hidden');
                break;
            case 2:
                divPrincipal.classList.remove('hidden');
                break;
        }

    }

    function showMessagem(param) {

        $(mensagemErro).text(param);
        alerta.classList.remove('hidden');

        tempoNotificacao = setTimeout(function () {
            alerta.classList.add('hidden');
            clearTimeout(tempoNotificacao);
        }, 2000);

    }

}); 