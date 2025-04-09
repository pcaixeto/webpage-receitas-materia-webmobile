$(document).ready(function() {
  // === Código para o carousel na página index ===
  $('.recipe-card').hide();
  $('.recipe-card').first().show();

  $('.next').click(function() {
    var current = $('.recipe-card:visible');
    var next = current.next('.recipe-card');
    if (next.length === 0) {
      next = $('.recipe-card').first();
    }
    current.fadeOut(500, function() {
      next.fadeIn(500);
    });
  });

  $('.prev').click(function() {
    var current = $('.recipe-card:visible');
    var prev = current.prev('.recipe-card');
    if (prev.length === 0) {
      prev = $('.recipe-card').last();
    }
    current.fadeOut(500, function() {
      prev.fadeIn(500);
    });
  });

  // === Código para verificar se estamos na página recipe.html e popular os dados da receita ===
  if (window.location.pathname.indexOf("recipe.html") !== -1) {
    function getParameterByName(name) {
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(window.location.href);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var recipes = {
      "bolo-chocolate": {
        title: "Bolo de Chocolate",
        image: "assets/image/bolo-chocolate-resized.jpeg",
        ingredients: [
          "200g de chocolate meio amargo",
          "200g de manteiga",
          "4 ovos",
          "200g de açúcar",
          "100g de farinha de trigo",
          "1 colher de chá de fermento em pó"
        ],
        instructions: [
          "Derreta o chocolate e a manteiga em banho-maria.",
          "Adicione os ovos, um a um, batendo bem a cada adição.",
          "Incorpore o açúcar e misture até obter uma massa homogênea.",
          "Acrescente a farinha e o fermento, mexendo delicadamente.",
          "Asse em forno preaquecido a 180°C por aproximadamente 40 minutos ou até que um palito saia limpo."
        ]
      },
      "salada-colorida": {
        title: "Salada Colorida",
        image: "assets/image/salada-colorida-resized.jpeg",
        ingredients: [
          "Alface",
          "Tomate",
          "Cenoura",
          "Pepino",
          "Azeite",
          "Vinagre",
          "Sal e pimenta a gosto"
        ],
        instructions: [
          "Lave e corte os vegetais.",
          "Misture os ingredientes em uma tigela.",
          "Tempere com azeite, vinagre, sal e pimenta.",
          "Sirva imediatamente."
        ]
      }
    };

    // Recupera o ID da receita a partir da query string
    var recipeId = getParameterByName("id");

    if (recipeId && recipes[recipeId]) {
      var recipe = recipes[recipeId];
      $("#header-title").text(recipe.title);
      $("#recipe-title").text(recipe.title);
      $("#recipe-image").attr("src", recipe.image).attr("alt", "Imagem de " + recipe.title);

      var ingredientsList = $("#ingredients-list");
      $.each(recipe.ingredients, function(index, ingredient) {
        ingredientsList.append("<li>" + ingredient + "</li>");
      });

      var instructionsList = $("#instructions-list");
      $.each(recipe.instructions, function(index, instruction) {
        instructionsList.append("<li>" + instruction + "</li>");
      });
    } else {
      $("main").html("<p>Receita não encontrada.</p>");
    }

    // === Efeito de slide para revelar/esconder a informação extra (dica) ===
    $('#toggle-tip').click(function(e) {
      e.preventDefault();
      var tipSection = $(this).closest('.recipe-detail').find('.extra-info');
      if(tipSection.is(':visible')){
        tipSection.slideUp(300);
        $(this).text('Mostrar Dica');
      } else {
        tipSection.slideDown(300);
        $(this).text('Esconder Dica');
      }
    });
  }
});

// === Código para o chat de contato, presente em todas as páginas onde houver o chat ===
$(document).ready(function(){
  $('.contact-btn').click(function(){
    $('#chat-popup').fadeIn(300);
  });
  
  $('#close-chat').click(function(){
    $('#chat-popup').fadeOut(300);
  });
});

$(document).ready(function(){
  $('.contact-btn').click(function(){
    var contactName = $(this).closest('article').find('h2').text();
    $('#chat-popup header h2').text("Chat com " + contactName);
    document.getElementById('chat-popup').showModal();
  });

  $('#close-chat').click(function(){
    document.getElementById('chat-popup').close();
  });
});
