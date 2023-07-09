const db=firebase.firestore(),uid=localStorage.getItem("Uid");var nomeSession,emailSession;try{class a{constructor(a,b,c,d,e,f,g){this.id=a,this.nome=b,this.nomeAntigo=c,this.emailNovo=d,this.emailLogin=e,this.senhaLogin=f,this.perfil=g}editar(){document.querySelector("div[class='container-loader']").style.display="block",firebase.auth().signInWithEmailAndPassword(this.emailLogin,this.senhaLogin).then(()=>{const a=firebase.auth().currentUser;a.updateEmail(this.emailNovo).then(()=>{db.collection("usuarios(Site)").doc(this.id).update({nome:this.nome,email:this.emailNovo}).then(()=>{db.collection("usuarios(Site)").doc(this.id).collection("perfis").get().then(a=>{a.forEach(a=>{db.collection("usuarios(Site)").doc(this.id).collection("perfis").doc(a.id).update({perfil:this.perfil}).then(()=>{db.collection("usuarios(Site)").where("uid","==",uid).get().then(a=>{a.forEach(a=>{const b=a.data().email,c=a.data().senha;document.querySelector("div[class='container-loader']").style.display="none",firebase.auth().signInWithEmailAndPassword(b,c).then(()=>{const a=new Date,b=(a.getDate()+"").padStart(2,"0"),c=(a.getMonth()+1+"").padStart(2,"0"),d=a.getFullYear()+"";var e=a.getHours()+"";0==e&&(e=a.getHours()+""+"0");var f=a.getMinutes()+"";f=10>f?(a.getMinutes()+"").padStart(2,"0"):a.getMinutes()+"";const g=`${b}/${c}/${d} as ${e}:${f}`;db.collection("historico").add({usuarioUID:uid,alteracao:`O usuario ${nomeSession} alterou o nome do usuario "${this.nomeAntigo}" para "${this.nome}" 
                                                                                e alterou seu email "${this.emailLogin}" para "${this.emailNovo}" no dia ${g}`,data_hora:g}).then(()=>{alert("Registro alterado com sucesso"),location.reload()}).catch(a=>{alert(a.message)})}).catch(a=>{alert(a.message)})})}).catch(a=>{alert(a.message)})}).catch(a=>{alert(a.message)})})}).catch(a=>{alert(a.message)})}).catch(a=>{console.error("Erro ao atualizar o documento: ",a)})}).catch(a=>{document.querySelector("div[class='container-loader']").style.display="none","auth/email-already-in-use"==a.code?alert("Email existente"):alert(a.message)})}).catch(a=>{alert(a.message)})}}db.collection("usuarios(Site)").get().then(a=>{const b=document.querySelector("select[name=\"usuarios\"]");if(0==a.docs.length){b.innerHTML+="<option>Nenhum usuario cadastrado :/</option>"}else{const c=a.docs.reduce((a,b)=>(a+=`<option>${b.data().nome}</option>`,a),"");b.innerHTML+=c}}).catch(a=>{alert(a.message)}),document.querySelector("button").addEventListener("click",function(){const b=new FormData(document.querySelector("form")),c=b.get("usuarios"),d=b.get("todos");if("editar"===d){firebase.storage().ref().child(c).getDownloadURL().then(a=>{const b=document.getElementById("imgPhotoCad");b.setAttribute("src",a)}).catch(a=>{"storage/object-not-found"==a.code?firebase.storage().ref().child("vazio").child("personIcon.jpg").getDownloadURL().then(a=>{const b=document.getElementById("imgPhotoCad");b.setAttribute("src",a)}).catch(a=>{alert(a.message)}):alert(a.message)});const b=document.getElementById("imgPhotoCad"),d=document.querySelector("input[name=\"imagem\"]");b.addEventListener("click",function(){d.click(),d.addEventListener("change",()=>{let a=new FileReader;a.onload=()=>{b.src=a.result},a.readAsDataURL(d.files[0])})});const e=document.querySelector("form[class='principalForm']"),f=document.querySelector("form[class='editarForm']");e.style.display="none",f.style.display="block",db.collection("perfis").get().then(a=>{const b=document.querySelector("select[name=\"perfis\"]");if(0==a.docs.length){b.innerHTML+="<option>Nenhum perfil cadastrado :/</option>"}else{const c=a.docs.reduce((a,b)=>(a+=`<option>${b.data().descricao}</option>`,a),"");b.innerHTML+=c}}).catch(a=>{alert(a.message)}),db.collection("usuarios(Site)").where("nome","==",c).get().then(b=>{b.forEach(b=>{document.querySelector("input[name='nome']").value=b.data().nome,document.querySelector("input[name='email']").value=b.data().email,db.collection("usuarios(Site)").doc(b.id).collection("perfis").get().then(a=>{a.forEach(a=>{document.querySelector("p[class='perfilAtual']").innerHTML="Atual perfil: "+a.data().perfil})}).catch(a=>{alert(a.message)}),document.querySelector("button[class='editar']").addEventListener("click",function(){const d=new FormData(f),e=d.get("nome").trim(),g=b.data().nome,h=b.data().email,i=b.data().senha,j=d.get("email").replace(/ /g,""),k=d.get("perfis"),l=d.get("imagem");0==e.length||0==j.length?alert("Preencha todos os campos"):db.collection("usuarios").where("nome","==",e).get().then(d=>{if(0<d.docs.length)alert("Nome de usuario existente");else if(0<l.size){const d=l.name.toLowerCase().split(".").pop();if("jpg"!=d&&"png"!=d)alert("Extens\xE3o de imagem n\xE3o aceita");else{const d=firebase.storage().ref().child(c);d.delete().then(()=>{firebase.storage().ref().child(e).put(l).then(()=>{var c=new a(b.id,e,g,j,h,i,k);c.editar()}).catch(a=>{alert(a.message)})}).catch(c=>{"storage/object-not-found"==c.code?firebase.storage().ref().child(e).put(l).then(()=>{var c=new a(b.id,e,g,j,h,i,k);c.editar()}).catch(a=>{alert(a.message)}):alert(c.message)})}}else{var f=new a(b.id,e,g,j,h,i,k);f.editar()}}).catch(a=>{alert(a.message)})})})}).catch(a=>{alert(a.message)})}else"excluir"===d?db.collection("usuarios(Site)").where("nome","==",c).get().then(a=>{a.forEach(a=>{const b=a.data().email,d=a.data().senha;firebase.auth().signInWithEmailAndPassword(b,d).then(()=>{const a=firebase.auth().currentUser;a.delete().then(()=>{db.collection("usuarios(Site)").where("nome","==",c).get().then(a=>{a.forEach(a=>{confirm("Deseja excluir este usuario?")&&db.collection("usuarios(Site)").doc(a.id).delete().then(()=>{const b=firebase.storage().ref().child(c),d=new Date,e=(d.getDate()+"").padStart(2,"0"),f=(d.getMonth()+1+"").padStart(2,"0"),g=d.getFullYear()+"";var h=d.getHours()+"";0==h&&(h=d.getHours()+"0");var i=d.getMinutes()+"";i=10>i?(d.getMinutes()+"").padStart(2,"0"):d.getMinutes()+"";const j=`${e}/${f}/${g} as ${h}:${i}`;b.delete().then(()=>{db.collection("historico").add({usuarioUID:uid,alteracao:`O usuario ${nomeSession} deletou o usuario ${a.data().nome} no dia ${j}`,data_hora:j}).then(()=>{alert("Usuario deletado com sucesso"),this.emailLogin==emailSession?window.location.href="https://cajuinotification.github.io/login/":location.reload()}).catch(a=>{alert(a.message)})}).catch(b=>{"storage/object-not-found"==b.code?db.collection("historico").add({usuarioUID:uid,alteracao:`O usuario ${nomeSession} deletou o usuario ${a.data().nome} no dia ${j}`,data_hora:j}).then(()=>{alert("Usuario deletado com sucesso"),this.emailLogin==emailSession?window.location.href="https://cajuinotification.github.io/login/":location.reload()}).catch(a=>{alert(a.message)}):alert(b.message)})}).catch(a=>{alert(a.message)})})}).catch(a=>{alert(a.message)})}).catch(a=>{alert(a.message)})}).catch(a=>{alert(a.message)})})}).catch(a=>{alert(a.message)}):alert("Voc\xEA deseja editar ou excluir este usuario?")})}catch(a){alert("Erro "+a)}