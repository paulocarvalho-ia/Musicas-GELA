import { useState, useEffect, useCallback } from 'react';
import { Musica } from './types';

const musicas: Musica[] = [
  // LADO ESQUERDO - LENTAS
  { id: 'alem-do-veu', titulo: 'Além do Véu', autor: 'Carol Badon e Rafael Concellos', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'amigo', titulo: 'Amigo', autor: 'José Carlos Guimarães', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'amizade', titulo: 'Amizade', autor: 'Marielza Tiscates', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'aos-pes-do-monte', titulo: 'Aos Pés do Monte', autor: 'Tim e Vanessa', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'as-bem-aventurancas', titulo: 'As Bem-Aventuranças', autor: 'Tim e Vanessa', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'a-voz-e-a-cancao', titulo: 'A Voz e a Canção', autor: 'Eduardo Barreto', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'brasil-terra-da-esperanca', titulo: 'Brasil, Terra da Esperança', autor: 'Haroldo S Mendonça', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'brumas-das-manhas', titulo: 'Brumas das Manhãs', autor: 'André Machado', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'deus-conosco', titulo: 'Deus Conosco', autor: 'André Machado', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'dor-e-confianca', titulo: 'Dor e Confiança', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'estrela-matutina', titulo: 'Estrela Matutina', autor: 'Marielza Tiscates', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'filho-de-deus', titulo: 'Filho de Deus', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'mar-da-vida', titulo: 'Mar da Vida', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'na-porta-de-damasco', titulo: 'Na Porta de Damasco', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'noite-e-dia', titulo: 'Noite e Dia', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'quando-penso-em-jesus', titulo: 'Quando Penso em Jesus', autor: 'Willi de Barros', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'regeneracao', titulo: 'Regeneração', autor: 'Allan Filho', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'sao-chegados-os-tempos', titulo: 'São Chegados os Tempos', autor: 'Clara Gomes', lado: 'esquerdo', categoria: 'lenta' },
  { id: 'sinta', titulo: 'Sinta', autor: 'Carol Badon, Caio Diniz, João Mattos e Rafael Concellos', lado: 'esquerdo', categoria: 'lenta' },

  // LADO DIREITO - AGITADAS
  { id: 'a-cancao-que-a-gente-fez', titulo: 'A Canção que a Gente Fez', autor: 'Projeto Carrossel', lado: 'direito', categoria: 'agitada' },
  { id: 'alvorada-jovem', titulo: 'Alvorada Jovem', autor: 'Gutemberg Paschoal', lado: 'direito', categoria: 'agitada' },
  { id: 'apenas-amar', titulo: 'Apenas Amar', autor: 'Denis Soares', lado: 'direito', categoria: 'agitada' },
  { id: 'confia-e-vai', titulo: 'Confia e Vai', autor: 'Rafael Concellos', lado: 'direito', categoria: 'agitada' },
  { id: 'conquista', titulo: 'Conquista', autor: 'Marielza Tiscate', lado: 'direito', categoria: 'agitada' },
  { id: 'daqui-so-se-leva-o-amor', titulo: 'Daqui só se Leva o Amor', autor: 'Jota Quest', lado: 'direito', categoria: 'agitada' },
  { id: 'depende-de-voce', titulo: 'Depende de Você', autor: 'Ariovaldo Filho', lado: 'direito', categoria: 'agitada' },
  { id: 'diga-a-si-mesmo', titulo: 'Diga a Si Mesmo', autor: 'Autor Desconhecido', lado: 'direito', categoria: 'agitada' },
  { id: 'eu-livre', titulo: 'Eu-Livre', autor: 'Denis Soares', lado: 'direito', categoria: 'agitada' },
  { id: 'e-preciso-saber-viver', titulo: 'É Preciso Saber Viver', autor: 'Roberto e Erasmo', lado: 'direito', categoria: 'agitada' },
  { id: 'familia-universal', titulo: 'Família Universal', autor: 'Tim e Vanessa', lado: 'direito', categoria: 'agitada' },
  { id: 'flutuar', titulo: 'Flutuar', autor: 'Grupo Arte Nascente', lado: 'direito', categoria: 'agitada' },
  { id: 'forca-do-bem', titulo: 'Força do Bem', autor: 'Grupo Bem', lado: 'direito', categoria: 'agitada' },
  { id: 'ja-e-tempo', titulo: 'Já é Tempo', autor: 'James Marota', lado: 'direito', categoria: 'agitada' },
  { id: 'lei-de-amor', titulo: 'Lei de Amor', autor: 'Autor Desconhecido', lado: 'direito', categoria: 'agitada' },
  { id: 'livro-imortal', titulo: 'Livro Imortal', autor: 'Denis Soares', lado: 'direito', categoria: 'agitada' },
  { id: 'novo-rumo', titulo: 'Novo Rumo', autor: 'Marcelo Manga', lado: 'direito', categoria: 'agitada' },
  { id: 'nos', titulo: 'Nós', autor: 'Denis Soares', lado: 'direito', categoria: 'agitada' },
  { id: 'o-amor-de-jesus', titulo: 'O Amor de Jesus', autor: 'Diamantes de Poeira – Ariovaldo Filho', lado: 'direito', categoria: 'agitada' },
  { id: 'o-essencial', titulo: 'O Essencial', autor: 'Carlos Faria Jr.', lado: 'direito', categoria: 'agitada' },
  { id: 'para-sempre-em-meu-coracao', titulo: 'Para Sempre em Meu Coração', autor: 'Willi de Barros', lado: 'direito', categoria: 'agitada' },
  { id: 'pense-ja-no-amanha', titulo: 'Pense Já no Amanhã', autor: 'André Bezerra', lado: 'direito', categoria: 'agitada' },
  { id: 'pra-melhorar', titulo: 'Prá Melhorar', autor: 'André Pirola', lado: 'direito', categoria: 'agitada' },
  { id: 'segue-o-sol', titulo: 'Segue o Sol', autor: 'Marcelo Daimom', lado: 'direito', categoria: 'agitada' },
  { id: 'ser-crianca', titulo: 'Ser Criança', autor: 'Allan Filho/Carlos Alexandre/Gustavo Novaes', lado: 'direito', categoria: 'agitada' },
  { id: 'sorriso-de-esperanca', titulo: 'Sorriso de Esperança', autor: 'Marielza Tiscate', lado: 'direito', categoria: 'agitada' },
  { id: 'te-encontrei', titulo: 'Te Encontrei', autor: 'Carol Badon/Gustavo Garcia/Rafael Concellos', lado: 'direito', categoria: 'agitada' },
  { id: 'voo-vento-e-luz', titulo: 'Vôo / Vento e Luz', autor: 'Joelson Queiroz / Maurício Soares e Oscar Weiss', lado: 'direito', categoria: 'agitada' },
];

