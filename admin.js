let produtos = JSON.parse(localStorage.getItem('fabrica_produtos')) || [
  { id:1, cat:'lanches', nome:'X-Burguer', desc:'Pão, carne, queijo, alface e tomate', preco:18, foto:'' },
  { id:2, cat:'lanches', nome:'X-Salada Especial', desc:'Pão, 2 carnes, queijo, bacon, ovo', preco:28, foto:'' },
  { id:3, cat:'porcoes', nome:'Batata Frita P', desc:'300g de batata crocante', preco:20, foto:'' },
  { id:4, cat:'bebidas', nome:'Coca-Cola Lata', desc:'350ml gelada', preco:6, foto:'' }
];

let config = JSON.parse(localStorage.getItem('fabrica_config')) || {logo:'',capa:'',nome:'FÁBRICA DE SABORES'};

function logar(){
  if(document.getElementById('user').value==='admin' && document.getElementById('pass').value==='1234'){
    document.getElementById('login').style.display='none';
    document.getElementById('painel').style.display='block';
    document.getElementById('cfg-logo').value=config.logo||'';
    document.getElementById('cfg-capa').value=config.capa||'';
    document.getElementById('cfg-nome').value=config.nome||'';
    atualizarPreview();
    renderAdmin();
  }else alert('Login errado! admin / 1234');
}

function sair(){ location.reload(); }

function atualizarPreview(){
  const logoPrev = document.getElementById('preview-logo');
  const capaPrev = document.getElementById('preview-capa');
  logoPrev.src = config.logo || 'https://via.placeholder.com/60/222/FFD700?text=LOGO';
  capaPrev.style.backgroundImage = config.capa ? `url(${config.capa})` : '';
  document.getElementById('cfg-logo').addEventListener('input', (e)=>{ logoPrev.src = e.target.value || 'https://via.placeholder.com/60/222/FFD700?text=LOGO'; });
  document.getElementById('cfg-capa').addEventListener('input', (e)=>{ capaPrev.style.backgroundImage = e.target.value ? `url(${e.target.value})` : ''; });
}

function salvarConfig(){
  config.logo = document.getElementById('cfg-logo').value.trim();
  config.capa = document.getElementById('cfg-capa').value.trim();
  config.nome = document.getElementById('cfg-nome').value.trim() || 'FÁBRICA DE SABORES';
  localStorage.setItem('fabrica_config', JSON.stringify(config));
  alert('✅ Capa e logo salvos! Agora abre o cardápio.');
}

function renderAdmin(){
  const div = document.getElementById('lista-admin'); div.innerHTML='';
  produtos.forEach((p,i)=>{
    div.innerHTML+=`<div class="prod-edit"><img src="${p.foto}" onerror="this.src='https://via.placeholder.com/70/222/FFD700?text=Foto'"><div class="info"><input value="${p.nome}" onchange="produtos[${i}].nome=this.value; salvarSilencioso();"><input value="${p.desc}" onchange="produtos[${i}].desc=this.value; salvarSilencioso();"><div style="display:flex;gap:5px;"><input value="${p.preco}" type="number" step="0.01" onchange="produtos[${i}].preco=parseFloat(this.value); salvarSilencioso();" style="flex:1;"><select onchange="produtos[${i}].cat=this.value; salvarSilencioso();" style="flex:1;"><option value="lanches" ${p.cat==='lanches'?'selected':''}>Lanches</option><option value="porcoes" ${p.cat==='porcoes'?'selected':''}>Porções</option><option value="bebidas" ${p.cat==='bebidas'?'selected':''}>Bebidas</option><option value="acai" ${p.cat==='acai'?'selected':''}>Açaí</option></select></div><input value="${p.foto}" onchange="produtos[${i}].foto=this.value; salvarSilencioso();"></div><button class="btn-excluir" onclick="excluir(${i})">X</button></div>`;
  });
}

function adicionar(){
  const nome=document.getElementById('novo-nome').value.trim();
  const desc=document.getElementById('novo-desc').value.trim();
  const preco=parseFloat(document.getElementById('novo-preco').value);
  const cat=document.getElementById('novo-cat').value;
  const foto=document.getElementById('novo-foto').value.trim();
  if(!nome||!preco) return alert('Nome e preço obrigatórios');
  produtos.push({id:Date.now(),cat,nome,desc,preco,foto});
  salvarTudo(); renderAdmin();
  document.getElementById('novo-nome').value=''; document.getElementById('novo-desc').value=''; document.getElementById('novo-preco').value=''; document.getElementById('novo-foto').value='';
}

function excluir(i){ if(confirm('Excluir?')){ produtos.splice(i,1); salvarTudo(); renderAdmin(); } }
function salvarTudo(){ localStorage.setItem('fabrica_produtos', JSON.stringify(produtos)); alert('✅ Produtos salvos!'); }
function salvarSilencioso(){ localStorage.setItem('fabrica_produtos', JSON.stringify(produtos)); }
