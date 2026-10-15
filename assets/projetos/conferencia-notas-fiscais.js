// Conteúdo do projeto "Conferência de notas fiscais e baixa no sistema".
// Edite só este arquivo. As regras de preenchimento estão em CLAUDE.md, na raiz do repositório.
// Texto entre [[ ]] aparece destacado em amarelo no site como pendência.

registrarProjeto({
  "slug": "conferencia-notas-fiscais",
  "titulo": "Conferência de notas fiscais e baixa no sistema",
  "area": "Automação em Python",
  "cliente": "uma empresa do setor florestal",
  "resumo": "Toda terça às 10h o robô baixa os relatórios do Drive, cria a aba da semana e avisa o gestor para validar. Depois, três botões conferem as notas no ERP, dão baixa nos pagamentos e geram o arquivo de importação.",
  "resultadoCurto": "6 h por semana viraram 45 min",
  "links": [
    {
      "rotulo": "Ver o código no GitHub",
      "url": "https://github.com/dkdian/conferencia-nf-demo"
    }
  ],
  "problema": "Toda semana, alguém precisava baixar dois relatórios de fluxo de caixa no Drive do cliente, guardar numa pasta com a data, montar a planilha de lançamentos e avisar o gestor para validar. Só então começava o trabalho pesado: boa parte das notas fiscais já estava no sistema de gestão como conta a pagar em aberto, e era preciso procurar nota por nota, comparar fornecedor, valor e vencimento, marcar cada uma como paga numa janela própria e apagar da planilha o que já existia, para não importar em duplicidade. Parcelas, notas com o número escrito de outro jeito e pequenas diferenças de valor exigiam julgamento caso a caso. O trabalho era lento, sem registro do que foi decidido, e um esquecimento virava lançamento duplicado no fluxo de caixa.",
  "passos": [
    "Toda terça às 10h o robô baixa os relatórios do Drive",
    "Arquiva numa pasta com a data e cria a aba da semana",
    "O gestor recebe o aviso no chat e valida as informações",
    "Botão 1: confere cada nota no sistema e sugere a ação",
    "Botão 2: prévia, simulação e baixa dos pagamentos já lançados",
    "Botão 3: gera o arquivo de importação, sem duplicatas"
  ],
  "antesDepois": [
    [
      "Download, pasta e planilha da semana",
      "Feitos à mão, toda semana",
      "Automáticos, toda terça às 10h"
    ],
    [
      "Aviso ao gestor para validar",
      "Mensagem manual",
      "Enviado pelo robô, com o resumo da semana"
    ],
    [
      "Conferência das notas no sistema",
      "Uma a uma, à mão",
      "Automática, menos de 2 min para 79 linhas"
    ],
    [
      "Baixa de pagamentos já lançados",
      "Janela por janela",
      "36 baixas em cerca de 8 min"
    ],
    [
      "Notas já existentes no arquivo de importação",
      "Removidas à mão",
      "Retiradas automaticamente, com cópia de tudo"
    ],
    [
      "Tempo por semana",
      "6 horas de validação e inserção",
      "30 min de validação + 15 min de importação"
    ]
  ],
  "midia": [
    {
      "arquivo": "conferencia-notas-fiscais-demo.mp4",
      "poster": "conferencia-notas-fiscais-demo-capa.jpg",
      "legenda": "Demonstração com o robô e o ERP funcionando de verdade (só os dados são fictícios): a rotina de terça, a validação do gestor, os três botões e o arquivo final"
    }
  ],
  "resultados": [
    "A preparação da semana (download dos relatórios, pasta com a data, aba nova e aviso ao gestor) acontece sozinha, toda terça às 10h.",
    "Na primeira semana em produção, 37 pagamentos foram baixados no sistema sem nenhum erro, depois de três rodadas de simulação que levaram as linhas prontas de 34 em 38 para 37 em 37.",
    "A conferência de 79 linhas reais roda em menos de 2 minutos, cerca de 28% mais rápida depois de uma otimização, com resultado idêntico ao da versão anterior.",
    "O arquivo de importação deixa de fora, sozinho, tudo o que já foi baixado. A revisão humana se concentra nos casos duvidosos, cada um com o motivo por escrito, e nada é gravado no sistema sem a pessoa digitar a confirmação.",
    "O tempo semanal passou de 6 horas de validação e inserção para meia hora de validação e 15 minutos de importação: 45 minutos no total, uma redução de mais de 85%."
  ],
  "desafios": [
    {
      "titulo": "Dar baixa sem risco de erro irreversível",
      "texto": "O sistema não tem botão de desfazer. A baixa foi desenhada em camadas: uma prévia que só lê, uma simulação que preenche a janela de pagamento e cancela com a gravação bloqueada na rede, e a execução real, que só começa quando a pessoa digita a palavra de confirmação. No modo real o robô para no primeiro problema, confere no sistema que o lançamento ficou pago na data certa e guarda uma foto de cada janela."
    },
    {
      "titulo": "Notas que não batem de primeira",
      "texto": "Parcelas, números com ano e zeros na frente, fornecedores escritos de outro jeito e diferenças de centavos impediam uma comparação simples. A regra passou a escolher a parcela pela data de pagamento, a aceitar variações de número e de nome e a somar várias linhas que formam um único lançamento. Quando o valor pago difere do saldo, a diferença entra na baixa como juros ou desconto, e o caso fica marcado para revisão."
    },
    {
      "titulo": "Trabalhar na planilha que a equipe está usando",
      "texto": "A planilha fica numa pasta compartilhada e normalmente está aberta. Uma primeira versão chegou a travar o Excel do usuário. A solução foi detectar a planilha aberta e escrever na própria janela, sem salvar por cima de edições em andamento, nunca abrir uma segunda cópia e parar com um aviso claro quando o Excel está ocupado."
    },
    {
      "titulo": "Acessar o sistema sem guardar senhas",
      "texto": "Por segurança, o robô nunca digita credenciais: o login é feito pela pessoa e a sessão fica salva. Em vez de ler a tela, o robô aproveita as respostas que o próprio sistema já envia ao navegador. A busca do sistema mudou durante o projeto e passou a aceitar vários números de uma vez; a conferência foi adaptada para buscar em lotes e repetir individualmente o que o lote não encontra."
    }
  ],
  "ferramentas": [
    "Python",
    "Playwright",
    "Excel",
    "VBA",
    "Claude",
    "Google Drive",
    "Microsoft Teams"
  ],
  "tecnico": "A rotina de terça é um script Python agendado no Windows: baixa os relatórios do Google Drive por conta de serviço, aplica regras de tratamento definidas numa tabela da própria planilha (copiar, valor fixo, de-para, extração do mês e do número da nota) e cria a aba nova pela automação do Excel (COM), avisando o gestor por mensagem no Teams. Python acionado por botões VBA. A conferência usa Playwright com perfil de navegador persistente e intercepta as respostas JSON da API de listagem do sistema (sem raspagem de HTML), com busca em lotes de 10 e reconsulta individual para garantir cobertura. O critério de comparação é uma função pura testada à parte: normalização de número e de fornecedor, tolerâncias de valor, soma de várias linhas e escolha de parcela por data de pagamento. A baixa preenche o formulário de pagamento, relê o valor líquido e o saldo na tela antes de confirmar e, na simulação, aborta na rede qualquer requisição que não seja leitura. A integração com o Excel é por COM (pywin32), localizando a pasta de trabalho aberta pela tabela de objetos em execução do Windows; o arquivo de importação é gerado com openpyxl e os avisos vão ao Teams como Adaptive Cards. Há um guia passo a passo com imagens, validado com um leitor sem conhecimento prévio."
});
