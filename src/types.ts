export interface Musica {
  id: string;
  titulo: string;
  autor: string;
  lado: 'esquerdo' | 'direito';
  categoria: 'lenta' | 'agitada';
  conteudo?: string;
  origem?: 'fixa' | 'nuvem';
  created_at?: string;
  updated_at?: string;
}
