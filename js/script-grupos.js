$(function () {

    var emBase64 = btoa(window.location.hash.replace("#",""));
    

    var dominios = $.ajax({
        url: "http://staging.dominios.api.fabrika162.com.br/domains/" + emBase64
    })

    .done(function( dominios ) {

        
        $.each(dominios, function (i, v) {

            var titulo = $("h2").html(v.domaingroup);
            var clone = $(".domain-list-model").clone();
            $(clone).addClass("domain-list").removeClass("domain-list-model");
            $(".domain", clone).html(v.domain);
            $(".name", clone).html(v.name);
            $("#lista-dados").append(clone);
            $(clone).show();
            
        });        

    })
    
    .fail(function () {
        alert("Página não pode ser carregada, favor tentar novamente");
    });

});

