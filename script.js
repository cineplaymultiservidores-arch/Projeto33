const dados = [
  {"categoria": "SMASH LANCHES", "itens": [
    {"nome": "SMASH BURGUES", "preco": 12.00, "desc": "Pão brioche, 1 smash 90g, queijo prato e molho da casa", "imagem": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format"},
    {"nome": "SMASH SALADA", "preco": 14.00, "desc": "Pão brioche, 1 smash 90g, queijo, alface, tomate e molho", "imagem": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=400&auto=format"},
    {"nome": "SMASH EGG", "preco": 15.00, "desc": "Pão brioche, 1 smash 90g, queijo, ovo e molho especial", "imagem": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=400&auto=format"},
    {"nome": "SMASH BACON", "preco": 16.00, "desc": "Pão brioche, 1 smash 90g, queijo, bacon crocante e molho", "imagem": "https://images.unsplash.com/photo-1550549298-42af2eda92ce?q=80&w=400&auto=format"}
  ]},
  {"categoria": "CACHORRO QUENTE", "itens": [
    {"nome": "DOG TRADICIONAL", "preco": 10.00, "desc": "Pão, salsicha, batata palha, milho, ervilha e molhos", "imagem": "https://images.unsplash.com/photo-1627308595229-7830a5c91fe3?q=80&w=400&auto=format"}
  ]},
  {"categoria": "BEBIDAS", "itens": [
    {"nome": "COCA 600ML", "preco": 6.00, "desc": "Refrigerante Coca-Cola 600ml gelada", "imagem": "https://images.unsplash.com/photo-1553456558-aff11c495cc6?q=80&w=400&auto=format"},
    {"nome": "ÁGUA", "preco": 3.00, "desc": "Água mineral 500ml gelada", "imagem": "https://images.unsplash.com/photo-1560869713-90a7cfe0d0e6?q=80&w=400&auto=format"}
  ]}
];

const menu = document.getElementById('menu');
dados.forEach(categoria => {
  let htmlItens = '';
  categoria.itens.forEach(item => {
    htmlItens += `
      <div class="item">
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="info">
          <h3>${item.nome}</h3>
          <p class="desc">${item.desc}</p>
          <p class="preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
    `;
  });
  menu.innerHTML += `<section class="categoria"><h2>${categoria.categoria}</h2>${htmlItens}</section>`;
});
