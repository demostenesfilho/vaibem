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
            <?php
?>


  <div style="width:10px;height:30px;"></div>
  <div id="tela_logo" class="tela-logins" style="background-color: #ffffff; height: 100%; width: 100%;">
    <img src="assets/logo_1.png" height="220px" width="220px" id="logo">
  </div>
  <div id="tela_text_box" class="tela-logins" style="background-color: #ffffff; height: auto; width: 100%;">
    <p style="color: #000000; font-size: 16px; font-weight: bold; ">LOGIN</p></div>
  <div style="width:10px;height:5px;"></div>
  <div class="container" id="login">
    <input type="text" class="form-control" id="telefone_box" placeholder="Telefone">
    <div style="width:10px;height:10px;"></div>
    <input type="text" class="form-control" id="senha_box" placeholder="Senha">
    <div id="tela_recuperar" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <span class="meu_texto" id="recuperar_lbl" style="font-size: 16px; color: #000000;  "><?php echo "<span style='color:#666666;'>".'Esqueceu a Senha?'."</span>" ; ?></span>
    </div>
    <div style="width:10px;height:20px;"></div>
    <button type="button" onclick="login()" id='logar_btn' class="btn btn-warning">Entrar</button>
    <div style="width:10px;height:20px;"></div>
    <div id="tela_cadastrar" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <span class="meu_texto" id="cadastrar_lbl" style="font-size: 16px; color: #000000;  "><?php echo ('Não tem Cadastro? ' . "<span style='color:#ff9900;'>".'CADASTRAR'."</span>") ; ?></span>
    </div>
  </div>



  <div class="modal fade" id="modal_nova_senha" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Nova Senha</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
    <span class="meu_texto" id="txt_nova_senha" style="font-size: 16px; color: #000000;  ">Insira uma nova senha:</span>
    <div style="width:10px;height:10px;"></div>
    <input type="text" class="form-control" id="senha_1" placeholder="Senha">
    <div style="width:10px;height:10px;"></div>
    <input type="text" class="form-control" id="senha_2" placeholder="Repita a Senha">
        </div>
        <div class="modal-footer">
    <button type="button" onclick="salvar_senha()" id='btn_salvar_senha' class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  </div>






  <div class="modal fade" id="modal_tipo_verificacao" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Verifica Telefone</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
    <span class="meu_texto" id="txt_t_verificar" style="font-size: 16px; color: #000000;  ">Selecione a forma de verificação:</span>
    <div style="width:10px;height:10px;"></div>
    <?php
    $i = 0;
    foreach((array('SMS')) as $elemento){
    $i = $i + 1; ?>
    <div class="form-check">
    <input class="form-check-input" type="radio" name="selecao_tipo_verificar" id="selecao_tipo_verificar_<?php echo $i; ?>" value="<?php echo $elemento; ?>">
    <label class="form-check-label" for="selecao_tipo_verificar_<?php echo $i; ?>"><?php echo $elemento; ?></label>
    </div>
    <?php } ?>
        </div>
        <div class="modal-footer">
    <button type="button" onclick="enviar_otp()" id='btn_enviar_codigo' class="btn btn-primary">Enviar Código</button>
        </div>
      </div>
    </div>
  </div>



  <div class="modal fade" id="modal_otp_verificacao" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Digite o código recebido:</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
    <span class="meu_texto" id="txt_verificar_otp" style="font-size: 16px; color: #000000;  ">Digite o código recebido:</span>
    <div style="width:10px;height:10px;"></div>
    <input type="text" class="form-control" id="box_otp" placeholder="Código Recebido">
        </div>
        <div class="modal-footer">
    <button type="button" onclick="verificar_otp()" id='btn_verificar_otp' class="btn btn-primary">Verificar</button>
        </div>
      </div>
    </div>
  </div>



  <div id="loading" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
    <img src="assets/loading.gif" height="100px" width="100px" id="img_loading">
  </div>



  <div class="modal fade" id="modal_recuperar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Recuperar a Senha</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
    <span class="meu_texto" id="txt_recuperar" style="font-size: 16px; color: #000000;  ">Preencha com seu telefone:</span>
    <div style="width:10px;height:5px;"></div>
    <input type="text" class="form-control" id="telefone_recuperar" placeholder="Telefone">
        </div>
        <div class="modal-footer">
    <button type="button" onclick="recuperar()" id='recuperar_btn' class="btn btn-primary">Recuperar Senha</button>
        </div>
      </div>
    </div>
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
            <script src= "login.js"> </script>
        </div>
        </body>
        </html>