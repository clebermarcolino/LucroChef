# LucroChef

🔗 **Acesse o projeto online:** [https://lucrochef.netlify.app/](https://lucrochef.netlify.app/)

Aplicação web simples para resolver um problema de **Programação Linear Inteira (PLI)**: dado um estoque de ingredientes, calcular quantas pizzas de muçarela e calabresa devem ser produzidas para **maximizar o lucro**.

## 🎯 Sobre o projeto

Este projeto resolve o seguinte problema de otimização:

> Uma pizzaria produz pizzas de muçarela (lucro de R$ 20,00/unidade) e calabresa (lucro de R$ 25,00/unidade). Cada pizza consome uma quantidade fixa de massa, queijo, molho e calabresa. Dado o estoque disponível de cada ingrediente, quantas pizzas de cada sabor devem ser produzidas para maximizar o lucro total?

### Modelo matemático

**Variáveis de decisão:**
- `X` = quantidade de pizzas de muçarela
- `Y` = quantidade de pizzas de calabresa

**Função objetivo:**
```
MAX Z = 20X + 25Y
```

**Restrições (estoque de ingredientes):**
```
0.5X + 0.5Y  ≤ Massa disponível
0.3X + 0.2Y  ≤ Queijo disponível
0.2X + 0.2Y  ≤ Molho disponível
0.15Y        ≤ Calabresa disponível
X, Y ≥ 0 e inteiros
```

## ⚙️ Como funciona

A aplicação resolve o problema em duas etapas:

1. **Relaxação contínua (PL):** encontra todos os vértices da região factível (interseções entre as restrições e os eixos) e calcula o lucro `Z` em cada um, identificando o ótimo contínuo.
2. **Solução inteira (PLI):** como não é possível produzir fração de pizza, o sistema faz uma busca exaustiva por combinações inteiras de `X` e `Y` próximas ao ótimo contínuo, respeitando o estoque, e seleciona a de maior lucro.

O resultado exibido inclui:
- Quantidade ótima de pizzas de cada sabor
- Lucro máximo (R$)
- Uso percentual de cada ingrediente do estoque
- Tabela com todos os vértices avaliados na relaxação contínua (para fins didáticos)

## 🚀 Como usar

1. Abra o arquivo `index.html` em qualquer navegador moderno.
2. Informe o estoque disponível (em kg) de cada ingrediente: Massa, Queijo, Molho e Calabresa.
3. Clique em **Calcular**.
4. Veja a combinação ótima de pizzas, o lucro máximo e o uso do estoque.
5. Opcionalmente, expanda **"Ver formulação matemática e cálculo"** para visualizar o modelo de PL e a tabela de vértices.

Não é necessário nenhum servidor, build ou instalação — é uma aplicação 100% client-side.

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura da página
- **CSS3** — estilização, variáveis CSS (`:root`) para suporte a tema claro/escuro
- **JavaScript** — lógica de resolução do problema de programação linear

## 📁 Estrutura do projeto

```
.
├── index.html   # Estrutura da página e formulação matemática
├── style.css    # Estilos, paleta de cores e tema claro/escuro
└── index.js     # Lógica de resolução do PL/PLI
```

## 🎨 Funcionalidades

- Cálculo automático da combinação ótima de produção (PLI)
- Visualização do uso do estoque por ingrediente (barras de progresso)
- Explicação da formulação matemática do problema
- Tabela com todos os vértices da região factível avaliados
- Alternância entre tema claro e escuro
- Layout responsivo para desktop e mobile

## 📐 Parâmetros fixos do modelo

| Parâmetro | Muçarela (X) | Calabresa (Y) |
|---|---|---|
| Lucro por pizza | R$ 20,00 | R$ 25,00 |
| Consumo de massa | 0.5 kg | 0.5 kg |
| Consumo de queijo | 0.3 kg | 0.2 kg |
| Consumo de molho | 0.2 kg | 0.2 kg |
| Consumo de calabresa | 0 kg | 0.15 kg |

> Esses valores estão fixos no código (`index.js`), conforme o enunciado do problema. Apenas o estoque disponível de cada ingrediente é editável pelo usuário.

## 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais (disciplina de Sistema de Apoio a Gestão).
