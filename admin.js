let produtos = JSON.parse(localStorage.getItem('fabrica_produtos')) || '[]');
let config = JSON.parse(localStorage.getItem('fabrica_config')) || {logo:'',capa:'',nome:'Fábrica de Sabores'};

function logar(){
  const u = document.getElementById('user').value;
  const p = document.getElementById('pass').value;
  console.log(u,p);
  if(u === 'admin' && p === '1234'){
    document.getElementById('login').style.display='none';
    document.getElementById('painel').style.display='block';
    localStorage.setItem('logado','1');
    carregar();
  } else {
    alert('Login: admin / Senha: 1234');
  }
}

function sair(){
  localStorage.removeItem('logado');
  location.reload();
}

function uploadArquivo(input, inputTextoId, previewId, isBg=false){
 const file=input.files[0];
 if(!file) return;
 const r=new FileReader();
 r.onload=e=>{
  const b64=e.target.result;
  document.getElementById(inputTextoId).value=b64;
  const prev=document.getElementById(previewId);
  if(isBg){
    prev.style.backgroundImage=`url(${b64})`;
    prev.innerHTML='';
  } else {
    prev.src=b64;
    prev.style.display='block';
  }
 };
 r.readAsDataURL(file);
}

function salvarConfig(){
 config.logo=document.getElementById('cfg-logo').value;
 config.capa=document.getElementById('cfg-capa').value;
 config.nome=document.getElementById('cfg-nome').value;
 localStorage.setItem('fabrica_config', JSON.stringify(config));
 alert('Capa e logo salvos!');
}

function adicionar(){
 const nome=document.getElementById('novo-nome').value;
 const preco=document.getElementById('novo-preco').value;
 if(!nome ||!preco){ alert('Coloca nome e preço'); return; }
 produtos.push({
   id:Date.now(),
   nome:nome,
   desc:document.getElementById('novo-desc').value,
   preco:preco,
   foto:document.getElementById('novo-foto').value,
   cat:document.getElementById('novo-cat').value
 });
 salvarTudo();
}

function carregar(){
 document.getElementById('cfg-logo').value=config.logo||'';
 document.getElementById('cfg-capa').value=config.capa||'';
 document.getElementById('cfg-nome').value=config.nome||'';
 if(config.logo) document.getElementById('preview-logo').src=config.logo;
 if(config.capa) document.getElementById('preview-capa').style.backgroundImage=`url(${config.capa})`;

 const lista=document.getElementById('lista-admin');
 if(produtos.length===0){
   lista.innerHTML='<p style="text-align:center;color:#777;margin-top:20px">Nenhum produto ainda. Cadastre acima.</p>';
   return;
 }
 lista.innerHTML=produtos.map((p,i)=>`
  <div class="card-admin">
   ${p.foto?`<img src="${p.foto}" id="img_${i}">`:`<div style="height:150px;background:#222;display:flex;align-items:center;justify-content:center;border-radius:8px">Sem foto</div>`}
   <input value="${p.nome}" onchange="produtos[${i}].nome=this.value;salvarTudo()">
   <input value="${p.preco}" type="number" onchange="produtos[${i}].preco=this.value;salvarTudo()">
   <input type="file" id="file_${i}" hidden accept="image/*" onchange="uploadEdit(this,${i})">
   <div style="display:flex;gap:6px;margin-top:8px">
    <button onclick="document.getElementById('file_${i}').click()" style="flex:1;background:#f5c542;color:#000;padding:8px;border-radius:6px;border:0;font-weight:700">📁 Foto</button>
    <button onclick="remover(${i})" style="background:#ff4444;color:#fff;padding:8px;border-radius:6px;border:0">X</button>
   </div>
  </div>`).join('');
}

function uploadEdit(input,i){
 const file=input.files[0];
 const r=new FileReader();
 r.onload=e=>{ produtos[i].foto=e.target.result; salvarTudo(); };
 r.readAsDataURL(file);
}
function remover(i){
 if(confirm('Excluir?')){ produtos.splice(i,1); salvarTudo(); }
}
function salvarTudo(){
 localStorage.setItem('fabrica_produtos', JSON.stringify(produtos));
 localStorage.setItem('fabrica_config', JSON.stringify(config));
 carregar();
 alert('SALVO!');
}

// Se já logou antes, entra direto
window.onload=()=>{
 if(localStorage.getItem('logado')==='1'){
  document.getElementById('login').style.display='none';
  document.getElementById('painel').style.display='block';
  carregar();
 }
}
