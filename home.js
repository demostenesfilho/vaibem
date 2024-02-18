var dados, latitude, longitude, velocidade, altitude, resposta, motoristas, dados_inicio, retorno_categorias, index, resposta_saldo, resultado_retorno, dados_status, menu_aberto, dados_cidade, latitude_usuario, endereco_inicial, endereco_texto, iniciar_listagem, id_categori_escolhida, forma_pagamento, tamanho_msg, largura_menu, largura_da_tela, longitude_usuario, endereco_final, endereco, motorista_id, contador, valor_corrida, tempo_timer, status_minimizado, categorias_minimizado, altura_tela_categorias, latitude_inicial, lat_motorista, latitude_final, url_principal, forma_de_pagamento, minutos, temporizador_busca_motoristas, status_anterior, altura_tela_status, nome_cliente, lonngitude_inicial, senha, lng_motorista, longitude_final, telefone, lista_de_categorias, temporizador_relogio, status_texto, lat_resposta_1, long_resposta_2, dados_viagem, msg, cidade_id, Item, polilinha, km, lat_motorista_selecionado, cliente_id, token, temporizador_busca_status, lng_motorista_selecionado, url_imagem;

// Descreva esta função...
function fechar_menu() {
  menu_aberto = false;
  largura_menu = largura_da_tela - largura_da_tela * 2;
  $("#tela_menu").css("left", largura_menu+"px");
  $("#tela_menu").css("top", "0px");
  $("#tela_menu").css("z-index", "25");
  $("#tela_menu").css("position", "fixed");
  $("#tela_menu").css("display", "block");
  console.log(largura_da_tela);
}

// Descreva esta função...
function gerar_dados_cidade(dados) {
  dados_cidade = JSON.parse(dados);
  if (localStorage.getItem('latitude') || '') {
    latitude_usuario = localStorage.getItem('latitude') || '';
  } else {
    latitude_usuario = dados_cidade['latitude'];
  }
  if (localStorage.getItem('longitude') || '') {
    longitude_usuario = localStorage.getItem('longitude') || '';
  } else {
    longitude_usuario = dados_cidade['longitude'];
  }
  localStorage.setItem('token_mp',dados_cidade['token']);
  $("#txt_contato").html((['Telefone: ',dados_cidade['telefone'],'<br> Email: ',dados_cidade['email']].join('')));
  $("#txt_nome_telefone_dados").html((['Nome: ',localStorage.getItem('nome_cliente') || '','<br> Telefone: ',localStorage.getItem('telefone_cliente') || ''].join('')));
  map.panTo(new google.maps.LatLng((txt_to_number(latitude_usuario)), (txt_to_number(longitude_usuario))));
}

// Descreva esta função...
function abrir_menu() {
  menu_aberto = true;
  $("#"+'tela_menu').show();
  $("#"+'tela_menu').css("position","relative");
  $("#"+'tela_menu').animate({left:0+"px"},300);
}

// Descreva esta função...
function alterar_senha() {
  if (!$("#dados_senha_1").val().length || !$("#dados_senha_2").val().length) {
    Swal.fire({
    icon: 'error',
    title: 'Campo vazio',
    text: 'Preencha os campos de senha'
    });
  } else {
    if ($("#dados_senha_1").val() == $("#dados_senha_2").val()) {
      if (!localStorage.getItem('senha_cliente') || ''.length) {
        Swal.fire({
        icon: 'error',
        title: 'Não Logado',
        text: 'Faça login novamente'
        });
      } else {
        ajax_post_async((String(url_principal) + 'redefinir_senha_logado.php'), {cliente_id:cliente_id, nova_senha:$("#dados_senha_1").val(), senha_atual:senha, token:token}, finaliza_redefinir_senha);
      }
    } else {
      Swal.fire({
      icon: 'error',
      title: 'Senha inválida',
      text: 'Senhas não conferem'
      });
    }
  }
}

// Descreva esta função...
function verificar_saudacao() {
  if ((new Date().getHours()) >= 0) {
    $("#lbl_boas_vindas").html(('Bom dia, ' + String(nome_cliente)));
  }
  if ((new Date().getHours()) >= 12) {
    $("#lbl_boas_vindas").html(('Boa tarde, ' + String(nome_cliente)));
  }
  if ((new Date().getHours()) >= 18) {
    $("#lbl_boas_vindas").html(('Boa noite, ' + String(nome_cliente)));
  }
}

// Descreva esta função...
function fechar_modal() {
  $("#modal_contato").modal("hide");
}

// Descreva esta função...
function enviar_whats_contato() {
  let msg_uri_encoded = window.encodeURIComponent('Olá');
  window.open("https://api.whatsapp.com/send?phone=" + ('+55' + String(dados_cidade['telefone'])) + "&text=" + msg_uri_encoded, "_blank");
}

// Descreva esta função...
function fechar_modal_dados() {
  $("#modal_dados").modal("hide");
}

// Descreva esta função...
function finaliza_redefinir_senha(resposta) {
  Swal.fire(JSON.parse(resposta)['mensagem']);
  $("#modal_dados").modal("hide");
  if (JSON.parse(resposta)['status'] == 'sucesso') {
    senha = $("#dados_senha_1").val();
    localStorage.setItem('senha_cliente',senha);
  }
  $("#dados_senha_1").val('');
  $("#dados_senha_2").val('');
}

// Descreva esta função...
function obter_endereco_usuario() {
  if (latitude_usuario && longitude_usuario) {
    function geocodeLatLng() {
    var geocoder = new google.maps.Geocoder();
    var latlng = {lat: (txt_to_number(latitude_usuario)), lng: (txt_to_number(longitude_usuario))};
    geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
    if (results[0]) {
    endereco = results[0].formatted_address;
      latitude_inicial = latitude_usuario;
      lonngitude_inicial = longitude_usuario;
      $("#box_origem").val(endereco);
    } else {
    window.alert('Nenhum Resultado Encontrado');
    }
    } else {
    window.alert('Geocoder falhou: ' + status);
    }
    });
    }
    geocodeLatLng();
  }
}

function mathRandomInt(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}

