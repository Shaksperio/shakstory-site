# Shakstory — site comercial independente

Landing page onepage responsiva e estática do Shakstory. **Não faz parte do código do aplicativo** e não possui acesso a manuscritos, banco de dados, login ou APIs privadas.

## Publicação recomendada (repositório separado)

1. No GitHub, crie um repositório público novo chamado `shakstory-site` sob o usuário `Shaksperio` (não reutilize `Shakstory2`).
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório novo, incluindo `.github/workflows/pages.yml`.
3. Em **Settings → Pages → Build and deployment**, escolha **GitHub Actions**.
4. Faça push para `main` ou acione manualmente o workflow `Publicar site comercial no GitHub Pages`.
5. Após sucesso, o endereço esperado é `https://shaksperio.github.io/shakstory-site/` (caso o repositório receba exatamente esse nome).

## Links existentes

- Editor (modo contingência): `https://shaksperio.github.io/Shakstory2/`
- Econômico (Ton): `https://payment-link-v3.ton.com.br/pl_Qyb50EZoXMYnqbNTepS6qdxGVJjpg37P`
- Premium (Ton): `https://payment-link-v3.ton.com.br/pl_kDm9pl62Jd4aKwxCvpsPYGXRPNjM5QWb`
- VIP (Ton): `https://payment-link-v3.ton.com.br/pl_wDnyeqQM0rPBzPVHjfK6RjgWb3Ya19Xl`

Os **preços e recursos por plano ainda exigem confirmação comercial**; esta página deliberadamente não inventa valores nem funcionalidades exclusivas. A ativação após a compra depende de confirmação do pagamento. O link de experimentar abre o editor existente, e a disponibilidade/limites do teste seguem o aplicativo — esta landing page não implementa teste gratuito novo nem autenticação.

## Conteúdo e privacidade

Os mockups do editor e da Cowila são **ilustrações conceituais em HTML/CSS**, não capturas reais ou promessas de resultados da IA. Não há coleta de dados, formulários ou scripts de terceiros além do carregamento opcional de fontes pelo Google Fonts. Para eliminar essa requisição externa, remova o `@import` de `styles.css`; fontes locais de fallback continuarão funcionando.

## Executar localmente

Abra `index.html` no navegador ou execute `python3 -m http.server 8080` nesta pasta.

## Revisão antes de divulgar

Confirme se a experiência gratuita está disponível ao público e seus limites, verifique os três checkouts Ton e sua moeda/valor, revise as condições comerciais e documentos legais, e teste o fluxo de ativação do acesso após confirmação manual no Ton.
