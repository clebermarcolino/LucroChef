const ingredientesIniciais = [
  { nome: "Massa",     aM: 0.5, aC: 0.5,  estoque: 10 },
  { nome: "Queijo",    aM: 0.3, aC: 0.2,  estoque: 5  },
  { nome: "Molho",     aM: 0.2, aC: 0.2,  estoque: 4  },
  { nome: "Calabresa", aM: 0,   aC: 0.15, estoque: 2  }
];

const corpoTabela = document.getElementById('corpoTabela');

function addLinhaIngrediente(ing) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" class="nome-input" value="${ing.nome}"></td>
    <td><input type="number" class="aM-input" value="${ing.aM}" step="0.01"></td>
    <td><input type="number" class="aC-input" value="${ing.aC}" step="0.01"></td>
    <td><input type="number" class="estoque-input" value="${ing.estoque}" step="0.01"></td>
  `;
  corpoTabela.appendChild(tr);
}

ingredientesIniciais.forEach(addLinhaIngrediente);

function getIngredientes() {
  const linhas = corpoTabela.querySelectorAll('tr');
  const lista = [];
  linhas.forEach(tr => {
    lista.push({
      nome: tr.querySelector('.nome-input').value,
      aM: parseFloat(tr.querySelector('.aM-input').value) || 0,
      aC: parseFloat(tr.querySelector('.aC-input').value) || 0,
      estoque: parseFloat(tr.querySelector('.estoque-input').value) || 0
    });
  });
  return lista;
}

function resolverPL() {
  const lucroM = parseFloat(document.getElementById('lucroM').value) || 0;
  const lucroC = parseFloat(document.getElementById('lucroC').value) || 0;
  const ingredientes = getIngredientes();

  const linhas = ingredientes.map(i => ({ a: i.aM, b: i.aC, c: i.estoque }));
  linhas.push({ a: 1, b: 0, c: 0 }); 
  linhas.push({ a: 0, b: 1, c: 0 });

  const candidatos = [[0, 0]];

  for (let i = 0; i < linhas.length; i++) {
    for (let j = i + 1; j < linhas.length; j++) {
      const A = linhas[i], B = linhas[j];
      const det = A.a * B.b - B.a * A.b;
      if (Math.abs(det) < 1e-9) continue;
      const x = (A.c * B.b - B.c * A.b) / det;
      const y = (A.a * B.c - B.a * A.c) / det;
      if (x >= -1e-7 && y >= -1e-7) {
        candidatos.push([Math.max(0, x), Math.max(0, y)]);
      }
    }
  }

  const factiveis = candidatos.filter(([x, y]) =>
    ingredientes.every(ing => ing.aM * x + ing.aC * y <= ing.estoque + 1e-6)
  );

  let melhor = null;
  const avaliados = [];
  for (const [x, y] of factiveis) {
    const z = lucroM * x + lucroC * y;
    avaliados.push({ x, y, z });
    if (!melhor || z > melhor.z + 1e-9) melhor = { x, y, z };
  }

  return { melhor, avaliados, ingredientes };
}

function renderizar() {
  const { melhor, avaliados, ingredientes } = resolverPL();
  document.getElementById('cardResultado').style.display = 'block';

  if (!melhor) {
    document.getElementById('resX').textContent = '-';
    document.getElementById('resY').textContent = '-';
    document.getElementById('resZ').textContent = '-';
    document.getElementById('usoEstoque').innerHTML = '<p>Nenhuma solução factível.</p>';
    document.getElementById('corpoVertices').innerHTML = '';
    return;
  }

  document.getElementById('resX').textContent = melhor.x.toFixed(2);
  document.getElementById('resY').textContent = melhor.y.toFixed(2);
  document.getElementById('resZ').textContent = melhor.z.toFixed(2);

  const usoDiv = document.getElementById('usoEstoque');
  usoDiv.innerHTML = ingredientes.map(ing => {
    const uso = ing.aM * melhor.x + ing.aC * melhor.y;
    const pct = ing.estoque > 0 ? Math.min((uso / ing.estoque) * 100, 100) : 0;
    return `
      <div class="uso-item">
        <div class="uso-label">
          <span>${ing.nome}</span>
          <span>${uso.toFixed(2)} / ${ing.estoque} kg</span>
        </div>
        <div class="uso-bar-bg"><div class="uso-bar-fill" style="width:${pct.toFixed(1)}%;"></div></div>
      </div>
    `;
  }).join('');

  const corpoVertices = document.getElementById('corpoVertices');
  const vistos = new Set();
  const unicos = avaliados.filter(v => {
    const chave = v.x.toFixed(4) + '_' + v.y.toFixed(4);
    if (vistos.has(chave)) return false;
    vistos.add(chave);
    return true;
  });
  unicos.sort((a, b) => b.z - a.z);

  corpoVertices.innerHTML = unicos.map(v => {
    const isOtimo = Math.abs(v.x - melhor.x) < 1e-6 && Math.abs(v.y - melhor.y) < 1e-6;
    return `<tr class="${isOtimo ? 'otimo' : ''}"><td>${v.x.toFixed(2)}</td><td>${v.y.toFixed(2)}</td><td>${v.z.toFixed(2)}</td></tr>`;
  }).join('');
}

document.getElementById('calcularBtn').addEventListener('click', renderizar);