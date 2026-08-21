const CHAVE_PIX_FABRICA = "38258022806";
const FRETE_FIXO = 8.00;
const NUMERO_LOJA = "5514999999999"; // TROCA AQUI PELO ZAP DA FABRICA COM DDD

const produtosPadrao = [
  { id:1, cat:'lanches', nome:'X-Burguer', desc:'Pão, carne, queijo, alface e tomate', preco:18, foto:'' },
  { id:2, cat:'lanches', nome:'X-Salada Especial', desc:'Pão, 2 carnes, queijo, bacon, ovo e batata', preco:28, foto:'' },
  { id:3, cat:'lanches', nome:'X-Tudo da Fábrica', desc:'O mais pedido da casa - completo', preco:35, foto:'' },
  { id:4, cat:'porcoes', nome:'Batata Frita P', desc:'300g de batata crocante', preco:20, foto:'' },
  { id:5, cat:'bebidas', nome:'Coca-Cola Lata', desc:'350ml gelada', preco:6, foto:'' },
  { id:6, cat:'acai', nome:'Açaí 500ml', desc:'Com 3 acompanhamentos', preco:18, foto:'' },
];

function getProdutos(){ return JSON.parse(localStorage.getItem('fabrica_produtos')) || produtosPadrao; }
let carrinho = [];
let etapa = 1;
let tipoEntrega = 'entrega';

function estaAberto(){
  const agora = new Date();
  const hora = agora.getHours() + agora.getMinutes()/60;
  const manha = hora >= 9 && hora < 14.5;
  const noite = hora >= 19 || hora < 0.5;
  return manha || noite;
}

function render(filtro='todos'){
  const lista = document.getElementById('lista-produtos'); lista.innerHTML='';
  getProdutos().filter(p=>filtro==='todos'||p.cat===filtro).forEach(p=>{
    lista.innerHTML += `<div class="produto"><img src="${p.foto}" onerror="this.src='https://via.placeholder.com/90/1a1a1a/FFD700?text=SEM+FOTO'"><div class="prod-info"><h3>${p.nome}</h3><p>${p.desc}</p><div class="preco">R$ ${p.preco.toFixed(2).replace('.',',')}</div></div><button class="btn-add" onclick="addCarrinho(${p.id})">+</button></div>`;
  });
}

function addCarrinho(id){ 
  const prod=getProdutos().find(p=>p.id===id); 
  const existe=carrinho.find(p=>p.id===id); 
  if(existe) existe.qtd++; else carrinho.push({...prod,qtd:1}); 
  atualizar(); 
}

function removerCarrinho(id){
  const existe=carrinho.find(p=>p.id===id);
  if(!existe) return;
  if(existe.qtd > 1){ existe.qtd--; }
  else { carrinho = carrinho.filter(p=>p.id!==id); }
  atualizar();
  if(carrinho.length===0) fecharCarrinho();
}

function setTipo(tipo){
  tipoEntrega = tipo;
  document.getElementById('btn-entrega').classList.toggle('ativo-tipo', tipo==='entrega');
  document.getElementById('btn-retirada').classList.toggle('ativo-tipo', tipo==='retirada');
  atualizar();
}

