// Navegação compartilhada da wiki — Breathe and Live 1934
(function () {
  const NAV = [
    { title: "Início", items: [["index.html", "Página Inicial"]] },
    { title: "Fundamentos", items: [
      ["criacao-de-personagem.html", "Criação de Personagem"],
      ["atributos.html", "Atributos & Estatísticas"],
      ["habilidades.html", "Habilidades Iniciais"],
      ["combate.html", "Combate & Efeitos"],
    ]},
    { title: "Classes", items: [
      ["classes.html", "Escolhendo uma Classe"],
      ["espadachim.html", "Espadachim Caçador"],
      ["subclasses-espadachim.html", "Subclasses do Espadachim"],
      ["demonificacao.html", "Demonificação"],
      ["kakushi.html", "Kakushi"],
      ["demonio.html", "Demônio"],
      ["multiclasse.html", "Multiclasse"],
    ]},
    { title: "Respirações — Canônicas", items: [
      ["respiracoes.html", "Visão Geral & Regras"],
      ["respiracao-sol.html", "Respiração do Sol"],
      ["respiracao-lua.html", "Respiração da Lua"],
      ["respiracao-chamas.html", "Respiração das Chamas"],
      ["respiracao-agua.html", "Respiração da Água"],
      ["respiracao-vento.html", "Respiração do Vento"],
      ["respiracao-trovao.html", "Respiração do Trovão"],
      ["respiracao-pedra.html", "Respiração da Pedra"],
      ["respiracao-flor.html", "Respiração da Flor"],
      ["respiracao-nevoa.html", "Respiração da Névoa"],
      ["respiracao-serpente.html", "Respiração da Serpente"],
      ["respiracao-som.html", "Respiração do Som"],
      ["respiracao-inseto.html", "Respiração do Inseto"],
      ["respiracao-amor.html", "Respiração do Amor"],
      ["respiracao-fera.html", "Respiração da Fera"],
    ]},
    { title: "Respirações — Módulo", items: [
      ["respiracao-oceano.html", "Respiração do Oceano"],
      ["respiracao-oeste.html", "Respiração do Oeste"],
      ["respiracao-neve.html", "Respiração da Neve"],
    ]},
    { title: "Respirações — Limiar Crescente", items: [
      ["respiracao-dragoes-gemeos.html", "Dragões Gêmeos"],
      ["respiracao-constelacoes.html", "Constelações"],
      ["respiracao-escuridao.html", "Escuridão"],
      ["respiracao-espiritos.html", "Espíritos"],
      ["respiracao-gelo.html", "Gelo"],
      ["respiracao-luz.html", "Luz"],
      ["respiracao-montanha.html", "Montanha"],
      ["respiracao-nevasca.html", "Nevasca"],
      ["respiracao-profana.html", "Profana"],
      ["respiracao-yin.html", "Yin"],
      ["respiracao-yang.html", "Yang"],
    ]},
    { title: "Progressão", items: [
      ["evolucao.html", "Evolução & Perícias"],
      ["habilidades-superiores.html", "Habilidades Superiores"],
    ]},
    { title: "Equipamento", items: [
      ["armas.html", "Armas"],
      ["equipamentos.html", "Itens, Medicina & Serviços"],
    ]},
    { title: "O Mundo de 1934", items: [
      ["mundo.html", "Cenário & História"],
      ["npcs.html", "NPCs & Inimigos"],
    ]},
  ];

  const here = location.pathname.split("/").pop() || "index.html";
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  let html = `<a class="brand" href="index.html"><img src="img/logo.png" alt="Logo Breathe and Live"><span>Breathe and Live 1934<small>Wiki · RPG de Mesa de Demon Slayer</small></span></a>`;
  html += `<input type="search" id="navsearch" placeholder="Filtrar páginas…" aria-label="Filtrar páginas">`;
  for (const sec of NAV) {
    const hasCurrent = sec.items.some(([href]) => href === here);
    html += `<details class="nav-sec"${hasCurrent ? " open" : ""}><summary>${sec.title} <span class="count">${sec.items.length}</span></summary><ul>`;
    for (const [href, label] of sec.items) {
      const cur = href === here ? ' class="current"' : "";
      html += `<li><a href="${href}"${cur}>${label}</a></li>`;
    }
    html += `</ul></details>`;
  }
  sidebar.innerHTML = html;

  // Rodapé de créditos em todas as páginas
  const main = document.querySelector("main");
  if (main && !main.querySelector(".site-footer")) {
    const foot = document.createElement("footer");
    foot.className = "site-footer";
    foot.innerHTML =
      `<p><b>Breathe and Live 1934 — Demon Slayer Tabletop System</b> · criado por Nautilus, com emendas de SunlightYellow. ` +
      `<a href="livro-original.pdf" target="_blank" rel="noopener">📖 Livro original (PDF, em inglês)</a></p>` +
      `<p>Tradução feita com o auxílio de IA generativa por <a href="https://github.com/dehrangerz9" target="_blank" rel="noopener">@yume fernandes</a>. ` +
      `Respirações do Limiar Crescente adaptadas de <i>RPG Limiar Crescente — Livro de Respirações</i> (Mateus "Saga" Lopes & Gabriel "Buda" Barbosa). ` +
      `Obra de fãs, sem afiliação oficial com Koyoharu Gotouge, Shueisha ou Ufotable.</p>`;
    main.appendChild(foot);
  }

  const sections = [...sidebar.querySelectorAll("details.nav-sec")];
  const defaultOpen = sections.map(d => d.open);

  const input = document.getElementById("navsearch");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      // restaura o estado padrão: só a seção da página atual aberta
      sections.forEach((d, i) => {
        d.style.display = "";
        d.open = defaultOpen[i];
        d.querySelectorAll("li").forEach(li => (li.style.display = ""));
      });
      return;
    }
    sections.forEach(d => {
      let any = false;
      d.querySelectorAll("li").forEach(li => {
        const hit = li.textContent.toLowerCase().includes(q);
        li.style.display = hit ? "" : "none";
        if (hit) any = true;
      });
      d.style.display = any ? "" : "none";
      d.open = any; // expande as seções com resultados
    });
  });
})();
