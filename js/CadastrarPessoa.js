$(document).ready(function () {
    $('.cpf').mask('000.000.000-00', {reverse: true, selectOnFocus: true});
    $('.rg').mask('00.000.000-0', {reverse: true});
    $('.altura').mask('0,00', {reverse: true});
    $('.telefone').mask('(00)0000-0000');
    $('.celular').mask('(00)00000-0000');
    $('.cep').mask('00000-000');
});

/**
 * Class
 * @constructor
 */
function Cep() {
    var self = this;
    var elements = {};
    var cep = '';

    this.serializeObject = function (idForm) {
        var register = {};
        var x = document.getElementById(idForm);
        for (var i = 0; i < x.length; i++) {
            if (x.elements[i].type !== "button") {
                if (x.elements[i].type === "checkbox") {
                    if (x.elements[i].checked) {
                        register[x.elements[i].name] = x.elements[i].value;
                    }
                } else {
                    register[x.elements[i].name] = x.elements[i].value
                }
            }

        }
        return register;
    };

    this.addRow = function () {
        if (self.beforeInsert()) {

            var obj = this.serializeObject("formRegister");
            self.elements = obj;

            var row = "<tr>" +
                "<td> " +
                "<div><span class='bold'>CPF:</span> " + obj.cpf + "</div> " +
                "<div><span class='bold'>NOME:</span> " + obj.nome + "</div> " +
                "<div><span class='bold'>RG:</span>  " + obj.rg + "</div> " +
                "<div><span class='bold'>TIPO SANGUINEO:</span> " + obj.tipoSanguineo + "</div> " +
                "<div><span class='bold'>PESO:</span>  " + obj.peso + "</div> " +
                "<div><span class='bold'>ALTURA:</span>  " + obj.altura + "</div> " +
                "</td> " +
                "<td> " +
                "<div><span class='bold'>E-MAIL PRINCIPAL:</span> " + obj.emailPrincipal + "</div> " +
                "<div><span class='bold'>E-MAIL SECUNDÁRIO:</span> " + obj.emailSecundario + "</div> " +
                "<div><span class='bold'>TELEFONE:</span> " + obj.telefone + "</div> " +
                "<div><span class='bold'>CELULAR PRINCIPAL : </span> " + obj.celularPrincipal + "</div> " +
                "<div><span class='bold'>CELULAR SECUNDÁRIO : </span> " + obj.celularSecundario + "</div> " +
                "</td>" +
                "<td> " +
                "<div><span class='bold'>CEP:</span> " + obj.cep + "</div> " +
                "<div><span class='bold'>ENDEREÇO:</span> " + obj.endereco + "</div> " +
                "<div><span class='bold'>BAIRRO:</span> " + obj.bairro + "</div> " +
                "<div><span class='bold'>CÓDIGO IBGE:</span> " + obj.ibge + "</div> " +
                "<div><span class='bold'>CIDADE:</span> " + obj.cidade + "</div>" +
                "<div><span class='bold'>ESTADO:</span> " + obj.uf + "</div>" +
                "</td>                " +
                "</tr>";
            $("#table-result").append(row);
            $("#table-registros").show();
            self.clearForm();
            var cep = '';
            elements = {};
            $("#cep").val('');

            obj = {};
        }
    };

    this.clearForm = function () {
        $('#formRegister').find("input[type=text], textarea").val("");
    };

    this.searchCep = function () {
        var elemCep = $("#cep");


        //Nova variável "cep" somente com dígitos.
        var cep = elemCep.val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {
            self.cep = elemCep.val();

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#endereco").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                        self.elements = dados;
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        self.clearForm();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                self.clearForm();
                alert("Formato de CEP inválido.");
                //document.getElementById("cep").focus();
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            self.clearForm();

        }
    };

    this.insert = function () {

    };

    this.beforeInsert = function () {
        var validadeForm = new ValidateForm();
        if (validadeForm.inputsInvalid("formRegister") > 0) {
            validadeForm.messageError('Existem Campos Obrigatórios(*) que não foram preenchidos!');
            return;
        }
        return true;
    };
}