function atualizar(){
  let subtotal=0,qtd=0; 
  carrinho.forEach(p=>{ subtotal+=p.preco*p.qtd; qtd+=p.qtd; });
  let frete = tipoEntrega==='entrega' ? FRETE_FIXO : 0;
  let total = subtotal + frete;
  document.getElementById('total-bar').innerText=`R$ ${total.toFixed(2).replace('.',',')} • ${qtd} itens`;
  const subEl=document.getElementById('subtotal-modal'); 
  const totEl=document.getElementById('total-modal');
  const freteEl=document.getElementById('frete-modal');
  const avisoRet=document.getElementById('aviso-retirada');
  if(subEl) subEl.innerText=`R$ ${subtotal.toFixed(2).replace('.',',')}`; 
  if(totEl) totEl.innerText=`R$ ${total.toFixed(2).replace('.',',')}`;
  if(freteEl) freteEl.innerText = frete>0 ? `R$ ${frete.toFixed(2).replace('.',',')}` : 'GRÁTIS';
  if(avisoRet) avisoRet.style.display = frete>0 ? 'none' : 'block';
  const div=document.getElementById('itens-carrinho'); 
  div.innerHTML=''; 
  carrinho.forEach(p=>{
    div.innerHTML+=`<div class="item-car"><div style="flex:1;"><strong style="color:#fff;">${p.nome}</strong><br><small>R$ ${p.preco.toFixed(2).replace('.',',')}</small></div><div style="display:flex; align-items:center; gap:8px;"><button onclick="removerCarrinho(${p.id})" style="background:#222; color:#fff; border:1px solid #333; width:28px; height:28px; border-radius:50%; cursor:pointer;">-</button><span style="font-weight:900; color:#FFD700;">${p.qtd}</span><button onclick="addCarrinho(${p.id})" style="background:#FFD700; color:#000; border:none; width:28px; height:28px; border-radius:50%; font-weight:900; cursor:pointer;">+</button></div><span style="margin-left:10px; font-weight:700;">R$ ${(p.preco*p.qtd).toFixed(2).replace('.',',')}</span></div>`;
  });
}

function filtrar(cat, el){ document.querySelectorAll('.cat').forEach(c=>c.classList.remove('ativo')); el.classList.add('ativo'); render(cat); }

function abrirCarrinho(){ 
  if(!estaAberto()){
    return alert('⛔ ESTAMOS FECHADOS AGORA\n\n🕒 Horário:\n☀️ Manhã: 09:00 às 14:30\n🌙 Noite: 19:00 às 00:30');
  }
  if(carrinho.length===0) return alert('Seu carrinho está vazio'); 
  etapa=1; mostrarEtapa(); atualizar(); mostrarPix();
  document.getElementById('modal-carrinho').style.display='block'; 
}
function fecharCarrinho(){ document.getElementById('modal-carrinho').style.display='none'; }

function mostrarEtapa(){
  document.getElementById('etapa-1').style.display=etapa===1?'block':'none';
  document.getElementById('etapa-2').style.display=etapa===2?'block':'none';
  document.getElementById('etapa-3').style.display=etapa===3?'block':'none';
  document.getElementById('btn-voltar-etapa').style.display=etapa===1?'none':'block';
  document.getElementById('titulo-etapa').innerText=etapa===1?'1. Seus dados e entrega':etapa===2?'2. Endereço de entrega':'3. Pagamento - Pix 38258022806';
  document.getElementById('btn-proxima').innerText=etapa===3?'ENVIAR NO WHATSAPP':'CONTINUAR';
}

function proximaEtapa(){
  if(etapa===1){ 
    if(document.getElementById('nome').value.trim().length<3) return alert('Digite seu nome'); 
    if(document.getElementById('telefone').value.trim().length<9) return alert('Digite seu WhatsApp com DDD'); 
    if(tipoEntrega==='retirada'){ etapa=3; mostrarEtapa(); atualizar(); mostrarPix(); return; }
  }
  if(etapa===2){ 
    if(tipoEntrega==='entrega'){
      if(!document.getElementById('cidade').value.trim()) return alert('Digite a cidade'); 
      if(!document.getElementById('bairro').value.trim()) return alert('Digite o bairro'); 
      if(!document.getElementById('rua').value.trim()||!document.getElementById('numero').value.trim()) return alert('Digite rua e número'); 
    }
  }
  if(etapa<3){ etapa++; mostrarEtapa(); atualizar(); mostrarPix(); } else { enviarZap(); }
}
function voltarEtapa(){ 
  if(etapa===3 && tipoEntrega==='retirada'){ etapa=1; } 
  else if(etapa>1){ etapa--; } 
  mostrarEtapa(); 
}

