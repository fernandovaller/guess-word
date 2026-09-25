# 🎨 Prompts para as imagens dos temas

**Formato alvo:** PNG **512×512** (ou 1024×1024, depois reduza), **fundo transparente**.
**Onde salvar:** `assets/themes/<arquivo>.png` — os nomes estão na tabela abaixo.

> Regra de ouro: o mesmo **prompt-base** em todos, mudando **só o {SUBJECT}**.
> É isso que deixa os 6 temas com estilo idêntico (o visual "profissional").
> Gere o primeiro (Animais). Se gostar do estilo, gere os outros mantendo o sufixo
> igual — ou use a imagem aprovada como referência de estilo, se a ferramenta suportar.

## Prompt-base (troque apenas `{SUBJECT}`)

```text
Flat vector game icon of {SUBJECT}, cute modern style, bold clean shapes, vibrant colors, soft smooth shading, single centered subject with generous padding, isolated on transparent background, no text, no watermark, 1:1 square
```

## Temas

| Tema | Arquivo | `{SUBJECT}` |
|---|---|---|
| Animais | `animais.png` | a cute friendly lion head |
| Frutas | `frutas.png` | a juicy watermelon slice |
| Profissões | `profissoes.png` | a yellow hard hat next to a brown briefcase |
| Objetos | `objetos.png` | an open cardboard box with household items |
| Países | `paises.png` | a stylized planet Earth globe |
| Esportes | `esportes.png` | a classic black and white soccer ball |

**Exemplo pronto para colar (Animais):**

```text
Flat vector game icon of a cute friendly lion head, cute modern style, bold clean shapes, vibrant colors, soft smooth shading, single centered subject with generous padding, isolated on transparent background, no text, no watermark, 1:1 square
```

## Se o gerador não fizer fundo transparente

Troque o trecho `isolated on transparent background` por:

```text
on a solid dark navy background (#1A2036)
```

A imagem vai "encostar" na cor do card do menu (tema escuro do jogo), sem recorte necessário.

## Dicas

- Mantenha o sufixo idêntico em todos os prompts; mude apenas o `{SUBJECT}`.
- Se a ferramenta tiver seed ou referência de estilo (ex.: `--sref` no Midjourney), fixe a primeira imagem aprovada.
- Cheque qualidade: fundo sem ruído/sombra, contorno limpo, nenhuma letra ou número na imagem.
- Opcional: converter para **WebP** (ex.: Squoosh) para arquivos menores — aí atualize o `image:` em `js/data.js`.
- Não precisa gerar tudo de uma vez: enquanto o arquivo faltar, o jogo mostra o emoji do tema automaticamente.
- Alternativa sem IA, se preferir ícones vetoriais consistentes: bibliotecas de ícones SVG (ex.: Iconify, Lucide) — dá para baixar os SVGs e usar direto.