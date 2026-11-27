<?php
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Estoque Simples</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="container">
    <h1>Controle de estoque</h1>

    <form id="product-form">
      <input type="hidden" id="product-id" name="id">
      <label>
        Nome do produto
        <input id="product-name" name="nome" type="text" required maxlength="100">
      </label>
      <label>
        Quantidade
        <input id="product-quantity" name="quantidade" type="number" min="0" step="1" required>
      </label>
      <div class="form-actions">
        <button type="submit" id="save-button">Adicionar produto</button>
        <button type="button" id="cancel-button" class="secondary" hidden>Cancelar edição</button>
      </div>
    </form>

    <p id="message" role="status"></p>

    <h2>Produtos</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody id="product-list"></tbody>
    </table>
  </main>

  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
