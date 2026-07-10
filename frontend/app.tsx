import { useState } from "react";

const posts = [
  {
    id: 1,
    phase: "Abertura",
    tag: "Manifesto",
    title: "Estou documentando minha transição para backend — e não vou fingir que já sei tudo",
    hook: "Tenho base em frontend. Trabalho com QA. E estou construindo minha carreira em backend do zero — de forma pública.",
    body: `Durante o estágio em QA, percebi algo que mudou minha perspectiva: entender como o sistema falha te ensina como ele deveria funcionar.

Comecei a querer construir esses sistemas, não só testá-los.

Então decidi estruturar meu aprendizado em backend de forma organizada — e documentar cada etapa aqui.

O roteiro que traçei:
→ Fundamentos de HTTP, arquitetura e lógica de servidor
→ Construção de APIs REST
→ Banco de dados (relacional e não-relacional)
→ Autenticação e autorização
→ Testes e qualidade
→ Arquitetura, deploy e escalabilidade

Não vou postar conteúdo de guru. Vou postar o que estou aprendendo, errando e ajustando.

Se você também está nessa transição — ou curioso sobre como isso funciona na prática — me acompanha nessa série.`,
    cta: "Salva esse post. O próximo já vem com código.",
    tips: ["Apresente quem você é em 2 linhas", "O QA como diferencial narrativo é ouro — use isso", "Termine com curiosidade, não com promessa vaga"],
    format: "Texto corrido com lista estruturada",
    emoji: "🚀"
  },
  {
    id: 2,
    phase: "Fundamentos",
    tag: "Conceito",
    title: "O que acontece quando você faz uma requisição HTTP? Eu precisava entender isso antes de codar.",
    hook: "Antes de criar minha primeira API, precisei entender o que acontece entre o cliente e o servidor.",
    body: `Parece básico — mas se você não entende o ciclo de uma requisição HTTP, vai debugar no escuro.

O que estudei:
→ Métodos HTTP (GET, POST, PUT, DELETE e quando usar cada um)
→ Status codes e o que eles realmente significam
→ Headers: o que vai na requisição, o que volta na resposta
→ O conceito de stateless e por que isso importa

Um insight que me fez clicar:

No frontend eu sempre consumia APIs. Agora estou do outro lado — definindo o contrato que o frontend vai consumir.

Essa virada de perspectiva muda como você pensa o sistema inteiro.

[Diagrama simples: Cliente → Request → Server → Response]

Próximo post: vou mostrar minha primeira API funcionando — e o primeiro erro que tive que resolver.`,
    cta: "Você entende HTTP de verdade ou só sabe fazer fetch()?",
    tips: ["Diagramas simples performam bem no LinkedIn", "A virada de perspectiva (consumidor → produtor) é um gancho emocional forte", "Perguntas no final geram comentários reais"],
    format: "Educativo com narrativa pessoal",
    emoji: "🔄"
  },
  {
    id: 3,
    phase: "API na prática",
    tag: "Projeto",
    title: "Criei minha primeira API REST. Aqui está o que aprendi — e o que errei.",
    hook: "Minha primeira API estava 'funcionando'. Mas quando olhei o código depois de dois dias, não entendi nada do que eu mesmo escrevi.",
    body: `Isso me forçou a aprender sobre organização de projeto.

O que reestruturei:
→ Separar rotas, controllers e services
→ Entender a responsabilidade de cada camada
→ Nomear variáveis e funções de forma que o código se explique

Antes:
[Bloco de código: tudo numa função gigante]

Depois:
[Bloco de código: routes → controller → service]

O erro mais idiota que cometi: deixar regra de negócio dentro da rota.
Parece pequeno. Mas quando o projeto cresce, isso vira caos.

Minha experiência em QA ajudou aqui: quando você testa sistemas bagunçados, aprende rápido o valor de código previsível.`,
    cta: "Qual foi o primeiro erro de arquitetura que você cometeu?",
    tips: ["Código real (mesmo que simples) aumenta muito a credibilidade", "Erros relatáveis geram identificação — não tenha medo de mostrar", "A ponte com QA mantém sua narrativa única"],
    format: "Antes/depois com código",
    emoji: "⚙️"
  },
  {
    id: 4,
    phase: "Banco de Dados",
    tag: "Conceito + Prática",
    title: "Quando usar SQL e quando usar NoSQL? Parei de adivinhar e fui entender de verdade.",
    hook: "A pergunta não é qual é melhor. É qual resolve o seu problema.",
    body: `Estudei os dois — e apliquei os dois em projetos pequenos para sentir a diferença.

SQL (PostgreSQL):
→ Dados com relacionamentos claros
→ Consistência é prioridade
→ Queries complexas com joins

NoSQL (MongoDB):
→ Dados flexíveis ou sem esquema fixo
→ Escala horizontal mais natural
→ Leitura rápida de documentos completos

O que aprendi modelando na prática:
→ Pensar nas entidades antes de codar
→ Entender cardinalidade (1:1, 1:N, N:N)
→ ORM simplifica — mas você precisa entender SQL antes de depender dele

O insight que ficou: banco de dados não é detalhe de implementação. É decisão de arquitetura.`,
    cta: "Você já tomou uma decisão errada de banco que custou caro depois?",
    tips: ["Comparações práticas sempre performam", "Dê sua opinião — não seja neutro demais", "Mencionar ORM abre discussão rica nos comentários"],
    format: "Comparativo estruturado",
    emoji: "🗄️"
  },
  {
    id: 5,
    phase: "Autenticação",
    tag: "Projeto",
    title: "Implementei autenticação com JWT. Aqui está o que eu não entendia antes de codar.",
    hook: "Todo mundo fala em JWT. Mas eu precisava entender o que está dentro desse token antes de usar.",
    body: `O que aprendi antes de implementar:
→ O token tem 3 partes: header, payload, signature
→ O servidor não armazena sessão — ele valida o token
→ O segredo de assinatura é tudo — se vazar, acabou

O fluxo que construí:
[Diagrama: Login → Token gerado → Enviado no header → Middleware valida → Acesso liberado]

Erros que cometi:
→ Guardar informação sensível no payload (qualquer um pode decodificar)
→ Não definir expiração do token
→ Não entender a diferença entre autenticação e autorização

Esse último ponto é o que mais vejo confundido:
Autenticação = quem você é
Autorização = o que você pode fazer

No middleware, os dois precisam estar claros.`,
    cta: "Você já viu token sem expiração em produção? Me conta.",
    tips: ["Diagrama de fluxo de autenticação é muito compartilhado", "Erros de segurança geram engajamento alto", "Distinção autenticação/autorização é clássica mas sempre relevante"],
    format: "Conceito + fluxo + erros reais",
    emoji: "🔐"
  },
  {
    id: 6,
    phase: "Testes",
    tag: "Perspectiva",
    title: "Trabalho com QA. E isso mudou completamente como escrevo código de backend.",
    hook: "Quando você já testou código mal escrito, você nunca mais quer ser o autor desse código.",
    body: `Essa é talvez a vantagem mais subestimada de vir da área de qualidade.

O que muda na prática:
→ Penso em casos de borda antes de codar
→ Nomeio funções pensando no que elas testam
→ Evito efeitos colaterais porque sei o inferno que causam

O que estou aprendendo agora:
→ Testes unitários: validar funções isoladas
→ Testes de integração: validar o sistema funcionando junto
→ Como mockar dependências externas

A virada de mentalidade:
Teste não é fase final. Teste é parte do design.

Se você não consegue testar sua função, provavelmente ela faz coisa demais.`,
    cta: "Você escreve testes antes ou depois do código?",
    tips: ["Essa é a sua vantagem competitiva narrativa — explore fundo", "A frase 'teste é parte do design' é memorável e verdadeira", "Pode gerar um debate real nos comentários (TDD vs não TDD)"],
    format: "Perspectiva pessoal + técnico",
    emoji: "🧪"
  },
  {
    id: 7,
    phase: "Reflexão",
    tag: "Marco",
    title: "X semanas aprendendo backend em público. O que mudou na minha forma de pensar.",
    hook: "Não virei engenheiro backend. Mas virei alguém que pensa como engenheiro.",
    body: `O que aprendi que vai além do técnico:

→ Documentar força você a entender melhor
→ Errar em público tira o medo de errar em privado
→ Código é comunicação — escreva para o próximo dev, não para o compilador

O que ainda está pela frente:
→ Arquitetura de microsserviços
→ Deploy e CI/CD
→ Escalabilidade e observabilidade

O que não muda:
→ Aprendizado contínuo
→ Construir projetos reais, não só tutoriais
→ Trazer minha visão de qualidade para cada linha de código

Se você está no começo de uma transição parecida: o melhor momento para começar foi ontem. O segundo melhor é agora.`,
    cta: "Me conta: qual é o próximo passo da sua transição de carreira?",
    tips: ["Posts de reflexão têm alto engajamento e são fáceis de escrever", "Seja honesto sobre o que ainda não sabe — isso gera confiança", "Termine com uma pergunta que convida a história do outro"],
    format: "Reflexão + próximos passos",
    emoji: "📈"
  }
];

