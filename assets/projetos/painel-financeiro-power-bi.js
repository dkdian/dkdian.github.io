// Conteúdo do projeto "Painel financeiro em Power BI para o cliente".
// Edite só este arquivo. As regras de preenchimento estão em CLAUDE.md, na raiz do repositório.
// Texto entre [[ ]] aparece destacado em amarelo no site como pendência.

registrarProjeto({
  "slug": "painel-financeiro-power-bi",
  "titulo": "Painel financeiro em Power BI para o cliente",
  "area": "Power BI",
  "cliente": "uma empresa de alimentação coletiva",
  "resumo": "A planilha de controle financeiro, antes uma aba por mês, virou uma base única que alimenta um painel em Power BI. O cliente navega pela receita, pelo resultado, pela DRE e pelo fluxo de caixa por período, cozinha e cliente, sem esperar o relatório do mês.",
  "resultadoCurto": "Números do mês, ao vivo, para o cliente",
  "links": [
    {
      "rotulo": "Ver o código no GitHub",
      "url": "https://github.com/dkdian/painel-financeiro-power-bi-demo"
    }
  ],
  "problema": "Os números do cliente viviam numa planilha com uma aba por mês, cada uma com fórmulas próprias, e uma aba de gráficos que precisava ser ajustada à mão. Para ver um indicador de outro período ou de uma cozinha específica, era preciso abrir aba por aba ou pedir à consultoria. A conta bancária de cada lançamento não era registrada, então o saldo da planilha não podia ser conferido contra os extratos, e dois erros de fórmula na coluna de saldo passavam despercebidos. O cliente só enxergava o resultado uma vez por mês, no relatório em Word, e qualquer pergunta sobre um número virava uma troca de mensagens.",
  "passos": [
    "As abas mensais da planilha são empilhadas numa tabela única por ano",
    "Cada lançamento ganha conta, categoria e centro de custo padronizados",
    "Os saldos são conferidos contra os extratos, conta a conta",
    "O Power BI lê os arquivos de todos os anos e calcula os indicadores",
    "Oito abas mostram receita, resultado, eficiência, DRE, DFC e lançamentos",
    "O cliente filtra por período, cozinha e cliente, até o lançamento"
  ],
  "antesDepois": [
    [
      "Base de dados",
      "Uma aba por mês, cada uma com fórmulas próprias",
      "Uma tabela única por ano, empilhada pelo painel"
    ],
    [
      "Conta de cada lançamento",
      "Não registrada: o saldo não podia ser conferido",
      "Cinco contas, conferidas contra os extratos"
    ],
    [
      "Acesso do cliente aos números",
      "Uma vez por mês, no relatório em Word",
      "A qualquer momento, no painel"
    ],
    [
      "Pergunta sobre um número",
      "Pedido à consultoria e resposta depois",
      "Filtro até os lançamentos que formam o número"
    ],
    [
      "DRE por cozinha",
      "Um centro de custo por vez na planilha",
      "Todas as cozinhas lado a lado, com o mesmo rateio da planilha"
    ],
    [
      "Virada de ano",
      "Planilha nova e gráficos refeitos",
      "O arquivo do ano novo entra sozinho no painel"
    ]
  ],
  "midia": [
    {
      "arquivo": "painel-financeiro-power-bi-demo.mp4",
      "poster": "painel-financeiro-power-bi-demo-capa.jpg",
      "legenda": "Demonstração com dados fictícios: navegação pelas abas, filtros por período e cozinha e o caminho de um indicador até os lançamentos"
    }
  ],
  "resultados": [
    "O cliente passa a acompanhar receita, resultado, margens, DRE e fluxo de caixa no painel, com filtros por período, cozinha e cliente, sem depender do relatório mensal para enxergar o próprio negócio.",
    "Na primeira conferência contra os extratos, 54 de 55 pares de conta e mês fecharam sem diferença. O par restante revelou uma folha de pagamento que não tinha sido lançada.",
    "Os 12 gráficos que o cliente já conhecia da planilha foram refeitos no painel e conferidos um a um por consulta contra as células da planilha.",
    "Consultoria e cliente olham para o mesmo número: o painel é a mesma base de onde sai o relatório mensal automático, e uma pergunta sobre um valor se responde abrindo os lançamentos que o formam.",
    "O modelo virou um padrão da consultoria e já foi replicado para um segundo cliente."
  ],
  "desafios": [
    {
      "titulo": "De uma aba por mês para uma base de dados",
      "texto": "A planilha tinha uma aba por mês, com grafias diferentes para a mesma categoria e sem a conta bancária. Um importador lê as abas mensais e empilha tudo numa tabela única, com 13 colunas fixas e 14 categorias padronizadas. As correções de grafia viraram regras aprovadas, e uma categoria fora da lista não some em silêncio: vira um alerta. A gravação passa pelo próprio Excel para não apagar gráficos nem formatação da planilha que a equipe continua usando."
    },
    {
      "titulo": "Planilha e banco dizendo a mesma coisa",
      "texto": "Antes de mostrar qualquer número ao cliente, a planilha precisava fechar com os extratos. A conferência encontrou dois erros na coluna de saldo: um investimento descontado em dobro e a primeira linha somando uma data como se fosse valor. Com os dois corrigidos e a conta registrada em cada lançamento, os saldos passaram a fechar conta a conta, mês a mês."
    },
    {
      "titulo": "DRE por cozinha que mostrava prejuízo num ano de lucro",
      "texto": "Somando as colunas de centro de custo, a DRE dava prejuízo, enquanto a empresa teve lucro no ano. O motivo era o rateio do administrativo: distribuído às cozinhas, mas sem sair da própria coluna. O painel passou a ratear tributos e administrativo mês a mês, exatamente como a planilha, e a mostrar as cozinhas lado a lado sem uma coluna de total que não deveria existir."
    },
    {
      "titulo": "Abrir no mês certo, sem configurar nada",
      "texto": "Sem nenhum filtro, o painel precisava abrir mostrando o último mês fechado, e não o fim do calendário. O mês de referência passou a ser o último lançamento realizado, e cada gráfico diz no subtítulo qual período está mostrando. Com um período escolhido, cartões e gráficos mostram só os meses selecionados."
    }
  ],
  "ferramentas": [
    "Power BI",
    "DAX",
    "Power Query",
    "Excel",
    "Python",
    "Claude"
  ],
  "tecnico": "A consulta em Power Query lê todos os arquivos anuais da pasta (Folder.Contents, aceitando .xlsx e .xlsm) e empilha as tabelas, de modo que um ano novo entra sem editar o modelo. O modelo tem calendário próprio, tabelas de estrutura para a DRE e para a DFC e um grupo de cálculo que substituiu as dezenas de medidas repetidas da DRE e resolveu a virada para o segundo ano. O saldo da DFC é recalculado por medida a partir de um saldo de abertura único, e encadeia porque o eixo de meses vem do calendário, não da tabela de lançamentos. O rateio de tributos e administrativo por centro de custo segue mês a mês a fórmula da planilha, conferida ao centavo. As medidas de mês de referência se ancoram no último lançamento realizado, nunca no fim do calendário. As oito páginas, em formato PBIR, são escritas por um script Python com o Power BI Desktop fechado, copiando o modelo de dados byte a byte, e cada número foi validado por consulta DAX contra a planilha. O importador das abas mensais é Python e grava pelo Excel via COM. O limite conhecido é o desempenho da matriz da DRE expandida na tela, mais lenta que a própria consulta, que leva poucos segundos."
});
