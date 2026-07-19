import { useState, useEffect } from 'react';
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
  { id: 'vento-e-luz', titulo: 'Vento e Luz / Vôo', autor: 'Joelson Queiroz / Maurício Soares e Oscar Weiss', lado: 'direito', categoria: 'agitada' },
];

function App() {
  const [musicaAtiva, setMusicaAtiva] = useState<Musica | null>(null);
  const [letra, setLetra] = useState<string>('');
  const [fonteGrande, setFonteGrande] = useState(true);

  useEffect(() => {
    if (musicaAtiva) {
      fetch(`/letras/${musicaAtiva.categoria === 'lenta' ? 'lentas' : 'agitadas'}/${musicaAtiva.id}.txt`)
        .then(res => res.text())
        .then(texto => setLetra(texto))
        .catch(() => setLetra('Letra não encontrada.'));
    }
  }, [musicaAtiva]);

  const voltar = () => {
    setMusicaAtiva(null);
    setLetra('');
  };

  if (musicaAtiva) {
    return (
      <div className="tela-cheia" onClick={voltar}>
        <div className="letra-container">
          <button className="btn-fonte" onClick={(e) => { e.stopPropagation(); setFonteGrande(!fonteGrande); }}>
            {fonteGrande ? '🔍 A-' : '🔍 A+'}
          </button>
          <pre className={`letra-texto ${fonteGrande ? 'fonte-grande' : 'fonte-media'}`}>
            {letra}
          </pre>
        </div>
        <p className="dica-voltar">Toque em qualquer lugar para voltar</p>
      </div>
    );
  }

  const lentas = musicas.filter(m => m.categoria === 'lenta');
  const agitadas = musicas.filter(m => m.categoria === 'agitada');

  return (
    <div className="pagina-inicial">
      <div className="container">
        <header className="header">
          <h1>GELA</h1>
          <p>Grupo Espírita Luz e Amor</p>
        </header>

        <div className="dois-lados">
          <div className="lado esquerdo">
            <h2 className="titulo-lado">🎵 Músicas Lentas</h2>
            <div className="grade-botoes">
              {lentas.map(musica => (
                <button key={musica.id} className="btn-musica btn-lenta" onClick={() => setMusicaAtiva(musica)}>
                  <span className="btn-titulo">{musica.titulo}</span>
                  <span className="btn-autor">{musica.autor}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lado direito">
            <h2 className="titulo-lado">🎶 Músicas Agitadas</h2>
            <div className="grade-botoes">
              {agitadas.map(musica => (
                <button key={musica.id} className="btn-musica btn-agitada" onClick={() => setMusicaAtiva(musica)}>
                  <span className="btn-titulo">{musica.titulo}</span>
                  <span className="btn-autor">{musica.autor}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
