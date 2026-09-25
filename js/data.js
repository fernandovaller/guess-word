// ===== Dados: temas e palavras =====
// Para adicionar um tema novo: copie um bloco, mude id/nome/ícone e edite as palavras.
// `image` é opcional: aponta para assets/themes/<id>.png; se o arquivo faltar,
// o jogo mostra o emoji de `icon` automaticamente.
// Palavras podem ter acento — o chute é ignora-acentos (ver js/utils.js).
// Use apenas palavras sem espaço ou hífen.

export const THEMES = [
  {
    id: 'animais',
    name: 'Animais',
    icon: '🦁',
    image: 'assets/themes/animais.png',
    words: [
      'girafa', 'elefante', 'borboleta', 'crocodilo', 'pinguim', 'capivara',
      'jacaré', 'baleia', 'morcego', 'ouriço', 'onça', 'arara', 'tucano',
      'golfinho', 'lontra', 'pantera', 'iguana', 'hamster', 'coelho', 'tartaruga',
    ],
  },
  {
    id: 'frutas',
    name: 'Frutas',
    icon: '🍉',
    image: 'assets/themes/frutas.png',
    words: [
      'banana', 'abacaxi', 'morango', 'goiaba', 'caju', 'jabuticaba',
      'melancia', 'pêssego', 'framboesa', 'maracujá', 'carambola', 'pitanga',
      'tangerina', 'ameixa', 'cereja', 'manga', 'abacate', 'limão', 'melão', 'maçã',
    ],
  },
  {
    id: 'profissoes',
    name: 'Profissões',
    icon: '👷',
    image: 'assets/themes/profissoes.png',
    words: [
      'médico', 'professor', 'engenheiro', 'dentista', 'bombeiro', 'astronauta',
      'padeiro', 'jardineiro', 'advogado', 'músico', 'pintor', 'cozinheiro',
      'enfermeiro', 'biólogo', 'arquiteto', 'jornalista', 'montador',
      'pedreiro', 'alfaiate', 'mecânico', 'pescador', 'costureira', 'motorista',
    ],
  },
  {
    id: 'objetos',
    name: 'Objetos',
    icon: '📦',
    image: 'assets/themes/objetos.png',
    words: [
      'relógio', 'bicicleta', 'almofada', 'tesoura', 'lanterna', 'cadeira',
      'janela', 'espelho', 'cortina', 'martelo', 'caderno', 'binóculo',
      'mochila', 'escova', 'sapato', 'chapéu', 'toalha', 'vela', 'corda',
      'âncora', 'pincel', 'balde', 'garrafa', 'colher',
    ],
  },
  {
    id: 'paises',
    name: 'Países',
    icon: '🌍',
    image: 'assets/themes/paises.png',
    words: [
      'Brasil', 'Argentina', 'Japão', 'Egito', 'Portugal', 'Canadá', 'Alemanha',
      'México', 'Itália', 'Espanha', 'China', 'Índia', 'Marrocos', 'Grécia',
      'Suíça', 'Noruega', 'Cuba', 'Chile', 'Turquia', 'Dinamarca', 'Finlândia',
      'Uruguai', 'Paraguai', 'Bolívia', 'Croácia',
    ],
  },
  {
    id: 'esportes',
    name: 'Esportes',
    icon: '⚽',
    image: 'assets/themes/esportes.png',
    words: [
      'futebol', 'basquete', 'natação', 'atletismo', 'judô', 'ciclismo',
      'tênis', 'boxe', 'ginástica', 'handebol', 'hipismo', 'esgrima',
      'skate', 'xadrez', 'voleibol', 'surfe', 'remo', 'beisebol', 'rúgbi',
      'golfe', 'capoeira', 'karatê', 'escalada',
    ],
  },
];