let produtos = JSON.parse(localStorage.getItem('fabrica_produtos')) || [];
let config = JSON.parse(localStorage.getItem('fabrica_config')) || {logo:'',capa:'',nome:'Fábrica de Sabores'};

function logar(){
 if(document.getElementById('user').value==='admin' && document.getElementById('pass').value==='1234'){
  document.getElementById('login').style.display='none';
  document.getElementById('painel').style.display='block';
  carregar();
 } else alert('Login errado! admin / 1234');
}
function sair(){ localStorage.removeItem('logado'); location.reload(); }

function uploadArquivo(input, inputTextoId, previewId, isBg=false){
 const file=input.files[0]; if(!file) return;
 if(file.size>4*1024*1024){ alert('Foto muito grande! Use até 4MB'); return; }
 const r=new FileReader();
 r.onload=e=>{
  const b64=e.target.result;
  document.getElementById(inputTextoId).value=b64;
  const prev=document.getElementById(previewId);
  if(isBg){ prev.style.backgroundImage=`url(${b64})`; prev.innerHTML=''; }
  else{ prev.src=b64; prev.style.display='block'; }
 };
 r.readAsDataURL(file);
}

function salvarConfig(){
 config.logo=document.getElementById('cfg-logo').value;
 config.capa=document.getElementById('cfg-capa').value;
 config.nome=document.getElementById('cfg-nome').value;
 localStorage.setItem('fabrica_config', JSON.stringify(config));
 const pl=document.getElementById('preview-logo');
 const pc=document.getElementById('preview-capa');
 if(config.logo) pl.src=config.logo;
 if(config.capa){ pc.style.backgroundImage=`url(${config.capa})`; pc.innerHTML=''; }
 alert('Salvo!');
}

function adicionar(){
 const nome=document.getElementById('novo-nome').value;
 const desc=document.getElementById('novo-desc').value;
 const preco=document.getElementById('novo-preco').value;
 const foto=document.getElementById('novo-foto').value;
 const cat=document.getElementById('novo-cat').value;
 if(!nome||!preco){ alert('Nome e preço obrigatório'); return; }
 produtos.push({id:Date.now(),nome,desc,preco,foto,cat});
 salvarTudo(); limparNovo(); carregar();
}
function limparNovo(){
 document.getElementById('novo-nome').value=''; document.getElementById('novo-desc').value='';
 document.getElementById('novo-preco').value=''; document.getElementById('novo-foto').value='';
 document.getElementById('preview-novo').style.display='none';
}
function carregar(){
 document.getElementById('cfg-logo').value=config.logo||'';
 document.getElementById('cfg-capa').value=config.capa||'';
 document.getElementById('cfg-nome').value=config.nome||'';
 if(config.logo) document.getElementById('preview-logo').src=config.logo;
 if(config.capa) document.getElementById('preview-capa').style.backgroundImage=`url(${config.capa})`;
 const lista=document.getElementById('lista-admin');
 lista.innerHTML=produtos.map((p,i)=>`
  <div class="card-admin">
   <img src="${p.foto||''}" style="${!p.foto?'display:none':''}" id="img_${i}">
   ${!p.foto?'<div style="height:150px;background:#222;display:flex;align-items:center;justify-content:center;border-radius:8px">Sem foto</div>':''}
   <input value="${p.nome}" onchange="produtos[${i}].nome=this.value">
   <input value="${p.desc||''}" placeholder="Descrição" onchange="produtos[${i}].desc=this.value">
   <input type="number" value="${p.preco}" onchange="produtos[${i}].preco=this.value">
   <input value="${p.foto||''}" placeholder="Link da foto" id="foto_${i}" onchange="produtos[${i}].foto=this.value;document.getElementById('img_${i}').src=this.value">
   <input type="file" id="file_${i}" hidden accept="image/*" onchange="uploadEdit(this,${i})">
   <div class="btns">
    <button onclick="document.getElementById('file_${i}').click()" style="background:#f5c542;color:#000">📁 Trocar Foto</button>
    <button onclick="remover(${i})" style="background:#ff4444;color:#fff">Excluir</button>
   </div>
  </div>`).join('');
}
function uploadEdit(input,i){
 const file=input.files[0]; const r=new FileReader();
 r.onload=e=>{ produtos[i].foto=e.target.result; salvarTudo(); carregar(); };
 r.readAsDataURL(file);
}
function remover(i){ if(confirm('Excluir?')){ produtos.splice(i,1); salvarTudo(); carregar(); } }
function salvarTudo(){
 localStorage.setItem('fabrica_produtos', JSON.stringify(produtos));
 localStorage.setItem('fabrica_config', JSON.stringify(config));
 // gera o script.js pro site principal
 let js = `const produtos = ${JSON.stringify(produtos)};\nconst configLoja = ${JSON.stringify(config)};`;
 localStorage.setItem('site_js', js);
 alert('TUDO SALVO! Agora abre o index.html que já vai aparecer.');
   }