// Descreva esta função...
function mostrar_motoristas(motoristas) {
  if (motoristas) {
    motorista_id = 0;
    lat_motorista = 0;
    lng_motorista = 0;
    motoristas = JSON.parse(motoristas);
    for (var Item_index in motoristas) {
      Item = motoristas[Item_index];
      motorista_id = Item['id'];
      for (var i = 0; i < Makers.length; i++) {
      if (Makers[i].marker_id === motorista_id) {
      Makers[i].setMap(null);
      Makers.splice(i, 1);
      }
      }
      lng_motorista = Item['longitude'];
      lat_motorista = Item['latitude'];
      lng_motorista = (txt_to_number(lng_motorista));
      lat_motorista = (txt_to_number(lat_motorista));
      if (Item['online'] == 1) {
        if (mathRandomInt(1, 2) % 2 === 0) {
          var marker = new google.maps.Marker({
          position: {lat: lat_motorista, lng: lng_motorista},
          map: map,
          icon: "assets/car_green_a.png",
          title: "Motorista Disponível",
          marker_id: motorista_id
          });
          marker.addListener("click", function () {
          let id = this.marker_id;
          });
          Makers.push(marker);
        } else {
          var marker = new google.maps.Marker({
          position: {lat: lat_motorista, lng: lng_motorista},
          map: map,
          icon: "assets/car_green_b.png",
          title: "Motorista Disponível",
          marker_id: motorista_id
          });
          marker.addListener("click", function () {
          let id = this.marker_id;
          });
          Makers.push(marker);
        }
      } else {
        if (mathRandomInt(1, 2) % 2 === 0) {
          var marker = new google.maps.Marker({
          position: {lat: lat_motorista, lng: lng_motorista},
          map: map,
          icon: "assets/car_red_a.png",
          title: "Motorista Ocupado",
          marker_id: motorista_id
          });
          marker.addListener("click", function () {
          let id = this.marker_id;
          });
          Makers.push(marker);
        } else {
          var marker = new google.maps.Marker({
          position: {lat: lat_motorista, lng: lng_motorista},
          map: map,
          icon: "assets/car_red_b.png",
          title: "Motorista Ocupado",
          marker_id: motorista_id
          });
          marker.addListener("click", function () {
          let id = this.marker_id;
          });
          Makers.push(marker);
        }
      }
    }
  }
}

// Descreva esta função...
function proximo_input() {
  function addAutocomplete() {
  var input = document.getElementById('box_destino');
  let radius = 50000;
  let center = new google.maps.LatLng(latitude_usuario, longitude_usuario);
  let circle = new google.maps.Circle({
  center: center,
  radius: radius
  });
  let options = {
  bounds: circle.getBounds()
  };
  autocomplete_box_destino = new google.maps.places.Autocomplete(input, options);
  autocomplete_box_destino.addListener("place_changed", () => {
  let place = autocomplete_box_destino.getPlace();
  endereco_texto = place.formatted_address;
  latitude = place.geometry.location.lat();
  longitude = place.geometry.location.lng();
    endereco_final = endereco_texto;
    latitude_final = latitude;
    longitude_final = longitude;
    var marker = new google.maps.Marker({
    position: {lat: latitude, lng: longitude},
    map: map,
    icon: "assets/destino.png",
    title: "Destino",
    marker_id: 2
    });
    marker.addListener("click", function () {
    let id = this.marker_id;
    });
    Makers.push(marker);
    function getPolyline() {
    directionsService = new google.maps.DirectionsService();
    let request = {
    origin: new google.maps.LatLng(latitude_inicial, lonngitude_inicial),
    destination: new google.maps.LatLng(latitude, longitude),
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    durationInTraffic: true,
    };
    directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
    polilinha = response.routes[0].overview_polyline;
      var polyline = new google.maps.Polyline({
      strokeColor: "#545454",
      strokeOpacity: 1,
      strokeWeight: 4,
      map: map
      });
      polyline.polyline_id = 9;
      polyline.setPath(google.maps.geometry.encoding.decodePath(polilinha));
      Polylines.push(polyline);
    } else {
    alert("Erro: " + status);
    }
    });
    }
    getPolyline();
  });
  }
  addAutocomplete();
}

// Descreva esta função...
function busca_inicio(dados_inicio) {
  if (dados_inicio) {
    ajax_post_async((String(url_principal) + 'get_status_chamado.php'), {telefone:telefone, senha:senha}, verifica_status);
    $("#"+'tela_status').show();
    $("#"+'tela_barra_inicio').hide();
    resultado_chamado([]);
  }
}

// Descreva esta função...
function n_cancelar() {
}

// Descreva esta função...
function cancelar() {
  ajax_post_async((String(url_principal) + 'cancelar.php'), {telefone:telefone, senha:senha}, fim_cancelar);
}

// Descreva esta função...
function fim_cancelar() {
  window.location.href = "home.php";}

