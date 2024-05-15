var rowel = [];
var company = [];
var addons = [];
var permission = [];

var idRow = null;
var statusVal = null;

function tablePagination() {
    $('table.display').DataTable({
        responsive: true,
        searchable: false,
        orderable: false,
        targets: 0
    });
}

function searchCompany(id) { 
    var dicitura = "Nessuna";
    //console.log(company.length);
    for (var a = 0; a < company.length; a++) { 
        if (id == company[a].id) {
            dicitura = company[a].name;
        }
    }
    return dicitura;
}

function controlAccess(val) {
    var res = "<b>NO</b>";
    if (val == 1) { 
        res = "<b>SI</b>";
    }
    return res;
}

function usersCall() { 
    $.ajax({
        url: 'api/getUser.php', 
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (dipendenti, stato) {
            //console.log("RISPOSTA", dipendenti.responseJSON);
           
            var righe = dipendenti.responseJSON;
            rowel = righe;
            for (i = 0; i < righe.length; i++) {
                var riga = righe[i];
                var element = "<td>" + riga.id + "</td>";
                element += "<td>" + riga.nome + "</td>";
                element += "<td>" + riga.cognome + "</td>";
                element += "<td>" + searchCompany(riga.company) + "</td>";
                element += "<td>" + riga.email + "</td>";
                element += "<td>" + riga.telefono + "</td>";
                element += "<td>" + controlAccess(riga.firstaccess) + "</td>";
                if (riga.active == 1) {
                    element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="changeStatus(' + riga.id + ', 0)"><i class="fa-solid fa-check" style="color: #349b08;"></i></button></td>';
                } else {
                    element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="changeStatus(' + riga.id + ', 1)"><i class="fa-solid fa-xmark" style="color: #ec0909;"></i></button></td>';
                }
                if (riga.view == 1) {
                    element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="changeView(' + riga.id + ', 0)"><i class="fa-solid fa-eye" style="color: #349b08;"></i></button></td>';
                } else {
                    element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="changeView(' + riga.id + ', 1)"><i class="fa-solid fa-eye-slash" style="color: #ec0909;"></i></button></td>';
                }
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="viewListAddon(' + riga.id +')"><i class="fa-solid fa-list"></i></button></td>';
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="openModRow(' + riga.id + ')"><i class="fa-solid fa-square-pen"></i></button></td>';
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="deleteRow(' + riga.id + ')"><i class="fa-solid fa-trash"></i></button></td>';
                element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="resetRow(' + riga.id + ')"><i class="fa-solid fa-arrows-rotate"></i></button></td>';
                $("<tr/>")
                    .append(element)
                    .appendTo("#tabella");
            }
            tablePagination();
        }
    });
}
function resetRow(id, email) {
    idRow = id;
    $('#choice-title').text("Sei sicuro?");
    $('#choice-text').html("Stai RESETTARE la password a  <b>" + searchData(id).nome + " " + searchData(id).cognome + "</b>");
    $(".button-reset").removeClass("hide");
    $('#modalChoice').modal('show');
}


function yesReset() {
    var row = searchData(idRow);
    $.ajax({
        method: "POST",
        url: "api/resetUser.php",
        data: JSON.stringify({ id: idRow, email: row.email }),
        dataType: 'json',
        success: function (data) {
            console.log("Pasword resettata");
            closeModal();
        },
        error: function (error) {
            console.log("UTENTE NON rsettato", error);
            closeModal();

        }
    });
}

function deleteRow(id) {
    idRow = id;
    $('#choice-title').text("Sei sicuro?");
    $('#choice-text').html("Stai per eliminare <b>" + searchData(id).nome + " " + searchData(id).cognome + "</b>");
    $(".button-delete").removeClass("hide");
    $('#modalChoice').modal('show');
}

function yesDelete() {
    $.ajax({
        method: "POST",
        url: "api/deleteUser.php",
        data: JSON.stringify({ id: idRow }),
        dataType: 'json',
        success: function (data) {
            console.log("UTENTE CANCELLATO");
            closeModal();
        },
        error: function (error) {
            console.log("UTENTE NON CANCELLATO", error);
            closeModal();

        }
    });
}

function callPermission(id) {
    $.ajax({
        method: "POST",
        url: "api/getPermission.php",
        data: JSON.stringify({ id: id }),
        dataType: 'json',
        success: function (data) {
           for (var a = 0; a < data.length; a++) {
               //$("#checkaddon-" + data[a].func).attr('checked', 'checked');
               $("#checkaddon-" + data[a].func).prop('checked', true);
            }
        },
        error: function (error) {
            console.log("Nessuna Checkbox attiva", error);
            
        }
    });
}

function viewListAddon(id) {
    idRow = id;
    // $(".check-addon").removeAttr('checked');
    $(".check-addon").prop('checked', false);
    callPermission(id);
    $('#viewList').modal('show');
}

function companyCall() {
    $.ajax({
        url: 'api/getCompany.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (responce) {
            console.log("RISPOSTA Società", responce.responseJSON);

            company = responce.responseJSON;
            for (var a = 0; a < company.length; a++) {
                var el = '<option value="' + company[a].id + '">' + company[a].name + '</option>';
                $('#input-company').append(el);
            }
            usersCall();
        }
    });
}

function searchVoiceMenu(id) {
    var resp = null;
    for (var a = 0; a < menu.length; a++) {
        if (id == menu[a].id) {
            resp = menu[a].voce;
        }
    }
    return resp;
}

