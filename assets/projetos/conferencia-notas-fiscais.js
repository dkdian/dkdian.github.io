// Conteúdo do projeto "Conferência de notas fiscais e baixa no sistema".
// Edite só este arquivo. As regras de preenchimento estão em CLAUDE.md, na raiz do repositório.
// Texto entre [[ ]] aparece destacado em amarelo no site como pendência.

registrarProjeto({
  "slug": "conferencia-notas-fiscais",
  "titulo": "Conferência de notas fiscais e baixa no sistema",
  "area": "Automação em Python",
  "cliente": "uma empresa do setor florestal",
  "resumo": "Três botões numa planilha conferem cada nota fiscal da semana no sistema de gestão do cliente, dão baixa nos pagamentos que já estavam lançados e geram o arquivo de importação só com o que ainda falta subir.",
  "resultadoCurto": "36 baixas em cerca de 8 minutos",
  "problema": "Toda semana chegam dezenas de lançamentos pagos, e boa parte das notas fiscais já está no sistema de gestão como conta a pagar em aberto. Antes, era preciso procurar nota por nota no sistema, comparar fornecedor, valor e vencimento, marcar cada uma como paga numa janela própria e, por fim, apagar da planilha à mão o que já existia, para não importar em duplicidade. Parcelas, notas com o número escrito de outro jeito e pequenas diferenças de valor exigiam julgamento caso a caso. O trabalho era lento, sem registro do que foi decidido, e um esquecimento virava lançamento duplicado no fluxo de caixa.",
  "passos": [
    "Os lançamentos da semana chegam numa aba nova da planilha",
    "O botão 1 confere cada nota fiscal no sistema de gestão",
    "Cada linha recebe uma sugestão: dar baixa, importar ou ignorar",
    "A pessoa revisa só os casos duvidosos, com o motivo escrito",
    "O botão 2 mostra prévia, simula e dá baixa nos pagamentos",
    "O botão 3 gera o arquivo de importação sem duplicatas"
  ],
  "antesDepois": [
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
      "Registro das decisões",
      "Nenhum",
      "Motivo, data e status em cada linha"
    ],
    [
      "Trabalho ativo por semana (estimativa)",
      "[[cerca de 3,5 h]]",
      "[[cerca de 45 min]]"
    ]
  ],
  "midia": [
    {
      "arquivo": "conferencia-notas-fiscais-demo.mp4",
      "legenda": "Demonstração de 3 minutos com o robô e o ERP funcionando de verdade (só os dados são fictícios): conferir, dar baixa com prévia e simulação, e gerar o arquivo"
    }
  ],
  "resultados": [
    "Na primeira semana em produção, 37 pagamentos foram baixados no sistema sem nenhum erro, depois de três rodadas de simulação que levaram as linhas prontas de 34 em 38 para 37 em 37.",
    "A conferência de 79 linhas reais roda em menos de 2 minutos, cerca de 28% mais rápida depois de uma otimização, com resultado idêntico ao da versão anterior.",
    "O arquivo de importação deixa de fora, sozinho, tudo o que já foi baixado ou já estava pago, eliminando a remoção manual e o risco de duplicidade.",
    "A revisão humana se concentra nos casos marcados para revisar, cada um com o motivo por escrito, e nada é gravado no sistema sem a pessoa digitar a confirmação.",
    "[[Estimativa para uma semana com cerca de 65 notas e 37 baixas: de 3,5 h para 45 min de trabalho ativo, uma redução de cerca de 80%. Substitua por tempos medidos quando houver.]]",
    "A rotina ganhou um guia passo a passo com imagens, testado com um leitor sem conhecimento prévio, para que outra pessoa da equipe consiga executá-la."
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
    "Microsoft Teams"
  ],
  "tecnico": "Python acionado por botões VBA. A conferência usa Playwright com perfil de navegador persistente e intercepta as respostas JSON da API de listagem do sistema (sem raspagem de HTML), com busca em lotes de 10 e reconsulta individual para garantir cobertura. O critério de comparação é uma função pura testada à parte: normalização de número e de fornecedor, tolerâncias de valor, soma de várias linhas e escolha de parcela por data de pagamento. A baixa preenche o formulário de pagamento, relê o valor líquido e o saldo na tela antes de confirmar e, na simulação, aborta na rede qualquer requisição que não seja leitura. A integração com o Excel é por COM (pywin32), localizando a pasta de trabalho aberta pela tabela de objetos em execução do Windows; o arquivo de importação é gerado com openpyxl e os avisos vão ao Teams como Adaptive Cards."
});