// Descreva esta função...
function exibir_categorias(retorno_categorias) {
  iniciar_listagem = true;
  contador = 0;
  id_categori_escolhida = 0;
  lista_de_categorias = JSON.parse(retorno_categorias)['categorias'];
  dados_viagem = JSON.parse(retorno_categorias)['dados'];
  km = dados_viagem['km'];
  minutos = dados_viagem['minutos'];
  for (var Item_index2 in lista_de_categorias) {
    Item = lista_de_categorias[Item_index2];
    contador = contador + 1;
    var card = '<div onclick="mudar_categoria('+contador+')" class="meus_cards" id="'+contador+'" style="width:98%; margin:2px; padding: 5px; border-radius: 5px; box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);">'
    card += '<div class="row">'
    card += '<div class="col-4">'
    card += '<img class="imagem_meus_cards" id="imagem_meus_cards" style="width:50px; height:50px;" src="'+(String(url_imagem) + String(Item['img']))+'" alt="imagem">'
    card += '</div>'
    card += '<div class="col-8">'
    card += '<span class="titulo_meus_cards" id="titulo_meus_cards" style="font-weight: bold; font-size: 16px">'+(['<span style="font-size:16px; color:#000000; font-weight:bold; font-style:normal;">'+Item['nome']+' </span>','&nbsp',String('<span style="font-size:16px; color:#000000; font-weight:bold; font-style:normal;">'+'R$ '+' </span>') + String('<span style="font-size:16px; color:#000000; font-weight:bold; font-style:normal;">'+Item['taxa']+' </span>')].join(''))+'</span><br>'
    card += '<span class="subtitulo_meus_cards" id="subtitulo_meus_cards" style="font-size: 13px">'+'<span style="font-size:14px; color:#000000; font-weight:normal; font-style:normal;">'+Item['descricao']+' </span>'+'</span><br>'
    card += '<span class="texto_adicional_meus_cards" id="texto_adicional_meus_cards" style="font-size: 13px">'+'<span style="font-size:12px; color:#666666; font-weight:normal; font-style:normal;">'+'Clique para selecionar'+' </span>'+'</span>'
    card += '</div>'
    card += '</div>'
    card +=' </div>'
    document.getElementById("tela_lista_categorias").innerHTML += card;
    if (iniciar_listagem) {
      iniciar_listagem = false;
      id_categori_escolhida = Item['id'];
      valor_corrida = Item['taxa'];
      $("#txt_card_chamado").html((['Confirmar ',Item['nome'],' R$ ',Item['taxa']].join('')));
      document.getElementById(contador).style.border = 1 + "px solid " + "#009900";
    } else {
      document.getElementById(contador).style.border = 1 + "px solid " + "#c0c0c0";
    }
  }
  $("."+'meus_cards').css("margin-left", 2+"px");
  $("."+'meus_cards').css("margin-right", 2+"px");
  $("."+'meus_cards').css("margin-top", 8+"px");
  $("."+'meus_cards').css("margin-bottom", 8+"px");
  $("."+'imagem_meus_cards').css("padding-left", 20+"px");
  $("."+'imagem_meus_cards').css("padding-right", 0+"px");
  $("."+'imagem_meus_cards').css("padding-top", 5+"px");
  $("."+'imagem_meus_cards').css("padding-bottom", 0+"px");
  $(".imagem_meus_cards").css("height", '80' + "px");
  $(".imagem_meus_cards").css("width", '80' + "px");
  $("#"+'tela_destinos').hide();
  $("#"+'tela_barra_inicio').hide();
  $("#"+'tela_btn_avancar').hide();
  document.getElementById('tela_categorias').style.position = "fixed";
  document.getElementById('tela_categorias').style.bottom = "0px";
  document.getElementById('tela_categorias').style.left = "0";
  document.getElementById('tela_categorias').style.right = "0";
  document.getElementById('tela_categorias').style.zIndex = "20";
  $("#"+'tela_categorias').show();
  console.log(retorno_categorias);
}

// Descreva esta função...
function mudar_categoria(index) {
  id_categori_escolhida = (lista_de_categorias[(index - 1)])['id'];
  valor_corrida = (lista_de_categorias[(index - 1)])['taxa'];
  $("#txt_card_chamado").html((['Confirmar ',(lista_de_categorias[(index - 1)])['nome'],' R$ ',(lista_de_categorias[(index - 1)])['taxa']].join('')));
  $(".meus_cards").css("border", 1 + "px solid #cccccc");
  document.getElementById(index).style.border = 1 + "px solid " + "#009900";
}

// Descreva esta função...
function enviar_solicitacao_chamado() {
  if (!endereco_inicial) {
    endereco_inicial = $("#box_origem").val();
  }
  $("#"+'tela_categorias').hide();
  forma_de_pagamento = $("input[name=forma_pagamento]:checked").val();
  $("#"+'loading').show();
  ajax_post_async((String(url_principal) + 'insere_chamado.php'), {senha:senha, telefone:telefone, valor:valor_corrida, forma_pagamento:forma_pagamento, endereco_ini:endereco_inicial, endereco_fim:endereco_final, categoria_id:id_categori_escolhida, lat_ini:latitude_inicial, lng_ini:longitude_final, lat_fim:latitude_final, lng_fim:longitude_final, km:km, tempo:minutos, taxa:valor_corrida}, resultado_chamado);
}

// Descreva esta função...
function verifica_saldo(resposta_saldo) {
  resposta_saldo = JSON.parse(resposta_saldo);
  if (resposta_saldo['status'] == 'erro') {
    Swal.fire('Saldo insuficiente na carteira de crédito! Escolha outra forma de pagamento');
  } else {
    enviar_solicitacao_chamado();
  }
}

// Descreva esta função...
function resultado_chamado(resultado_retorno) {
  $("#"+'loading').hide();
  tempo_timer = 0;
  minutos = 0;
  temporizador_relogio = setInterval(function(){
    tempo_timer = tempo_timer + 1;
    if (tempo_timer > 59) {
      tempo_timer = 0;
      minutos = minutos + 1;
    }
    if (tempo_timer < 10) {
      $("#txt_timer").html(([minutos,':','0',tempo_timer].join('')));
    } else {
      $("#txt_timer").html(([minutos,':',tempo_timer].join('')));
    }
  }, 1000);
  $("#"+'tela_status').show();
  document.getElementById('tela_status').style.position = "fixed";
  document.getElementById('tela_status').style.bottom = "0px";
  document.getElementById('tela_status').style.left = "0";
  document.getElementById('tela_status').style.right = "0";
  document.getElementById('tela_status').style.zIndex = "29";
  temporizador_busca_status = setInterval(function(){
    ajax_post_async((String(url_principal) + 'get_status_chamado.php'), {telefone:telefone, senha:senha}, verifica_status);
  }, 5000);
  clearInterval(temporizador_busca_motoristas);
  $("#"+'reprodutor_lottie_1').show();
  $("#"+'tela_timer').show();
  deletar_itens_mapa();
}

// Descreva esta função...
function deletar_itens_mapa() {
  for (var i = 0; i < Makers.length; i++) {
  Makers[i].setMap(null);
  }
  Makers = [];
  for (var i = 0; i < Polylines.length; i++) {
  Polylines[i].setMap(null);
  }
  Polylines = [];
}