function addonCall() {
    $.ajax({
        url: 'api/getAddon.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (addon) {
             var righe = addon.responseJSON;
            addons = righe;
            for (var a = 0; a < addons.length; a++) {
                var check = '<li class="list-group-item">';
                check += '<input class="form-check-input check-addon" type = "checkbox" onChange="modAddon(' + addons[a].id + ', ' + idRow + ')" value = "" id="checkaddon-' + addons[a].id + '" ';
                check += ' > (' + searchVoiceMenu(addons[a].tipologia)  + ') ' + addons[a].name + '</li >';
                $('#check-addon').append(check);
            }
        }
    });
}

function modAddon(id) { 
    console.log(id);
   
    $(".check-addon").attr("disabled", "disabled");
    $.ajax({
        method: "POST",
        url: "api/gestAddons.php",
        data: JSON.stringify({ id: id, user: idRow }),
        dataType: 'json',
        success: function (data) {
            console.log("Checkbox attiva", error);
            $(".check-addon").removeAttr('disabled');
        },
        error: function (error) {
            console.log("Nessuna Checkbox attiva", error);
            $(".check-addon").removeAttr('disabled');
        }
    });
}

function cleanInput() {
    $("#input-id").val("");
    $("#input-name").val("");
    $("#input-cognome").val("");
    $("#input-email").val("");
    $("#input-telephone").val("");
    $("#input-company").val("");
}

function searchData(id) {
    var data = "";
    for (var a = 0; a < rowel.length; a++) {
        if (id == rowel[a].id) {
            data = rowel[a];
        }
    }
    return data;
}

function controlForm() {
    var nome = $("#input-nome").val();
    var cognome = $("#input-cognome").val();
    var email = $("#input-email").val();
    var telefono = $("#input-telephone").val();
    var company = $("#input-company").val();

    console.log("company", company);
    var count = 0;
    var html = "<ul>";
    if (nome == "") { html += "<li>Inserire Nome</li>"; count++; }
    if (cognome == "") { html += "<li>Inserire Cognome</li>"; count++; }
    if (company == "Seleziona") { html += "<li>Inserire Società</li>"; count++; }
    if (email == "") { html += "<li>Inserire Email</li>"; count++; }
    if (telefono == "") { html += "<li>Inserire Telefono</li>"; count++; }
    
    html += "</ul>";
    if (count > 0) {
        $("#alert-error").removeClass("hide");
        $("#alert-error").html(html);
    } else {
        if (idRow) {
            var data = searchData(idRow);
            data.nome = nome;
            data.cognome = cognome;
            data.company = company;
            data.email = email;
            data.telefono = telefono;
            modRow(data);
        } else {
            addRow();
        }
    }
}
function openModRow(id) {
    var data = searchData(id);
    console.log(data);
    idRow = data.id;
    $("#input-nome").val(data.nome);
    $("#input-cognome").val(data.cognome);
    $("#input-company").val(data.company);
    $("#input-email").val(data.email);
    $("#input-telephone").val(data.telefono);
    $('#addRow').modal('show');
}

function addRow() {
    var nome = $("#input-nome").val();
    var cognome = $("#input-cognome").val();
    var email = $("#input-email").val();
    var telefono = $("#input-telephone").val();
    var company = $("#input-company").val();
    
    $.ajax({
        method: "POST",
        url: "api/createUser.php",
        data: JSON.stringify({ nome: nome, cognome: cognome, email: email, company: company, telefono: telefono }),
        contentType: "application/json",
        success: function (data) {
            console.log("funzione chiamata quando la chiamata ha successo (response 200)", data);
            $("#alert-success").removeClass("hide");
            $("#alert-success").text("Utente inserita correttamente");
            $("#form-add").addClass("hide");
            $("#add-button").addClass("hide");
            cleanInput();
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
        }
    });

}

function closeModal() {
    window.location.reload(true);
}

function modRow(data) {
    console.log("DATA", data);
    $.ajax({
        method: "POST",
        url: "api/modUser.php",
        data: JSON.stringify({ id: data.id, nome: data.nome, cognome: data.cognome, company: data.company, email: data.email, telefono: data.telefono, active: data.active, view: data.view }),
        contentType: "application/json",
        success: function (data) {
            console.log("funzione chiamata quando la chiamata ha successo (response 200)", data);
            $("#alert-success").removeClass("hide");
            $("#alert-success").text("Utente modificato correttamente");
            $("#form-add").addClass("hide");
            $("#add-button").addClass("hide");
            cleanInput();
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            $("#alert-error").removeClass("hide");
            $("#alert-error").text(error);
        }
    });
}

function yesStatus() {
    var data = searchData(idRow);
    data.active = statusVal;
    modRow(data);
    closeModal();
}
function yesView() {
    var data = searchData(idRow);
    data.view = statusVal;
    modRow(data);
    closeModal();
}
function changeStatus(id, status) {
    $(".button-choice").addClass("hide");
    idRow = id;
    statusVal = status;
    $('#choice-title').text("Sei sicuro?");
    if (status == 1) {
        $('#choice-text').html("Stai per abilitare <b>" + searchData(id).nome + " " + searchData(id).cognome + "</b>");
    } else {
        $('#choice-text').html("Stai per disabilitare <b>" + searchData(id).nome + " " + searchData(id).cognome + "</b>");
    }
    $(".button-status").removeClass("hide");
    $('#modalChoice').modal('show');
}
function changeView(id, status) {
    $(".button-choice").addClass("hide");
    idRow = id;
    statusVal = status;
    $('#choice-title').text("Sei sicuro?");
    if (status == 1) {
        $('#choice-text').html("Stai per abilitare la visualizzazione di <b>" + searchData(id).nome + " " + searchData(id).cognome + "</b>");
    } else {
        $('#choice-text').html("Stai per disabilitare la visualizzazione di <b>" + searchData(id).nome + " " + searchData(id).cognome + "</b>");
    }
    $(".button-view").removeClass("hide");
    $('#modalChoice').modal('show');
}
$(document).ready(function () {
    companyCall();
    addonCall()
});
    
           