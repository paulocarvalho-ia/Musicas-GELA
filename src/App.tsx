import { useState, useCallback } from 'react';
import { Musica } from './types';

// Todas as letras incorporadas
const letrasMap: Record<string, string> = {
  // LENTAS
  'alem-do-veu': `ALÉM DO VÉU\n(Carol Badon e Rafael Concellos)\n\nAhhhhh  Ahhhhh Ahhhh\n\nOlhar distante, peito vazio\nSigo compassos perdidos\n\nChoro em silêncio, fico aflito\nSinto tua mão me alcançaaaar\n\nHá um caminho,\nOnde tudo faz sentido\nBem ao Teu lado,\nOnde o fardo é mais leve\nQuero segui-lo,\nEu preciso estar contigo\n\nTe abraçar, e voar muito...\n\nAlém do mar, além do céu\nEncontro um futuro bem\nAlém do véu, da imperfeição\nOs olhos abrem vendo a imensidão\nE ela me dá\nCoragem pra nunca parar de\n...desbravaaaaaaaaaaaaaaar\n\nAhhhhh  Ahhhhh Ahhhh\n\nHá um caminho,\nOnde tudo faz sentido\nBem ao Teu lado,\nOnde o fardo é mais leve\nQuero segui-lo,\nEu preciso estar contigo\n\nTe abraçar, e voar muito...\n\nAlém do mar, além do céu\nEncontro um futuro bem\nAlém do véu, da imperfeição\nOs olhos abrem vendo a imensidão\nE ela me dá\nCoragem pra nunca parar de\n...desbravaaaaaaaaaaaaaaar`,
  'amigo': `AMIGO\n(José Carlos Guimarães)\n\nOnde estiver sei que vou caminhar\nCom você, meu irmão, meu amigo\nSeja na terra ou nas águas do mar\nNa pureza do ar com você, amigo\n\nOnde estiver sei que vou caminhar\nCom você, meu irmão, meu amigo\nNa escuridão sei que a luz vai voltar\nSei que o sol vai brilhar em você, amigo\n\nAmor, amor, que nunca vai nos separar\nAmor, amor, que nunca vai nos separar`,
  'amizade': `AMIZADE\n(Marielza Tiscate)\n\nVou te embalar no meu canto,\nCriar um recanto com flores e luz\nSó pra te ver assim sorrindo,\nEu vou colorindo a vida de paz\n\nPorque eu descobri, amigo,\nQue nada sou sem o teu carinho\nAmigo, eu descobri, amigo,\nQue nada sou sem o teu amor\n\nPor isso vou...\nPor isso vou...\nPor isso vou...`,
  'aos-pes-do-monte': `AOS PÉS DO MONTE\n(Tim e Vanessa)\n\nUm sentimento me ronda\nNão sei dizer, tudo é novo pra mim\nMeu coração se renova\nSinto a esperança invadir o meu ser\n\nQuero ser manso, ser limpo, ser justo\nE pobre de espírito ser\nTua palavra me sonda\nMe conta do Reino que espera por mim\n\nEu te ofereço meu pranto\nAs dores da alma que quer renascer\n\nEu ouvi tua voz\nTeu falar me encantou\nQuis seguir, caminhar\nQuis saber pra onde vou\nEis-me aqui\nMinha dor... serenou`,
  'as-bem-aventurancas': `AS BEM-AVENTURANÇAS\n(Tim e Vanessa)\n\nMestre Jesus\nDo alto do monte ensinou\nSua voz como um canto ecoou\nMe ensine o caminho Senhor\nDo Reino de Paz\n\nDisse Jesus:\nBem-aventurados sois vós, o sal da terra\nQue brilhe a vossa luz, a Luz do mundo\n\nBem-aventurados sois vós\nOs pobres de espírito\nBem-aventurados sois vós\nQue estais aflitos\nBem-aventurados sois vós\nOs pacíficos\n\nQue brilhe a vossa luz, a Luz do mundo\n\nBem-aventurados sois vós\nOs limpos de coração\nBem-aventurados sois vós\nOs que perdoam\nBem-aventurados sois vós\nOs que choram\n\nQue brilhe a vossa luz, a Luz do mundo`,
  'a-voz-e-a-cancao': `A VOZ E A CANÇÃO\n(Eduardo Barreto)\n\nCanta, acende o silêncio\nPerfuma o momento à luz da emoção\nCanta, mergulha no templo\nDe tudo que há dentro do teu coração\n\nTua voz pode ser o único livro\nQue alguém pode ler e servir de abrigo\nPara quem não tem mais o que esperar\nUm novo sol a brilhar...\n\nCanta, e espalha no vento\nSublimes promessas de libertação\nCanta, que a gente precisa\nBeber dessa água, comer desse pão\n\nE a canção guiará a quantos vierem\nQuem precisa encontrar a luz do caminho\nE pra quem não tem mais com quem contar\nExiste a voz que se levanta e canta, canta mais\nÉ tua voz que se levanta e canta tanto em nós`,
  'brasil-terra-da-esperanca': `BRASIL, TERRA DA ESPERANÇA\n(Haroldo S. Mendonça)\n\nVocê reclama do seu país\nMas já parou pra pensar\nQue terremotos não há,\nNem vulcões, furacões\nTerra abençoada pelo céu\nCoração do mundo,\nDona do pão e do mel\n\nEu sei que a dor é grande\nMas a batalha é da gente\nPlantar agora semente,\nBem cuidar dessa flor\nVerdadeiramente brilhar\nNossa luz interior\n\nE lá no céu azul, a marca da vitória,\nCruzeiro do Sul\nQuem tem amor não cansa de amar o Brasil\nA terra da esperança\n\nA terra da esperança, da esperança... Brasil.`,
  'brumas-das-manhas': `BRUMAS DAS MANHÃS\n(André Machado)\n\nAh, se puderes doar, um pouquinho de ti\nUm minuto que for, abra o seu coração\nPara alguém abraçar\nSem ferir, se doar\n\nE o véu que está, cobrindo o olhar\nSumirá com as brumas das manhãs\nE verás um bem, infinito em nós\nE verás, verás alguém\nComo um irmão`,
  'deus-conosco': `DEUS CONOSCO\n(André Machado)\n\nHá quanto tempo, espera você\nUma chance por alguma chance pra ser feliz e\nAprender a crescer\n\nMas sem saber que aí dentro de ti\nHá um mundo, universo, uma força motriz\nA essência de Deus, cintilando, fluindo a existir\n\nAh___ah___ah!\n\nÉ constante o amor, o impulso de paz\nMergulhe em seu coração, desvende o que é amar\nCaminhe pelo universo, sinta na alma a amplidão\nDe ser a imagem de Deus, ter Jesus no coração`,
  'dor-e-confianca': `DOR E CONFIANÇA\n(Allan Filho)\n\nPés descalços mãos marcadas,\nMoradores nas calçadas\nEsquecidos como a própria noite\n\nRosto triste olhar tão raro,\nNa esperança de um amparo\nO silêncio mostra a própria dor\n\nSem perceber...\nFinjo não ver e prefiro evitar\nPreciso ter...\nOlhos de ver e mãos de ajudar\nE amar, como ele amou\n\nPés descalços mãos marcadas,\nJesus Cristo nas calçadas\nEsquecido como a própria noite\n\nRosto triste olhar tão raro,\nNa esperança de um amparo\nO silêncio mostra a própria dor\n\nSem perceber...\nFinjo não ver e prefiro evitar\nPreciso ter...\nOlhos de ver e mãos de ajudar\nE amar, como ele amou\n\nPés descalços mãos marcadas,\nJesus Cristo nas calçadas\nEsquecidos como a própria noite`,
  'estrela-matutina': `ESTRELA MATUTINA\n(Marielza Tiscate)\n\nSeu coração é uma estrela matutina\nSuave luz que clareia e ilumina\n\nOlhe pra dentro de você\nDescubra o brilho do amor\n\nAcenda a sua candeia\nE faz nascer uma nova manhã\n\nE faz nascer uma nova manhã`,
  'filho-de-deus': `FILHO DE DEUS\n(Allan Filho)\n\nMesmo que as pessoas não consigam ver a dor\nQue a gente sente, a gente sente!\nMesmo que o mundo não perceba todo o amor\nQue a gente sente, mesmo assim, a gente sente\n\nNo peito um grande aperto, no corpo um desconforto\nUm medo e tão pouco a dizer...\n\nMesmo que a vontade não consiga acontecer\nA gente sente, a gente sente!\nMesmo que os olhares finjam não nos perceber\nA gente sente, a gente sente!\nMesmo que os lugares mudem, como não dizer?\nQue a gente sente\n\nNo peito um grande aperto, no corpo um desconforto\nUm medo e tão pouco a dizer...\n\nMesmo que a vontade não consiga acontecer\nA gente sente, a gente sente!\nE isso deveria ser suficiente\n\nMas, por trás de toda dor, sempre há uma razão!\nProvação? Expiação? Reencarnação? Educação!!!\nMesmo a sofrer, preciso crer\nSou igual a você... igual a você!\nFilho de Deus, igual a você!`,
  'mar-da-vida': `MAR DA VIDA\n(Allan Filho)\n\nOndas da vida carregam o barco\nAtracado no tempo não quer navegar\nNaufraga em si mesmo temendo os monstros\nQue existem no mar\n\nO monstro da morte consegue sozinho\nFazer com que barcos prefiram parar\nMas monstros não existem sequer nas mentiras\nContadas no mar\n\nVai... enfrenta as tormentas do além-mar\nIça as velas da coragem prá lutar\nE ir além, estrelas do bem vão te guiar...\n\nVai... que o Cristo seja a luz em teu vogar\nQue o risco não te impeça de tentar ganhar o mar\nCom o instrumento que se chama amor`,
  'na-porta-de-damasco': `NA PORTA DE DAMASCO\n(Allan Filho)\n\nSenhor, em Seu nome... Senhor, em Seu nome...\n\nEu falava às pessoas, jogava as sementes,\nPlantava e colhia paz, mas sentia falta de algo mais\nEu fazia quase tudo e hoje tudo é quase nada...\nFrente à obra e seu Criador, sinto não sabemos dar valor\nFaltava me mudar...\n\nE tentar me encontrar, e tentar me conhecer, Senhor\nSer mais um em Seu rebanho a caminhar\nNão me cabe só falar, também cabe agir e me tornar\nUm instrumento Seu a melhorar\n\nSenhor, em Seu nome... Senhor, em Seu nome...\n\nEu fazia muitos planos, mas os anos seguem em frente,\nE nos fazem ver quem somos... cometemos mil enganos...\nEu queria ser o leme mas agia como âncora,\nRetardando o meu caminho, sou o meu próprio espinho\nFaltava me mudar...\n\nE tentar me encontrar, e tentar me conhecer, Senhor\nSer mais um em Seu rebanho a caminhar\nNão me cabe só falar, também cabe agir e me tornar\nUm instrumento Seu a melhorar`,
  'noite-e-dia': `NOITE E DIA\n(Allan Filho)\n\nVai e descobre caminhos por entre sementes\nDe luz banhadas de amor\nE, em paz, segue em passos de fé\nSobre as pedras pontudas da dor, suave lição...\n\nVai, começa com o dia que se inicia a cada manhã\nVai em busca da luta mais justa,\nSentir-se capaz de seguir\nNão há como falar de coragem\nSem se aceitar a existência do medo\nVai que a vida não surgiu pra ser\nUm eterno segredo de Deus\n\nMas, quando a noite vier e o cansaço\nSelar teu futuro, descansa em paz\nE assim poderás repensar novas metas\nPerante o escuro, buscar o amor de Deus\n\nMesmo com medo, acredita em ti mesmo\nE descobrirás que és capaz\nDe mudar como o mundo, de crescer com um rumo,\nDe iluminar a própria paz\n\nQue confia no poder do tempo,\nQue espera o devido momento em que dirás:\n\nSou mais eu do que as ondas de medo\nQue abalam o coração\nSou mais Deus do que as ondas de medo\nQue abalam o coração\n\nSou mais eu do que as ondas de medo\nQue abalam o coração\nSou mais Deus do que as ondas de medo\nQue abalam o coração`,
  'quando-penso-em-jesus': `QUANDO PENSO EM JESUS\n(Willi de Barros)\n\nToda vez que eu penso em Jesus\nMeu coração se acende no meu peito\n\nToda vez que eu sinto esta luz\nIluminando a minha mente e o meu corpo\nPareço flutuar\nQuando penso em Jesus... eu sinto paz\n\nQuando penso em Jesus minha alma\nSe perfuma numa doce vibração\n\nOs meus pensamentos se transformam\nE eu sinto que dentro do coração\nVai surgindo, vai crescendo\nUm sentimento diferente e puro\nMe enchendo, me elevando\nTranscendendo todas as fronteiras\n\nE o mundo inteiro é alegria\nColorido como uma manhã de sol\nQuase grito de tanta felicidade\nE o meu sorriso não demora a despontar\nQuando penso em Jesus só quero amar`,
  'regeneracao': `REGENERAÇÃO\n(Allan Filho)\n\nOnde está seu sorriso?\nOnde se escondeu?\nSim, eu sei, é difícil esquecer o que aconteceu,\nMas também sei que a vida nada traz sem razão\nUm instante de dor numa vida de muito amor\nRegeneração\n\nTraga seu melhor sorriso, faça o melhor possível\nNada deveria lhe deter\nSiga essa sua estrada, cada passo é uma jornada\nSaiba encontrar a sua fé\n\nPor onde andarás\n\nTraga seu melhor sorriso, faça o melhor possível\nNada é capaz de lhe deter`,
  'sao-chegados-os-tempos': `SÃO CHEGADOS OS TEMPOS\n(Clara Gomes)\n\nJá não há lugar onde a luz não possa alcançar\nJá não há um coração que não carregue o gérmen do amor\nJá podemos divisar no final da estrada de luta e dor\nOs olhos calmos e serenos do Senhor\n\nE são chegados os tempos, não temos tempo a perder\nJá foi lançada a semente e há tanta coisa a se fazer\nAcolher corações, amar é nosso papel\nUnificar as nações, erguer os olhos pro céu\n\nCada voz que cante a paz, cada mão que plante a caridade\nCada um de nós se faz mensageiro da felicidade\nTrilharemos sempre, sim, indo ao encontro de Jesus\nNessa caminhada de luz sem fim`,
  'sinta': `SINTA\n(Carol Badon, Caio Diniz, João Mattos e Rafael Concellos)\n\nQuero que sintam, o que eu sinto\nQue existe esse amor\nDentro de mim\nComo eu faço, e refaço\nPro amor surgir, nos corações\n\nEu sinto que é minha missão\nOmbro a ombro, vamos juntos\nEmpurrando o arado de Deus\nOoooooh\n\nEu sei que é a nossa missão\nFazer com que essa canção\nSe espelhe na Sua palavra\nGuiando nossos passos\nOoooOooooooOoo\n\nSei que é possível o rumo mudar\nSe o mundo inteiro puder encontrar\nEsse amor e espalhar\n\nQuebramos barreiras com a nossa voz\nJá não há mais mágoa ou ódio entre nós\nEsse amor vou espalhar\n\nÉ o sentimento que Paulo sentia\nAo ver novamente, mudar sua vida\n\nÉ como Pedro que encontrou coragem\nEm meio a tormenta, enquanto afundava\nLevantou e andou sobre as águas\nAaaaaaaAaaaaaAaaaaaAaaaaah\n\nSei que é possível o rumo mudar\nSe o mundo inteiro puder encontrar\nEsse amor e espalhar\n\nQuebramos barreiras com a nossa voz\nJá não há mais mágoa ou ódio entre nós\nEsse amor vou espalhar\n\nAaaaaaaaAaaaaaah\nAaaaaaAaaaaaAaaaaaah\nOooOoooOoooOoooooh\nOooooOooooOoooooh\n\nAaaaaaaaAaaaaaah\nAaaaaaAaaaaaAaaaaaah\nEsse amor vou\nEeeespaaaaaaalhar`,

  // AGITADAS
  'a-cancao-que-a-gente-fez': `A CANÇÃO QUE A GENTE FEZ\n(Projeto Carrossel)\n\nComo nos velhos tempos de outras tantas\nQue sua vontade sempre permaneça viva\nE que o amor quebre qualquer barreira\nJunto com teu mar\n\nComo nos velhos tempos de outras tantas\nQue seu poder esteja em suas mãos\nE só dependa de ti pra exercitar\n\nPor que te deténs de sonhar?\nSaber que não pode ter medo de errar\nE a vitória diante de seu olhar está\n\nPor que te deténs de amar?\nSaber que não pode viver pra odiar\nE o medo já toma rumo pra outras distâncias\n\nAs dores da alma que a gente plantou\nParece que não se esquecem de nós\nMas vamos mudar, não vamos nos entregar\nEsse não é o fim\n\nOs tombos da vida que a gente levou\nParece que vem só pra rir de nós\nMas não vamos desistir, não paremos de cantar\nA canção que a gente fez\n\nO momento é hoje, encoraje o seu ser\nElevando os pensamentos, há uma voz que te chama,\nNão deixe nada te deter\n\nAmanhã será... mesmo que o dia chegue...`,
  'alvorada-jovem': `ALVORADA JOVEM\n(Gutemberg Paschoal)\n\nJovem, desbravador de novos mares\nDepende só de seus cantares\nO renascer de um mundo bom, bem melhor!\n\nJovem, com sangue novo e peito aberto\nSerá traçado um rumo certo\nGuiaremos o mundo ao amor\nGuiaremos o mundo ao amor!\n\nE quando amanhecer, o sol de primavera\nDesvenda a nova era em mim e em você`,
  'apenas-amar': `APENAS AMAR\n(Denis Soares)\n\nTodo o Céu se organiza para vir nos transformar\nO Cristo já nos auxilia para vida nova alçar\nOndas de atos belos podem vir de nossas próprias mãos\nSentimentos triunfantes brotam naturais, então\n\nVou por dentro me preparar\nPra sem rebeldia aceitar\nInvencível expande o amor\nEm fraternidade\n\nE eu desejo apenas amar, e todo um mar\nDe afetos cativar...\nUma luz vem pra resplandecer, dentro do ser\nPara ao Pai glorificar...\n\nAmar é mais que dar e receber amor\nDeixar fluir a força divina em nós\nApenas amar`,
  'confia-e-vai': `CONFIA E VAI\n(Rafael Concellos)\n\nPor que te preocupas com o dia de amanhã\nBasta cada dia seu mal\nSe o Pai veste os lírios do campo\nPor que não há de te vestir\n\nAgora é o momento, busca em ti a mudança\nVocê nada tem a temer\nSe tens por incerta a luz do teu futuro\nDe luz a prece é tua fonte, segue em paz\n\nConfia e vai!!\nO sol lá nos montes te espera\nVocê é capaz\nA fé move montanhas\nNão olhe pra trás!\nNão dá pra mudar o passado\nConfia e vai,\nVai em paz!`,
  'conquista': `CONQUISTA\n(Marielza Tiscate)\n\nMesmo que o dia chegue\nTrazendo nuvens negras\nEscala o monte da certeza\nE lá de cima vê\n\nComo é pequena e passageira a dor\nÉ assim que se exercita para a vida imortal\nO que é hoje tão difícil\nAmanhã será... conquista\n\nO que é hoje tão difícil\nAmanhã será... conquista`,
  'daqui-so-se-leva-o-amor': `DAQUI SÓ SE LEVA O AMOR\n(Jota Quest)\n\nViver, tudo que a vida tem pra te dar\nSaber, em qualquer segundo tudo pode mudar\nFazer, sem esperar nada em troca\nCorrer, sem se desviar da rota\nAcreditar no sorriso, e não se dar por vencido\n\nQuerer, mudar o mundo ao seu redor\nSaber, que mudar por dentro pode ser o melhor\nFazer, sem esperar nada em troca\nVencer, é recomeçar\nQuando o sol chegar, quando o céu se abrir\nSaiba que estarei aqui\n\nVamos amar no presente, vamos cuidar mais da gente\nVamos pensar diferente, porque...\nDaqui só se leva o amor\nDaqui só se leva o amor\nDaqui só se leva o amor`,
  'depende-de-voce': `DEPENDE DE VOCÊ\n(Ariovaldo Filho)\n\nAmigo, brilha o sol além de sua janela\nPerceba ao seu redor o quanto a vida é bela\nAcenda em você o brilho que dormita\nLiberte as asas e voe ao encontro do mais puro amor\nAbrace o infinito...\n\nDesperte para a luz, deixe o amor brotar,\nFrutificar de vez que a vida é muito mais\nDepende de você querer acreditar\nQue pode ser feliz e, enfim, se libertar\n\nCha la lá, chalalá ôôô\nCha la lá, chalalá ôôô`,
  'diga-a-si-mesmo': `DIGA A SI MESMO\n(Autor Desconhecido)\n\nDiga a si mesmo que você mudou de vez\nQue plantou a fé como um grão de mostarda\nNo solo do coração\n\nDiga pra vida que você cansou de sofrer\nHomem de fé se tornou confiante\nNo gigante amor de Deus\n\nTenha esperança no dia de amanhã\nSiga em paz, sempre em frente\nDiga bem forte pro que te aflige\nQue Deus é contigo\n\nDiga a montanha para sair daí\nQue certamente ela sairá\nDiga ao problema que tua fé é grande\nQue Deus é maior ainda\n\nE é contigo`,
  'eu-livre': `EU-LIVRE\n(Denis Soares)\n\nSuave embalo de uma vida que volta às provas do amor\nSe renova como linda flor que quer se regenerar\nE se não sabe o que mais virá, sabe que o tempo a protegerá\n\nEm torno de tantas escolhas estradas pra se trilhar\nO que a vida tem de certo? O que de novo mostrará?\nSente por dentro vontade de amar e de viver sorrindo, de se libertar\n\nSigo os caminhos que escolhi, sei que me prendo ao que sou\nE que estou pronto pra crescer expandir os limites de amar\nCada virtude que eu colhi, fruto do tempo de existir\nMe determino e vou lutar: Eu-livre! Quero continuar!\n\nE na essência de viver e ser feliz\nSigo o compasso da beleza de encontrar\nPois cada elo que eu faço e vivo me faz\nAlgo sentir, muito aprender, pra continuar\nA aventura de sonhar, de mais amar\n\nSigo os caminhos que escolhi, sei que me prendo ao que sou\nE que estou pronto pra crescer expandir os limites de amar\nCada virtude que eu colhi, fruto do tempo de existir\nMe determino e vou lutar: Eu-livre! Quero continuar!\n\nSigo em frente e vou continuar\nEssa aventura de sonhar... Eu-livre!\nEu-livre!\nEu-livre!`,
  'e-preciso-saber-viver': `É PRECISO SABER VIVER\n(Roberto e Erasmo)\n\nQuem espera que a vida, seja feita de ilusão\nPode até ficar maluco, ou morrer na solidão\nÉ preciso ter cuidado, pra mais tarde não sofrer\nÉ preciso saber viver\n\nToda pedra no caminho, você pode retirar\nNuma flor que tem espinhos, você pode se arranhar\nSe o bem e o mal existem, você pode escolher\nÉ preciso saber viver\n\nÉ preciso saber viver\nÉ preciso saber viver\nÉ preciso saber viver\nSaber viver\n\nÉ preciso saber viver\nÉ preciso saber viver\nÉ preciso saber viver\nSaber viver`,
  'familia-universal': `FAMÍLIA UNIVERSAL\n(Tim e Vanessa)\n\nEm nome do Pai\nAprendo a ser forte como o sol\n\nEm nome da Mãe\nAprendo os encantos de uma lua\n\nEm nome do irmão\nAprendo as virtudes de um cristão\n\nJesus\nÉ mãe, pai, filho, irmão celeste\n\nÓ Mestre,\nSou um universo\nDentro do universo da família\nA caminho do milênio do amor`,
  'flutuar': `FLUTUAR\n(Grupo Arte Nascente)\n\nSim, eu vou lembrar, dessa manhã\nSentir você chegar\nDou todo meu ser\nBelo jardim prá você brotar\nSei que você nunca negou\nEu só vou te encontrar aqui, dentro de mim\nSei e só quero te dizer\nQue o tempo não acabou\nVoltei a te buscar\n\nMe faça mais leve, quero flutuar\nNo vôo da vida, venha me levar\n\nSim, eu vou lembrar, dessa manhã\nSentir você chegar\nDou todo meu ser\nBelo jardim prá você brotar\nSei que você nunca negou\nEu só vou te encontrar aqui, dentro de mim\nSei e só quero te dizer\nQue o tempo não acabou\nVoltei a te buscar\n\nMe faça mais leve, quero flutuar\nNo vôo da vida, venha me levar`,
  'forca-do-bem': `FORÇA DO BEM\n(Grupo Bem)\n\nMe perguntam de onde vem, esse olhar firme e seguro\nQuando tudo é desafio, quando tudo é tão escuro\n\nAs respostas que eu tenho, se encontram neste mundo\nA certeza que eu sinto, é o meu porto-seguro\n\nEu me cerco, eu vigio, eu me importo, eu procuro\nPersevero, acredito eu transformo este mundo\n\nÉ na força do bem, que eu me apego e caminho\nNo poder que mantém, meu coração protegido\n\nE não há nada, nada, nada a temer\nPois a força do bem é o maior poder`,
  'ja-e-tempo': `JÁ É TEMPO\n(James Marotta)\n\nSem saber que um sol maior,\nBrilhava sobre mim quase me perdi\nIa sem destino, mas o amor...\n\nNão, não há lugar pra tristeza em quem sabe amar\nÉ uma luz que nos faz sonhar, é uma alegria que nos faz chorar\nE sofrer sorrindo, sem temor...\n\nOlhe, olhe,\nOlhe pro céu, já é tempo de cair o véu\nDe sair amando, espalhando a paz, a paz\n\nNão, não há lugar pra tristeza em quem sabe amar\nÉ uma luz que nos faz sonhar, é uma alegria que te faz chorar\nE sofrer sorrindo, sem temor...\n\nA paz, a paz, a paz, a paz...`,
  'lei-de-amor': `LEI DE AMOR\n(Autor Desconhecido)\n\nTente acreditar, o amor ainda virá\nPela reencarnação, tudo vai mudar\nA família que nos cerca é aquela que escolhemos\nPara a nossa evolução, isso agora entendemos\n\nNascer, viver, morrer\nRenascer ainda, progredir sempre\nTal é a lei\n\nNascer, viver, morrer\nRenascer ainda, progredir sempre\nTal é a lei`,
  'livro-imortal': `LIVRO IMORTAL\n(Denis Soares)\n\nLogo ao acordar pode notar\nQue tantas coisas estão fora do lugar\nEstende a mão e ganha um não\nOu um olhar de pura incompreensão\n\nVontade de se transformar\nMas a descrença tenta te desanimar\nBoa intenção no coração\nEntão é hora de pensar...\n\nSe você deixar que o mundo te iluda\nE o faça pensar que é normal\n\nE esquecer que há vida além\nComo se tudo fosse a vida material\n\nAh! Veja como é bom saber que essa vida há de ser\nMera página escrita em um livro imortal\nE se pra sempre eu vou viver hora é de perceber\nQue as coisas desse mundo se explicam no final\n\nAh! Não se perca na ilusão de querer ter a razão\nO que vale nessa vida está dentro do coração\nMais do que ter opinião é tão bom poder deixar\nQue as nossas atitudes possam tudo transformar`,
  'novo-rumo': `NOVO RUMO\n(Marcelo Manga)\n\nVem fazer um mundo diferente\nPor toda a parte, em cada olhar\nRealizar seu sonho mais bonito\nEspalhando pelo ar\nAlegria e Paz\n\nVem sentir a vida convidando\nA cada instante, a ser feliz\nNotar então que é sempre possível\nRomper com a escuridão\nDo medo e da dor\n\nBem-aventurados pelo simples fato de estar transformando\nSeu caminho pra melhor\nE a sua voz então irá cantar\n\nQue está sempre a mudar mesmo que sem perceber\nRedescobrindo seu interior\nEstá sempre a mudar mesmo que sem perceber\nQuem acredita no amor\nDando um novo rumo para o seu viver\n\nVem fazer um mundo diferente...\n\nQue está sempre a mudar mesmo que sem perceber\nRedescobrindo seu interior\nEstá sempre a mudar mesmo que sem perceber\nQuem acredita no amor\nDando um novo rumo para o seu viver\n\nVem fazer um mundo diferente...`,
  'nos': `NÓS\n(Denis Soares)\n\nOlha pra mim, vou te dizer\nO quanto eu gosto de estar junto a você\nOlha pra mim, deixa eu falar\nQue esse abraço faz minh'alma voar\n\nJuntos até o fim, eu quero sim\nTe ver sorrir, sem preocupar\n\nFarei que seja assim, perto de mim\nPra nunca mais fazer você chorar\n\nOlha pra mim vou te contar\nQue a muitas vidas aprendo a amar\nSei que errei, te fiz sofrer\nMas os meus olhos não podem esconder\n\nO que eu sinto aqui em meu coração\nAmigo eu fiz essa canção\nToda vez que eu cantar vou me lembrar\nPra nunca mais fazer você chorar\nPra nunca mais fazer você chorar\nPra nunca mais fazer você chorar`,
  'o-amor-de-jesus': `O AMOR DE JESUS\n(Diamantes de Poeira - Ariovaldo Filho)\n\nOlha a manhã que brilha na janela\nEste sol de Deus é luz\nDe amor em seu coração\n\nOlha o que Deus te deu de presente\nDiamantes de poeira flutuando\nEm raios de luz\n\nVamos louvar a Deus\nE agradecer a tudo\nO novo dia amanheceu\n\nNos levantar agora\nSair ao mundo hoje\nTestificar o amor\n\nO amor de Jesus\nO amor de Jesus`,
  'o-essencial': `O ESSENCIAL\n(Carlos Faria Jr.)\n\nToda magia do amor está no próprio ser\nEm acordar e ver o dia nascer\nPensando no bem, num mundo feliz\nO essencial da vida é a sabedoria para conduzi-la\nFazer de cada dia um dia de paz, um dia feliz\n\nTodo bem que se possa fazer\nSe deve fazer sem hesitação\n\nDar sem pensar em receber\nO amor sempre presente em cada coração\n\nEsse caminho leva o homem\nQue busca a verdade, a encontrar a paz\nA fraternidade ajuda a construir\nUm mundo mais irmão\n\nTodo bem que se possa fazer\nSe deve fazer sem hesitação\n\nDar sem pensar em receber\nO amor sempre presente em cada coração\n\nEsse caminho leva o homem\nQue busca a verdade, a encontrar a paz\nA fraternidade ajuda a construir\nUm mundo mais irmão, mais irmão`,
  'para-sempre-em-meu-coracao': `PARA SEMPRE EM MEU CORAÇÃO\n(Willi de Barros)\n\nNem se eu pudesse ter o pôr do sol...\nA lua ou as estrelas, toda natureza\nNem se eu tivesse todo ouro\nE não tivesse um amigo... Nada teria\n\nPois quando eu começasse a me sentir sozinho\nQuem é que me consolaria?\nMas Deus é bom botou você em meu caminho\nPra que não me falte alegria...\n\nVocê vai estar...\nPara sempre dentro do meu coração\nVou lembrar de nós...\nSempre que alguém contar esta canção\n\nNem se eu soubesse muitas palavras...\nNem se eu as transformasse em poesia\nNão diria tudo o que há pra dizer...\nA inspiração de certo faltaria\n\nMas se algum dia me faltar o seu abraço?\nNão será triste a saudade\nPois sei que nos encontraremos no espaço\nMeu amigo de verdade...\n\nVocê vai estar...\nPara sempre dentro do meu coração\nVou lembrar de nós...\nSempre que alguém contar esta canção`,
  'pense-ja-no-amanha': `PENSE JÁ NO AMANHÃ\n(André Bezerra)\n\nO que você está fazendo agora?\nPense já no amanhã!\nA vida passa, não demore, encontre sua direção...\nSe você quiser mudar o mundo, só depende de você...\nDeixar fluir o que vem lá do fundo do coração\n\nÉ hora de mudar, de encontrar a direção,\nDe tentar abrir as portas do seu coração,\nDe tentar mudar o mundo através do amor,\nDemonstrar que a juventude tem o seu valor\n\nTem o seu valor ô ô\n\nO que você está fazendo agora?\nPense já no amanhã!\nA vida passa, não demore, encontre sua direção...\nSe você quiser mudar o mundo, só depende de você...\nDeixar fluir o que vem lá do fundo do coração\n\nÉ hora de mudar, de encontrar a direção,\nDe tentar abrir as portas do seu coração,\nDe tentar mudar o mundo através do amor,\nDemonstrar que a juventude tem o seu valor\n\nTem o seu valor ô ô`,
  'pra-melhorar': `PRÁ MELHORAR\n(André Pirola)\n\nO telefone toca, você não quer atender\nA carta já chegou, você não quis abrir pra ler\nO filme tá na tela, você não parou pra ver\nA vida tá passando e você não quer viver\n\nPra melhorar, sintonizar o coração\nNas ondas do amor e da razão\nTem que estudar e praticar\nJesus tá nos chamando meu irmão\n\nNascendo e renascendo, viajando a viver\nCom fé vou transportando as montanhas do sofrer\nAproveitar as oportunidades pra valer\nPois quanto mais eu erro mais eu volto pra aprender\n\nPra melhorar, sintonizar o coração\nNas ondas do amor e da razão\nTem que estudar e praticar\nJesus tá nos chamando meu irmão\n\nPra melhorar, sintonizar o coração\nNas ondas do amor e da razão\nTem que estudar e praticar\nJesus tá nos chamando meu irmão`,
  'segue-o-sol': `SEGUE O SOL\n(Marcelo Daimom)\n\nDesperto com um sorriso\nEm cada amanhecer, de um novo dia\nFaço o que preciso\nPara sempre estar, em pura sintonia\n\nHá dias em que o mundo\nParece te mostrar, que tudo é tão difícil\nPor mais que você lute\nTem sempre que enfrentar, a tantos desafios\n\nMas foi Jesus quem me ensinou\nQue nascemos de novo pra encontrar o amor\n\nSegue o sol, Segue o sol\nMinha vida sempre segue o sol\nSegue o sol, Segue o sol\nMinha vida sempre segue`,
  'ser-crianca': `SER CRIANÇA\n(Allan Filho/Carlos Alexandre/Gustavo Novaes)\n\nTudo que envolve meu caminho é sinal de esperança\nMesmo quando caio me permito reerguer o coração\n\nPois então, como uma criança aprendendo a lição,\nCorrendo os mesmos riscos, não teme o crescer,\nFaz seu novo dia e deixa acontecer... sua alegria é viver\n\nTudo que envolve minha vida é procura de harmonia\nMesmo quando surge a tristeza não me deixo abater\n\nSendo assim, quero ser criança sem medo de mim,\nQuero entrar na dança e nada temer,\nFazer meu novo dia e ver acontecer...\nToda a alegria de viver em paz\n\nTudo que envolve meu caminho é sinal de esperança\nMesmo quando surge a tristeza não me deixo abater\n\nPois então, como uma criança aprendendo a lição,\nCorrendo os mesmos riscos, não teme o crescer,\nFaz seu novo dia e deixa acontecer... sua alegria é viver\n\nToda a alegria de viver em paz`,
  'sorriso-de-esperanca': `SORRISO DE ESPERANÇA\n(Marielza Tiscate)\n\nAh, faz da tua vida um sorriso de esperança\nSorria, sorria...\nE alegre aqueles que apenas têm\nLágrimas de dor para mostrar\n\nE, com a tua voz, segue em frente o caminho\nE canta, e canta...\nPara quem não vê razão mais pra cantar\nMostra a estes que o amanhã será melhor\n\nSerá feliz, se houver sorriso, se houver\nCanção, coragem e fé\n\nSorria, sorria, e canta, e canta`,
  'te-encontrei': `TE ENCONTREI\n(Carol Badon, Gustavo Garcia e Rafael Concellos)\n\nQuero estar onde a luz está\nQuero pertencer ao Teu caminhar\nQuero conhecer esse alvorecer OooOooooh\n\nVou buscar me reinventar\nPoder refletir Tua forma de amar\nQuero construir esse novo ser em mim\n\nComo chegar assim tão longe\nComo sentir o Teu cuidado\nAinda me sinto tão pequeno\nQuero seguir o Teu chamado\n\nE eu busquei\nPelos montes escalei, meus medos eu enfrentei\nMeus medos eu enfrentei\nPra finalmente chegar\n\nTe encontrei\nO amor que sempre busquei\nEstava aqui dentro e eu sei\nEm Teus braços é o meu lugar\n\nQuero estar onde a luz está...\n\nE eu busquei\nPelos montes escalei, meus medos eu enfrentei\nMeus medos eu enfrentei\nPra finalmente chegar\n\nTe encontrei\nO amor que sempre busquei\nEstava aqui dentro e eu sei\nEm Teus braços é o meu lugar\n\nMeu lugar, Meu lugar\nMeu lugar, Meu lugar\nMeu lugar\nEm Teus braços é o meu lugar`,
  'voo-vento-e-luz': `VÔO / VENTO E LUZ\n(Joelson Queiroz / Maurício Soares e Oscar Weiss)\n\nOuça o vento na folhagem,\nVeja a luz do sol e a lua\nPra viver em paz na terra,\nTemos que tentar sorrir, e não\nLigar mais pra tristeza\nNo caminho sempre há pedras\nNão sentir mais o abandono,\nReunir e cantar pra Jesus\n\nO sol conduz à paz e a ser feliz\nSem ter por que pedir\nMais que o vento e a luz, Jesus...\nJesus...\n\nO sol conduz à paz e a ser feliz\nSem ter por que pedir mais que o...\nVento e a luz`,
};

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

