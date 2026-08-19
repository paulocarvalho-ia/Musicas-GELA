import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Musica } from './types';

const SUPABASE_URL = 'https://csennhlcdpqonlqfjfsu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bHkciGpsPw8hNFv2Q7Ujsg_cCNO_14x';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const musicasFixas: Musica[] = [
  // LENTAS
  { id: 'alem-do-veu', titulo: 'Além do Véu', autor: 'Carol Badon e Rafael Concellos', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'amigo', titulo: 'Amigo', autor: 'José Carlos Guimarães', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'amizade', titulo: 'Amizade', autor: 'Marielza Tiscates', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'aos-pes-do-monte', titulo: 'Aos Pés do Monte', autor: 'Tim e Vanessa', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'as-bem-aventurancas', titulo: 'As Bem-Aventuranças', autor: 'Tim e Vanessa', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'a-voz-e-a-cancao', titulo: 'A Voz e a Canção', autor: 'Eduardo Barreto', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'brasil-terra-da-esperanca', titulo: 'Brasil, Terra da Esperança', autor: 'Haroldo S Mendonça', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'brumas-das-manhas', titulo: 'Brumas das Manhãs', autor: 'André Machado', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'deus-conosco', titulo: 'Deus Conosco', autor: 'André Machado', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'dor-e-confianca', titulo: 'Dor e Confiança', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'estrela-matutina', titulo: 'Estrela Matutina', autor: 'Marielza Tiscates', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'filho-de-deus', titulo: 'Filho de Deus', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'mar-da-vida', titulo: 'Mar da Vida', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'na-porta-de-damasco', titulo: 'Na Porta de Damasco', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'noite-e-dia', titulo: 'Noite e Dia', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'quando-penso-em-jesus', titulo: 'Quando Penso em Jesus', autor: 'Willi de Barros', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'regeneracao', titulo: 'Regeneração', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'sao-chegados-os-tempos', titulo: 'São Chegados os Tempos', autor: 'Clara Gomes', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },
  { id: 'sinta', titulo: 'Sinta', autor: 'Carol Badon, Caio Diniz, João Mattos e Rafael Concellos', lado: 'esquerdo', categoria: 'lenta', origem: 'fixa' },

  // AGITADAS
  { id: 'a-cancao-que-a-gente-fez', titulo: 'A Canção que a Gente Fez', autor: 'Projeto Carrossel', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'alvorada-jovem', titulo: 'Alvorada Jovem', autor: 'Gutemberg Paschoal', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'apenas-amar', titulo: 'Apenas Amar', autor: 'Denis Soares', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'confia-e-vai', titulo: 'Confia e Vai', autor: 'Rafael Concellos', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'conquista', titulo: 'Conquista', autor: 'Marielza Tiscate', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'daqui-so-se-leva-o-amor', titulo: 'Daqui só se Leva o Amor', autor: 'Jota Quest', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'depende-de-voce', titulo: 'Depende de Você', autor: 'Ariovaldo Filho', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'diga-a-si-mesmo', titulo: 'Diga a Si Mesmo', autor: 'Autor Desconhecido', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'eu-livre', titulo: 'Eu-Livre', autor: 'Denis Soares', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'e-preciso-saber-viver', titulo: 'É Preciso Saber Viver', autor: 'Roberto e Erasmo', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'familia-universal', titulo: 'Família Universal', autor: 'Tim e Vanessa', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'flutuar', titulo: 'Flutuar', autor: 'Grupo Arte Nascente', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'forca-do-bem', titulo: 'Força do Bem', autor: 'Grupo Bem', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'ja-e-tempo', titulo: 'Já é Tempo', autor: 'James Marota', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'lei-de-amor', titulo: 'Lei de Amor', autor: 'Autor Desconhecido', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'livro-imortal', titulo: 'Livro Imortal', autor: 'Denis Soares', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'novo-rumo', titulo: 'Novo Rumo', autor: 'Marcelo Manga', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'nos', titulo: 'Nós', autor: 'Denis Soares', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'o-amor-de-jesus', titulo: 'O Amor de Jesus', autor: 'Diamantes de Poeira – Ariovaldo Filho', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'o-essencial', titulo: 'O Essencial', autor: 'Carlos Faria Jr.', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'para-sempre-em-meu-coracao', titulo: 'Para Sempre em Meu Coração', autor: 'Willi de Barros', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'pense-ja-no-amanha', titulo: 'Pense Já no Amanhã', autor: 'André Bezerra', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'pra-melhorar', titulo: 'Prá Melhorar', autor: 'André Pirola', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'segue-o-sol', titulo: 'Segue o Sol', autor: 'Marcelo Daimom', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'ser-crianca', titulo: 'Ser Criança', autor: 'Allan Filho/Carlos Alexandre/Gustavo Novaes', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'sorriso-de-esperanca', titulo: 'Sorriso de Esperança', autor: 'Marielza Tiscate', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'te-encontrei', titulo: 'Te Encontrei', autor: 'Carol Badon/Gustavo Garcia/Rafael Concellos', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
  { id: 'voo-vento-e-luz', titulo: 'Vôo / Vento e Luz', autor: 'Joelson Queiroz / Maurício Soares e Oscar Weiss', lado: 'direito', categoria: 'agitada', origem: 'fixa' },
];

const PREFS_KEY = 'gela-musica-prefs';
const REPERTORIO_KEY = 'gela-repertorio';

interface MusicaPrefs { fontSize: number; numColunas: number; }

function carregarPrefs(): Record<string, MusicaPrefs> {
  try { const raw = localStorage.getItem(PREFS_KEY); return raw ? JSON.parse(raw) : {}; } catch { return {}; }
}

function salvarPrefs(prefs: Record<string, MusicaPrefs>) {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch {}
}

function carregarRepertorio(): Musica[] {
  try { const raw = localStorage.getItem(REPERTORIO_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

function salvarRepertorio(repertorio: Musica[]) {
  try { localStorage.setItem(REPERTORIO_KEY, JSON.stringify(repertorio)); } catch {}
}

function calcularAjusteIdeal(texto: string): MusicaPrefs {
  const caracteres = texto.length;
  if (caracteres < 250) return { fontSize: 2.8, numColunas: 1 };
  if (caracteres < 500) return { fontSize: 2.4, numColunas: 1 };
  if (caracteres < 900) return { fontSize: 2.2, numColunas: 2 };
  if (caracteres < 1400) return { fontSize: 2.0, numColunas: 2 };
  return { fontSize: 1.8, numColunas: 3 };
}

type Tela = 'inicio' | 'lentas' | 'agitadas' | 'musica' | 'repertorio' | 'upload' | 'editar';

function App() {
  const [tela, setTela] = useState<Tela>('inicio');
  const [musicaAtiva, setMusicaAtiva] = useState<Musica | null>(null);
  const [letra, setLetra] = useState<string>('');
  const [fonteSize, setFonteSize] = useState(2.2);
  const [numColunas, setNumColunas] = useState(2);
  const [historico, setHistorico] = useState<Musica[]>([]);
  const [prefs, setPrefs] = useState<Record<string, MusicaPrefs>>(carregarPrefs);
  const [repertorio, setRepertorio] = useState<Musica[]>(carregarRepertorio);
  const [indiceRepertorio, setIndiceRepertorio] = useState(0);
  const [modoRepertorio, setModoRepertorio] = useState(false);
  const [musicasNuvem, setMusicasNuvem] = useState<Musica[]>([]);
  const [carregandoNuvem, setCarregandoNuvem] = useState(true);
  const [senha, setSenha] = useState('');
  const [editandoMusica, setEditandoMusica] = useState<Musica | null>(null);
  const [formTitulo, setFormTitulo] = useState('');
  const [formAutor, setFormAutor] = useState('');
  const [formCategoria, setFormCategoria] = useState<'lenta' | 'agitada'>('lenta');
  const [formConteudo, setFormConteudo] = useState('');
  const [formId, setFormId] = useState<string | null>(null);

  const todasMusicas = useMemo(() => [...musicasFixas, ...musicasNuvem], [musicasNuvem]);

  useEffect(() => { salvarRepertorio(repertorio); }, [repertorio]);

  useEffect(() => {
    async function carregarNuvem() {
      try {
        const { data, error } = await supabase.from('musicas').select('*').order('titulo');
        if (error) throw error;
        const musicas: Musica[] = (data || []).map((m: any) => ({
          id: m.id as string,
          titulo: m.titulo as string,
          autor: (m.autor || '') as string,
          lado: (m.categoria === 'lenta' ? 'esquerdo' : 'direito') as 'esquerdo' | 'direito',
          categoria: m.categoria as 'lenta' | 'agitada',
          conteudo: m.conteudo as string,
          origem: 'nuvem' as const,
          created_at: m.created_at as string,
          updated_at: m.updated_at as string,
        }));
        setMusicasNuvem(musicas);
      } catch (err) {
        console.error('Erro ao carregar músicas da nuvem:', err);
      } finally {
        setCarregandoNuvem(false);
      }
    }
    carregarNuvem();
  }, []);

  useEffect(() => {
    if (musicaAtiva) {
      if (musicaAtiva.origem === 'nuvem' && musicaAtiva.conteudo) {
        setLetra(musicaAtiva.conteudo);
      } else {
        fetch(`/${musicaAtiva.categoria === 'lenta' ? 'lentas' : 'agitadas'}/${musicaAtiva.id}.txt`)
          .then(res => {
            if (!res.ok) throw new Error('Erro');
            return res.text();
          })
          .then(texto => setLetra(texto))
          .catch(() => setLetra('Letra não encontrada.'));
      }
    }
  }, [musicaAtiva]);

  useEffect(() => {
    if (musicaAtiva) {
      const salvo = prefs[musicaAtiva.id];
      if (salvo) {
        setFonteSize(salvo.fontSize);
        setNumColunas(salvo.numColunas);
      } else {
        if (letra && letra !== 'Letra não encontrada.') {
          const ideal = calcularAjusteIdeal(letra);
          setFonteSize(ideal.fontSize);
          setNumColunas(ideal.numColunas);
          setPrefs(prev => {
            const novo = { ...prev };
            novo[musicaAtiva.id] = ideal;
            salvarPrefs(novo);
            return novo;
          });
        }
      }
    }
  }, [musicaAtiva, letra, prefs]);

  const atualizarPrefs = useCallback((novaFonte?: number, novasColunas?: number) => {
    if (!musicaAtiva) return;
    setPrefs(prev => {
      const novo = { ...prev };
      novo[musicaAtiva.id] = { fontSize: novaFonte ?? fonteSize, numColunas: novasColunas ?? numColunas };
      salvarPrefs(novo);
      return novo;
    });
  }, [musicaAtiva, fonteSize, numColunas]);

  const abrirMusica = useCallback((musica: Musica, viaRepertorio = false) => {
    setMusicaAtiva(musica);
    setTela('musica');
    setModoRepertorio(viaRepertorio);
    setHistorico(prev => {
      const novo = prev.filter(m => m.id !== musica.id);
      return [...novo, musica].slice(-10);
    });
  }, []);

  const voltarDaMusica = () => {
    if (modoRepertorio && repertorio.length > 0) {
      const proximoIndice = indiceRepertorio + 1;
      if (proximoIndice < repertorio.length) {
        setIndiceRepertorio(proximoIndice);
        abrirMusica(repertorio[proximoIndice], true);
      } else {
        setModoRepertorio(false);
        setIndiceRepertorio(0);
        setMusicaAtiva(null);
        setLetra('');
        setTela('inicio');
      }
    } else {
      if (musicaAtiva) {
        setTela(musicaAtiva.categoria === 'lenta' ? 'lentas' : 'agitadas');
      }
      setMusicaAtiva(null);
      setLetra('');
    }
  };

  const irParaInicio = () => {
    setTela('inicio');
    setMusicaAtiva(null);
    setLetra('');
    setModoRepertorio(false);
    setIndiceRepertorio(0);
  };

  const adicionarAoRepertorio = (musica: Musica) => {
    setRepertorio(prev => {
      if (prev.some(m => m.id === musica.id)) return prev;
      return [...prev, musica];
    });
  };

  const removerDoRepertorio = (id: string) => {
    setRepertorio(prev => prev.filter(m => m.id !== id));
  };

  const moverRepertorio = (index: number, direcao: 'cima' | 'baixo') => {
    setRepertorio(prev => {
      const novo = [...prev];
      const destino = direcao === 'cima' ? index - 1 : index + 1;
      if (destino < 0 || destino >= novo.length) return prev;
      [novo[index], novo[destino]] = [novo[destino], novo[index]];
      return novo;
    });
  };

  const iniciarRepertorio = () => {
    if (repertorio.length === 0) return;
    setIndiceRepertorio(0);
    abrirMusica(repertorio[0], true);
  };

  const abrirUpload = () => {
    setFormId(null);
    setFormTitulo('');
    setFormAutor('');
    setFormCategoria('lenta');
    setFormConteudo('');
    setEditandoMusica(null);
    setTela('upload');
  };

  const abrirEdicao = (musica: Musica) => {
    if (musica.origem !== 'nuvem') {
      alert('Apenas músicas adicionadas na nuvem podem ser editadas.');
      return;
    }
    setEditandoMusica(musica);
    setFormId(musica.id);
    setFormTitulo(musica.titulo);
    setFormAutor(musica.autor);
    setFormCategoria(musica.categoria);
    setFormConteudo(musica.conteudo || '');
    setTela('editar');
  };

  const salvarNovaMusica = async () => {
    if (!formTitulo.trim() || !formConteudo.trim()) {
      alert('Preencha título e conteúdo.');
      return;
    }
    const nova = { titulo: formTitulo, autor: formAutor, categoria: formCategoria, conteudo: formConteudo };
    try {
      const { data, error } = await supabase.from('musicas').insert(nova).select();
      if (error) throw error;
      if (data) {
        const musicaNova: Musica = {
          id: data[0].id as string,
          titulo: data[0].titulo as string,
          autor: data[0].autor as string,
          lado: (data[0].categoria === 'lenta' ? 'esquerdo' : 'direito') as 'esquerdo' | 'direito',
          categoria: data[0].categoria as 'lenta' | 'agitada',
          conteudo: data[0].conteudo as string,
          origem: 'nuvem' as const,
        };
        setMusicasNuvem(prev => [...prev, musicaNova]);
      }
      alert('Música adicionada com sucesso!');
      setTela('inicio');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar música. Verifique a conexão.');
    }
  };

  const salvarEdicao = async () => {
    if (!formId) return;
    try {
      const { error } = await supabase
        .from('musicas')
        .update({ titulo: formTitulo, autor: formAutor, categoria: formCategoria, conteudo: formConteudo })
        .eq('id', formId);
      if (error) throw error;
      setMusicasNuvem(prev => prev.map(m =>
        m.id === formId ? { ...m, titulo: formTitulo, autor: formAutor, categoria: formCategoria, conteudo: formConteudo } : m
      ));
      alert('Música atualizada!');
      setTela('inicio');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar.');
    }
  };

  const excluirMusica = async (id: string) => {
    if (!confirm('Excluir esta música?')) return;
    try {
      const { error } = await supabase.from('musicas').delete().eq('id', id);
      if (error) throw error;
      setMusicasNuvem(prev => prev.filter(m => m.id !== id));
      setRepertorio(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir.');
    }
  };

  const handleArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const texto = ev.target?.result as string;
      const linhas = texto.split('\n');
      const titulo = linhas[0]?.replace(/^#+\s*/, '').trim() || '';
      const autor = linhas[1]?.replace(/^Autor:\s*/i, '').trim() || '';
      setFormTitulo(titulo);
      setFormAutor(autor);
      setFormConteudo(linhas.join('\n'));
    };
    reader.readAsText(file);
  };

  if (tela === 'upload' || tela === 'editar') {
    return (
      <div className="pagina-inicial">
        <div className="container">
          <header className="header">
            <button className="btn-voltar" onClick={irParaInicio}>← Início</button>
            <h1>{tela === 'upload' ? 'Nova Música' : 'Editar Música'}</h1>
          </header>
          <div className="form-musica">
            <label>
              Título
              <input value={formTitulo} onChange={e => setFormTitulo(e.target.value)} />
            </label>
            <label>
              Autor
              <input value={formAutor} onChange={e => setFormAutor(e.target.value)} />
            </label>
            <label>
              Categoria
              <select value={formCategoria} onChange={e => setFormCategoria(e.target.value as 'lenta' | 'agitada')}>
                <option value="lenta">Lenta</option>
                <option value="agitada">Agitada</option>
              </select>
            </label>
            <label>
              Letra (texto)
              <textarea value={formConteudo} onChange={e => setFormConteudo(e.target.value)} rows={14} />
            </label>
            <label className="upload-arquivo">
              📄 Carregar arquivo TXT
              <input type="file" accept=".txt,text/plain" onChange={handleArquivo} hidden />
            </label>
            <div className="botoes-form">
              <button onClick={tela === 'upload' ? salvarNovaMusica : salvarEdicao}>Salvar</button>
              <button className="cancelar" onClick={irParaInicio}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tela === 'musica' && musicaAtiva) {
    const linhas = letra.split('\n');
    const titulo = linhas[0] || '';
    const autor = linhas[1] || '';
    const corpo = linhas.slice(2).join('\n').trim();
    const aumentarFonte = (e: React.MouseEvent) => { e.stopPropagation(); setFonteSize(prev => { const nova = Math.min(prev + 0.3, 4.0); setTimeout(() => atualizarPrefs(nova, undefined), 0); return nova; }); };
    const diminuirFonte = (e: React.MouseEvent) => { e.stopPropagation(); setFonteSize(prev => { const nova = Math.max(prev - 0.3, 1.0); setTimeout(() => atualizarPrefs(nova, undefined), 0); return nova; }); };
    const alternarColunas = (e: React.MouseEvent) => { e.stopPropagation(); setNumColunas(prev => { const nova = prev === 3 ? 1 : prev + 1; setTimeout(() => atualizarPrefs(undefined, nova), 0); return nova; }); };

    return (
      <div className="tela-cheia" onClick={voltarDaMusica}>
        <div className="barra-superior">
          <div className="moldura-titulo-topo">
            <div className="titulo-exibicao-topo">{titulo}</div>
            {autor && <div className="autor-exibicao-topo">{autor}</div>}
          </div>
          <div className="botoes-fonte-topo">
            <button className="btn-fonte" onClick={aumentarFonte}>A+</button>
            <button className="btn-fonte" onClick={diminuirFonte}>A-</button>
            <button className="btn-fonte btn-colunas" onClick={alternarColunas}>{numColunas}col</button>
          </div>
        </div>
        <div className="letra-container">
          <pre className={`letra-texto coluna-${numColunas}`} style={{ fontSize: `${fonteSize}rem` }}>{corpo}</pre>
        </div>
        <p className="dica-voltar">{modoRepertorio ? `Repertório (${indiceRepertorio + 1}/${repertorio.length}) – Toque para próxima` : 'Toque em qualquer lugar para voltar'}</p>
      </div>
    );
  }

  if (tela === 'inicio') {
    return (
      <div className="pagina-inicial">
        <div className="container container-inicio">
          <header className="header-inicio">
            <img src="/logo-mocidade.png" alt="Mocidade Ranulfo Xavier" className="logo logo-esquerda" />
            <div className="titulo-central">
              <h1>GELA</h1>
              <p>Mocidade Ranulfo Xavier</p>
            </div>
            <img src="/logo-gela.png" alt="GELA" className="logo logo-direita" />
          </header>

          <div className="botoes-inicio">
            <button className="btn-inicio btn-lentas" onClick={() => setTela('lentas')}>
              <span className="btn-inicio-icone">🎵</span>
              <span className="btn-inicio-titulo">Músicas Lentas</span>
            </button>
            <button className="btn-inicio btn-agitadas" onClick={() => setTela('agitadas')}>
              <span className="btn-inicio-icone">🎶</span>
              <span className="btn-inicio-titulo">Músicas Agitadas</span>
            </button>
            <button className="btn-inicio btn-upload" onClick={abrirUpload}>
              <span className="btn-inicio-icone">➕</span>
              <span className="btn-inicio-titulo">Adicionar</span>
            </button>
          </div>

          <div className="senha-edicao">
            <input type="password" placeholder="Senha de edição" value={senha} onChange={e => setSenha(e.target.value)} />
            <button className="btn-senha" onClick={() => abrirUpload()}>Entrar</button>
          </div>
        </div>
      </div>
    );
  }

  if (tela === 'repertorio') {
    return (
      <div className="pagina-inicial">
        <div className="container">
          <header className="header">
            <button className="btn-voltar" onClick={irParaInicio}>← Início</button>
            <h1>Repertório</h1>
            <p>{repertorio.length} música(s)</p>
          </header>
          <div className="repertorio-lista">
            {repertorio.length === 0 && <p className="repertorio-vazio">Nenhuma música adicionada.</p>}
            {repertorio.map((musica, index) => (
              <div key={musica.id} className="repertorio-item">
                <span className="repertorio-numero">{index + 1}</span>
                <div className="repertorio-info">
                  <strong>{musica.titulo}</strong>
                  <small>{musica.autor}</small>
                </div>
                <div className="repertorio-acoes">
                  <button className="btn-repertorio-setas" onClick={() => moverRepertorio(index, 'cima')} disabled={index === 0}>⬆</button>
                  <button className="btn-repertorio-setas" onClick={() => moverRepertorio(index, 'baixo')} disabled={index === repertorio.length - 1}>⬇</button>
                  <button className="btn-repertorio-remover" onClick={() => removerDoRepertorio(musica.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
          {repertorio.length > 0 && (
            <div className="repertorio-rodape">
              <button className="btn-iniciar-repertorio" onClick={iniciarRepertorio}>▶ Iniciar Apresentação</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const categoriaAtual = tela === 'lentas' ? 'lenta' : 'agitada';
  const musicasFiltradas = todasMusicas.filter(m => m.categoria === categoriaAtual);

  return (
    <div className="pagina-inicial">
      <div className="container">
        <header className="header">
          <button className="btn-voltar" onClick={irParaInicio}>← Início</button>
          <h1>GELA</h1>
          <p>Mocidade Ranulfo Xavier</p>
        </header>
        <div className="topo-lista">
          <h2 className="titulo-categoria">{categoriaAtual === 'lenta' ? '🎵 Músicas Lentas' : '🎶 Músicas Agitadas'}</h2>
          <button className="btn-repertorio-acesso" onClick={() => setTela('repertorio')}>📋 Repertório ({repertorio.length})</button>
        </div>
        <div className="grade-botoes grade-unica">
          {musicasFiltradas.map(musica => (
            <div key={musica.id} className="btn-musica-wrapper">
              <button className={`btn-musica ${musica.categoria === 'lenta' ? 'btn-lenta' : 'btn-agitada'}`} onClick={() => abrirMusica(musica)}>
                <span className="btn-titulo">{musica.titulo}</span>
                <span className="btn-autor">{musica.autor}</span>
              </button>
              <button className="btn-adicionar-repertorio" onClick={() => adicionarAoRepertorio(musica)} title="Adicionar ao repertório">+</button>
              {musica.origem === 'nuvem' && (
                <button className="btn-editar-musica" onClick={() => abrirEdicao(musica)} title="Editar">✏️</button>
              )}
            </div>
          ))}
        </div>
        {historico.length > 0 && (
          <div className="historico">
            <h3>Últimas acessadas:</h3>
            <div className="historico-lista">
              {historico.slice().reverse().map(m => (
                <button key={m.id} className="btn-historico" onClick={() => abrirMusica(m)}>{m.titulo}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