// Descreva esta função...
function verifica_status(dados_status) {
  deletar_itens_mapa();
  clearInterval(temporizador_busca_motoristas);
  dados_status = JSON.parse(dados_status);
  status_texto = dados_status['status_string'];
  msg = dados_status['msg'];
  lat_motorista_selecionado = (txt_to_number(dados_status['latitude']));
  lng_motorista_selecionado = (txt_to_number(dados_status['longitude']));
  if (msg) {
    if (msg.length > tamanho_msg) {
      tamanho_msg = msg.length;
      $("#icone_chat").html('mark_unread_chat_alt');
      $("#icone_chat").css("color", "#ff6600");
      $("#icone_chat").css("font-size", "28px");
      $("#icone_chat").css("font-style", "normal");
      $("#icone_chat").css("font-weight", "normal");
      function rotateElement(element, angle) {
      let el = document.getElementById(element);
      el.style.transition = "transform " + 1000 + "ms";
      el.style.transform = "rotate(" + angle + "deg)";
      }
      rotateElement('icone_chat',360);
      document.getElementById('audio_message').play();
    }
  }
  if (status_texto != status_anterior) {
    document.getElementById('audio').play();
    status_anterior = status_texto;
  }
  if (status_texto == 'Procurando Motorista') {
    $("#"+'tela_barra_inicio').hide();
    $("#"+'tela_img_motorista').hide();
    $("#"+'tela_dados_motorista').hide();
    $("#"+'reprodutor_lottie_1').show();
    $("#"+'tela_timer').show();
    ajax_post_async((String(url_principal) + 'get_all_motoristas.php'), {senha:senha, telefone:telefone}, mostrar_motoristas);
  }
  if (status_texto == 'Motorista a Caminho') {
    $("#"+'tela_barra_inicio').hide();
    $("#"+'reprodutor_lottie_1').hide();
    $("#"+'tela_timer').hide();
    $("#"+'img_motorista').attr("src", (String(url_imagem) + String(dados_status['motorista_img'])));
    $("#"+'tela_img_motorista').show();
    $("#dados_motorista").html((['<span style="font-size:18px; color:#000000; font-weight:bold; font-style:normal;">'+dados_status['motorista_nome']+' </span>','<br>','<span style="font-size:15px; color:#000000; font-weight:normal; font-style:normal;">'+(dados_status['avaliacao'] > 0 && dados_status['avaliacao'] < 1 ? '⭐' : (dados_status['avaliacao'] > 1 && dados_status['avaliacao'] < 2 ? '⭐⭐' : (dados_status['avaliacao'] > 2 && dados_status['avaliacao'] < 3 ? '⭐⭐⭐' : (dados_status['avaliacao'] > 3 && dados_status['avaliacao'] < 4 ? '⭐⭐⭐⭐' : (dados_status['avaliacao'] > 4 && dados_status['avaliacao'] < 5 ? '⭐⭐⭐⭐⭐' : '⭐⭐⭐⭐⭐')))))+' </span>','','','<br>','<span style="font-size:16px; color:#000000; font-weight:bold; font-style:normal;">'+dados_status['veiculo']+' </span>','<br>','<span style="font-size:16px; color:#000000; font-weight:bold; font-style:normal;">'+dados_status['placa']+' </span>'].join('')));
    var marker = new google.maps.Marker({
    position: {lat: lat_motorista_selecionado, lng: lng_motorista_selecionado},
    map: map,
    icon: "assets/car_green_a.png",
    title: "dados_status[motorista]",
    marker_id: 3
    });
    marker.addListener("click", function () {
    let id = this.marker_id;
    });
    Makers.push(marker);
    $("#dados_motorista").css("text-align", "center");
    $("#"+'tela_dados_motorista').show();
  }
  if (status_texto == 'Motorista Chegou') {
    $("#"+'tela_barra_inicio').hide();
    $("#"+'reprodutor_lottie_1').hide();
    $("#"+'tela_timer').hide();
    $("#"+'img_motorista').attr("src", (String(url_imagem) + String(dados_status['motorista_img'])));
    $("#"+'tela_img_motorista').show();
    $("#dados_motorista").html((['<span style="font-size:18px; color:#000000; font-weight:bold; font-style:normal;">'+dados_status['motorista_nome']+' </span>','<br>','<span style="font-size:15px; color:#000000; font-weight:normal; font-style:normal;">'+(dados_status['avaliacao'] > 0 && dados_status['avaliacao'] < 1 ? '⭐' : (dados_status['avaliacao'] > 1 && dados_status['avaliacao'] < 2 ? '⭐⭐' : (dados_status['avaliacao'] > 2 && dados_status['avaliacao'] < 3 ? '⭐⭐⭐' : (dados_status['avaliacao'] > 3 && dados_status['avaliacao'] < 4 ? '⭐⭐⭐⭐' : (dados_status['avaliacao'] > 4 && dados_status['avaliacao'] < 5 ? '⭐⭐⭐⭐⭐' : '⭐⭐⭐⭐⭐')))))+' </span>','<br>','<span style="font-size:16px; color:#000000; font-weight:bold; font-style:normal;">'+dados_status['veiculo']+' </span>','<br>','<span style="font-size:16px; color:#000000; font-weight:bold; font-style:normal;">'+dados_status['placa']+' </span>'].join('')));
    $("#dados_motorista").css("text-align", "center");
    $("#"+'tela_dados_motorista').show();
    var marker = new google.maps.Marker({
    position: {lat: lat_motorista_selecionado, lng: lng_motorista_selecionado},
    map: map,
    icon: "assets/car_green_a.png",
    title: "dados_status[motorista]",
    marker_id: 3
    });
    marker.addListener("click", function () {
    let id = this.marker_id;
    });
    Makers.push(marker);
  }
  if (status_texto == 'Em Viagem') {
    $("#"+'reprodutor_lottie_1').hide();
    $("#"+'tela_barra_inicio').hide();
    $("#"+'tela_img_motorista').hide();
    $("#"+'tela_dados_motorista').hide();
    $("#"+'reprodutor_lottie_2').show();
    $("#"+'tela_timer').hide();
    $("#"+'card_cancelar').hide();
    var marker = new google.maps.Marker({
    position: {lat: lat_motorista_selecionado, lng: lng_motorista_selecionado},
    map: map,
    icon: "assets/car_green_a.png",
    title: "dados_status[motorista]",
    marker_id: 3
    });
    marker.addListener("click", function () {
    let id = this.marker_id;
    });
    Makers.push(marker);
  }
  if (status_texto == 'Finalizada') {
    $("#"+'tela_barra_inicio').hide();
    $("#"+'tela_img_motorista').hide();
    $("#"+'tela_dados_motorista').hide();
    $("#"+'reprodutor_lottie_1').hide();
    $("#"+'reprodutor_lottie_2').hide();
    $("#"+'reprodutor_lottie_3').show();
    $("#"+'tela_timer').hide();
    $("#"+'card_cancelar').hide();
    $("#"+'card_finalizar').show();
    $("#"+'tela_txt_finalizar').show();
    $("#txt_total_fim").html((String('<span style="font-size:16px; color:#333333; font-weight:bold; font-style:normal;">'+'Total R$ '+' </span>') + String('<span style="font-size:16px; color:#000000; font-weight:bold; font-style:normal;">'+dados_status['taxa']+' </span>')));
    clearInterval(temporizador_busca_status);
  }
  if (status_texto == 'Cancelada') {
    $("#"+'tela_barra_inicio').hide();
    $("#"+'tela_img_motorista').hide();
    $("#"+'tela_dados_motorista').hide();
    $("#"+'reprodutor_lottie_1').hide();
    $("#"+'reprodutor_lottie_2').hide();
    $("#"+'reprodutor_lottie_3').hide();
    $("#"+'reprodutor_lottie_4').show();
    $("#"+'tela_timer').hide();
    $("#"+'card_cancelar').hide();
    $("#"+'card_finalizar').show();
    clearInterval(temporizador_busca_status);
  }
  $("#txt_status").html(status_texto);
}