function App() {
  const [musicaAtiva, setMusicaAtiva] = useState<Musica | null>(null);
  const [fonteSize, setFonteSize] = useState(2.2);
  const [historico, setHistorico] = useState<Musica[]>([]);

  const abrirMusica = useCallback((musica: Musica) => {
    setMusicaAtiva(musica);
    setHistorico(prev => {
      const novo = prev.filter(m => m.id !== musica.id);
      return [...novo, musica].slice(-10);
    });
  }, []);

  const voltar = () => {
    setMusicaAtiva(null);
  };

  const aumentarFonte = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFonteSize(prev => Math.min(prev + 0.3, 4.0));
  };

  const diminuirFonte = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFonteSize(prev => Math.max(prev - 0.3, 1.0));
  };

  if (musicaAtiva) {
    const letraCompleta = letrasMap[musicaAtiva.id] || 'Letra não encontrada.';
    const linhas = letraCompleta.split('\n');
    const titulo = linhas[0] || '';
    const autor = linhas[1] || '';
    const corpo = linhas.slice(2).join('\n').trim();
    const textoCurto = corpo.length < 400;

    return (
      <div className="tela-cheia" onClick={voltar}>
        <div className="letra-container">
          <div className="botoes-fonte">
            <button className="btn-fonte" onClick={aumentarFonte}>A+</button>
            <button className="btn-fonte" onClick={diminuirFonte}>A-</button>
          </div>
          <div className="moldura-titulo">
            <div className="titulo-exibicao">{titulo}</div>
            {autor && <div className="autor-exibicao">{autor}</div>}
          </div>
          <pre
            className={`letra-texto ${textoCurto ? 'coluna-unica' : ''}`}
            style={{ fontSize: `${fonteSize}rem` }}
          >
            {corpo}
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
          <p>Mocidade Ranulfo Xavier</p>
        </header>

        <div className="dois-lados">
          <div className="lado esquerdo">
            <h2 className="titulo-lado">🎵 Músicas Lentas</h2>
            <div className="grade-botoes">
              {lentas.map(musica => (
                <button key={musica.id} className="btn-musica btn-lenta" onClick={() => abrirMusica(musica)}>
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
                <button key={musica.id} className="btn-musica btn-agitada" onClick={() => abrirMusica(musica)}>
                  <span className="btn-titulo">{musica.titulo}</span>
                  <span className="btn-autor">{musica.autor}</span>
                </button>
              ))}
            </div>
          </div>
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
