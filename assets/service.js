var utenti = [];
var company = [];
var addons = [];

function searchCompany(id) { 
    var dicitura = "Nessuna";
    console.log(company.length);
    for (var a = 0; a < company.length; a++) { 
        if (id == company[a].id) {
            dicitura = company[a].name;
        }
    }
    return dicitura;
}

function employees() { 
    $.ajax({
        url: 'api/getUser.php', 
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (dipendenti, stato) {
            //console.log("RISPOSTA", dipendenti.responseJSON);
           
            var righe = dipendenti.responseJSON;
            utenti = righe;
            for (i = 0; i < righe.length; i++) {
                var riga = righe[i];
                var element = "<td>" + riga.id + "</td>";
                element += "<td>" + riga.nome + "</td>";
                element += "<td>" + riga.cognome + "</td>";
                element += "<td>" + searchCompany(riga.company) + "</td>";
                element += "<td>" + riga.email + "</td>";
                element += "<td>" + riga.telefono + "</td>";
                element += "<td>" + riga.firstaccess + "</td>";
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="viewUser(' + riga.id +')"><i class="fa-solid fa-list"></i></button></td>';
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-square-pen"></i></button></td>';
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-trash"></i></button></td>';
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-arrows-rotate"></i></button></td>';
                $("<tr/>")
                    .append(element)
                    .appendTo("#tabella");
            }

        }
    });
}

function companyCall() {
    $.ajax({
        url: 'api/getCompany.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (responce) {
            console.log("RISPOSTA Società", responce.responseJSON);

            company = responce.responseJSON;
            employees();
        }
    });
}

function addonCall() {
    $.ajax({
        url: 'api/getAddon.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (addon) {
            console.log("RISPOSTA Addon", addon.responseJSON);

            var righe = addon.responseJSON;
            addons = righe;
        }
    });
}

function viewUser(user) { 
    console.log(utenti[user]);
    var utente = utenti[user - 1];
    $("#nome-view").text(utente.nome);
    $("#cognome-view").text(utente.cognome);
    $("#cf-view").text(utente.cf);
    $("#nascita-view").text(utente.annodinascita);
    $("#ruolo-view").text(utente.ruolo);
    $("#assunzione-view").text(utente.assunzione);
    $("#telefono-view").text(utente.telefono);
    $("#email-view").text(utente.email);
    $('#viewUser').modal('show');
}

$(document).ready(function () {
    companyCall();
    
});
    
           