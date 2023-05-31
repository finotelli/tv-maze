const handleSearch = async (event) => {
  event.preventDefault();

  //EXIBIR MENSAGEM DE CARREGAMENTO//
  const message = document.querySelector('#message');
  message.innerHTML = 'buscando...';

  //LIMPA LISTA DE PROGRAMAS//
  const listaDeSeries = document.querySelector('#shows');
  listaDeSeries.innerHTML = '';

  const Busca = document.querySelector('#query');
  const textoASerBuscado = Busca.value;

  //URL DE CONSULTA//
  const url = `https://api.tvmaze.com/search/shows?q=${textoASerBuscado}`;

  //REALIZAR A CONSULTA NA API//
  const resposta = await fetch(url);
  const series = await resposta.json();

  //FINALIZA O PROCEDIMENTO SE NAO TIVER NENHUM RESULTADO//
  if (series.length == 0) {
    //EXIBIR MENSAGEM DE NAO ENCONTRADO//
    message.innerHTML = 'nenhum resultado encontrado.';
    return;
  }

  //LIMPA//
  message.innerHTML = '';
  //ITERAR PELO PROGRAMA//
  series.forEach((series) => {
    //OBTER OS DADOS//
    const titulo = series?.show?.name || '';
    const imagem = series?.show?.image.medium || '';

    //INSERIR OS PROGRAMAS NA LISTA DE RESULTADO//
    listaDeSeries.insertAdjacentHTML(
      'beforeend',
      `
  <li>
    <img class="poster" src="${imagem}">
    <span class="show-name">${titulo}</span>
  </li>
  `
    );
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});
