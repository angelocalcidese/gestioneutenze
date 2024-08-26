<!doctype html>
<html lang="it" data-bs-theme="auto">
<?php include("../portale/head.php"); ?>

<body>
  <?php include("../portale/header.php"); ?>

  <div class="container-fluid">
    <div class="row">
      <?php include("../portale/menu.php"); ?>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-page">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Amministratore</h1>

        </div>

        <!--<canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>-->
        <div class="row">
          <div class="col">
            <div class="text-end">
              <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#addRow" data-bs-whatever="@mdo">Nuovo Utente</button>
            </div>
          </div>
        </div>
        <?php include("modal.php"); ?>
        <h2>Utenze</h2>
        <div class="table-responsive small">
          <table class="table table-striped table-sm display" id="tabella" style="width:100%">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Cognome</th>
                <th scope="col">Società</th>
                <th scope="col">Email</th>
                <th scope="col">Telefono</th>
                <th scope="col">Ruolo</th>
                <th scope="col">Primo Accesso</th>
                <th scope="col">Attivo</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
  <?php include("../portale/javascript.php"); ?>
  <?php include("../portale/footer.php"); ?>
</body>

</html>