//feito com bootblocks.com.br
  $("body").css("height", "100%");
  $("html").css("height", "100%");
  var map;
  var Circles = [];
  var Polylines = [];
  var Polygons = [];
  var Makers = [];
  function initMap() {
  map = new google.maps.Map(document.getElementById('tela_mapa'), {
  center: {lat: (txt_to_number(latitude_usuario)), lng: (txt_to_number(longitude_usuario))},
  zoom: 15
  });
  if (typeof onMapInitilize === "function") {
  onMapInitilize();
  }
  google.maps.event.addListener(map, 'click', function(event) {
  if (typeof onMapClick === "function") {
  onMapClick(event);
  }
  });
  }
  var script = document.createElement("script");
  script.src = "https://maps.googleapis.com/maps/api/js?key="+'AIzaSyBDNS8l4MPyeve7Q6SdAvmSSHqHWbNmAH4'+"&libraries=places&callback=initMap";
  script.async = true;
  document.head.appendChild(script);

$(document).on("click", "#icone_menu", function(){
  if (menu_aberto) {
    menu_aberto = false;
    largura_menu = largura_da_tela - largura_da_tela * 2;
    $("#"+'tela_menu').css("position","relative");
    $("#"+'tela_menu').animate({left:largura_menu+"px"},300);
    $("#icone_menu").html('menu');
    fechar_menu();
  } else {
    $("#icone_menu").html('menu_open');
    abrir_menu();
  }
});

$(document).on("click", "#tela_carteira_credito", function(){
  window.location.href = "carteira.php";});

$(document).on("click", "#tela_fale_conosco", function(){
  $("#modal_contato").modal("show");
});

//feito com bootblocks.com.br
  document.getElementById('cabecalho').style.position = "fixed";
  document.getElementById('cabecalho').style.top = "0px";
  document.getElementById('cabecalho').style.left = "0";
  document.getElementById('cabecalho').style.right = "0";
  document.getElementById('cabecalho').style.zIndex = "26";
  largura_da_tela = (window.innerWidth * (100 / 100));
  fechar_menu();
  nome_cliente = localStorage.getItem('nome_cliente') || '';
  nome_cliente = nome_cliente.split(' ')[0];
  latitude_usuario = localStorage.getItem('latitude') || '';
  longitude_usuario = localStorage.getItem('longitude') || '';
  token = localStorage.getItem('token') || '';
  url_principal = localStorage.getItem('url_principal') || '';
  url_imagem = localStorage.getItem('url_imagem') || '';
  cidade_id = localStorage.getItem('cidade_id') || '';
  cliente_id = localStorage.getItem('cliente_id') || '';
  senha = localStorage.getItem('senha_cliente') || '';
  telefone = localStorage.getItem('telefone_cliente') || '';
  ajax_post_async((String(url_principal) + 'get_dados_cidade.php'), {token:token, cidade_id:cidade_id}, gerar_dados_cidade);
  ajax_post_async((String(url_principal) + 'busca_inicio.php'), {senha:senha, telefone:telefone}, busca_inicio);
  $("#lbl_nome_cliente_menu").html(('Olá ' + String(localStorage.getItem('nome_cliente') || '')));

$(document).on("click", "#tela_meus_dados", function(){
  $("#modal_dados").modal("show");
});

//feito com bootblocks.com.br
  $("#tela_label_cabecalho").css("background-color", "#020795");
  $("#tela_icone_menu").css("background-color", "#020795");
  $("#tela_icone_chat").css("background-color", "#020795");
  $("#card_iniciar").css("background-color", "#020795");
  $("#cabecalho").css("display", "flex");
  $("#cabecalho").css("justify-content", "center");
  $("#tela_label_cabecalho").css("display", "flex");
  $("#tela_label_cabecalho").css("justify-content", "center");
  $("#tela_label_cabecalho").css("display", "flex");
  $("#tela_label_cabecalho").css("align-items", "center");
  $("#tela_icone_menu").css("display", "flex");
  $("#tela_icone_menu").css("justify-content", "center");
  $("#tela_icone_menu").css("display", "flex");
  $("#tela_icone_menu").css("align-items", "center");
  $("#tela_icone_chat").css("display", "flex");
  $("#tela_icone_chat").css("justify-content", "center");
  $("#tela_icone_chat").css("display", "flex");
  $("#tela_icone_chat").css("align-items", "center");
  $("#"+'icone_menu').css("padding-left", 5+ "px");
  $("#"+'icone_menu').css("padding-right", 0+ "px");
  $("#"+'icone_menu').css("padding-top", 5+ "px");
  $("#"+'icone_menu').css("padding-bottom", 0+ "px");
  $("#"+'icone_chat').css("padding-left", 0+ "px");
  $("#"+'icone_chat').css("padding-right", 5+ "px");
  $("#"+'icone_chat').css("padding-top", 5+ "px");
  $("#"+'icone_chat').css("padding-bottom", 0+ "px");
  document.getElementById('cabecalho').style['border-bottom-right-radius'] = '15px';
  document.getElementById('cabecalho').style['border-bottom-left-radius'] = '15px';
  document.getElementById('tela_icone_menu').style['border-bottom-left-radius'] = '15px';
  document.getElementById('tela_icone_chat').style['border-bottom-right-radius'] = '15px';

