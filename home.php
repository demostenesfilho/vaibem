<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="theme-color" content="#030569">
            <title>VaiBem || Mobilidade urbana</title>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
              
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
              <audio id="audio" src="assets/toque_status.mp3" controls></audio>
  <audio id="audio_message" src="assets/messenger.mp3" controls></audio>



  <div id="tela_status" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
    <div id="tela_cabecalho_status" class="classe_da_tela" style="background-color: #ffffff; height: 50px; width: 100%;">
      <div style="width:90%;height:10px;"></div>
      <span class="material-icons" id="icone_minimizar" style="font-size:27px; color:#333333;">close_fullscreen</span>
    </div>
    <div id="tela_img_motorista" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <img src="" style="height: 100px; width: 100px;" id="img_motorista"></div>
    <div id="tela_dados_motorista" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <span class="meu_texto" id="dados_motorista" style="font-size: 16px; color: #000000;  "></span>
      <div style="width:10px;height:10px;"></div>
    </div>
    <div id="tela_lottie" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <!-- Reprodutor Lottie -->
      <lottie-player id="reprodutor_lottie_1" src="assets/procurando.json" background="transparent" speed="1" style="width: 200px; height: 100px" direction="1" autoplay mode="normal" loop ></lottie-player>
      <!-- Reprodutor Lottie -->
      <lottie-player id="reprodutor_lottie_2" src="assets/em_andamento.json" background="transparent" speed="1" style="width: 250px; height: 150px" direction="1" autoplay mode="normal" loop ></lottie-player>
      <!-- Reprodutor Lottie -->
      <lottie-player id="reprodutor_lottie_3" src="assets/finalizada.json" background="transparent" speed="1" style="width: 250px; height: 150px" direction="1" autoplay mode="normal" loop ></lottie-player>
      <!-- Reprodutor Lottie -->
      <lottie-player id="reprodutor_lottie_4" src="assets/cancelada.json" background="transparent" speed="1" style="width: 250px; height: 150px" direction="1" autoplay mode="normal" loop ></lottie-player>
    </div>
    <div id="tela_status_txt" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <span class="meu_texto" id="txt_status" style="font-size: 18px; color: #333333; font-weight: bold; ">Procurando Motorista</span>
    </div>
    <div style="width:10px;height:10px;"></div>
    <div id="tela_timer" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <span class="meu_texto" id="txt_timer" style="font-size: 30px; color: #333333; font-weight: bold; ">0:00</span>
    </div>
    <div style="width:10px;height:10px;"></div>
    <div id="tela_txt_finalizar" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <span class="meu_texto" id="txt_total_fim" style="font-size: 16px; color: #000000;  "></span>
    </div>
    <div id="tela_botoes_status" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <div class="meu_card" id="card_cancelar"  style="width:98%; margin:2px; padding: 5px; border-radius: 5px; box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);">
        <span class="meu_texto" id="txt_cancelar" style="font-size: 18px; color: #ffffff; font-weight: bold; ">Cancelar Corrida</span>
      </div>
      <div class="meu_card" id="card_finalizar"  style="width:98%; margin:2px; padding: 5px; border-radius: 5px; box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);">
        <span class="meu_texto" id="txt_finalizar" style="font-size: 18px; color: #ffffff; font-weight: bold; ">Finalizar Corrida</span>
      </div>
    </div>
    <div style="width:10px;height:10px;"></div>
  </div>



  <div class="modal fade" id="modal_dados" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Meus Dados</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
    <div class="container" id="id_do_container">
      <span class="meu_texto" id="txt_nome_telefone_dados" style="font-size: 16px; color: #000000;  "></span>
      <div style="width:10px;height:15px;"></div>
      <span class="meu_texto" id="altera_senha" style="font-size: 17px; color: #000000; font-weight: bold; "><?php echo "<span style='color:#000099;'>".'<br> Alterar Senha:'."</span>" ; ?></span>
      <input type="text" class="form-control" id="dados_senha_1" placeholder="Nova Senha">
      <div style="width:10px;height:10px;"></div>
      <input type="text" class="form-control" id="dados_senha_2" placeholder="Repita Nova Senha">
      <div style="width:10px;height:10px;"></div>
      <button type="button" onclick="alterar_senha()" id='btn_alterar_senha' class="btn btn-primary">Alterar Senha</button>
    </div>
        </div>
        <div class="modal-footer">
    <button type="button" onclick="fechar_modal_dados()" id='btn_fechar_modal_dados' class="btn btn-secondary">Fechar</button>
        </div>
      </div>
    </div>
  </div>



  <div class="modal fade" id="modal_contato" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Contato</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
    <div class="container" id="id_do_container">
      <span class="meu_texto" id="txt_contato" style="font-size: 16px; color: #000000;  "></span>
    </div>
        </div>
        <div class="modal-footer">
    <button type="button" onclick="fechar_modal()" id='fechar_modal_btn' class="btn btn-secondary">Fechar</button>
    <button type="button" onclick="enviar_whats_contato()" id='whats_btn' class="btn btn-success">Whatsapp</button>
        </div>
      </div>
    </div>
  </div>


