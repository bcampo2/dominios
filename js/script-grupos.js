$(function () {

    var emBase64 = btoa(window.location.hash.replace("#",""));
   
    // Ajax para leitura de dados do domínio clicado
  
    $.ajax({
        url: "http://staging.dominios.api.fabrika162.com.br/domains/" + emBase64
    })

    .done(function( dominios ) {
        console.log(dominios);
        $.each(dominios, function (i, v) {

            // Função para escrever a tabela através dos dados da API

            $(".titulo").html(v.domaingroup.replace("."," ").replace("."," "));
            var clone = $(".domain-list-model").clone();
            $(clone).addClass("domain-list").removeClass("domain-list-model");
            $(".domain", clone).html(v.domain);
            $(".name", clone).html(v.name);
            $(clone).attr("attr-domain",v.domain);
            $(clone).attr("attr-domaingroup",v.domaingroup);
            $(clone).attr("attr-name",v.name);
            $(clone).attr("attr-data",v.data);
            $("tbody").append(clone);
            $(clone).show();

            // Regras para escrever determinadas páginas

            if (emBase64 == "VkVJQ1VMTy5DQVJST0NFUklB" ) {
                $(".domain", clone).html(v.domain.substr(0,3));
            } else if (emBase64 == "VkVJQ1VMTy5USVBP" ) {
                $(".domain", clone).html(v.domain.substr(0,2).replace("-",""));
            } else if (emBase64 == "VkVJQ1VMTy5FU1BFQ0lF" ) {
                $(".domain", clone).html(v.domain.substr(0,1));
            } else if (emBase64 == "VkVJQ1VMTy5DT1JFUw==" ) {
                $(".domain", clone).html(v.domain.substr(0,2).replace("-",""));
            } else if (emBase64 == "VkVJQ1VMTy5DQVRFR09SSUE=" ) {
                $(".domain", clone).html(v.domain.substr(0,2).replace("-",""));
            } else if (emBase64 == "VkVJQ1VMTy5GUk9UQQ==" ) {
                $(".name", clone).remove();
            } else if (emBase64 == "VkVJQ1VMTy5DT01CVVNUSVZFTA==" ) {
                $(".name", clone).remove();
            }

            // Botão para adicionar linha

            $('.fa-plus-square').click( function() {
                $("textarea").val("");
                $("input.form-control").val("");
                $("#input-adicionar").val(v.domaingroup);
                $("textarea").val("{ }");
            });
   
        });

        // Botão para editar linha

        $('.fa-edit').click( function editarLinha () {
            
            var tr = $(this).parents("tr");

            $("textarea").val("");
            $("input.form-control").val("");
            $("#editar-domain").val($(tr).attr("attr-domain"));
            $("#editar-domaingroup").val($(tr).attr("attr-domaingroup"));
            $("#editar-name").val($(tr).attr("attr-name"));
            $("#data-editar").val($(tr).attr("attr-data"));

        });

        // Botão para apagar linha

        $('.fa-times').click( function apagarLinha () {
            
            tr = $(this).parents("tr");

            $(tr).attr("attr-domain");
            $(tr).attr("attr-domaingroup");
            
        });

        // Ajax para adicionar linha

        $('#btn-adicionar').click( function adicionarLinha() {

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

        // Ajax para editar dados

        $('#btn-editar').click( function editarDados () {

            $.ajax({
                url: 'http://staging.dominios.api.fabrika162.com.br/domains',
                type: 'post',
                dataType: 'json',
                data: $('#formEditar').serialize(),
                success: function(data) {
                    
                    alert("Dados editados com sucesso!");
                    window.location.reload();
                    
                },
                error: function(data) {
                    alert("Erro ao salvar alterações, favor preencher os campos ou verificar dados digitados!");
                }
            });
            
        });

        // Ajax para apagar dados

        $('#btn-apagar').click( function apagarDominio() {

            // var base64 =  btoa($(tr).attr("attr-domain"));

            $.ajax({
                url: 'http://staging.dominios.api.fabrika162.com.br/domains/' + $(tr).attr("attr-domaingroup") + "/" 
                + $(tr).attr("attr-domain"),
                type: 'DELETE',
                success: function(data) {
                    
                    alert("Dados deletados com sucesso!");
                    window.location.reload();
                    
                },
                error: function(data) {
                    alert("Erro ao apagar informações.");
                }
            });
            
        });
 
    })

    .fail(function () {
        alert("Página não pode ser carregada, favor tentar novamente");
    });

});