//feito com bootblocks.com.br
  $("#"+'container_menu').css("padding-left", 30+ "px");
  $("#"+'container_menu').css("padding-right", 0+ "px");
  $("#"+'container_menu').css("padding-top", 0+ "px");
  $("#"+'container_menu').css("padding-bottom", 0+ "px");
  $("#tela_carteira_credito").css("display", "flex");
  $("#tela_carteira_credito").css("align-items", "center");
  $("#tela_meus_dados").css("display", "flex");
  $("#tela_meus_dados").css("align-items", "center");
  $("#tela_historico_corridas").css("display", "flex");
  $("#tela_historico_corridas").css("align-items", "center");
  $("#tela_fale_conosco").css("display", "flex");
  $("#tela_fale_conosco").css("align-items", "center");
  $("#tela_sair").css("display", "flex");
  $("#tela_sair").css("align-items", "center");
  document.getElementById('tela_menu').style.border = 1 + "px solid " + "#333333";
  $("#tela_menu").css("border-radius", "10px");

if (navigator.geolocation) {
navigator.geolocation.watchPosition(function(position) {
latitude = position.coords.latitude;
longitude = position.coords.longitude;
velocidade = position.coords.speed;
altitude = position.coords.altitude;
  latitude_usuario = latitude;
  longitude_usuario = longitude;
  localStorage.setItem('latitude',latitude);
  localStorage.setItem('longitude',longitude);
}, function() {
handleLocationError(true, infoWindow, map.getCenter());
});
} else {
// Browser doesn't support Geolocation
handleLocationError(false, infoWindow, map.getCenter());
}

//feito com bootblocks.com.br
  $("#loading").css("background-color", "rgba(0, 0, 0, 0)");
  $("#loading").css("display", "flex");
  $("#loading").css("justify-content", "center");
  $("#"+'loading').hide();

function onMapInitilize(){
  map.setOptions({zoomControl: false});
  map.setOptions({mapTypeControl: false});
  map.setOptions({scaleControl: false});
  map.setOptions({streetViewControl: false});
  function addAutocomplete() {
  var input = document.getElementById('box_origem');
  let radius = 10000;
  let center = new google.maps.LatLng(latitude_usuario, longitude_usuario);
  let circle = new google.maps.Circle({
  center: center,
  radius: radius
  });
  let options = {
  bounds: circle.getBounds()
  };
  autocomplete_box_origem = new google.maps.places.Autocomplete(input, options);
  autocomplete_box_origem.addListener("place_changed", () => {
  let place = autocomplete_box_origem.getPlace();
  endereco_texto = place.formatted_address;
  lat_resposta_1 = place.geometry.location.lat();
  long_resposta_2 = place.geometry.location.lng();
    endereco_inicial = endereco_texto;
    latitude_inicial = lat_resposta_1;
    lonngitude_inicial = long_resposta_2;
    var marker = new google.maps.Marker({
    position: {lat: lat_resposta_1, lng: long_resposta_2},
    map: map,
    icon: "assets/marcador.png",
    title: "Origem",
    marker_id: 1
    });
    marker.addListener("click", function () {
    let id = this.marker_id;
    });
    Makers.push(marker);
  });
  }
  addAutocomplete();
  proximo_input();
  ajax_post_async((String(url_principal) + 'get_all_motoristas.php'), {senha:senha, telefone:telefone}, mostrar_motoristas);
  temporizador_busca_motoristas = setInterval(function(){
    ajax_post_async((String(url_principal) + 'get_all_motoristas.php'), {senha:senha, telefone:telefone}, mostrar_motoristas);
  }, 10000);
};

//feito com bootblocks.com.br
  $("#"+'reprodutor_lottie_1').hide();
  $("#"+'reprodutor_lottie_2').hide();
  $("#"+'reprodutor_lottie_3').hide();
  $("#"+'tela_status').hide();
  $("#"+'tela_categorias').hide();

//feito com bootblocks.com.br
  endereco_inicial = '';
  endereco_final = '';
  latitude_inicial = '';
  lonngitude_inicial = '';
  latitude_final = '';
  longitude_final = '';

$(document).on("click", "#tela_sair", function(){
  localStorage.clear();
  window.location.href = "index.php";});

$(document).on("click", "#btn_avancar", function(){
  if ($("#box_origem").val() && $("#box_destino").val()) {
    $("#"+'loading').show();
    ajax_post_async((String(url_principal) + 'calcular_custos.php'), {cidade_id:cidade_id, lat_ini:latitude_inicial, lng_ini:lonngitude_inicial, lat_fim:latitude_final, lng_fim:longitude_final}, exibir_categorias);
  } else {
    Swal.fire('Preencha origem e destino!');
  }
});

//feito com bootblocks.com.br
  $("#box_origem").css("border-radius", "15px");
  $("#box_destino").css("border-radius", "15px");

$(document).on("click", "#card_cancelar", function(){
  Swal.fire({
  title: 'Deseja realmente cancelar a corrida?',
  showCancelButton: true,
  confirmButtonText: 'Sim',
  cancelButtonText: 'Não',
  }).then((result) => {
  if (result.value) {
  cancelar()
  } else if (result.dismiss === Swal.DismissReason.cancel) {
  n_cancelar()
  }
  });
});

