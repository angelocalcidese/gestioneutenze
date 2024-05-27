<div class="modal fade" id="addRow" tabindex="-1" aria-labelledby="addUserLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addUserLabel">Nuovo Utente</h1>
                <!--<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
            </div>
            <div class="modal-body">
                <div class="alert alert-primary hide" id="alert-success" role="alert"></div>
                <div class="alert alert-danger hide" id="alert-error" role="alert"></div>
                <form id="form-add">
                    <div class="name">
                        <label for="input-name" class="col-form-label">Nome:</label>
                        <input type="text" class="form-control" id="input-nome">
                    </div>
                    <div class="mb-3">
                        <label for="input-cognome" class="col-form-label">Cognome:</label>
                        <input type="text" class="form-control" id="input-cognome">
                    </div>
                    <div class="mb-3">
                        <label for="input-company" class="col-form-label">Società:</label>
                        <select class="form-select" aria-label="Seleziona Società" id="input-company">
                            <option selected>Seleziona</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="input-email" class="col-form-label">Email:</label>
                        <input type="text" class="form-control" id="input-email">
                    </div>
                    <div class="mb-3">
                        <label for="input-telephone" class="col-form-label">Telefono:</label>
                        <input type="text" class="form-control" id="input-telephone">
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick="closeModal()">Chiudi</button>
                <button type="button" class="btn btn-primary" id="add-button" onClick="controlForm()">Invia</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalChoice" tabindex="-1" aria-labelledby="choiceModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content rounded-3 shadow">
            <div class="modal-body p-4 text-center">
                <h5 class="mb-0" id="choice-title"></h5>
                <p class="mb-0" id="choice-text"></p>
                <input type="hidden" id="input-id">
            </div>
            <div class="modal-footer flex-nowrap p-0">
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end butt-choice button-status hide" onClick="yesStatus()"><strong>Si</strong></button>
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end butt-choice button-view hide" onClick="yesView()"><strong>Si</strong></button>
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end butt-choice button-delete hide" onClick="yesDelete()"><strong>Si</strong></button>
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end button-reset hide" onClick="yesReset()"><strong>Si</strong></button>
                <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0" data-bs-dismiss="modal">No</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="viewList" tabindex="-1" aria-labelledby="viewListLabel" aria-hidden="true">
    <div class="modal-dialog  modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addListLabel">Visualizza Addon da abilitare</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Sezione</th>
                                <th scope="col">Voce menu</th>
                                <th scope="col">Read</th>
                                <th scope="col">Create - Update - Delete</th>
                            </tr>
                        </thead>
                        <tbody id="tr-addons">
                            
                        </tbody>
                    </table>


                    <!--<ul class="list-group" id="check-addon">
                    </ul>-->
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onClick="closeModal()">Chiudi</button>
            </div>
        </div>
    </div>
</div>