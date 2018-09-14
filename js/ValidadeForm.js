/**
 * Created by L30N4RD0 on 12/04/2018.
 */

function ValidateForm() {

    var self = this;
    var error = 0;

    this.validInput = function (element) {
        if (element.value === "" || element.value === undefined || element.value === null || element.value === "0,00") {
            element.setAttribute("style", "border: 1px solid red; border-radius: 3px;");
            error++;
        } else {
            element.setAttribute("style", "border: 1px solid #ccc; border-radius: 3px;");
        }
    };

    this.messageError = function (message) {
        $('body').append('<div id="message-validate" class="message-validate alert alert-danger" style="position: fixed; right: 10px; top: 10px; padding: 20px; z-index: 9999"><span class="fa fa-exclamation-circle"></span> ' + message + '</div>');
        $('.message-validate').click(function () {
            $(this).remove();
        });
        setTimeout(function () {
            $('.message-validate').remove();
        }, 3000);
        return false;
    };

    this.inputsInvalid = function (form) {


        var dadosPessoais = 0,
            dadosContato = 0,
            dadosEndereco = 0;


        var inputsObrigatorios = ['cpf', 'nome', 'rg', 'emailPrincipal', 'celularPrincipal', 'cep', 'cidade', 'uf'];
        for (var i = (inputsObrigatorios.length - 1); i >= 0; i--) {
            console.log(i, inputsObrigatorios[i]);
            self.validInput(document.getElementById(inputsObrigatorios[i]));

            if ((i == 0 || i == 1 || i == 2) && document.getElementById(inputsObrigatorios[i]).value == '') {
                dadosPessoais++;
            } else if ((i == 3 || i == 4) && document.getElementById(inputsObrigatorios[i]).value == '') {
                dadosContato++;
            } else if ((i == 5 || i == 6 || i == 7) && document.getElementById(inputsObrigatorios[i]).value == '') {
                dadosEndereco++;
            } else {

            }
        }

        if(dadosPessoais > 0){
            document.getElementById('dadosPessoais-tab').click();
            return error;
        }else if(dadosContato > 0){
            document.getElementById('dadosContato-tab').click();
            return error;
        }else if(dadosEndereco > 0){
            document.getElementById('dadosEndereco-tab').click();
            return error;
        }else{
            return error;
        }
    };
}
