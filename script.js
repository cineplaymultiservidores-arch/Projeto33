const CHAVE_PIX="38258022806";const FRETE=8;const ZAP="5514999999999";
const produtos=[
{id:1,cat:'smash',nome:'Smash Burguês',desc:'Pão, maionese, hambúrguer e queijo.',preco:21},
{id:2,cat:'smash',nome:'Smash Salada',desc:'Pão, maionese, hambúrguer, queijo, alface e tomate.',preco:24},
{id:3,cat:'smash',nome:'Smash Bacon',desc:'Pão, maionese, 2 hambúrgueres, queijo, bacon, alface e tomate.',preco:30},
{id:4,cat:'smash',nome:'Smash Egg',desc:'Pão, maionese, ovo, hambúrguer, queijo, alface e tomate.',preco:26},
{id:5,cat:'smash',nome:'Smash Triplo',desc:'Pão, maionese, 3 hambúrgueres, queijo, bacon, alface e tomate.',preco:35},
{id:6,cat:'smash',nome:'Tropical',desc:'Pão, maionese, 120g hambúrguer, queijo, bacon, abacaxi caramelizado, cebola roxa e rúcula.',preco:33},
{id:7,cat:'smash',nome:'Chicken Bacon',desc:'Pão, maionese, frango KFC, queijo, bacon, alface e tomate.',preco:30},
{id:8,cat:'smash',nome:'Smash Tudo (Pão Francês)',desc:'Pão francês, maionese, 4 hambúrgueres, queijo prato, bacon, 3 ovos, calabresa, alface e tomate.',preco:55},
{id:9,cat:'porcoes',nome:'Frango KFC P (350g)',desc:'Filé de frango crocante e molho especial.',preco:30},
{id:10,cat:'porcoes',nome:'Frango KFC M (500g)',desc:'Filé de frango crocante e molho especial.',preco:50},
{id:11,cat:'porcoes',nome:'Frango KFC G (1kg)',desc:'Filé de frango crocante e molho especial.',preco:80},
{id:12,cat:'porcoes',nome:'Tilápia',desc:'Filé de tilápia, pão na chapa, batata frita e molho tártaro.',preco:70},
{id:13,cat:'porcoes',nome:'Anéis de Cebola 300g',desc:'Anéis de cebola fritos crocantes.',preco:25},
{id:14,cat:'porcoes',nome:'Filé de Frango à Parmegiana',desc:'1kg de filé de frango, 300g de batata frita, molho e queijo.',preco:80},
{id:15,cat:'porcoes',nome:'Batata Frita 600g',desc:'Batata frita crocante.',preco:40},
{id:16,cat:'porcoes',nome:'Batata Cheddar e Bacon',desc:'Batata frita com cheddar e bacon.',preco:55},
{id:17,cat:'porcoes',nome:'Batata 4 Queijos',desc:'Batata frita, 4 queijos e bacon.',preco:56},
{id:18,cat:'porcoes',nome:'Tacos Mexicanos',desc:'Tacos de carne, frango, presunto e queijo.',preco:20},
{id:19,cat:'porcoes',nome:'Contra Filé',desc:'500g de contra filé, batata frita e torrada.',preco:110},
{id:20,cat:'porcoes',nome:'Parmegiana de Carne',desc:'Parmegiana de carne acompanha batata frita.',preco:110},
{id:21,cat:'porcoes',nome:'Nachos',desc:'Doritos, carne moída ou frango desfiado.',preco:55},
{id:22,cat:'dogs',nome:'Dog Tradicional',desc:'Pão, maionese, ketchup, mostarda, 2 salsichas, purê, vinagrete e batata.',preco:17},
{id:23,cat:'dogs',nome:'Dog Bacon',desc:'Pão, maionese, ketchup, mostarda, 2 salsichas, bacon, alface e batata palha.',preco:19},
{id:24,cat:'dogs',nome:'Dog Vaca Louca',desc:'Pão, maionese, ketchup, mostarda, 2 salsichas, carne desfiada, queijo, catupiry, alface e batata palha.',preco:25},
{id:25,cat:'coxinha',nome:'Coxinha Carne c/ Ovo',desc:'Coxinha de carne com ovo.',preco:10},
{id:26,cat:'coxinha',nome:'Coxinha Presunto e Queijo',desc:'Coxinha de presunto e queijo.',preco:12},
{id:27,cat:'coxinha',nome:'Coxinha Frango c/ Catupiry',desc:'Coxinha de frango com catupiry.',preco:10},
{id:28,cat:'coxinha',nome:'Coxinha Carne c/ Cream Cheese',desc:'Coxinha de carne com cream cheese.',preco:12},
{id:29,cat:'rap10',nome:'Rap 10',desc:'Massa Rap10, hambúrguer artesanal, queijo prato, molho rosé apimentado, cebola roxa, tomate, alface e rúcula.',preco:20},
{id:30,cat:'cafe',nome:'Pão na Chapa',desc:'Pão na chapa com manteiga.',preco:6},
{id:31,cat:'cafe',nome:'Misto Quente',desc:'Presunto e queijo.',preco:10},
{id:32,cat:'cafe',nome:'Omelete',desc:'Omelete.',preco:10},
{id:33,cat:'cafe',nome:'Bauru',desc:'Presunto, queijo, tomate e orégano.',preco:12},
{id:34,cat:'cafe',nome:'Americano',desc:'Presunto, queijo e ovo.',preco:15},
{id:35,cat:'cafe',nome:'Pão c/ Hambúrguer',desc:'Hambúrguer artesanal, queijo, alface e tomate.',preco:15},
{id:36,cat:'cafe',nome:'Requeijão Tost',desc:'Pão, requeijão e queijo tostado.',preco:15},
{id:37,cat:'cafe',nome:'Tapioca Frango',desc:'Frango desfiado, catupiry e milho.',preco:16},
{id:38,cat:'cafe',nome:'Tapioca Presunto e Queijo',desc:'Presunto, queijo, tomate e requeijão.',preco:18},
{id:39,cat:'cafe',nome:'Café Preto',desc:'Café preto.',preco:2},
{id:40,cat:'cafe',nome:'Café c/ Leite',desc:'Café com leite.',preco:5},
{id:41,cat:'cafe',nome:'Capuccino',desc:'Capuccino cremoso.',preco:12},
{id:42,cat:'cafe',nome:'Vitamina',desc:'Banana, mamão, morango e maçã.',preco:13},
{id:43,cat:'bebidas',nome:'Coca-Cola 600ml',desc:'Refrigerante Coca-Cola 600ml gelada.',preco:10},
{id:44,cat:'bebidas',nome:'Coca-Cola 1 Litro',desc:'Refrigerante Coca-Cola 1 litro.',preco:12},
{id:45,cat:'bebidas',nome:'Coca-Cola 2 Litros',desc:'Refrigerante Coca-Cola 2 litros.',preco:15},
{id:46,cat:'bebidas',nome:'Poty 600ml',desc:'Refrigerante Poty 600ml.',preco:7},
{id:47,cat:'bebidas',nome:'Poty 2 Litros',desc:'Refrigerante Poty 2 litros.',preco:12},
{id:48,cat:'bebidas',nome:'Roller 2 Litros',desc:'Refrigerante Roller 2 litros.',preco:12},
{id:49,cat:'bebidas',nome:'Refrigerante Lata',desc:'Refrigerante em lata gelado.',preco:6},
{id:50,cat:'bebidas',nome:'Suco Del Valle 600ml',desc:'Suco Del Valle 600ml.',preco:6},
{id:51,cat:'bebidas',nome:'Suco Del Valle 1L',desc:'Suco Del Valle 1 litro.',preco:10},
{id:52,cat:'bebidas',nome:'Suco Pomar 1L',desc:'Suco Pomar 1 litro.',preco:15},
{id:53,cat:'bebidas',nome:'H2O',desc:'Bebida H2O.',preco:8},
{id:54,cat:'bebidas',nome:'Água',desc:'Água mineral.',preco:4},
{id:55,cat:'bebidas',nome:'Antarctica 1L',desc:'Refrigerante Antarctica 1 litro.',preco:8.5},
{id:56,cat:'bebidas',nome:'Cerveja Barrigudinha',desc:'Cerveja Barrigudinha.',preco:5},
{id:57,cat:'bebidas',nome:'Cerveja Lata',desc:'Cerveja em lata gelada.',preco:6},
{id:58,cat:'adicionais',nome:'Adic. Bacon',desc:'Adicional de bacon crocante.',preco:5},
{id:59,cat:'adicionais',nome:'Adic. Queijo',desc:'Adicional de queijo.',preco:5},
{id:60,cat:'adicionais',nome:'Adic. Hambúrguer',desc:'Adicional de hambúrguer 120g.',preco:6},
{id:61,cat:'adicionais',nome:'Adic. Cheddar',desc:'Adicional de cheddar.',preco:4},
{id:62,cat:'adicionais',nome:'Adic. Calabresa',desc:'Adicional de calabresa.',preco:5},
{id:63,cat:'adicionais',nome:'Adic. Alface',desc:'Adicional de alface.',preco:2.5},
{id:64,cat:'adicionais',nome:'Adic. Tomate',desc:'Adicional de tomate.',preco:2.5},
{id:65,cat:'adicionais',nome:'Adic. Salsicha',desc:'Adicional de salsicha.',preco:4},
{id:66,cat:'adicionais',nome:'Adic. Ovo',desc:'Adicional de ovo.',preco:2},
{id:67,cat:'adicionais',nome:'Adic. Catupiry',desc:'Adicional de catupiry.',preco:4}
];
let carrinho=[];let etapa=1;let tipoEntrega='entrega';
function estaAberto(){const d=new Date();const h=d.getHours()+d.getMinutes()/60;return(h>=9&&h<14.5)||(h>=19||h<0.5);}
function render(f='todos'){const l=document.getElementById('lista-produtos');l.innerHTML='';produtos.filter(p=>f==='todos'||p.cat===f).forEach(p=>{const img=p.foto?p.foto:'https://via.placeholder.com/400x300/222/FFD700?text='+encodeURIComponent(p.nome);l.innerHTML+=`<div class="produto"><img src="${img}"><div class="prod-info"><h3>${p.nome}</h3><p>${p.desc}</p><div class="preco">R$ ${p.preco.toFixed(2).replace('.',',')}</div></div><button class="btn-add" onclick="add(${p.id})">+</button></div>`});}
function add(id){const p=produtos.find(x=>x.id===id);const e=carrinho.find(x=>x.id===id);if(e)e.qtd++;else carrinho.push({...p,qtd:1});upd();}
function removerCarrinho(id){const e=carrinho.find(x=>x.id===id);if(!e)return;if(e.qtd>1)e.qtd--;else carrinho=carrinho.filter(x=>x.id!==id);upd();if(carrinho.length===0)fecharCarrinho();}
function setTipo(t){tipoEntrega=t;document.getElementById('btn-entrega').classList.toggle('ativo-tipo',t==='entrega');document.getElementById('btn-retirada').classList.toggle('ativo-tipo',t==='retirada');upd();}
function upd(){let s=0,q=0;carrinho.forEach(p=>{s+=p.preco*p.qtd;q+=p.qtd;});let fr=(tipoEntrega==='entrega'&&etapa>=2)?FRETE:0;let tot=s+fr;document.getElementById('total-bar').innerText=`R$ ${s.toFixed(2).replace('.',',')} • ${q} itens`;document.getElementById('subtotal-modal').innerText=`R$ ${s.toFixed(2).replace('.',',')}`;document.getElementById('total-modal').innerText=`R$ ${tot.toFixed(2).replace('.',',')}`;document.getElementById('frete-modal').innerText=(tipoEntrega==='entrega'&&etapa>=2)?`R$ ${FRETE.toFixed(2).replace('.',',')}`:'A calcular';const d=document.getElementById('itens-carrinho');d.innerHTML='';carrinho.forEach(p=>{d.innerHTML+=`<div class="item-car"><span>${p.nome}</span><div style="display:flex;gap:8px;align-items:center;"><button onclick="removerCarrinho(${p.id})" style="width:28px;height:28px;border-radius:50%;background:#222;color:#fff;border:1px solid #333;">-</button><span style="color:#FFD700;font-weight:900;">${p.qtd}</span><button onclick="add(${p.id})" style="width:28px;height:28px;border-radius:50%;background:#FFD700;border:none;">+</button></div><span>R$ ${(p.preco*p.qtd).toFixed(2).replace('.',',')}</span></div>`});}
function filtrar(c,el){document.querySelectorAll('.cat').forEach(x=>x.classList.remove('ativo'));el.classList.add('ativo');render(c);}
function abrirCarrinho(){if(!estaAberto())return alert('FECHADO - Abre 09h-14h30 e 19h-00h30');if(carrinho.length===0)return alert('Carrinho vazio');etapa=1;mostrarEtapa();upd();mostrarPix();document.getElementById('modal-carrinho').style.display='block';}
function fecharCarrinho(){document.getElementById('modal-carrinho').style.display='none';}
function mostrarEtapa(){document.getElementById('etapa-1').style.display=etapa===1?'block':'none';document.getElementById('etapa-2').style.display=etapa===2?'block':'none';document.getElementById('etapa-3').style.display=etapa===3?'block':'none';document.getElementById('btn-voltar-etapa').style.display=etapa===1?'none':'block';document.getElementById('titulo-etapa').innerText=etapa===1?'1. Seus dados':etapa===2?'2. Endereço':'3. Pagamento';document.getElementById('btn-proxima').innerText=etapa===3?'ENVIAR NO ZAP':'CONTINUAR';upd();}
function proximaEtapa(){if(etapa===1){if(document.getElementById('nome').value.length<3)return alert('Nome');if(document.getElementById('telefone').value.length<9)return alert('Whats');if(tipoEntrega==='retirada'){etapa=3;mostrarEtapa();mostrarPix();return;}}if(etapa===2){if(!document.getElementById('bairro').value)return alert('Bairro');if(!document.getElementById('rua').value)return alert('Rua');}if(etapa<3){etapa++;mostrarEtapa();mostrarPix();}else{enviarZap();}}
function voltarEtapa(){if(etapa===3&&tipoEntrega==='retirada')etapa=1;else if(etapa>1)etapa--;mostrarEtapa();}
function mostrarPix(){const p=document.getElementById('pagamento').value;const a=document.getElementById('area-pix');if(p==='Pix'){a.innerHTML=`<p style="color:#FFD700;font-size:11px;font-weight:900;">CHAVE PIX CPF:</p><div style="display:flex;gap:8px;margin-top:8px;"><input id="chave-pix" value="${CHAVE_PIX}" readonly style="margin:0;flex:1;"><button onclick="navigator.clipboard.writeText('${CHAVE_PIX}');alert('Copiado')" style="width:80px;background:#FFD700;color:#000;font-weight:900;border:none;border-radius:8px;">COPIAR</button></div>`;}else if(p==='Dinheiro'){a.innerHTML=`<input id="troco" placeholder="Troco pra quanto?">`;}else{a.innerHTML=`<select id="tipo-cartao"><option>Crédito</option><option>Débito</option></select>`;}}
function enviarZap(){const n=document.getElementById('nome').value;let s=0;carrinho.forEach(p=>s+=p.preco*p.qtd);let fr=tipoEntrega==='entrega'?FRETE:0;let tot=s+fr;let txt=`*PEDIDO FABRICA DE SABORES*%0A`;carrinho.forEach(p=>{txt+=`${p.qtd}x ${p.nome} - R$ ${p.preco}%0A`;});txt+=`%0ASubtotal R$ ${s} + Frete R$ ${fr} = Total R$ ${tot}%0ACliente ${n}%0ATipo ${tipoEntrega}%0APix ${CHAVE_PIX}`;window.open(`https://wa.me/${ZAP}?text=${txt}`,'_blank');}
function statusLoja(){const el=document.getElementById('status-loja');if(!el)return;if(estaAberto()){el.innerText='● ABERTO AGORA';el.style.background='#25D366';}else{el.innerText='● FECHADO';el.style.background='#ff0044';}}
render();statusLoja();setInterval(statusLoja,60000);