type Tela = 'inicio' | 'lentas' | 'agitadas' | 'musica';

function App() {
  const [tela, setTela] = useState<Tela>('inicio');
  const [musicaAtiva, setMusicaAtiva] = useState<Musica | null>(null);
  const [letra, setLetra] = useState<string>('');
  const [fonteSize, setFonteSize] = useState(2.2);
  const [numColunas, setNumColunas] = useState(2);
  const [historico, setHistorico] = useState<Musica[]>([]);

  useEffect(() => {
    if (musicaAtiva) {
      fetch(`/${musicaAtiva.categoria === 'lenta' ? 'lentas' : 'agitadas'}/${musicaAtiva.id}.txt`)
        .then(res => {
          if (!res.ok) throw new Error('Erro');
          return res.text();
        })
        .then(texto => setLetra(texto))
        .catch(() => setLetra('Letra não encontrada.'));
    }
  }, [musicaAtiva]);

  const abrirMusica = useCallback((musica: Musica) => {
    setMusicaAtiva(musica);
    setTela('musica');
    setHistorico(prev => {
      const novo = prev.filter(m => m.id !== musica.id);
      return [...novo, musica].slice(-10);
    });
  }, []);

  const voltarParaLista = () => {
    if (musicaAtiva) {
      setTela(musicaAtiva.categoria === 'lenta' ? 'lentas' : 'agitadas');
      setMusicaAtiva(null);
      setLetra('');
    }
  };

  const irParaInicio = () => {
    setTela('inicio');
    setMusicaAtiva(null);
    setLetra('');
  };

  const aumentarFonte = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFonteSize(prev => Math.min(prev + 0.3, 4.0));
  };

  const diminuirFonte = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFonteSize(prev => Math.max(prev - 0.3, 1.0));
  };

  const alternarColunas = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNumColunas(prev => (prev === 3 ? 1 : prev + 1));
  };

  // Tela de exibição da letra
  if (tela === 'musica' && musicaAtiva) {
    const linhas = letra.split('\n');
    const titulo = linhas[0] || '';
    const autor = linhas[1] || '';
    const corpo = linhas.slice(2).join('\n').trim();

    return (
      <div className="tela-cheia" onClick={voltarParaLista}>
        <div className="letra-container">
          <div className="botoes-fonte">
            <button className="btn-fonte" onClick={aumentarFonte}>A+</button>
            <button className="btn-fonte" onClick={diminuirFonte}>A-</button>
            <button className="btn-fonte btn-colunas" onClick={alternarColunas}>
              {numColunas}col
            </button>
          </div>

          <div className="moldura-titulo">
            <div className="titulo-exibicao">{titulo}</div>
            {autor && <div className="autor-exibicao">{autor}</div>}
          </div>

          <pre
            className={`letra-texto coluna-${numColunas}`}
            style={{ fontSize: `${fonteSize}rem` }}
          >
            {corpo}
          </pre>
        </div>
        <p className="dica-voltar">Toque em qualquer lugar para voltar</p>
      </div>
    );
  }

  // Tela inicial com dois botões grandes
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
          </div>
        </div>
      </div>
    );
  }

  // Tela de lista de músicas (lentas ou agitadas)
  const categoriaAtual = tela === 'lentas' ? 'lenta' : 'agitada';
  const musicasFiltradas = musicas.filter(m => m.categoria === categoriaAtual);

  return (
    <div className="pagina-inicial">
      <div className="container">
        <header className="header">
          <button className="btn-voltar" onClick={irParaInicio}>← Início</button>
          <h1>GELA</h1>
          <p>Mocidade Ranulfo Xavier</p>
        </header>

        <h2 className="titulo-categoria">
          {categoriaAtual === 'lenta' ? '🎵 Músicas Lentas' : '🎶 Músicas Agitadas'}
        </h2>

        <div className="grade-botoes grade-unica">
          {musicasFiltradas.map(musica => (
            <button key={musica.id} className={`btn-musica ${musica.categoria === 'lenta' ? 'btn-lenta' : 'btn-agitada'}`} onClick={() => abrirMusica(musica)}>
              <span className="btn-titulo">{musica.titulo}</span>
              <span className="btn-autor">{musica.autor}</span>
            </button>
          ))}
        </div>

        {historico.length > 0 && (
          <div className="historico">
            <h3>Últimas acessadas:</h3>
            <div className="historico-lista">
              {historico.slice().reverse().map(m => (
                <button key={m.id} className="btn-historico" onClick={() => abrirMusica(m)}>
                  {m.titulo}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