function mostrarPix(){
  const pag=document.getElementById('pagamento').value; const area=document.getElementById('area-pix');
  if(pag==='Pix'){
    area.style.display='block';
    area.innerHTML=`<p style="font-size:11px; color:#FFD700; font-weight:900;">CHAVE PIX CPF:</p><div style="display:flex; gap:8px; margin-top:8px;"><input id="chave-pix" value="${CHAVE_PIX_FABRICA}" readonly style="flex:1; margin:0; background:#111;"><button onclick="copiarPix()" style="width:80px; margin:0; background:#FFD700; color:#000; padding:10px; border-radius:8px; font-weight:900; border:none; cursor:pointer;">COPIAR</button></div><p style="font-size:10px; color:#888; margin-top:6px;">Pague e mande o comprovante no Zap</p>`;
  } else if(pag==='Dinheiro'){
    area.style.display='block'; area.innerHTML=`<p style="font-size:11px; color:#FFD700; font-weight:900;">TROCO:</p><input id="troco" placeholder="Troco pra quanto? Ex: 50,00" style="margin-top:8px;">`;
  } else {
    area.style.display='block'; area.innerHTML=`<p style="font-size:11px; color:#FFD700; font-weight:900;">CARTÃO NA ENTREGA:</p><select id="tipo-cartao" style="margin-top:8px;"><option>Crédito à vista</option><option>Débito</option><option>Vale</option></select><p style="font-size:10px; color:#888; margin-top:6px;">Levaremos maquininha</p>`;
  }
}
function copiarPix(){ navigator.clipboard.writeText(document.getElementById('chave-pix').value); alert('✅ Chave copiada: '+CHAVE_PIX_FABRICA); }

function enviarZap(){
  const nome=document.getElementById('nome').value; const tel=document.getElementById('telefone').value; const cidade=document.getElementById('cidade').value; const bairro=document.getElementById('bairro').value; const rua=document.getElementById('rua').value; const numero=document.getElementById('numero').value; const comp=document.getElementById('complemento').value; const pag=document.getElementById('pagamento').value;
  let subtotal=0; carrinho.forEach(p=>subtotal+=p.preco*p.qtd); 
  let frete = tipoEntrega==='entrega' ? FRETE_FIXO : 0;
  let total=subtotal+frete;
  let infoExtra=""; if(document.getElementById('troco')) infoExtra=` (Troco p/ ${document.getElementById('troco').value})`; if(document.getElementById('tipo-cartao')) infoExtra=` - ${document.getElementById('tipo-cartao').value}`;
  let texto=`*NOVO PEDIDO - FÁBRICA DE SABORES*%0A%0A`; carrinho.forEach(p=>{ texto+=`${p.qtd}x ${p.nome} - R$ ${(p.preco*p.qtd).toFixed(2)}%0A`; });
  texto+=`%0A*Subtotal:* R$ ${subtotal.toFixed(2)}%0A*Frete:* ${frete>0?`R$ ${frete.toFixed(2)}`:'GRÁTIS (Retirada)'}%0A*Total:* R$ ${total.toFixed(2)}%0A%0A*Cliente:* ${nome}%0A*WhatsApp:* ${tel}%0A*Tipo:* ${tipoEntrega==='entrega'?'🛵 ENTREGA':'🏃 RETIRADA'}%0A`;
  if(tipoEntrega==='entrega'){ texto+=`*Endereço:* ${rua}, ${numero} - ${bairro} - ${cidade} - ${comp||'s/comp'}%0A`; }
  texto+=`*Pagamento:* ${pag}${infoExtra}%0A*Pix Loja:* ${CHAVE_PIX_FABRICA}`;
  window.open(`https://wa.me/${NUMERO_LOJA}?text=${texto}`,'_blank');
}

function atualizarStatus(){
  const el = document.querySelector('.status');
  if(!el) return;
  if(estaAberto()){
    el.innerText = "● ABERTO AGORA • Frete R$ 8,00";
    el.style.background = "#25D366"; el.style.color="#000";
  } else {
    el.innerText = "● FECHADO • 09h-14h30 e 19h-00h30";
    el.style.background = "#ff0044"; el.style.color="#fff";
  }
}
render(); atualizarStatus(); setInterval(atualizarStatus, 60000);
