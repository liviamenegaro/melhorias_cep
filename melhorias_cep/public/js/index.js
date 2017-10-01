const form = document.querySelector('form');
const divResultado = document.querySelector('div#resultado');
const scriptTemplate = document.querySelector('#template');
const excluir = document.querySelector('#exclui');
const divErro = document.querySelector('.alert-danger');
const input = document.querySelector('#cep');

form.addEventListener('submit', function(e) {
  busca(form.cep.value);
  e.preventDefault();
});

excluir.addEventListener('click', function (e) {
  form.cep.value = "";
  e.preventDefault();
});

function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}

function busca(cep) { // cep: 96201460
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  ajax(url, function(e) {
    if (JSON.parse(e.target.response).erro) {
      divResultado.innerHTML = "";
      divErro.style.display="block"; 
    } else{
      printa(JSON.parse(e.target.response));
      divErro.style.display="none"; 
    }
  });
}

function printa(json) {
  const template = scriptTemplate.innerText;
  const handlebars = Handlebars.compile(template);
  const html = handlebars(json);
  divResultado.innerHTML = html;
}






