Sistema de Controle de Entregas
📖 Sobre o Projeto
Este projeto é um sistema de controle de entregas desenvolvido em React, projetado para gerenciar e monitorar as rotas de entrega. A aplicação permite o cadastro de levas de entrega, o acompanhamento do status de cada pedido e a manutenção de um histórico completo para consultas e exportação de dados.

O sistema foi desenvolvido para ser executado localmente no navegador, utilizando localStorage para persistência de dados, o que significa que todas as informações ficam salvas na máquina do usuário, mesmo após fechar ou recarregar a página.

✨ Funcionalidades Principais
Cadastro de Levas de Entrega:

Seleção de entregador e veículo a partir de listas pré-definidas.

Vinculação automática de veículo padrão ao selecionar um entregador.

Definição da quantidade de rotas (paradas) para a leva.

Gestão de Pedidos:

Adição de múltiplos clientes e itens por leva de entrega.

Acompanhamento de status: Pendente, Em Rota, Finalizada, Cancelada.

Monitoramento e Histórico:

Tela Principal: Exibe apenas as entregas ativas (pendentes e em rota).

Arquivo Secreto: Acessível por senha, funciona como um espelho completo de todos os pedidos já criados, incluindo os finalizados, cancelados e os removidos da lista ativa.

Registro de Tempo: Calcula automaticamente o tempo total de rota (da saída até a finalização/cancelamento).

Filtros e Buscas Avançadas:

Filtre entregas por Data, Status (múltipla seleção) e Nome do Cliente em ambas as telas (principal e arquivo).

Exportação de Dados:

Exporte os dados filtrados da tela de "Arquivo" para um arquivo .CSV, totalmente compatível com Excel e outras planilhas.

Persistência de Dados:

Todas as informações são salvas localmente no navegador (localStorage), garantindo que nenhum dado seja perdido ao recarregar a página.

🚀 Tecnologias Utilizadas
React.js: Biblioteca principal para a construção da interface de usuário.

CSS3: Para estilização customizada dos componentes.

HTML5: Estrutura da aplicação.

JavaScript (ES6+): Lógica principal da aplicação.

localStorage API: Para persistência de dados no lado do cliente.

⚙️ Como Rodar o Projeto
Para executar este projeto localmente, siga os passos abaixo:

Clone o repositório:

Bash

git clone [URL_DO_SEU_REPOSITORIO]
Navegue até a pasta do projeto:

Bash

cd sistema-entregas
Instale as dependências:

Bash

npm install
Inicie o servidor de desenvolvimento:

Bash

npm start
A aplicação será aberta automaticamente no seu navegador no endereço http://localhost:3000.

🗂️ Estrutura do Projeto
O código-fonte principal está localizado na pasta src/:

App.js: Componente principal que contém toda a lógica da aplicação, incluindo gerenciamento de estado, componentes de tela e funções.

App.css: Arquivo de estilização para todos os componentes da aplicação.

index.js: Ponto de entrada da aplicação React.

A pasta public/ contém os arquivos estáticos, como:

index.html: O template HTML principal.

manifest.json: Define metadados da aplicação.

favicon.ico: Ícone da aplicação exibido na aba do navegador.

🔮 Possíveis Melhorias Futuras
Backend e Banco de Dados: Migrar a persistência de dados do localStorage para um banco de dados (como Firebase, PostgreSQL ou MongoDB) com uma API para permitir o uso multi-usuário e em diferentes dispositivos.

Autenticação de Usuários: Criar um sistema de login para entregadores e administradores.

Relatórios Gráficos: Implementar dashboards com gráficos para análise de performance das entregas.