$(function () {

    var groups = $.ajax({
        url: "http://staging.dominios.api.fabrika162.com.br/domains/groups"
    })

    .done(function( grupos ) {
        
        $.each(grupos, function (i, v) {
            
            var clone = $(".group-model").clone();
            $(clone).addClass("group").removeClass("group-model");
            $("a", clone).html(v.domaingroup.replace("."," ").replace("."," "));
            $("a", clone).attr("href", "dominios.html#" + v.domaingroup);
            $("tbody").append(clone);
            $(clone).show();

            $('.fa-plus-square').click( function() {
                $("input.form-control").val("");
                $("#input-adicionar").val(v.domaingroup);
            });
        });

        $('#btn-adicionar').click( function() {

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

