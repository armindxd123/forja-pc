var WA = "59178878117"; /* WhatsApp con código de país (+591) */
var BASE = 280; /* ensamblaje en Bs */
var D = {
    cpu: { t: "Procesador", o: [["Ryzen 5 7600", "6 núcleos, ideal para 1080p", 1460, .88], ["Ryzen 7 7700", "8 núcleos, juego y streaming", 2090, .95], ["Ryzen 7 7800X3D", "El más rápido para jugar", 2780, 1]] },
    gpu: { t: "Tarjeta gráfica", o: [["RTX 4060 8 GB", "1080p fluido", 2090, [95, 65, 35], 550], ["RTX 4070 Super 12 GB", "1440p en alto", 4180, [145, 105, 60], 650], ["RTX 4080 Super 16 GB", "4K y trazado de rayos", 6960, [185, 140, 85], 750]] },
    ram: { t: "Memoria RAM DDR5", o: [["16 GB", "Suficiente para empezar", 420], ["32 GB", "Recomendada", 770], ["64 GB", "Edición y streaming", 1460]] },
    ssd: { t: "Almacenamiento NVMe", o: [["1 TB", "Sistema y varios juegos", 490], ["2 TB", "Biblioteca grande", 900], ["4 TB", "Sin borrar nada", 1810]] },
    cas: { t: "Gabinete", o: [["Malla con ventilación", "Máximo flujo de aire", 490], ["Vidrio templado ARGB", "Luces y vista interna", 700]] }
};
var P = {
    "Entrada": { n: "Entrada", d: "Para jugar a 1080p en alto sin gastar de más.", s: [0, 0, 0, 0, 0] },
    "Competitivo": { n: "Competitivo", d: "1440p y streaming con margen para años.", s: [1, 1, 1, 1, 1] },
    "Extremo": { n: "Extremo", d: "4K, trazado de rayos y todo al máximo.", s: [2, 2, 1, 2, 1] }
};
var SV = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">';
var IC = {
    cpu: SV + '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>',
    gpu: SV + '<rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="8" cy="12" r="2.5"/><circle cx="15" cy="12" r="2.5"/></svg>',
    ram: SV + '<rect x="2" y="8" width="20" height="8" rx="1"/><path d="M6 11v2M10 11v2M14 11v2M18 11v2M6 16v3M18 16v3"/></svg>',
    ssd: SV + '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 12h4M16 12h.01"/></svg>',
    cas: SV + '<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="8" r="3"/><circle cx="12" cy="16" r="2"/></svg>'
};
/* Imagen de cada producto, en el mismo orden que las opciones de arriba */
var IMGS = {
    cpu: ["procesador 1.webp", "procesador 2.webp", "procesador 3.webp"],
    gpu: ["gpu 1.webp", "gpu 2.webp", "gpu 3.webp"],
    ram: ["ram.webp", "ram 32.webp", "ram 64.webp"],
    ssd: ["ssd.webp", "ssd 2.webp", "ssd 4.webp"],
    cas: ["Malla con ventilación.webp", "Vidrio templado ARGB.webp"]
};
var COL = { "Entrada": "#22d3ee", "Competitivo": "#a78bfa", "Extremo": "#f0abfc" };
function pcIcon(c) {
    return '<svg class="pc" viewBox="0 0 200 150" role="img" aria-label="Ilustración de una PC gamer"><ellipse cx="100" cy="138" rx="56" ry="6" fill="' + c + '" opacity=".35"/><rect x="68" y="12" width="64" height="118" rx="7" fill="#0f0b24" stroke="' + c + '" stroke-width="2"/><circle cx="108" cy="40" r="11" fill="none" stroke="' + c + '" stroke-width="2.5"/><circle cx="108" cy="72" r="11" fill="none" stroke="' + c + '" stroke-width="2.5"/><circle cx="108" cy="104" r="11" fill="none" stroke="' + c + '" stroke-width="2.5"/><rect x="76" y="86" width="22" height="7" rx="2" fill="' + c + '" opacity=".7"/><rect x="76" y="30" width="14" height="14" rx="2" fill="none" stroke="' + c + '" opacity=".7"/></svg>';
}
var K = ["cpu", "gpu", "ram", "ssd", "cas"], sel = [1, 1, 1, 1, 1];
var $ = function (i) { return document.getElementById(i) };
function money(n) { return "Bs " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") }

function build() {
    var h = "";
    K.forEach(function (k, gi) {
        h += '<div class="grp" id="g-' + k + '"><h3>' + IC[k] + D[k].t + '</h3><div class="grp-row"><figure class="pimg"><img id="pi-' + k + '" src="' + encodeURI(IMGS[k][sel[gi]]) + '" alt="' + D[k].o[sel[gi]][0] + '"></figure><div class="opts" role="radiogroup" aria-label="' + D[k].t + '">';
        D[k].o.forEach(function (o, oi) {
            var id = k + oi;
            h += '<input type="radio" name="' + k + '" id="' + id + '" data-g="' + gi + '" data-o="' + oi + '"><label for="' + id + '"><em>' + money(o[2]) + '</em><b>' + o[0] + '</b><span>' + o[1] + '</span></label>';
        });
        h += '</div></div></div>';
    });
    $("groups").innerHTML = h;
    $("groups").addEventListener("change", function (e) {
        var t = e.target; sel[+t.dataset.g] = +t.dataset.o; render();
    });
    var pc = "", cd = "";
    Object.keys(P).forEach(function (k) {
        pc += '<button class="chip" data-p="' + k + '">' + P[k].n + '</button>';
        var tot = calc(P[k].s).total;
        cd += '<div class="card">' + pcIcon(COL[k]) + '<h3>' + P[k].n + '</h3><p>' + P[k].d + '</p><div class="pr">' + money(tot) + '</div><button class="chip" data-p="' + k + '">Personalizar esta PC</button></div>';
    });
    document.querySelector(".presets").innerHTML = pc;
    $("cards").innerHTML = cd;
    document.addEventListener("click", function (e) {
        var b = e.target.closest("[data-p]"); if (!b) return;
        sel = P[b.dataset.p].s.slice(); render();
        $("armar").scrollIntoView({ behavior: "smooth" });
    });
}

function calc(s) {
    var c = D.cpu.o[s[0]], g = D.gpu.o[s[1]], r = D.ram.o[s[2]], d = D.ssd.o[s[3]], k = D.cas.o[s[4]];
    var total = c[2] + g[2] + r[2] + d[2] + k[2] + BASE + (g[4] >= 750 ? 630 : g[4] >= 650 ? 490 : 380);
    var fps = g[3].map(function (v, i) { return Math.round(v * (i === 0 ? c[3] : i === 1 ? (c[3] + 1) / 2 : 1)) });
    return { c: c, g: g, r: r, d: d, k: k, total: total, fps: fps, w: g[4] };
}

function render() {
    K.forEach(function (k, gi) { var el = $(k + sel[gi]); if (el) el.checked = true; var im = $("pi-" + k); if (im) { im.src = encodeURI(IMGS[k][sel[gi]]); im.alt = D[k].o[sel[gi]][0] } });
    var x = calc(sel);
    $("list").innerHTML = [x.c, x.g, x.r, x.d, x.k].map(function (o, i) { return '<li><span>' + D[K[i]].t.replace(" DDR5", "") + '</span><b>' + o[0] + '</b></li>' }).join("");
    $("psu").textContent = "Fuente certificada de " + x.w + " W incluida";
    var lab = ["1080p", "1440p", "4K"];
    $("fps").innerHTML = '<b>FPS estimados en juegos AAA</b>' + x.fps.map(function (v, i) { return '<div><span>' + lab[i] + '</span><span class="bar"><i style="width:' + Math.min(100, v / 2.4) + '%"></i></span><b>' + v + ' FPS</b></div>' }).join("");
    $("total").textContent = money(x.total);
    document.querySelectorAll(".presets .chip").forEach(function (b) { b.classList.toggle("on", P[b.dataset.p].s.join() === sel.join()) });
    var msg = "Hola, quiero cotizar esta PC gamer: " + [x.c[0], x.g[0], x.r[0] + " RAM", x.d[0] + " NVMe", x.k[0]].join(", ") + ". Total estimado: " + money(x.total) + ".";
    $("wa").href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
}
build(); render();
/* precarga todas las imágenes para que el cambio sea instantáneo */
Object.keys(IMGS).forEach(function (k) { IMGS[k].forEach(function (f) { new Image().src = encodeURI(f) }) });

/* Menú desplegable: abre o cierra el submenú del botón pulsado */
function despliega(btn) {
    var li = btn.parentNode, abierto = li.classList.contains("open");
    cierraMenus();
    if (!abierto) { li.classList.add("open"); btn.setAttribute("aria-expanded", "true") }
}
function cierraMenus() {
    document.querySelectorAll(".has-sub.open").forEach(function (li) {
        li.classList.remove("open"); li.firstElementChild.setAttribute("aria-expanded", "false");
    });
}
document.addEventListener("click", function (e) { if (!e.target.closest(".has-sub") || e.target.closest(".sub a")) cierraMenus() });
document.addEventListener("keydown", function (e) { if (e.key === "Escape") cierraMenus() });