# 🎨 Prompts para os ícones de interface (override)

Opcional: cada ícone SVG da interface pode virar uma imagem. Basta salvar
`assets/icons/<nome>.png` — **o nome do arquivo deve ser exatamente o nome do ícone**.
Sem o arquivo, o jogo usa o SVG desenhado (nada quebra).

> ⚠️ Diferença dos temas: a imagem **fixa as cores** (não herda a cor do tema
> como o SVG). Prefira um estilo consistente entre os ícones e fundo transparente.

## Prompt-base (troque apenas `{SYMBOL}`)

```text
Flat vector UI icon of {SYMBOL}, bold clean shapes, rounded stroke style, single centered symbol with generous padding, isolated on transparent background, no text, no watermark, 1:1 square
```

Para combinar com o tema escuro do jogo, sugiro usar a paleta dele nos ícones:
violeta `#7c6cff`, verde `#38d17c`, vermelho `#ff5470`, dourado `#ffc24b`.

## Ícones (nome do arquivo → símbolo)

| Arquivo | `{SYMBOL}` |
|---|---|
| `target.png` | an archery target |
| `volume-on.png` | a loudspeaker with sound waves |
| `volume-off.png` | a loudspeaker with a cross |
| `chart.png` | an ascending bar chart |
| `arrow-left.png` | a left-pointing arrow |
| `lightbulb.png` | a glowing lightbulb |
| `heart.png` | a solid red heart |
| `heart-crack.png` | a broken heart with a crack |
| `trophy.png` | a golden trophy cup |
| `flame.png` | an orange flame |
| `dice.png` | a white dice with black dots |
| `crown.png` | a golden crown |
| `star.png` | a golden star |
| `repeat.png` | circular refresh arrows |
| `home.png` | a house silhouette |

## Dicas

- Mesmo prompt-base em todos; mude só o `{SYMBOL}` — consistência acima de tudo.
- 512×512 basta (os ícones aparecem entre 13px e 26px).
- Teste primeiro com um ícone (ex.: `heart.png`) e recarregue o jogo para ver o override.
- Enquanto um ícone não tem imagem, os 404s no console são esperados — são as sondagens.
- Opcional para produção: converter para WebP e atualizar a extensão em `js/icons.js` (`OVERRIDES_DIR`/`icon()`).