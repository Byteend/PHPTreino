$(function () {
  const apiUrl = "/api/produtos.php";

  function showMessage(text) {
    $("#message").text(text);
  }

  function resetForm() {
    $("#product-form")[0].reset();
    $("#product-id").val("");
    $("#save-button").text("Adicionar produto");
    $("#cancel-button").prop("hidden", true);
  }

  function loadProducts() {
    $.ajax({
      url: apiUrl,
      method: "GET",
      dataType: "json"
    }).done(function (products) {
      if (!Array.isArray(products)) {
        showMessage("A resposta da API deve ser uma lista de produtos.");
        return;
      }

      const rows = products.map(function (product) {
        const row = $("<tr>").attr("data-id", product.id);
        $("<td>").text(product.nome).appendTo(row);
        $("<td>").text(product.quantidade).appendTo(row);

        const actions = $("<td>");
        $("<button>")
          .attr("type", "button")
          .addClass("row-button edit-button")
          .text("Editar")
          .appendTo(actions);
        $("<button>")
          .attr("type", "button")
          .addClass("row-button delete-button")
          .text("Excluir")
          .appendTo(actions);
        actions.appendTo(row);

        return row;
      });

      $("#product-list").empty().append(rows);
      showMessage("");
    }).fail(function () {
      showMessage("Não foi possível carregar os produtos. Verifique a conexão com o backend.");
    });
  }

  $("#product-form").on("submit", function (event) {
    event.preventDefault();

    const id = $("#product-id").val();
    const data = {
      acao: id ? "atualizar" : "criar",
      id: id,
      nome: $("#product-name").val().trim(),
      quantidade: $("#product-quantity").val()
    };

    $.ajax({
      url: apiUrl,
      method: "POST",
      data: data
    }).done(function () {
      resetForm();
      showMessage("Produto salvo.");
      loadProducts();
    }).fail(function () {
      showMessage("Não foi possível salvar o produto.");
    });
  });

  $("#product-list").on("click", ".edit-button", function () {
    const row = $(this).closest("tr");
    $("#product-id").val(row.attr("data-id"));
    $("#product-name").val(row.children().eq(0).text());
    $("#product-quantity").val(row.children().eq(1).text());
    $("#save-button").text("Salvar alterações");
    $("#cancel-button").prop("hidden", false);
    $("#product-name").trigger("focus");
  });

  $("#product-list").on("click", ".delete-button", function () {
    const id = $(this).closest("tr").attr("data-id");

    if (!window.confirm("Deseja excluir este produto?")) return;

    $.ajax({
      url: apiUrl,
      method: "POST",
      data: { acao: "excluir", id: id }
    }).done(function () {
      showMessage("Produto excluído.");
      loadProducts();
    }).fail(function () {
      showMessage("Não foi possível excluir o produto.");
    });
  });

  $("#cancel-button").on("click", resetForm);

  loadProducts();
});