//feito com bootblocks.com.br
  $("#card_iniciar_chamado").css("background-color", "#020795");
  $("#btn_avancar").css("background-color", "#020795");
  $("#destinos_cabecalho").css("display", "flex");
  $("#destinos_cabecalho").css("justify-content", "center");
  $("#tela_lbl_destino").css("display", "flex");
  $("#tela_lbl_destino").css("justify-content", "center");
  $("#destinos_cabecalho").css("display", "flex");
  $("#destinos_cabecalho").css("align-items", "center");
  $("#btn_avancar").css("display", "flex");
  $("#btn_avancar").css("justify-content", "center");
  $("#card_iniciar_chamado").css("display", "flex");
  $("#card_iniciar_chamado").css("justify-content", "center");
  document.getElementById('btn_avancar').style.height = '80' + "px";
  document.getElementById('btn_avancar').style.width = '90' + "%";
  document.getElementById('btn_avancar').style.height = "auto";
  document.getElementById('card_iniciar_chamado').style.height = '80' + "px";
  document.getElementById('card_iniciar_chamado').style.width = '90' + "%";
  document.getElementById('card_iniciar_chamado').style.height = "auto";
  $("#btn_avancar").css("border-radius", "30px");
  $("#card_iniciar_chamado").css("border-radius", "30px");
  $("#btn_avancar").css("display", "flex");
  $("#btn_avancar").css("align-items", "center");
  $("#card_iniciar_chamado").css("display", "flex");
  $("#card_iniciar_chamado").css("justify-content", "center");
  $("#tela_btn_avancar").css("display", "flex");
  $("#tela_btn_avancar").css("justify-content", "center");
  $("#tela_card_iniciar_chamado").css("display", "flex");
  $("#tela_card_iniciar_chamado").css("justify-content", "center");
  $("#tela_lbl_categoria").css("display", "flex");
  $("#tela_lbl_categoria").css("justify-content", "center");
  $("#"+'tela_lbl_categoria').css("padding-left", 0+ "px");
  $("#"+'tela_lbl_categoria').css("padding-right", 0+ "px");
  $("#"+'tela_lbl_categoria').css("padding-top", 10+ "px");
  $("#"+'tela_lbl_categoria').css("padding-bottom", 2+ "px");
  $("#txt_tela_categorias").css("display", "flex");
  $("#txt_tela_categorias").css("justify-content", "center");
  $("#"+'lbl_avancar').css("margin-left", 0+ "px");
  $("#"+'lbl_avancar').css("margin-right", 0+ "px");
  $("#"+'lbl_avancar').css("margin-top", 2+ "px");
  $("#"+'lbl_avancar').css("margin-bottom", 2+ "px");
  $("#"+'btn_avancar').css("margin-left", 0+ "px");
  $("#"+'btn_avancar').css("margin-right", 0+ "px");
  $("#"+'btn_avancar').css("margin-top", 0+ "px");
  $("#"+'btn_avancar').css("margin-bottom", 10+ "px");
  $("#"+'tela_destinos').hide();
  $("#"+'tela_btn_avancar').hide();
  $("#"+'tela_categorias').hide();

$(document).on("click", "#card_iniciar", function(){
  $("#"+'tela_barra_inicio').hide();
  document.getElementById('tela_destinos').style.position = "fixed";
  document.getElementById('tela_destinos').style.top = "0px";
  document.getElementById('tela_destinos').style.left = "0";
  document.getElementById('tela_destinos').style.right = "0";
  document.getElementById('tela_destinos').style.zIndex = "27";
  $("#"+'tela_destinos').show();
  document.getElementById('tela_btn_avancar').style.position = "fixed";
  document.getElementById('tela_btn_avancar').style.bottom = "0px";
  document.getElementById('tela_btn_avancar').style.left = "0";
  document.getElementById('tela_btn_avancar').style.right = "0";
  document.getElementById('tela_btn_avancar').style.zIndex = "28";
  $("#"+'tela_btn_avancar').show();
  obter_endereco_usuario();
});

//feito com bootblocks.com.br
  $("#"+'tela_barra_inicio').animate({height:(window.innerHeight * (20 / 100))+"px",width:(window.innerWidth * (100 / 100))+"px"},800);
  document.getElementById('tela_barra_inicio').style.position = "fixed";
  document.getElementById('tela_barra_inicio').style.bottom = "0px";
  document.getElementById('tela_barra_inicio').style.left = "0";
  document.getElementById('tela_barra_inicio').style.right = "0";
  document.getElementById('tela_barra_inicio').style.zIndex = "21";
  $("#tela_boas_vindas").css("display", "flex");
  $("#tela_boas_vindas").css("justify-content", "center");
  $("#tela_onde_vamos").css("display", "flex");
  $("#tela_onde_vamos").css("justify-content", "center");
  $("#tela_card_iniciar").css("display", "flex");
  $("#tela_card_iniciar").css("justify-content", "center");
  verificar_saudacao();
  $("#"+'lbl_boas_vindas').css("margin-left", 0+ "px");
  $("#"+'lbl_boas_vindas').css("margin-right", 0+ "px");
  $("#"+'lbl_boas_vindas').css("margin-top", 10+ "px");
  $("#"+'lbl_boas_vindas').css("margin-bottom", 0+ "px");
  $("#card_iniciar").css("display", "flex");
  $("#card_iniciar").css("justify-content", "center");
  document.getElementById('card_iniciar').style.height = '80' + "px";
  document.getElementById('card_iniciar').style.width = '80' + "%";
  document.getElementById('card_iniciar').style.height = "auto";
  $("#card_iniciar").css("border-radius", "30px");
  $("#card_iniciar").css("display", "flex");
  $("#card_iniciar").css("align-items", "center");
  $("#"+'lbl_onde_card_iniciar').css("margin-left", 0+ "px");
  $("#"+'lbl_onde_card_iniciar').css("margin-right", 0+ "px");
  $("#"+'lbl_onde_card_iniciar').css("margin-top", 2+ "px");
  $("#"+'lbl_onde_card_iniciar').css("margin-bottom", 2+ "px");

$(document).on("click", "#icone_chat", function(){
  window.location.href = "mensagens.php";});

$(document).on("click", "#card_iniciar_chamado", function(){
  forma_pagamento = $("input[name=forma_pagamento]:checked").val();
  if (forma_pagamento) {
    if (forma_pagamento == 'Carteira Crédito') {
      ajax_post_async((String(url_principal) + 'verifica_saldo.php'), {senha:senha, telefone:telefone, valor:valor_corrida}, verifica_saldo);
    } else {
      enviar_solicitacao_chamado();
    }
  } else {
    Swal.fire('Selecione a forma de Pagamento!');
  }
});

