$(function () {

    var groups = $.ajax({
        url: "http://staging.dominios.api.fabrika162.com.br/domains/groups"
    })

    .done(function( grupos ) {
        
        $.each(grupos, function (i, v) {
            
            var clone = $(".group-model").clone();
            $(clone).addClass("group").removeClass("group-model");
            $("a", clone).html(v.domaingroup);
            $("a", clone).attr("href", "grupos.html#" + v.domaingroup);
            $("tbody").append(clone);
            $(clone).show();
        });
        

    })

    .fail(function () {
        alert("Página não pode ser carregada, favor tentar novamente");
    });

});

