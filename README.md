# [NOME] Tattoo — Landing Page

Estrutura estática em HTML5, CSS3 e JavaScript puro, pensada para VS Code e hospedagem estática.

## Estrutura

```text
nome-tattoo-landing/
├── index.html                 # Português (raiz)
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/                # coloque aqui suas fotos reais
├── pages/                      # Português
│   ├── about.html
│   ├── tattoos.html
│   ├── art.html
│   ├── studios.html
│   └── contact.html
├── en/
│   ├── index.html
│   └── pages/
│       ├── about.html
│       ├── tattoos.html
│       ├── art.html
│       ├── studios.html
│       └── contact.html
└── es/
    ├── index.html
    └── pages/
        ├── about.html
        ├── tattoos.html
        ├── art.html
        ├── studios.html
        └── contact.html
```

## Como abrir no VS Code

1. Abra esta pasta no VS Code.
2. Instale a extensão **Live Server** ou use outro servidor HTTP local.
3. Abra `index.html` pelo servidor.
4. Não abra os arquivos via `file://` se você evoluir o JS para módulos ES.

## Antes de publicar

- Troque `[NOME]`, `[NOME DA TATUADORA]`, textos editáveis e links sociais.
- Substitua as URLs de imagens de demonstração pelas suas imagens em `assets/images/`.
- Configure o formulário de contato para seu backend, Formspree, Netlify Forms ou API própria.
- Adicione favicon, Open Graph/Twitter Cards e URLs canônicas reais.
- Revise `hreflang` quando o domínio definitivo existir.
- Rode o HTML no W3C Markup Validation Service.
- Teste teclado, foco, contraste, responsividade e leitor de tela.

## Observação sobre W3C

O projeto usa HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`), `lang`, textos alternativos, botões com estado ARIA e navegação por teclado. Ainda assim, validação final deve ser feita depois de inserir o conteúdo real e os URLs reais.
