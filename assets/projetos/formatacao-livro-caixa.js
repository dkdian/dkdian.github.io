// Conteúdo do projeto "Livro caixa do ERP pronto para a planilha".
// Edite só este arquivo. As regras de preenchimento estão em CLAUDE.md, na raiz do repositório.
// Texto entre [[ ]] aparece destacado em amarelo no site como pendência.

registrarProjeto({
  "slug": "formatacao-livro-caixa",
  "titulo": "Livro caixa do ERP pronto para a planilha",
  "area": "Automação em Excel e Power Query",
  "cliente": "uma distribuidora",
  "resumo": "Os cinco relatórios de livro caixa que o sistema exporta, um por conta, viram uma única tabela já classificada. O fechamento do mês começa com os lançamentos lidos, conferidos e prontos para colar na planilha de controle.",
  "resultadoCurto": "4,5 h viraram até 20 min",
  "problema": "Todo mês o sistema de gestão do cliente exportava um relatório de livro caixa por conta, cinco arquivos no total. Esse relatório não é uma tabela: é um texto de largura fixa despejado numa única coluna, com o histórico quebrado em duas linhas, saldos do dia no meio, cabeçalho repetido a cada página, lançamentos cancelados e valores negativos com o sinal no fim. Cada arquivo era organizado à mão, cada lançamento precisava de tipo, categoria e fornecedor, e as contrapartidas novas tinham de ser caçadas uma a uma. Só depois disso os lançamentos podiam ser colados na planilha do mês, e o fechamento levava cerca de 4,5 horas.",
  "passos": [
    "O sistema exporta um relatório por conta, cinco por mês",
    "Os arquivos do mês vão para uma pasta única",
    "O Power Query lê o texto cru e monta a tabela",
    "O de-para aplica conta, tipo, categoria e fornecedor",
    "Contrapartidas novas aparecem numa aba, com sugestão",
    "Os lançamentos são colados na aba do mês e os saldos conferidos"
  ],
  "antesDepois": [
    [
      "Organizar os 5 relatórios",
      "À mão, arquivo por arquivo",
      "Nenhum arquivo organizado à mão"
    ],
    [
      "Leitura do relatório do sistema",
      "Manual",
      "Consulta única, cerca de 30 s"
    ],
    [
      "Troca de mês",
      "Editar o caminho da consulta",
      "Trocar os arquivos da pasta Atual"
    ],
    [
      "Contrapartida nova",
      "Filtrar a coluna de tipo vazia e procurar",
      "Aba própria, com sugestão de tipo e categoria"
    ],
    [
      "Conferência de saldos",
      "Comparação manual",
      "Faixa OK ou ERRO na própria aba"
    ],
    [
      "Tempo por fechamento",
      "Cerca de 4,5 horas",
      "10 a 20 minutos"
    ]
  ],
  "midia": [
    {
      "arquivo": "formatacao-livro-caixa-demo.mp4",
      "poster": "formatacao-livro-caixa-demo-capa.jpg",
      "legenda": "Demonstração com dados fictícios, no mesmo layout do relatório real: do relatório de impressão do sistema até os lançamentos conferidos na planilha do mês"
    }
  ],
  "resultados": [
    "Cada fechamento trata cerca de 3 mil lançamentos sem organizar nenhum arquivo à mão: o Power Query lê os relatórios exportados diretamente.",
    "Atualizar Tudo leva cerca de 30 segundos e devolve os lançamentos no formato da planilha de controle, com conta, tipo, categoria e fornecedor.",
    "Os saldos finais das cinco contas fecham com os do relatório do sistema, centavo a centavo, e a faixa de validação da aba avisa quando algo não bate.",
    "O tempo do fechamento passou de cerca de 4,5 horas para 10 a 20 minutos, e a rotina está documentada em um guia numerado para outra pessoa da equipe executar."
  ],
  "desafios": [
    {
      "titulo": "Um relatório que não é uma tabela",
      "texto": "O texto vem em largura fixa dentro de uma coluna. A consulta junta as linhas de histórico quebradas, descarta saldos, totais e lançamentos cancelados, lê o sinal que vem no fim do valor e busca o nome completo da contrapartida no bloco de resumo do próprio relatório. A consulta lê o relatório cru, então não existe mais a etapa de organizar arquivo."
    },
    {
      "titulo": "Casar a conta pelo código, não pelo nome",
      "texto": "O sistema chama a conta de um jeito e a planilha de outro. Na primeira versão, o cruzamento pelo nome deixou mais de 2 mil linhas sem correspondência, sem nenhum erro na tela. A consulta passou a identificar a conta pelo código que vem dentro do relatório e a traduzir o nome numa tabela de apoio."
    },
    {
      "titulo": "Contrapartida nova sem classificação errada",
      "texto": "Quando o sistema usa uma contrapartida que ainda não está no de-para, a linha não é classificada no chute. Ela aparece numa aba própria, com uma sugestão de tipo e categoria vinda de regras de palavra-chave ou de contrapartidas parecidas, e fica marcada para revisão. Só depois do cadastro a lista esvazia."
    },
    {
      "titulo": "Trocar de mês sem editar código",
      "texto": "Enquanto o caminho da consulta levava o nome do mês, todo fechamento exigia editar a consulta. Hoje ela lê uma pasta fixa, e trocar de mês é trocar os arquivos. As tabelas de apoio ficam dentro da própria pasta de trabalho, o que tornou o arquivo portátil e evitou os erros de nível de privacidade do Power Query."
    }
  ],
  "ferramentas": [
    "Excel",
    "Power Query",
    "VBA",
    "Claude"
  ],
  "tecnico": "Uma consulta única em Power Query (linguagem M) lê todos os .xls de uma pasta com Excel.Workbook e trata o relatório de largura fixa por posição: o código da conta vem da linha de cabeçalho, as linhas de detalhe são separadas por barras verticais e agrupadas por número de lançamento (linha sem número é continuação da anterior), e a descrição completa da contrapartida vem do bloco de resumo, lido por posição de caractere. Uma segunda consulta cruza o resultado com tabelas de apoio mantidas na própria pasta de trabalho (conta, contrapartida para tipo e categoria, e palavra no histórico para fornecedor) e entrega as colunas no layout da aba mensal. Uma terceira consulta lista as contrapartidas ausentes do de-para e sugere tipo e categoria por palavra-chave ou pelo sufixo mais frequente. Na planilha de controle, duas macros em VBA ancoradas no bloco de saldos finais refazem a coluna de saldo corrido e inserem linhas sem quebrar os intervalos das fórmulas, e uma faixa de validação compara o saldo calculado de cada conta com o do relatório do sistema. O limite conhecido é a leitura por posição fixa: se o sistema mudar a largura das colunas do relatório, o filtro de tipo vazio é o que acusa."
});
