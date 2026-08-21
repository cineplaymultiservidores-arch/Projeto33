// ADICIONA FUNÇÃO DE UPLOAD
function uploadArquivo(input, inputTextoId, previewId, isBackground=false){
  const file = input.files[0];
  if(!file) return;
  if(file.size > 5*1024*1024){ alert('Foto muito grande! Max 5MB'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const base64 = e.target.result;
    document.getElementById(inputTextoId).value = base64;
    const preview = document.getElementById(previewId);
    if(isBackground){
      preview.style.backgroundImage = `url(${base64})`;
      preview.innerHTML = '';
    } else {
      preview.src = base64;
      preview.style.display = 'block';
    }
    // salva automaticamente
    if(inputTextoId.startsWith('cfg-')) salvarConfig();
  };
  reader.readAsDataURL(file);
}

// SEU CÓDIGO ANTIGO CONTINUA AQUI - mantém logar, sair, adicionar, etc
//... (mantém tudo que você já tinha)
