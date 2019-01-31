$(function () {

    // Ajax para leitura de dados da API

    var groups = $.ajax({
        url: "http://staging.dominios.api.fabrika162.com.br/domains/groups"
    })

    .done(function( grupos ) {
        
        $.each(grupos, function (i, v) {

            // Função para escrever a tabela através dos dados da API
            
            var clone = $(".group-model").clone();
            $(clone).addClass("group").removeClass("group-model");
            $("a#group-name", clone).html(v.domaingroup.replace("."," ").replace("."," "));
            $("a#group-name", clone).attr("href", "dominios.html#" + v.domaingroup);
            $(clone).attr("attr-domain",v.domain);
            $(clone).attr("attr-domaingroup",v.domaingroup);
            $("tbody").append(clone);
            $(clone).show();

            // Botão adicionar

            $('.fa-plus-square').click( function() {
                $("input.form-control").val("");
                $("#input-adicionar").val(v.domaingroup);
            });
        });

        // Ajax para adicionar novo domínio

        $('#btn-adicionar').click( function adicionarDominio() {

            $.ajax({
                url: 'http://staging.dominios.api.fabrika162.com.br/domains',
                type: 'post',
                dataType: 'json',
                data: $('#formAdicionar').serialize(),
                success: function(data) {
                    
                    alert("Dados salvos com sucesso!");
                    window.location.reload();
                    
                },
                error: function(data) {
                    alert("Erro ao salvar informações, favor preencher os campos ou verificar dados digitados!");
                }
            });
            
        });

    })
    
    .fail(function () {
        alert("Página não pode ser carregada, favor tentar novamente");
    });

    $("textarea").val("{ }");

});

