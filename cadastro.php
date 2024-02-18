<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="theme-color" content="#103ef2">
            <title>BootBlocks</title>
            <!-- bootstrap css -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <!-- bootstrap icons -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
            <!-- sweetalert -->
            <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
            <!--material icons-->
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            
            </head>
        <body>
        <div id="loading-page-bb" style="opacity: 0; height: 100%;">
              <div id="tela_logo" class="classe_da_tela" style="background-color: #ffffff; height: 100%; width: 100%;">
    <img src="assets/logo_1.png" height="180px" width="180px" id="logo">
  </div>
  <div id="tela_txt_cadastro" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
    <p style="color: #ffffff; font-size: 16px; font-weight: bold; ">CADASTRE-SE</p></div>
  <div style="width:10px;height:5px;"></div>
  <div class="container" id="container_cadastro">
    <div style="width:10px;height:10px;"></div>
    <input type="text" class="form-control" id="nome_box" placeholder="Nome Completo">
    <div style="width:10px;height:10px;"></div>
    <input type="text" class="form-control" id="telefone_box" placeholder="Telefone">
    <div style="width:10px;height:10px;"></div>
    <input type="text" class="form-control" id="senha_box" placeholder="Senha">
    <div style="width:10px;height:10px;"></div>
    <input type="text" class="form-control" id="senha_box_2" placeholder="Repita a Senha">
    <div style="width:10px;height:10px;"></div>
    <select class="form-select" id="cidades">
    <option value="0">Selecione</option>
    <?php foreach((array()) as $key => $elemento){ ?>
    <option value="<?php echo (array())[$key]; ?>"><?php echo $elemento; ?></option>
    <?php } ?>
    </select>
    <div style="width:10px;height:20px;"></div>
    <button type="button" onclick="cadastrar()" id='logar_btn' class="btn btn-warning">Cadastrar</button>
    <div style="width:10px;height:20px;"></div>
    <div id="tela_cadastrar" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <span class="meu_texto" id="logar_lbl" style="font-size: 16px; color: #000000;  "><?php echo ('Ja tem Cadastro? ' . "<span style='color:#ff9900;'>".' ENTRAR'."</span>") ; ?></span>
    </div>
  </div>


<?php
?>





  <div id="loading" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
    <img src="assets/loading.gif" height="100px" width="100px" id="img_loading">
  </div>

            <!-- bootstrap js -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            <!-- jquery -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.js" integrity="sha512-CX7sDOp7UTAq+i1FYIlf9Uo27x4os+kGeoT7rgwvY+4dmjqV0IuE/Bl5hVsjnQPQiTOhAX1O2r2j5bjsFBvv/A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            <!-- firebase-app -->
            <script src="https://www.gstatic.com/firebasejs/7.21.0/firebase-app.js"></script>
            <!-- firebase-database -->
            <script src="https://www.gstatic.com/firebasejs/7.21.0/firebase-database.js"></script>
            <!-- firebase-auth -->
            <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-auth.js"></script>
            <!-- codigo javascript -->
            <script src= "cadastro.js"> </script>
        </div>
        </body>
        </html>