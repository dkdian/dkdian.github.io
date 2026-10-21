// Conteúdo do projeto "Relatório financeiro mensal gerado direto do Power BI".
// Edite só este arquivo. As regras de preenchimento estão em CLAUDE.md, na raiz do repositório.
// Texto entre [[ ]] aparece destacado em amarelo no site como pendência.

registrarProjeto({
  "slug": "relatorio-financeiro-automatico",
  "titulo": "Relatório financeiro mensal gerado direto do Power BI",
  "area": "Automação em Python e Power BI",
  "cliente": "uma empresa de alimentação coletiva",
  "resumo": "Um clique na planilha de controle escolhe o mês, atualiza o Power BI e entrega o relatório financeiro em Word, com gráficos, DRE, DFC e textos já preenchidos. O tempo que ia para conferir números agora vai inteiro para a análise técnica, e o relatório chega mais cedo ao cliente.",
  "resultadoCurto": "12 h de montagem viraram 5 min",
  "links": [
    {
      "rotulo": "Ver o código no GitHub",
      "url": "https://github.com/dkdian/relatorio-financeiro-automatico-demo"
    }
  ],
  "problema": "Todo mês o relatório financeiro do cliente era montado à mão no Word, em cerca de dois dias de trabalho (12 horas): copiar gráficos da planilha, colar e ajustar as tabelas de DRE e DFC e reescrever os parágrafos com os números do mês. Só depois disso começava a validação do gestor, de mais 2 a 3 horas, que precisava se dividir entre analisar os resultados e conferir se as informações estavam certas. Erros pequenos e quase imperceptíveis passavam com facilidade: um texto reaproveitado do mês anterior, um gráfico com valor desatualizado, um número que não batia com o painel. Um relatório chegou a sair com o markup do mês errado. Com isso, a entrega ao cliente ficava para mais tarde no mês, e parte do tempo de análise era gasta verificando dados.",
  "passos": [
    "A equipe fecha os lançamentos do mês na planilha de controle",
    "Um botão na planilha abre o assistente, que pergunta o mês",
    "O assistente abre o Power BI e atualiza os dados",
    "Todos os números saem das medidas do Power BI, sem recálculo",
    "Gráficos e tabelas são desenhados no padrão do relatório entregue",
    "O Word sai pronto para a análise do consultor e do gestor"
  ],
  "antesDepois": [
    [
      "Montagem do relatório",
      "Cerca de 12 horas (dois dias), à mão",
      "Cerca de 5 minutos, com um clique"
    ],
    [
      "Gráficos, DRE, DFC e textos",
      "Copiados, formatados e reescritos um a um",
      "Gerados dos números do mês, sempre no mesmo padrão"
    ],
    [
      "Confiança nos números",
      "Erros pequenos caçados na leitura",
      "Todo número vem da mesma fonte que o painel"
    ],
    [
      "Tempo de validação do gestor",
      "Dividido entre conferir dados e analisar",
      "Investido por inteiro na análise técnica"
    ],
    [
      "Início da validação",
      "Só depois de dois dias de montagem",
      "Logo após o fechamento dos lançamentos"
    ],
    [
      "Quem consegue gerar",
      "Só quem conhecia a rotina",
      "Qualquer pessoa da equipe, em qualquer computador"
    ]
  ],
  "midia": [
    {
      "arquivo": "relatorio-financeiro-automatico-demo.mp4",
      "poster": "relatorio-financeiro-automatico-demo-capa.jpg",
      "legenda": "Demonstração com dados fictícios: do clique na planilha ao relatório em Word pronto para a análise do consultor"
    }
  ],
  "resultados": [
    "A montagem do relatório passou de cerca de 12 horas para cerca de 5 minutos, contando a abertura e a atualização do Power BI, sem nenhum gráfico ou tabela feito à mão.",
    "A validação do gestor começa muito mais cedo no mês, logo depois do fechamento dos lançamentos, e o relatório chega ao cliente mais rápido.",
    "O tempo de validação, antes dividido entre conferir informações e fazer a análise estratégica, agora é investido por inteiro na análise técnica dos dados. O gestor só confere na planilha base se as categorias estão corretas para cada transação, e as entregas ganharam profundidade.",
    "Os erros pequenos deixaram de existir: planilha, painel e relatório mostram o mesmo número, porque todos vêm das mesmas medidas do Power BI. Na conferência de um mês fechado, 111 itens do gerador bateram com o painel sem nenhuma diferença.",
    "O consultor recebe uma lista de alertas do mês, como receita variando mais de 10% ou cliente que deixou de aparecer, e as recomendações chegam com um rascunho escrito por IA, destacado em amarelo, para revisar e aprovar. Nada sai para o cliente sem leitura humana."
  ],
  "desafios": [
    {
      "titulo": "Um número, uma fonte só",
      "texto": "Planilha, painel e uma primeira versão do gerador calculavam os mesmos indicadores cada um do seu jeito, e um mesmo percentual chegou a sair com valores bem diferentes em dois lugares. A regra passou a ser: todo número vem de uma medida do Power BI, conferida contra a planilha, e o gerador só formata e desenha. Quando a regra de negócio muda, muda num lugar só."
    },
    {
      "titulo": "Gráficos que não cabiam no Word",
      "texto": "A ideia inicial era exportar as páginas do Power BI e colar as imagens no relatório. Em três rodadas, legendas cortadas, tabelas com rolagem e pizzas pequenas mostraram que o caminho não fechava. Os gráficos passaram a ser desenhados a partir dos números do painel, copiando o estilo que o cliente já conhecia, e DRE e DFC saem como imagem no formato da planilha, sem edição manual."
    },
    {
      "titulo": "Funcionar no computador de qualquer pessoa",
      "texto": "O primeiro botão só funcionava na máquina de quem o criou: em outro computador o painel pedia login, avisava sobre privacidade dos dados ou nem abria. O painel passou a ler a pasta sincronizada do próprio computador, e um assistente confere se o Power BI está instalado, abre, atualiza e gera, sem exigir instalação prévia. Até o bloqueio do antivírus a macros que abrem programas foi contornado sem mexer em configuração de segurança."
    },
    {
      "titulo": "Ano novo sem mexer no painel",
      "texto": "A planilha de controle é um arquivo por ano. Em vez de editar as consultas todo janeiro, o painel lê todos os arquivos da pasta e empilha os anos sozinho. Ajustes de saldo entre um ano e outro ficam registrados como lançamento próprio, para o saldo final de um mês bater com o inicial do seguinte."
    }
  ],
  "ferramentas": [
    "Power BI",
    "Python",
    "Excel",
    "Word",
    "VBA",
    "Claude"
  ],
  "tecnico": "O gerador em Python se conecta ao modelo do Power BI Desktop aberto (o Analysis Services local, localizado pela porta do processo) com pythonnet e a biblioteca ADOMD.NET, e lê cada número por consulta DAX; nenhum indicador é recalculado em Python. Antes de gerar, comandos TMSL apontam as consultas Power Query para a pasta local do computador e disparam a atualização, e o gerador espera a contagem de linhas bater com a planilha. Os gráficos são desenhados em matplotlib no estilo da planilha de origem, as tabelas de DRE, DFC e comparativos viram imagem com Pillow, e o documento é montado com docxtpl e python-docx sobre um modelo com sumário automático. Um arquivo de alertas lista as checagens do mês e as recomendações recebem um rascunho do Claude, marcado para revisão. O assistente é um executável único (PyInstaller) que confere a instalação do Power BI Desktop, trava execuções duplicadas e é chamado da planilha por uma macro VBA via FollowHyperlink. Tudo roda sem licença Pro, Premium ou Fabric. O limite conhecido é depender do Power BI Desktop no Windows: sem ele, o gerador não tem de onde ler os números."
});
