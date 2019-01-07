$(function () {

    var emBase64 = btoa(window.location.hash.replace("#",""));
    

    var dominios = $.ajax({
        url: "http://staging.dominios.api.fabrika162.com.br/domains/" + emBase64
    })

    .done(function( dominios ) {

        console.log(dominios);
        
        $.each(dominios, function (i, v) {

            $(".titulo").html(v.domaingroup);
            var clone = $(".domain-list-model").clone();
            $(clone).addClass("domain-list").removeClass("domain-list-model");
            $(".domain", clone).html(v.domain);
            $(".name", clone).html(v.name);
            $("tbody").append(clone);
            $(clone).show();
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
            }

        });     
        
    })

    .fail(function () {
        alert("Página não pode ser carregada, favor tentar novamente");
    });

});

