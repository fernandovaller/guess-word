# 🎯 Guess the Word

Jogo de adivinhar palavras por tema (mecânica de forca moderna): escolha um tema,
descubra a palavra letra a letra e cuidado com os erros — você tem 6 corações.

Feito 100% com **HTML5 + CSS3 + JavaScript vanilla** (ES Modules), sem dependências.

## Como rodar

Os módulos ES não funcionam abrindo o arquivo diretamente (`file://`) — use um servidor local:

```bash
python3 -m http.server 8080
# ou: npx serve .
```

Abra http://localhost:8080 no navegador.

## Regras

A tela de abertura ("como jogar") aparece sempre ao entrar no jogo; o botão
"Como jogar" no menu reabre a qualquer momento. Enter também joga a partir da abertura.

- Escolha um tema e uma palavra será sorteada (sem repetir a anterior).
- Chute letras no teclado virtual ou físico (acento ignorado: chutar "A" acerta "á").
- Letra certa revela as posições (+10 pts por posição).
- Letra errada custa 1 coração; com 0 corações, a rodada acaba.
- 💡 Dica revela uma letra oculta, mas custa 1 coração (não pode ser usada com 1 coração).
- Vitória: bônus de +15 pts por coração restante e +5 pts por letra da palavra.
- Pontos só valem de verdade quando você vence (recorde salvo apenas em vitórias).

## Estrutura

```
├── index.html        # as 5 telas: abertura (como jogar), menu, jogo, resultado, estatísticas
├── css/styles.css    # tema visual, tiles, teclado, animações
├── js/
│   ├── main.js             # bootstrap: composição (views + services + controllers)
│   ├── controllers/        # um controller por tela: eventos e fluxo
│   │   ├── IntroController.js
│   │   ├── MenuController.js
│   │   ├── GameController.js
│   │   ├── ResultController.js
│   │   └── StatsController.js
│   ├── views/              # renderização de DOM (sem regras)
│   │   ├── ScreenManager.js  # navegação entre telas
│   │   ├── images.js         # <img> dos temas + fallback por emoji
│   │   ├── MenuView.js
│   │   ├── GameView.js
│   │   ├── ResultView.js
│   │   └── StatsView.js
│   ├── game.js             # service: regras e estado da rodada (letras, vidas, pontos)
│   ├── stats-service.js    # service: estatísticas do jogador + persistência
│   ├── data.js             # temas e palavras
│   ├── icons.js            # ícones SVG inline (+ override por imagem)
│   ├── audio.js            # service: efeitos sonoros com WebAudio (sem arquivos)
│   ├── storage.js          # service: localStorage (estatísticas, mudo, abertura)
│   └── utils.js            # normalização de acentos, sorteio
└── package.json
```

## Imagens dos temas

O menu usa uma imagem por tema (`assets/themes/<id>.png`). Enquanto o arquivo
não existir, aparece o emoji do tema — dá para testar aos poucos.

- Formato ideal: **PNG 512×512 com fundo transparente**
- Prompts prontos para gerar com IA: [`assets/themes/PROMPTS.md`](assets/themes/PROMPTS.md)

## Imagens dos ícones (opcional)

Mesma mecânica dos temas, invertida: o padrão é o SVG inline e, se existir
`assets/icons/<nome>.png` (ex.: `heart.png`), o ícone vira imagem automaticamente.
Lista de nomes e prompts: [`assets/icons/PROMPTS.md`](assets/icons/PROMPTS.md).

## Personalizar

**Adicionar palavras/temas** — edite `js/data.js`; copie um bloco de tema, mude `id`, `name`, `icon` e a lista `words` (sem espaço/hífen; acentos são bem-vindos).

**Ajustar dificuldade/pontuação** — edite `RULES` em `js/game.js` (vidas, pontos por letra, bônus).

## Próximos passos (ideias)

- Níveis de dificuldade (tamanho da palavra / nº de vidas)
- Timer opcional por rodada
- Modo diário (1 palavra por dia, resultado compartilhável)
- Dark/light mode com seletor
- PWA (instalar no celular)

## Licença

Distribuído sob a licença [MIT](LICENSE) — use, estude e modifique à vontade.