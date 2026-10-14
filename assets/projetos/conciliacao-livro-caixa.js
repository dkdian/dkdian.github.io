// Conteúdo do projeto "Conciliação automática do livro caixa".
// Edite só este arquivo. As regras de preenchimento estão em CLAUDE.md, na raiz do repositório.
// Texto entre [[ ]] aparece destacado em amarelo no site como pendência.

registrarProjeto({
  "slug": "conciliacao-livro-caixa",
  "titulo": "Conciliação automática do livro caixa",
  "area": "Automação em Excel",
  "cliente": "uma distribuidora",
  "resumo": "Uma consulta única lê os relatórios do ERP de cinco contas e cruza cada lançamento com o extrato bancário, trazendo categoria e descrição sem digitação.",
  "resultadoCurto": "[[X]] h a menos por fechamento",
  "problema": "Todo mês, cada uma das cinco contas da empresa gerava um relatório separado no ERP, em formatos diferentes. Alguém precisava abrir arquivo por arquivo, organizar os dados à mão e procurar no extrato bancário qual lançamento correspondia a qual. Era lento, e um erro de digitação podia passar despercebido até o balancete.",
  "passos": [
    "Os relatórios do mês são salvos em uma única pasta",
    "A consulta lê os arquivos brutos do ERP, em qualquer formato",
    "As cinco contas são reunidas em uma só base",
    "Cada linha do extrato é cruzada por data e valor",
    "O que não bate fica separado para revisão"
  ],
  "antesDepois": [
    [
      "Arquivos organizados à mão",
      "5 por mês",
      "Nenhum"
    ],
    [
      "Etapa manual de preparação",
      "Necessária",
      "Eliminada"
    ],
    [
      "Formatos aceitos",
      "Um",
      "xls, xlsx, xlsm, csv, txt e PDF"
    ],
    [
      "Tempo por fechamento",
      "[[X]] h",
      "[[Y]] min"
    ]
  ],
  "midia": [
    {
      "arquivo": null,
      "legenda": "GIF do fechamento antes e depois"
    },
    {
      "arquivo": null,
      "legenda": "Tela da planilha conciliada com dados fictícios"
    }
  ],
  "resultados": [
    "O fechamento mensal começa com os dados já organizados e classificados.",
    "Os casos que a regra não resolve ficam separados, então a revisão foca só no que precisa de atenção.",
    "A rotina foi documentada em guias numerados para que outra pessoa da equipe consiga executar."
  ],
  "ferramentas": [
    "Excel",
    "Power Query",
    "VBA"
  ],
  "tecnico": "Consulta única em Power Query (linguagem M) que interpreta o relatório bruto do ERP, inclusive em largura fixa e PDF, aplica tabelas de-para de contas e categorias mantidas na própria pasta de trabalho e gera a chave de busca por data e valor. Suporta vários meses e formatos de arquivo."
});
