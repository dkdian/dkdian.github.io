// Conteúdo de todos os projetos. Para adicionar um projeto, copie um bloco { ... } inteiro e edite.
// Trechos entre [[ ]] aparecem destacados em amarelo no site. Substitua pelos valores reais e apague os colchetes.
// Imagens e GIFs vão em assets/img. Em "midia", troque arquivo null pelo nome do arquivo, por exemplo "conciliacao.gif".

var PROJETOS = [
  {
    slug: "conciliacao-livro-caixa",
    titulo: "Conciliação automática do livro caixa",
    area: "Automação em Excel",
    cliente: "uma distribuidora",
    resumo: "Uma consulta única lê os relatórios do ERP de cinco contas e cruza cada lançamento com o extrato bancário, trazendo categoria e descrição sem digitação.",
    resultadoCurto: "[[X]] h a menos por fechamento",
    problema: "Todo mês, cada uma das cinco contas da empresa gerava um relatório separado no ERP, em formatos diferentes. Alguém precisava abrir arquivo por arquivo, organizar os dados à mão e procurar no extrato bancário qual lançamento correspondia a qual. Era lento, e um erro de digitação podia passar despercebido até o balancete.",
    passos: [
      "Os relatórios do mês são salvos em uma única pasta",
      "A consulta lê os arquivos brutos do ERP, em qualquer formato",
      "As cinco contas são reunidas em uma só base",
      "Cada linha do extrato é cruzada por data e valor",
      "O que não bate fica separado para revisão"
    ],
    antesDepois: [
      ["Arquivos organizados à mão", "5 por mês", "Nenhum"],
      ["Etapa manual de preparação", "Necessária", "Eliminada"],
      ["Formatos aceitos", "Um", "xls, xlsx, xlsm, csv, txt e PDF"],
      ["Tempo por fechamento", "[[X]] h", "[[Y]] min"]
    ],
    midia: [
      { arquivo: null, legenda: "GIF do fechamento antes e depois" },
      { arquivo: null, legenda: "Tela da planilha conciliada com dados fictícios" }
    ],
    resultados: [
      "O fechamento mensal começa com os dados já organizados e classificados.",
      "Os casos que a regra não resolve ficam separados, então a revisão foca só no que precisa de atenção.",
      "A rotina foi documentada em guias numerados para que outra pessoa da equipe consiga executar."
    ],
    ferramentas: ["Excel", "Power Query", "VBA"],
    tecnico: "Consulta única em Power Query (linguagem M) que interpreta o relatório bruto do ERP, inclusive em largura fixa e PDF, aplica tabelas de-para de contas e categorias mantidas na própria pasta de trabalho e gera a chave de busca por data e valor. Suporta vários meses e formatos de arquivo."
  },

  {
    slug: "fluxo-caixa-teams",
    titulo: "Relatório semanal de fluxo de caixa entregue no Teams",
    area: "Automação em Python",
    cliente: "uma empresa do setor florestal",
    resumo: "Toda terça às 10h, dois relatórios de fluxo de caixa são baixados, tratados, arquivados e avisados à equipe, sem ninguém abrir um arquivo.",
    resultadoCurto: "6 passos manuais a menos por semana",
    problema: "Toda terça, alguém baixava dois relatórios de fluxo de caixa compartilhados pelo cliente, rodava uma macro, criava uma pasta com a data, substituía os arquivos da versão atual e avisava a equipe no Teams. Eram passos simples, mas repetitivos e fáceis de esquecer ou fazer fora de ordem.",
    passos: [
      "A rotina começa sozinha toda terça às 10h",
      "Os dois relatórios são baixados da pasta do cliente",
      "As regras de tratamento da equipe são aplicadas",
      "Os arquivos são salvos em uma pasta com a data e a versão atual é substituída",
      "A equipe recebe a mensagem no Teams"
    ],
    antesDepois: [
      ["Passos manuais", "6", "Nenhum"],
      ["Risco de esquecer a rotina", "Alto", "Agendada"],
      ["Valores sem classificação", "Corrigidos no improviso", "Separados com lista de opções"],
      ["Tempo por semana", "[[X]] min", "[[Y]] min"]
    ],
    midia: [
      { arquivo: null, legenda: "GIF da mensagem chegando no Teams" },
      { arquivo: null, legenda: "Diagrama do fluxo, da pasta do cliente até o Teams" }
    ],
    resultados: [
      "A entrega acontece sempre no mesmo dia e horário.",
      "Centros de custo e categorias fora da tabela de-para continuam visíveis, com uma lista suspensa para a pessoa escolher a opção certa.",
      "O histórico semanal fica organizado em pastas por data."
    ],
    ferramentas: ["Python", "Excel", "Google Drive", "Microsoft Teams"],
    tecnico: "Script Python agendado no Windows. Lê os arquivos XLSB do Google Drive, reproduz a lógica de tratamento que antes rodava em VBA, faz a correspondência de-para após remover espaços e grava a saída com validação de dados. Antes de chegar a essa solução testei Power Automate, Azure Functions e GitHub Actions, e descartei cada um por custo de licença ou por exigir permissões de administrador."
  },

  {
    slug: "painel-custos",
    titulo: "Painel de custos da cadeia de suprimentos",
    area: "Power BI",
    cliente: "uma multinacional do setor de transporte",
    resumo: "Painéis em Power BI substituíram relatórios de custo montados à mão e revelaram itens com preço errado.",
    resultadoCurto: "Cerca de US$ 50 mil em preços incorretos encontrados",
    problema: "Os relatórios de custo eram montados manualmente a cada ciclo, o que consumia tempo e dificultava comparar preços entre itens e períodos. [[Ajuste este texto com o contexto real.]]",
    passos: [
      "Os dados de compras e custos são extraídos dos sistemas",
      "O Power BI reúne tudo em um modelo único",
      "O painel mostra custos por item e período",
      "Divergências de preço ficam destacadas para análise"
    ],
    antesDepois: [
      ["Montagem do relatório", "Manual", "Atualização automática"],
      ["Tempo de geração", "100%", "Menos de 50%"],
      ["Preços incorretos identificados", "Não visíveis", "Cerca de US$ 50 mil"]
    ],
    midia: [
      { arquivo: null, legenda: "Tela do painel recriado com dados fictícios" }
    ],
    resultados: [
      "Tempo de geração dos relatórios reduzido em mais de 50%.",
      "Identificação de cerca de US$ 50 mil em itens com preço incorreto."
    ],
    ferramentas: ["Power BI", "DAX", "Excel"],
    tecnico: "[[Descreva o modelo de dados, as principais medidas DAX e as fontes.]]"
  },

  {
    slug: "financas-pessoais",
    titulo: "Controle financeiro com categorização automática",
    area: "Automação com IA",
    cliente: "uso pessoal",
    status: "Em construção",
    resumo: "As transações bancárias chegam sozinhas a uma planilha, são classificadas por uma tabela de-para e o que for desconhecido vira uma pergunta por mensagem.",
    resultadoCurto: "Lançamento de gastos sem digitação",
    problema: "Lançar gastos à mão é o motivo mais comum para abandonar um controle financeiro. A ideia é que o registro aconteça sem esforço e a pessoa decida apenas o que a regra ainda não conhece.",
    passos: [
      "As transações chegam pelo Open Finance",
      "Cada uma é comparada com a tabela de estabelecimentos e categorias",
      "As conhecidas são classificadas automaticamente",
      "As desconhecidas chegam como pergunta no Telegram",
      "A planilha mostra gasto por categoria, resultado do mês e saldo conciliado"
    ],
    antesDepois: [
      ["Lançamento de gastos", "Manual", "Automático"],
      ["Classificação", "Uma a uma", "Só os casos novos"],
      ["Conciliação do saldo", "Raramente feita", "[[A definir]]"]
    ],
    midia: [
      { arquivo: null, legenda: "Print da conversa no Telegram com dados fictícios" }
    ],
    resultados: [
      "[[Preencha quando o projeto estiver rodando.]]"
    ],
    ferramentas: ["Open Finance (Pluggy)", "Google Sheets", "Telegram", "IA generativa"],
    tecnico: "Em construção."
  }
];
