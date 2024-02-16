<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>VaiBem || Mobilidade urbana</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  </head>
  <body>
    <nav style="background-color: #030769;">
      <div class="nav-wrapper container">
        <a href="#" class="brand-logo center">VaiBem</a>
        <ul id="nav-mobile" class="left">
          <li><a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a></li>
        </ul>
        <ul id="nav-mobile" class="right">
          <li><a href="sass.html"><i class="material-icons">chat</i></a></li>
        </ul>
      </div>
    </nav>

    <ul id="slide-out" class="sidenav">
      <li><div class="user-view">
        <div class="background">
          <img src="images/background.png">
        </div>
        <a href="#user"><img class="circle" src="images/eu.jpg"></a>
        <a href="#name"><span class="white-text name">Demóstenes Soares</span></a>
        <a href="#email"><span class="white-text email">(81) 99634-6559</span></a>
      </div></li>
      <li><a href="#!"><i class="material-icons">favorite</i>Favoritos</a></li>
      <li><a href="#!"><i class="material-icons">assignment</i>Corridas</a></li>
      <li><a href="#!"><i class="material-icons">credit_card</i>Pagamento com cartão</a></li>
      <li><a href="#!"><i class="material-icons">record_voice_over</i>Central de ajuda</a></li>
      <li><div class="divider"></div></li>
      <li><a href="#!"><i class="material-icons">redeem</i>Convide Amigos</a></li>
      <li><a href="#!"><i class="material-icons">person_add</i>Convide Motoristas</a></li>
      <li><a href="#!"><i class="material-icons">local_taxi</i>Seja Motorista</a></li>
      <li><a href="#!"><i class="material-icons">fullscreen</i>Escanear</a></li>
      <li><div class="divider"></div></li>
      <li><a href="#!"><i class="material-icons">exit_to_app</i>Sair</a></li>
    </ul>


















    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script>
       document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
    </script>
  </body>
</html>