const phaseColors = {
  "Abertura": { bg: "#0f172a", accent: "#38bdf8", light: "#e0f2fe" },
  "Fundamentos": { bg: "#1e1b4b", accent: "#a78bfa", light: "#ede9fe" },
  "API na prática": { bg: "#0c1a12", accent: "#4ade80", light: "#dcfce7" },
  "Banco de Dados": { bg: "#1c1008", accent: "#fb923c", light: "#ffedd5" },
  "Autenticação": { bg: "#0f0a1e", accent: "#e879f9", light: "#fae8ff" },
  "Testes": { bg: "#0a1628", accent: "#60a5fa", light: "#dbeafe" },
  "Reflexão": { bg: "#111827", accent: "#fbbf24", light: "#fef3c7" },
};

export default function LinkedInStrategy() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("post");
  const post = posts[selected];
  const colors = phaseColors[post.phase];

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      minHeight: "100vh",
      background: "#0d1117",
      color: "#e6edf3",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        padding: "28px 32px 20px",
        borderBottom: "1px solid #21262d",
        background: "#0d1117",
      }}>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: 11, letterSpacing: 4, color: "#8b949e", textTransform: "uppercase", marginBottom: 8 }}>
          Estratégia de Conteúdo
        </div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#f0f6fc", letterSpacing: -0.5 }}>
          Da QA ao Backend
        </h1>
        <div style={{ fontSize: 13, color: "#8b949e", marginTop: 4 }}>
          7 posts · Série progressiva para LinkedIn
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{
          width: 220,
          borderRight: "1px solid #21262d",
          padding: "16px 0",
          overflowY: "auto",
          flexShrink: 0,
        }}>
          {posts.map((p, i) => {
            const c = phaseColors[p.phase];
            const active = i === selected;
            return (
              <button
                key={p.id}
                onClick={() => { setSelected(i); setTab("post"); }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: active ? "#161b22" : "transparent",
                  border: "none",
                  borderLeft: active ? `3px solid ${c.accent}` : "3px solid transparent",
                  padding: "12px 16px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 16 }}>{p.emoji}</span>
                  <span style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    color: c.accent,
                    background: `${c.accent}18`,
                    padding: "2px 6px",
                    borderRadius: 4,
                    letterSpacing: 1,
                  }}>
                    #{p.id}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: active ? "#f0f6fc" : "#8b949e", lineHeight: 1.4, fontFamily: "system-ui, sans-serif" }}>
                  {p.phase}
                </div>
                <div style={{ fontSize: 10, color: c.accent, marginTop: 2, fontFamily: "system-ui, sans-serif" }}>
                  {p.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {/* Phase badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 24 }}>{post.emoji}</span>
            <div>
              <div style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: colors.accent,
                fontFamily: "system-ui, sans-serif",
                marginBottom: 2,
              }}>
                Post {post.id} · {post.phase}
              </div>
              <div style={{
                fontSize: 10,
                color: "#8b949e",
                fontFamily: "system-ui, sans-serif",
                background: `${colors.accent}15`,
                padding: "2px 8px",
                borderRadius: 20,
                display: "inline-block",
              }}>
                {post.format}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid #21262d", paddingBottom: 0 }}>
            {["post", "dicas"].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: tab === t ? `2px solid ${colors.accent}` : "2px solid transparent",
                  color: tab === t ? colors.accent : "#8b949e",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "system-ui, sans-serif",
                  textTransform: "capitalize",
                  marginBottom: -1,
                  transition: "all 0.15s",
                }}
              >
                {t === "post" ? "📝 Rascunho do Post" : "💡 Dicas de Produção"}
              </button>
            ))}
          </div>

          {tab === "post" && (
            <div>
              {/* LinkedIn card mock */}
              <div style={{
                background: "#161b22",
                border: "1px solid #30363d",
                borderRadius: 12,
                overflow: "hidden",
                maxWidth: 600,
              }}>
                {/* Profile bar */}
                <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #21262d", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.accent}, #8b949e)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, flexShrink: 0,
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f6fc", fontFamily: "system-ui" }}>Você</div>
                    <div style={{ fontSize: 12, color: "#8b949e", fontFamily: "system-ui" }}>Estagiário QA → Backend Developer</div>
                  </div>
                  <div style={{
                    marginLeft: "auto",
                    fontSize: 10,
                    color: colors.accent,
                    fontFamily: "system-ui",
                    background: `${colors.accent}18`,
                    padding: "3px 8px",
                    borderRadius: 20,
                  }}>
                    LinkedIn
                  </div>
                </div>

                {/* Post content */}
                <div style={{ padding: "20px" }}>
                  {/* Hook */}
                  <div style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#f0f6fc",
                    lineHeight: 1.5,
                    marginBottom: 16,
                    fontFamily: "system-ui, sans-serif",
                    borderLeft: `3px solid ${colors.accent}`,
                    paddingLeft: 12,
                  }}>
                    {post.hook}
                  </div>

                  {/* Body */}
                  <div style={{
                    fontSize: 14,
                    color: "#c9d1d9",
                    lineHeight: 1.75,
                    whiteSpace: "pre-line",
                    fontFamily: "system-ui, sans-serif",
                    marginBottom: 16,
                  }}>
                    {post.body}
                  </div>

                  {/* CTA */}
                  <div style={{
                    background: `${colors.accent}12`,
                    border: `1px solid ${colors.accent}30`,
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontSize: 13,
                    color: colors.accent,
                    fontFamily: "system-ui, sans-serif",
                    fontStyle: "italic",
                  }}>
                    💬 {post.cta}
                  </div>
                </div>
              </div>

              {/* Title reference */}
              <div style={{
                marginTop: 16,
                padding: "12px 16px",
                background: "#161b22",
                border: "1px solid #30363d",
                borderRadius: 8,
                maxWidth: 600,
              }}>
                <div style={{ fontSize: 10, color: "#8b949e", fontFamily: "system-ui", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
                  Título sugerido
                </div>
                <div style={{ fontSize: 13, color: "#f0f6fc", fontFamily: "system-ui", lineHeight: 1.5 }}>
                  {post.title}
                </div>
              </div>
            </div>
          )}

          {tab === "dicas" && (
            <div style={{ maxWidth: 600 }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#8b949e", fontFamily: "system-ui", marginBottom: 12 }}>
                  Dicas de produção para esse post
                </div>
                {post.tips.map((tip, i) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: 12,
                    padding: "14px 16px",
                    background: "#161b22",
                    border: "1px solid #30363d",
                    borderRadius: 8,
                    marginBottom: 8,
                    alignItems: "flex-start",
                  }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: `${colors.accent}20`,
                      color: colors.accent,
                      fontSize: 11,
                      fontFamily: "monospace",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1,
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ fontSize: 13, color: "#c9d1d9", lineHeight: 1.6, fontFamily: "system-ui" }}>
                      {tip}
                    </div>
                  </div>
                ))}
              </div>

              {/* Best practices global */}
              <div style={{
                padding: "16px",
                background: `${colors.accent}08`,
                border: `1px solid ${colors.accent}25`,
                borderRadius: 10,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: colors.accent, fontFamily: "system-ui", marginBottom: 10 }}>
                  Boas práticas gerais da série
                </div>
                {[
                  "Poste 1–2x por semana para manter consistência sem esgotamento",
                  "Sempre termine com uma pergunta aberta — gera comentários reais",
                  "Mostre código quando possível, mesmo que simples",
                  "Não espere o post ficar perfeito — feito é melhor que perfeito",
                  "Responda todos os comentários nas primeiras 2h (o algoritmo ama)",
                ].map((tip, i) => (
                  <div key={i} style={{
                    fontSize: 12,
                    color: "#8b949e",
                    fontFamily: "system-ui",
                    lineHeight: 1.6,
                    paddingBottom: 6,
                    marginBottom: 6,
                    borderBottom: i < 4 ? "1px solid #21262d" : "none",
                  }}>
                    → {tip}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer nav */}
      <div style={{
        padding: "14px 28px",
        borderTop: "1px solid #21262d",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#0d1117",
      }}>
        <button
          onClick={() => setSelected(Math.max(0, selected - 1))}
          disabled={selected === 0}
          style={{
            background: "transparent",
            border: "1px solid #30363d",
            color: selected === 0 ? "#30363d" : "#8b949e",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: selected === 0 ? "not-allowed" : "pointer",
            fontSize: 13,
            fontFamily: "system-ui",
          }}
        >
          ← Anterior
        </button>
        <div style={{ fontSize: 12, color: "#8b949e", fontFamily: "system-ui" }}>
          {selected + 1} / {posts.length}
        </div>
        <button
          onClick={() => setSelected(Math.min(posts.length - 1, selected + 1))}
          disabled={selected === posts.length - 1}
          style={{
            background: phaseColors[posts[Math.min(posts.length - 1, selected + 1)].phase].accent,
            border: "none",
            color: "#0d1117",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: selected === posts.length - 1 ? "not-allowed" : "pointer",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "system-ui",
            opacity: selected === posts.length - 1 ? 0.3 : 1,
          }}
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}