// Conteúdo do projeto "Relatório semanal de fluxo de caixa entregue no Teams".
// Edite só este arquivo. As regras de preenchimento estão em CLAUDE.md, na raiz do repositório.
// Texto entre [[ ]] aparece destacado em amarelo no site como pendência.

registrarProjeto({
  "slug": "fluxo-caixa-teams",
  "titulo": "Relatório semanal de fluxo de caixa entregue no Teams",
  "area": "Automação em Python",
  "cliente": "uma empresa do setor florestal",
  "resumo": "Toda terça às 10h, dois relatórios de fluxo de caixa são baixados, tratados, arquivados e avisados à equipe, sem ninguém abrir um arquivo.",
  "resultadoCurto": "6 passos manuais a menos por semana",
  "problema": "Toda terça, alguém baixava dois relatórios de fluxo de caixa compartilhados pelo cliente, rodava uma macro, criava uma pasta com a data, substituía os arquivos da versão atual e avisava a equipe no Teams. Eram passos simples, mas repetitivos e fáceis de esquecer ou fazer fora de ordem.",
  "passos": [
    "A rotina começa sozinha toda terça às 10h",
    "Os dois relatórios são baixados da pasta do cliente",
    "As regras de tratamento da equipe são aplicadas",
    "Os arquivos são salvos em uma pasta com a data e a versão atual é substituída",
    "A equipe recebe a mensagem no Teams"
  ],
  "antesDepois": [
    [
      "Passos manuais",
      "6",
      "Nenhum"
    ],
    [
      "Risco de esquecer a rotina",
      "Alto",
      "Agendada"
    ],
    [
      "Valores sem classificação",
      "Corrigidos no improviso",
      "Separados com lista de opções"
    ],
    [
      "Tempo por semana",
      "[[X]] min",
      "[[Y]] min"
    ]
  ],
  "midia": [
    {
      "arquivo": null,
      "legenda": "GIF da mensagem chegando no Teams"
    },
    {
      "arquivo": null,
      "legenda": "Diagrama do fluxo, da pasta do cliente até o Teams"
    }
  ],
  "resultados": [
    "A entrega acontece sempre no mesmo dia e horário.",
    "Centros de custo e categorias fora da tabela de-para continuam visíveis, com uma lista suspensa para a pessoa escolher a opção certa.",
    "O histórico semanal fica organizado em pastas por data."
  ],
  "ferramentas": [
    "Python",
    "Excel",
    "Google Drive",
    "Microsoft Teams"
  ],
  "tecnico": "Script Python agendado no Windows. Lê os arquivos XLSB do Google Drive, reproduz a lógica de tratamento que antes rodava em VBA, faz a correspondência de-para após remover espaços e grava a saída com validação de dados. Antes de chegar a essa solução testei Power Automate, Azure Functions e GitHub Actions, e descartei cada um por custo de licença ou por exigir permissões de administrador."
});
