# 🌿 Leud'Art — Cestas & Mimos Personalizados

> Boutique digital e vitrine artesanal de alto padrão com conversão direta via WhatsApp, catálogo dinâmico de produtos e Painel VIP exclusivo para a proprietária.

---

## 🌟 Visão Geral do Projeto

A **Leud'Art** é uma marca de artesanato do Ceará focada na criação de cestas afetivas e mimos sob medida para datas comemorativas, presentes corporativos e lembranças de momentos marcantes.

Este projeto foi construído para aliar **sofisticação estética** (tipografia nobre, paleta de cores terrosas e quentes, acabamento editorial) à **máxima conversão comercial**, integrando todas as intenções de compra diretamente ao WhatsApp oficial da proprietária **(88) 99928-7029**.

---

## 🚀 Como Fazer Deploy na Vercel em 1 Clique

O projeto foi estruturado com arquitetura global de ponta (Edge CDN) sem dependência de servidores locais, bancos locais ou localhost hardcoded.

### Passo a Passo para Publicação:

1. **Envie o código para o seu GitHub / GitLab:**
   ```bash
   git init
   git add .
   git commit -m "feat: site oficial Leud'Art pronto para producao"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/leudart.git
   git push -u origin main
   ```

2. **Conecte o repositório na [Vercel](https://vercel.com):**
   - Acesse o painel da Vercel e clique em **"Add New Project"** -> **"Import Git Repository"**.
   - Selecione o repositório `leudart`.

3. **Configurações de Build (já detectadas automaticamente pelo `vercel.json`):**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Variáveis de Ambiente (Opcional):**
   - No painel da Vercel em *Environment Variables*, você pode definir as variáveis baseadas no `.env.example`:
     - `VITE_WHATSAPP_NUMBER`: `5588999287029`
     - `VITE_ADMIN_EMAIL`: `arleuda.marte@gmail.com`
     - `VITE_APP_URL`: `https://leudart.vercel.app`

5. **Clique em "Deploy":**
   - Em menos de 1 minuto, seu site estará no ar globalmente com HTTPS gratuito e CDN de alta velocidade.

---

## 💻 Como Rodar Localmente para Testes e Desenvolvimento

### Pré-requisitos:
- Node.js versão 18 ou superior
- Gerenciador de pacotes npm

### Comandos:
```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Executar o servidor de desenvolvimento local
npm run dev

# 3. Compilar para produção e verificar tipos
npm run build

# 4. Pré-visualizar a compilação de produção
npm run preview
```

---

## 🛡️ Arquitetura de Acessos & Painel VIP da Proprietária

O sistema conta com controle de acesso baseado em papéis (RBAC):

| Perfil | Permissões |
|---|---|
| **Visitante** | Navega por todas as páginas, pesquisa e filtra cestas, abre detalhes, personaliza pedidos e entra em contato via WhatsApp. Pode se cadastrar. |
| **Cliente Cadastrado** | Login com e-mail e senha, acesso à área "Minha Conta", lista de mimos favoritos salvos. Não tem permissão para alterar produtos. |
| **Proprietária VIP** | Acesso irrestrito ao **Painel VIP (`/admin`)**. Pode criar novos produtos com upload de foto e preview, editar valores (R$), descrições e itens inclusos, excluir produtos e restaurar o catálogo. |

### Como acessar como Proprietária VIP:
1. No menu superior, clique em **"Entrar"**.
2. Digite o e-mail oficial da proprietária: `arleuda.marte@gmail.com` e sua senha de acesso.
3. O sistema concederá o papel administrativo e o botão de destaque **"Painel VIP Proprietária"** surgirá na navegação (ou acesse diretamente pelo link `/admin`).

---

## 🎨 Identidade Visual & Design

- **Tipografia:** Par harmonioso com *Cormorant Garamond* (serifa editorial elegante para o nome da marca e títulos) e *Plus Jakarta Sans* (sans-serif moderna de alta legibilidade).
- **Paleta de Cores:**
  - Base Neutra: Off-white cremoso `#FAF8F5` e linho `#F5EFEB`
  - Terracota Nobre: `#9B543D` e bronze `#854432`
  - Acentos: Dourado antigo `#E0A93B` e verde folha de oliveira `#556B2F`
  - WhatsApp Oficial: `#25D366`
- **Zero-Pill Discipline:** Metadados limpos com separadores tipográficos sutis (`·`), sem excesso de selos e cards aninhados.
- **Responsividade:** 100% otimizado para celulares, tablets e desktops (Mobile-First).

---

## 📱 Contato Oficial

- **Proprietária:** Dona Arleuda
- **WhatsApp Direto:** [(88) 99928-7029](https://wa.me/5588999287029)
- **Localização:** Ceará, Brasil