//feito com bootblocks.com.br
  $("#tela_timer").css("display", "flex");
  $("#tela_timer").css("justify-content", "center");
  $("#card_cancelar").css("background-color", "#020795");
  $("#tela_status_txt").css("display", "flex");
  $("#tela_status_txt").css("justify-content", "center");
  $("#tela_botoes_status").css("display", "flex");
  $("#tela_botoes_status").css("justify-content", "center");
  $("#card_cancelar").css("display", "flex");
  $("#card_cancelar").css("justify-content", "center");
  document.getElementById('tela_status').style.position = "fixed";
  document.getElementById('tela_status').style.bottom = "0px";
  document.getElementById('tela_status').style.left = "0";
  document.getElementById('tela_status').style.right = "0";
  document.getElementById('tela_status').style.zIndex = "28";
  document.getElementById('card_cancelar').style.height = '80' + "px";
  document.getElementById('card_cancelar').style.width = '80' + "%";
  document.getElementById('card_cancelar').style.height = "auto";
  $("#card_cancelar").css("border-radius", "30px");
  $("#card_cancelar").css("display", "flex");
  $("#card_cancelar").css("align-items", "center");
  $("#"+'txt_cancelar').css("margin-left", 0+ "px");
  $("#"+'txt_cancelar').css("margin-right", 0+ "px");
  $("#"+'txt_cancelar').css("margin-top", 2+ "px");
  $("#"+'txt_cancelar').css("margin-bottom", 2+ "px");
  $("#"+'tela_status').hide();
  $("#tela_lottie").css("display", "flex");
  $("#tela_lottie").css("justify-content", "center");
  $("#"+'tela_lottie').css("margin-left", 0+ "px");
  $("#"+'tela_lottie').css("margin-right", 0+ "px");
  $("#"+'tela_lottie').css("margin-top", 10+ "px");
  $("#"+'tela_lottie').css("margin-bottom", 5+ "px");
  $("#"+'reprodutor_lottie_2').hide();
  $("#"+'reprodutor_lottie_3').hide();
  $("#"+'reprodutor_lottie_4').hide();
  $("#tela_img_motorista").css("display", "flex");
  $("#tela_img_motorista").css("justify-content", "center");
  $("#tela_dados_motorista").css("display", "flex");
  $("#tela_dados_motorista").css("justify-content", "center");
  $("#"+'tela_img_motorista').hide();
  $("#"+'tela_dados_motorista').hide();
  $("#"+'audio').hide();
  $("#tela_txt_finalizar").css("display", "flex");
  $("#tela_txt_finalizar").css("justify-content", "center");
  $("#"+'tela_txt_finalizar').hide();

//feito com bootblocks.com.br
  $("#card_finalizar").css("background-color", "#020795");
  $("#card_finalizar").css("display", "flex");
  $("#card_finalizar").css("justify-content", "center");
  document.getElementById('card_finalizar').style.height = '80' + "px";
  document.getElementById('card_finalizar').style.width = '80' + "%";
  document.getElementById('card_finalizar').style.height = "auto";
  $("#card_finalizar").css("border-radius", "30px");
  $("#card_finalizar").css("display", "flex");
  $("#card_finalizar").css("align-items", "center");
  $("#"+'card_finalizar').css("margin-left", 0+ "px");
  $("#"+'card_finalizar').css("margin-right", 0+ "px");
  $("#"+'card_finalizar').css("margin-top", 2+ "px");
  $("#"+'card_finalizar').css("margin-bottom", 2+ "px");
  $("#"+'card_finalizar').hide();

$(document).on("click", "#icone_voltar_destinos", function(){
  $("#"+'tela_destinos').hide();
  $("#"+'tela_btn_avancar').hide();
  $("#"+'tela_barra_inicio').show();
});

$(document).on("click", "#tela_historico_corridas", function(){
  window.location.href = "historico.php";});

//feito com bootblocks.com.br
  $("#tela_cabecalho_status").css("display", "flex");
  $("#tela_cabecalho_status").css("justify-content", "center");
  $("#"+'icone_minimizar').css("margin-left", 0+ "px");
  $("#"+'icone_minimizar').css("margin-right", 10+ "px");
  $("#"+'icone_minimizar').css("margin-top", 10+ "px");
  $("#"+'icone_minimizar').css("margin-bottom", 0+ "px");
  status_minimizado = false;

//feito com bootblocks.com.br
  $("#tela_cabecalho_categorias").css("display", "flex");
  $("#tela_cabecalho_categorias").css("justify-content", "center");
  $("#"+'icone_minimizar_categorias').css("margin-left", 0+ "px");
  $("#"+'icone_minimizar_categorias').css("margin-right", 10+ "px");
  $("#"+'icone_minimizar_categorias').css("margin-top", 10+ "px");
  $("#"+'icone_minimizar_categorias').css("margin-bottom", 0+ "px");
  categorias_minimizado = false;

//feito com bootblocks.com.br
  tamanho_msg = 0;
  $("#"+'audio_message').hide();
  status_anterior = '';

$(document).on("click", "#icone_minimizar", function(){
  if (status_minimizado) {
    status_minimizado = false;
    $("#"+'tela_status').animate({height:altura_tela_status+"px",width:(window.innerWidth * (100 / 100))+"px"},800);
    $("#icone_minimizar").html('close_fullscreen');
  } else {
    status_minimizado = true;
    altura_tela_status = document.getElementById('tela_status').offsetHeight;
    $("#"+'tela_status').animate({height:50+"px",width:(window.innerWidth * (100 / 100))+"px"},800);
    $("#icone_minimizar").html('open_in_full');
  }
});

$(document).on("click", "#icone_minimizar_categorias", function(){
  if (categorias_minimizado) {
    categorias_minimizado = false;
    $("#"+'tela_categorias').animate({height:altura_tela_categorias+"px",width:(window.innerWidth * (100 / 100))+"px"},800);
    $("#icone_minimizar_categorias").html('close_fullscreen');
  } else {
    altura_tela_categorias = document.getElementById('tela_categorias').offsetHeight;
    categorias_minimizado = true;
    $("#"+'tela_categorias').animate({height:50+"px",width:(window.innerWidth * (100 / 100))+"px"},800);
    $("#icone_minimizar_categorias").html('open_in_full');
  }
});

$(document).on("click", "#card_finalizar", function(){
  window.location.href = "home.php";});
function ajax_post(url, dados){
                let retorno;
                $.ajax({
                    url: url,
                    type: "POST",
                    data: dados,
                    async: false,
                    success: function(data){
                        retorno = data;
                    },
                    error: function(data){
                        retorno = data;
                    }
                });
                return retorno;
            }function ajax_post_async(url, dados, funcao_chamar){
                $.ajax({
                    url: url,
                    type: "POST",
                    data: dados,
                    async: true,
                    success: function(data){
                        funcao_chamar(data);
                    },
                    error: function(data){
                        funcao_chamar(data);
                    }
                });
            }
            function txt_to_number(txt){
            txt = txt+"";
            if(txt.includes(",")){
                txt = txt.replace(",", ".");
            }
            if(txt.includes(".")){
                txt = parseFloat(txt);
            }else{
                txt = parseInt(txt);
            }
            return txt;
        }
        $(document).ready(function(){
            $("#loading-page-bb").css("opacity", "1");
        });