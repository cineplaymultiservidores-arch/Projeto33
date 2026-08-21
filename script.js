const CHAVE_PIX="38258022806";const FRETE=8;const ZAP="5514999999999";
const produtos=[{id:1,cat:'lanches',nome:'X-Burguer',desc:'Pão, carne, queijo, salada',preco:18,foto:'https://i.postimg.cc/NGTcrvjS/IMG-20260821-WA5818.jpg'},{id:2,cat:'porcoes',nome:'Porção de Batata',desc:'400g + cheddar e bacon',preco:28,foto:'https://i.postimg.cc/NGTcrvjS/IMG-20260821-WA5818.jpg'},{id:3,cat:'bebidas',nome:'Coca Lata',desc:'350ml gelada',preco:6,foto:'https://i.postimg.cc/NGTcrvjS/IMG-20260821-WA5818.jpg'}];
let carrinho=[];let etapa=1;let tipoEntrega='entrega';
function estaAberto(){const d=new Date();const h=d.getHours()+d.getMinutes()/60;return(h>=9&&h<14.5)||(h>=19||h<0.5);}
function render(f='todos'){const l=document.getElementById('lista-produtos');l.innerHTML='';produtos.filter(p=>f==='todos'||p.cat===f).forEach(p=>{l.innerHTML+=`<div class="produto"><img src="${p.foto}"><div class="prod-info"><h3>${p.nome}</h3><p>${p.desc}</p><div class="preco">R$ ${p.preco.toFixed(2).replace('.',',')}</div></div><button class="btn-add" onclick="add(${p.id})">+</button></div>`});}
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
function enviarZap(){const n=document.getElementById('nome').value;let s=0;carrinho.forEach(p=>s+=p.preco*p.qtd);let fr=tipoEntrega==='entrega'?FRETE:0;let tot=s+fr;let txt=`*PEDIDO FABRICA*%0A`;carrinho.forEach(p=>{txt+=`${p.qtd}x ${p.nome}%0A`;});txt+=`%0ATotal R$ ${tot}%0ACliente ${n}%0ATipo ${tipoEntrega}%0APix ${CHAVE_PIX}`;window.open(`https://wa.me/${ZAP}?text=${txt}`,'_blank');}
// AQUI TAVA O ERRO - ANTES TAVA COM FRETE JUNTO, AGORA SÓ ABERTO
function statusLoja(){
  const el=document.getElementById('status-loja');
  if(!el)return;
  if(estaAberto()){
    el.innerText='● ABERTO AGORA';
    el.style.background='#25D366';
  }else{
    el.innerText='● FECHADO';
    el.style.background='#ff0044';
  }
}
render();statusLoja();setInterval(statusLoja,60000);