<?php
?>


  <div id="tela_menu" class="classe_da_tela" style="background-color: #ffffff; height: 100%; width: 100%;">
    <div class="container" id="container_menu">
      <div style="width:10px;height:100px;"></div>
      <div id="cabecalho_menu" class="classe_da_tela" style="background-color: #ffffff; height: 50px; width: 100%;">
        <span class="meu_texto" id="lbl_nome_cliente_menu" style="font-size: 20px; color: #000000; font-weight: bold; "></span>
      </div>
      <div style="width:10px;height:15px;"></div>
      <div id="tela_carteira_credito" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
        <span class="material-icons" id="icone_carteira_credito" style="font-size:24px; color:#000000;">favorite</span>
        <div style="width:10px;height:1px;"></div>
        <span class="meu_texto" id="lbl_crt_credito" style="font-size: 18px; color: #000000;  ">Favoritos</span>
      </div>
      <div style="width:10px;height:15px;"></div>
      <div id="tela_historico_corridas" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
        <span class="material-icons" id="icone_historico_corridas" style="font-size:24px; color:#000000;">history</span>
        <div style="width:10px;height:1px;"></div>
        <span class="meu_texto" id="lbl_historico_corridas" style="font-size: 18px; color: #000000;  ">Corridas</span>
      </div>
      <div style="width:10px;height:15px;"></div>
      <div id="tela_carteira_credito" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
        <span class="material-icons" id="icone_carteira_credito" style="font-size:24px; color:#000000;">account_balance_wallet</span>
        <div style="width:10px;height:1px;"></div>
        <span class="meu_texto" id="lbl_crt_credito" style="font-size: 18px; color: #000000;  ">Pagamentos com cartão</span>
      </div>
      <div style="width:10px;height:15px;"></div>
      <div id="tela_meus_dados" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
        <span class="material-icons" id="icone_meus_dados" style="font-size:24px; color:#000000;">manage_accounts</span>
        <div style="width:10px;height:1px;"></div>
        <span class="meu_texto" id="lbl_meus_dados" style="font-size: 18px; color: #000000;  ">Meus Dados</span>
      </div>
      
      <div style="width:10px;height:15px;"></div>
      <div id="tela_fale_conosco" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
        <span class="material-icons" id="icone_fale_conosco" style="font-size:24px; color:#000000;">call</span>
        <div style="width:10px;height:1px;"></div>
        <span class="meu_texto" id="lbl_fale_conosco" style="font-size: 18px; color: #000000;  ">Fale Conosco</span>
      </div>
      <div style="width:10px;height:15px;"></div>
      <div id="tela_sair" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
        <span class="material-icons" id="icone_sair" style="font-size:24px; color:#000000;">logout</span>
        <div style="width:10px;height:1px;"></div>
        <span class="meu_texto" id="lbl_sair" style="font-size: 18px; color: #000000;  ">Sair</span>
      </div>
    </div>
  </div>



  <div id="tela_mapa" class="classe_da_tela" style="background-color: #ffffff; height: 100%; width: 100%;">
  </div>


  <div id="cabecalho" class="classe_da_tela" style="background-color: #3333ff; height: 50px; width: 100%;">
    <div id="tela_icone_menu" class="classe_da_tela" style="background-color: #3333ff; height: auto; width: 10%;">
      <a href="#" data-target="slide-out" class="sidenav-trigger" style="color: white;"><i class="material-icons">menu</i></a>
    </div>
    <div id="tela_label_cabecalho" class="classe_da_tela" style="background-color: #3333ff; height: auto; width: 90%;">
      <span class="meu_texto" id="txt_cabecalho" style="font-size: 20px; color: #ffffff; font-weight: bold; ">VaiBem</span>
    </div>
    <div id="tela_icone_chat" class="classe_da_tela" style="background-color: #3333ff; height: auto; width: 10%;">
      <span class="material-icons" id="icone_chat" style="font-size:27px; color:#ffffff;">chat</span>
    </div>
  </div>

  <ul id="slide-out" class="sidenav">
      <li><div class="user-view">
        <div class="background">
          <img src="assets/background.png">
        </div>
        <a href="#user"><img class="circle" src="assets/profile.webp"></a>
        <a href="#name"><span class="white-text name" id="lbl_nome_cliente_menu">Nome do usuário</span></a>
        <a href="#email"><span class="white-text email">Telefone do usuário</span></a>
      </div></li>
      <li><a href="#!"><i class="material-icons">favorite</i>Favoritos</a></li>
      <li><a href="#!" id="tela_historico_corridas"><i class="material-icons">assignment</i>Corridas</a></li>
      <li><a href="#!" id="tela_carteira_credito"><i class="material-icons">credit_card</i>Pagamento com cartão</a></li>
      <li><a href="#!" id="tela_fale_conosco"><i class="material-icons">record_voice_over</i>Central de ajuda</a></li>
      <li><div class="divider"></div></li>
      <li><a href="#!"><i class="material-icons">redeem</i>Convide Amigos</a></li>
      <li><a href="#!"><i class="material-icons">person_add</i>Convide Motoristas</a></li>
      <li><a href="#!"><i class="material-icons">local_taxi</i>Seja Motorista</a></li>
      <li><a href="#!"><i class="material-icons">fullscreen</i>Escanear</a></li>
      <li><div class="divider"></div></li>
      <li><a href="#!" id="tela_sair"><i class="material-icons">exit_to_app</i>Sair</a></li>
    </ul>

  <div id="tela_barra_inicio" class="classe_da_tela" style="background-color: #ffffff; height: 10%; width: 100%;">
    <div id="tela_boas_vindas" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <span class="meu_texto" id="lbl_boas_vindas" style="font-size: 17px; color: #000000; font-weight: bold; "></span>
    </div>
    <div id="tela_onde_vamos" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <span class="meu_texto" id="lbl_onde_vamos" style="font-size: 10px; color: #333333;  ">Para onde vamos?</span>
    </div>
    <div style="width:10px;height:10px;"></div>
    <div id="tela_card_iniciar" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <div class="meu_card" id="card_iniciar"  style="width:98%; margin:2px; padding: 5px; border-radius: 5px; box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);">
        <span class="meu_texto" id="lbl_onde_card_iniciar" style="font-size: 16px; color: #ffffff; font-weight: bold; ">Escolher Destino &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
        <span class="material-icons" id="icone_arrow" style="font-size:24px; color:#ffffff;">arrow_right_alt</span>
      </div>
    </div>
  </div>



  <div id="tela_categorias" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
    <div id="tela_cabecalho_categorias" class="classe_da_tela" style="background-color: #ffffff; height: 50px; width: 100%;">
      <div id="tela_lbl_categoria" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
        <div class="container" id="id_do_container">
          <span class="meu_texto" id="txt_tela_categorias" style="font-size: 16px; color: #000000; font-weight: bold; ">Escolha o tipo de viagem:</span>
        </div>
      </div>
      <span class="material-icons" id="icone_minimizar_categorias" style="font-size:27px; color:#333333;">close_fullscreen</span>
    </div>
    <div id="tela_lista_categorias" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
    </div>
    <div style="width:10px;height:10px;"></div>
    <div class="container" id="id_do_container">
      

      <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Escolher forma de pagamento</a>

      <!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content">
    <?php
      $i = 0;
      foreach((array('DINHEIRO', 'CARTÃO - APLICATIVO', 'PIX - MOTORISTA')) as $elemento){
      $i = $i + 1; ?>
      <div class="form-check">
      <input class="form-check-input" type="radio" name="forma_pagamento" id="forma_pagamento_<?php echo $i; ?>" value="<?php echo $elemento; ?>">
      <label class="form-check-label" for="forma_pagamento_<?php echo $i; ?>"><?php echo $elemento; ?></label>
      </div>
      <?php } ?>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Continuar</a>
    </div>
  </div>

      
      <div style="width:10px;height:10px;"></div>
    </div>
    <div id="tela_card_iniciar_chamado" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
      <div class="meu_card" id="card_iniciar_chamado"  style="width:98%; margin:2px; padding: 5px; border-radius: 5px; box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);">
        <span class="meu_texto" id="txt_card_chamado" style="font-size: 16px; color: #ffffff; font-weight: bold; "></span>
      </div>
    </div>
    <div style="width:10px;height:5px;"></div>
  </div>



  <div id="loading" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
    <img src="assets/loading.gif" height="100px" width="100px" id="img_loading">
  </div>



  <div id="tela_destinos" class="classe_da_tela" style="background-color: #ffffff; height: 100%; width: 100%;">
    <div class="container" id="id_do_container">
      <div id="destinos_cabecalho" class="classe_da_tela" style="background-color: #ffffff; height: 50px; width: 100%;">
        <span class="material-icons" id="icone_voltar_destinos" style="font-size:25px; color:#000000;">arrow_back</span>
        <div id="tela_lbl_destino" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 80%;">
          <span class="meu_texto" id="lbl_selecionar_destino" style="font-size: 16px; color: #000000;  ">Selecionar Destino</span>
        </div>
      </div>
      <input type="text" class="form-control" id="box_origem" placeholder="Partida">
      <div style="width:10px;height:10px;"></div>
      <input type="text" class="form-control" id="box_destino" placeholder="Destino">
      <div style="width:10px;height:10%;"></div>
    </div>
  </div>



  <div id="tela_btn_avancar" class="classe_da_tela" style="background-color: #ffffff; height: auto; width: 100%;">
    <div class="meu_card" id="btn_avancar"  style="width:98%; margin:2px; padding: 5px; border-radius: 5px; box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);">
      <span class="meu_texto" id="lbl_avancar" style="font-size: 16px; color: #ffffff;  ">Avançar</span>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script>
        document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
  </script>

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
            <!-- Lottie files -->
            <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            <!-- codigo javascript -->
            <script src= "home.js"> </script>
            
            <script>
              document.addEventListener('DOMContentLoaded', function() {
              var elems = document.querySelectorAll('.sidenav');
              var instances = M.Sidenav.init(elems);
                });
            </script>
        </div>
        </body>
        </html>