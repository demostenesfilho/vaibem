var latitude, longitude, velocidade, altitude, dados_retorno, retorno, lista_de_cidades, nome, token, telefone, url_principal, senha, senha_2, Item, cidade_id;

// Descreva esta função...
function cadastro_ok() {
  Swal.fire('Cadastrado com sucesso!');
  var temp = setInterval(nova_tela, 1000);
}

// Descreva esta função...
function nova_tela() {
  window.location.href = "principal.php";}

// Descreva esta função...
function cadastrar() {
  nome = $("#nome_box").val();
  telefone = $("#telefone_box").val();
  senha = $("#senha_box").val();
  senha_2 = $("#senha_box_2").val();
  cidade_id = $("#cidades").val();
  if (!telefone.length) {
    Swal.fire('Preencha com seu Telefone');
  } else {
    if (!senha.length) {
      Swal.fire('Preencha com sua Senha');
    } else {
      if (senha != senha_2) {
        Swal.fire('Senhas são diferentes!');
      } else {
        if (cidade_id == 0) {
          Swal.fire('Selecione uma Cidade!');
        } else {
          document.getElementById('loading').style.position = "fixed";
          document.getElementById('loading').style.top = "50%";
          document.getElementById('loading').style.transform = "translateY(-50%)";
          document.getElementById('loading').style.left = "0";
          document.getElementById('loading').style.right = "0";
          document.getElementById('loading').style.zIndex = "20";
          $("#"+'loading').show();
          ajax_post_async((String(url_principal) + 'cadastra_user.php'), {token:token, nome:nome, telefone:telefone, senha:senha, cidade_id:cidade_id, latitude:latitude, longitude:longitude}, finaliza_cadastro);
        }
      }
    }
  }
}

// Descreva esta função...
function listar_cidades(dados_retorno) {
  $("#cidades").empty();
  $("#cidades").append("<option value="+0+" selected >"+'Cidade'+"</option>");
  lista_de_cidades = JSON.parse(dados_retorno);
  for (var Item_index in lista_de_cidades) {
    Item = lista_de_cidades[Item_index];
    $("#cidades").append("<option value="+Item['id']+">"+Item['nome']+"</option>");
  }
}

// Descreva esta função...
function finaliza_cadastro(retorno) {
  $("#"+'loading').hide();
  retorno = JSON.parse(retorno);
  if (retorno['status'] == 'sucesso') {
    Swal.fire('Cadastrado com sucesso!');
    var fechar = setInterval(salvar_local, 1000);
  } else {
    Swal.fire({
    icon: 'error',
    title: retorno['status'],
    text: 'Erro'
    });
  }
}

// Descreva esta função...
function salvar_local() {
  localStorage.setItem('nome_cliente',nome);
  localStorage.setItem('telefone_cliente',telefone);
  localStorage.setItem('senha',senha);
  localStorage.setItem('cidade_id',cidade_id);
  window.location.href = "login.php";}


//feito com bootblocks.com.br
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  } , function(error) {
  });
  } else {
  alert("Seu navegador não suporta Geolocalização!");
  }

//feito com bootblocks.com.br
  $("#loading").css("background-color", "rgba(0, 0, 0, 0)");
  $("#loading").css("display", "flex");
  $("#loading").css("justify-content", "center");
  $("#"+'loading').hide();

//feito com bootblocks.com.br
  $("#nome_box").css("border-radius", "15px");
  $("#telefone_box").css("border-radius", "15px");
  $("#senha_box").css("border-radius", "15px");
  $("#senha_box_2").css("border-radius", "15px");
  $("#logar_btn").css("border-radius", "15px");
  $("#cidades").css("border-radius", "15px");

if (navigator.geolocation) {
navigator.geolocation.watchPosition(function(position) {
latitude = position.coords.latitude;
longitude = position.coords.longitude;
velocidade = position.coords.speed;
altitude = position.coords.altitude;
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
  lista_de_cidades = [];
  token = localStorage.getItem('token') || '';
  url_principal = localStorage.getItem('url_principal') || '';
  ajax_post_async((String(url_principal) + 'get_cidades.php'), {token:token}, listar_cidades);

$(document).on("click", "#logar_lbl", function(){
  window.location.href = "login.php";});

//feito com bootblocks.com.br
  $("#tela_logo").css("display", "flex");
  $("#tela_logo").css("justify-content", "center");
  $("#tela_txt_cadastro").css("display", "flex");
  $("#tela_txt_cadastro").css("justify-content", "center");
  $("#logar_btn").css("height", "40px");
  $("#logar_btn").css("width", "100%");
  $("#tela_cadastrar").css("display", "flex");
  $("#tela_cadastrar").css("justify-content", "center");
  $("body").css("background-color", "#020795");
  $("#tela_logo").css("background-color", "#020795");
  $("#tela_txt_cadastro").css("background-color", "#020795");
  $("#tela_cadastrar").css("background-color", "#020795");
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
            
        $(document).ready(function(){
            $("#loading-page-bb").css("opacity", "1");
        });