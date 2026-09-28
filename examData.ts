export interface DialogueLine {
  id: string;
  speaker: 'profesor' | 'alumno';
  es: string;
  hy: string;
  notes?: string;
}

export interface DialogueTopic {
  id: string;
  category: 'ciencias' | 'lengua';
  categoryLabelEs: string;
  categoryLabelRu: string;
  titleEs: string;
  titleHy: string;
  icon: string;
  shortDesc: string;
  lines: DialogueLine[];
  extendedLines?: DialogueLine[];
}

export interface QuickQuestion {
  id: number;
  topicCategory: 'ciencias' | 'lengua';
  questionEs: string;
  questionHy: string;
  answerEs: string;
  answerHy: string;
}

export interface ExamQuestionItem {
  id: number;
  questionEs: string;
  questionHy: string;
  answerEs: string;
  answerHy: string;
}

export interface ExamTopicBlock {
  id: string;
  titleEs: string;
  titleHy: string;
  icon: string;
  questions: ExamQuestionItem[];
}

export interface TeacherExtraQuestion {
  id: number;
  teacherEs: string;
  teacherHy: string;
  studentEs: string;
  studentHy: string;
}

export const TOPICS_DATA: DialogueTopic[] = [
  // 1. HUMAN EVOLUTION
  {
    id: 'evolution',
    category: 'ciencias',
    categoryLabelEs: 'Ciencias e Historia',
    categoryLabelRu: 'История и Естествознание',
    titleEs: '1. HUMAN EVOLUTION',
    titleHy: 'ՄԱՐԴՈՒ ԷՎՈԼՅՈՒՑԻԱ',
    icon: '🌱',
    shortDesc: 'Эволюция человека, орудия труда, огонь, общение',
    lines: [
      {
        id: 'evo-1',
        speaker: 'profesor',
        es: 'Vamos a empezar con la evolución humana. ¿Qué significa exactamente?',
        hy: 'Սկսենք մարդու էվոլյուցիայից։ Ի՞նչ է դա նշանակում։'
      },
      {
        id: 'evo-2',
        speaker: 'alumno',
        es: 'Es el proceso de cambio y desarrollo de los seres humanos a lo largo del tiempo.',
        hy: 'Դա մարդկանց փոփոխության և զարգացման գործընթացն է ժամանակի ընթացքում։'
      },
      {
        id: 'evo-3',
        speaker: 'profesor',
        es: '¿Cómo vivían los primeros seres humanos?',
        hy: 'Ինչպե՞ս էին ապրում առաջին մարդիկ։'
      },
      {
        id: 'evo-4',
        speaker: 'alumno',
        es: 'Vivían en pequeños grupos y dependían mucho de la naturaleza.',
        hy: 'Նրանք ապրում էին փոքր խմբերով և շատ էին կախված բնությունից։'
      },
      {
        id: 'evo-5',
        speaker: 'profesor',
        es: '¿Qué aprendieron a hacer?',
        hy: 'Ի՞նչ սովորեցին անել։'
      },
      {
        id: 'evo-6',
        speaker: 'alumno',
        es: 'Aprendieron a fabricar herramientas, usar el fuego y comunicarse mejor.',
        hy: 'Նրանք սովորեցին գործիքներ պատրաստել, կրակ օգտագործել և ավելի լավ հաղորդակցվել։'
      },
      {
        id: 'evo-7',
        speaker: 'profesor',
        es: '¿Por qué fue importante el fuego?',
        hy: 'Ինչո՞ւ էր կրակը կարևոր։'
      },
      {
        id: 'evo-8',
        speaker: 'alumno',
        es: 'Porque servía para calentarse, cocinar, iluminar y protegerse.',
        hy: 'Որովհետև այն ծառայում էր տաքանալու, կերակուր պատրաստելու, լուսավորելու և պաշտպանվելու համար։'
      }
    ],
    extendedLines: [
      {
        id: 'evo-ext-1',
        speaker: 'profesor',
        es: 'Hoy vamos a hablar de la evolución humana. ¿Sabes qué significa “evolución humana”?',
        hy: 'Այսօր խոսելու ենք մարդու էվոլյուցիայի մասին։ Գիտե՞ս՝ ինչ է նշանակում «մարդու էվոլյուցիա»։'
      },
      {
        id: 'evo-ext-2',
        speaker: 'alumno',
        es: 'Sí. Es el proceso de cambio y desarrollo de los seres humanos a lo largo del tiempo.',
        hy: 'Այո։ Դա մարդկանց փոփոխության և զարգացման գործընթացն է ժամանակի ընթացքում։'
      },
      {
        id: 'evo-ext-3',
        speaker: 'profesor',
        es: 'Muy bien. ¿Cómo vivían los primeros seres humanos?',
        hy: 'Շատ լավ։ Ինչպե՞ս էին ապրում առաջին մարդիկ։'
      },
      {
        id: 'evo-ext-4',
        speaker: 'alumno',
        es: 'Vivían en pequeños grupos y buscaban comida y refugio.',
        hy: 'Նրանք ապրում էին փոքր խմբերով և փնտրում էին սնունդ ու ապաստան։'
      },
      {
        id: 'evo-ext-5',
        speaker: 'profesor',
        es: '¿Qué aprendieron a hacer?',
        hy: 'Ի՞նչ սովորեցին նրանք անել։'
      },
      {
        id: 'evo-6',
        speaker: 'alumno',
        es: 'Aprendieron a fabricar herramientas, a usar el fuego y a comunicarse mejor.',
        hy: 'Նրանք սովորեցին գործիքներ պատրաստել, օգտագործել կրակը և ավելի լավ հաղորդակցվել։'
      },
      {
        id: 'evo-7',
        speaker: 'profesor',
        es: '¿Por qué eran importantes las herramientas?',
        hy: 'Ինչո՞ւ էին գործիքները կարևոր։'
      },
      {
        id: 'evo-8',
        speaker: 'alumno',
        es: 'Porque servían para cazar, cortar alimentos y defenderse.',
        hy: 'Որովհետև դրանք օգտագործվում էին որսի, սնունդ կտրելու և պաշտպանվելու համար։'
      },
      {
        id: 'evo-9',
        speaker: 'profesor',
        es: 'Perfecto. ¿Qué cambios importantes tuvo el ser humano?',
        hy: 'Հիանալի։ Ի՞նչ կարևոր փոփոխություններ ունեցավ մարդը։'
      },
      {
        id: 'evo-10',
        speaker: 'alumno',
        es: 'Desarrolló el lenguaje, el pensamiento y nuevas formas de vivir en grupo.',
        hy: 'Նա զարգացրեց լեզուն, մտածողությունը և խմբով ապրելու նոր ձևեր։'
      }
    ]
  },

  // 2. PALEOLITHIC
  {
    id: 'paleolithic',
    category: 'ciencias',
    categoryLabelEs: 'Ciencias e Historia',
    categoryLabelRu: 'История и Естествознание',
    titleEs: '2. PALEOLITHIC',
    titleHy: 'ՊԱԼԵՈԼԻԹ',
    icon: '🪨',
    shortDesc: 'Древнейшая эпоха, кочевники (nómadas), охота и собирательство',
    lines: [
      {
        id: 'pal-1',
        speaker: 'profesor',
        es: 'Ahora dime, ¿qué es el Paleolítico?',
        hy: 'Հիմա ասա՝ ի՞նչ է Պալեոլիթը։'
      },
      {
        id: 'pal-2',
        speaker: 'alumno',
        es: 'Es la etapa más antigua de la Prehistoria.',
        hy: 'Դա նախապատմության ամենահին ժամանակաշրջանն է։'
      },
      {
        id: 'pal-3',
        speaker: 'profesor',
        es: '¿Cómo vivían las personas en esa época?',
        hy: 'Ինչպե՞ս էին մարդիկ ապրում այդ ժամանակ։'
      },
      {
        id: 'pal-4',
        speaker: 'alumno',
        es: 'Vivían en pequeños grupos y eran nómadas.',
        hy: 'Նրանք ապրում էին փոքր խմբերով և քոչվոր էին։'
      },
      {
        id: 'pal-5',
        speaker: 'profesor',
        es: '¿Qué significa que eran nómadas?',
        hy: 'Ի՞նչ է նշանակում, որ նրանք քոչվոր էին։'
      },
      {
        id: 'pal-6',
        speaker: 'alumno',
        es: 'Que se desplazaban de un lugar a otro.',
        hy: 'Դա նշանակում է, որ նրանք տեղափոխվում էին մի վայրից մյուսը։'
      },
      {
        id: 'pal-7',
        speaker: 'profesor',
        es: '¿Cómo conseguían comida?',
        hy: 'Ինչպե՞ս էին սնունդ ձեռք բերում։'
      },
      {
        id: 'pal-8',
        speaker: 'alumno',
        es: 'Cazaban, pescaban y recogían frutos y plantas.',
        hy: 'Նրանք որսում էին, ձուկ էին բռնում և մրգեր ու բույսեր էին հավաքում։'
      }
    ],
    extendedLines: [
      {
        id: 'pal-ext-1',
        speaker: 'profesor',
        es: 'Ahora vamos a hablar del Paleolítico. ¿Qué es el Paleolítico?',
        hy: 'Հիմա խոսենք Պալեոլիթի մասին։ Ի՞նչ է Պալեոլիթը։'
      },
      {
        id: 'pal-ext-2',
        speaker: 'alumno',
        es: 'Es la etapa más antigua de la Prehistoria.',
        hy: 'Դա նախապատմության ամենահին ժամանակաշրջանն է։'
      },
      {
        id: 'pal-ext-3',
        speaker: 'profesor',
        es: '¿Cómo vivían las personas en el Paleolítico?',
        hy: 'Ինչպե՞ս էին մարդիկ ապրում Պալեոլիթում։'
      },
      {
        id: 'pal-ext-4',
        speaker: 'alumno',
        es: 'Vivían en pequeños grupos y se desplazaban de un lugar a otro.',
        hy: 'Նրանք ապրում էին փոքր խմբերով և տեղափոխվում էին մի վայրից մյուսը։'
      },
      {
        id: 'pal-ext-5',
        speaker: 'profesor',
        es: '¿Cómo se llama a las personas que no viven siempre en el mismo lugar?',
        hy: 'Ինչպե՞ս են կոչվում մարդիկ, որոնք մշտապես նույն վայրում չեն ապրում։'
      },
      {
        id: 'pal-ext-6',
        speaker: 'alumno',
        es: 'Se llaman nómadas.',
        hy: 'Նրանք կոչվում են քոչվորներ։'
      },
      {
        id: 'pal-ext-7',
        speaker: 'profesor',
        es: '¿Qué herramientas utilizaban?',
        hy: 'Ի՞նչ գործիքներ էին օգտագործում։'
      },
      {
        id: 'pal-ext-8',
        speaker: 'alumno',
        es: 'Utilizaban herramientas de piedra, madera y hueso.',
        hy: 'Նրանք օգտագործում էին քարից, փայտից և ոսկորից պատրաստված գործիքներ։'
      },
      {
        id: 'pal-ext-9',
        speaker: 'profesor',
        es: '¿Qué importancia tenía el fuego?',
        hy: 'Ի՞նչ նշանակություն ուներ կրակը։'
      },
      {
        id: 'pal-ext-10',
        speaker: 'alumno',
        es: 'El fuego servía para calentarse, cocinar, iluminar y protegerse.',
        hy: 'Կրակը ծառայում էր տաքանալու, կերակուր պատրաստելու, լուսավորելու և պաշտպանվելու համար։'
      },
      {
        id: 'pal-ext-11',
        speaker: 'profesor',
        es: 'Muy bien. ¿Dónde vivían?',
        hy: 'Շատ լավ։ Որտե՞ղ էին ապրում։'
      },
      {
        id: 'pal-ext-12',
        speaker: 'alumno',
        es: 'Vivían en cuevas o en refugios sencillos.',
        hy: 'Նրանք ապրում էին քարանձավներում կամ պարզ կացարաններում։'
      }
    ]
  },

  // 3. NEOLITHIC (NEW!)
  {
    id: 'neolithic',
    category: 'ciencias',
    categoryLabelEs: 'Ciencias e Historia',
    categoryLabelRu: 'История и Естествознание',
    titleEs: '3. NEOLITHIC',
    titleHy: 'ՆԵՈԼԻԹ',
    icon: '🌾',
    shortDesc: 'Земледелие, одомашнивание, оседлый образ жизни, керамика',
    lines: [
      {
        id: 'neo-1',
        speaker: 'profesor',
        es: '¿Qué cambia en el Neolítico?',
        hy: 'Ի՞նչ է փոխվում Նեոլիթում։'
      },
      {
        id: 'neo-2',
        speaker: 'alumno',
        es: 'Las personas empiezan a cultivar plantas y domesticar animales.',
        hy: 'Մարդիկ սկսում են բույսեր մշակել և կենդանիներ ընտելացնել։'
      },
      {
        id: 'neo-3',
        speaker: 'profesor',
        es: '¿Siguen siendo nómadas?',
        hy: 'Նրանք շարունակո՞ւմ են քոչվոր մնալ։'
      },
      {
        id: 'neo-4',
        speaker: 'alumno',
        es: 'No, empiezan a vivir de forma sedentaria.',
        hy: 'Ոչ, նրանք սկսում են նստակյաց ապրել։'
      },
      {
        id: 'neo-5',
        speaker: 'profesor',
        es: '¿Y por qué pueden quedarse en un lugar fijo?',
        hy: 'Իսկ ինչո՞ւ կարող են մնալ մեկ վայրում։'
      },
      {
        id: 'neo-6',
        speaker: 'alumno',
        es: 'Porque producen alimentos mediante la agricultura y la ganadería.',
        hy: 'Որովհետև նրանք սնունդ են արտադրում գյուղատնտեսության և անասնապահության միջոցով։'
      },
      {
        id: 'neo-7',
        speaker: 'profesor',
        es: '¿Qué más empiezan a fabricar?',
        hy: 'Էլ ի՞նչ են սկսում պատրաստել։'
      },
      {
        id: 'neo-8',
        speaker: 'alumno',
        es: 'Cerámica, tejidos y herramientas más elaboradas.',
        hy: 'Խեցեղեն, գործվածքներ և ավելի զարգացած գործիքներ։'
      }
    ]
  },

  // 4. THE METAL AGES (NEW!)
  {
    id: 'metal_ages',
    category: 'ciencias',
    categoryLabelEs: 'Ciencias e Historia',
    categoryLabelRu: 'История и Естествознание',
    titleEs: '4. THE METAL AGES',
    titleHy: 'ՄԵՏԱՂՆԵՐԻ ԴԱՐ',
    icon: '⚔️',
    shortDesc: 'Обработка меди, бронзы и железа, рост поселений, торговля',
    lines: [
      {
        id: 'met-1',
        speaker: 'profesor',
        es: '¿Qué caracteriza la Edad de los Metales?',
        hy: 'Ինչո՞վ է բնորոշ Մետաղների դարը։'
      },
      {
        id: 'met-2',
        speaker: 'alumno',
        es: 'Que las personas aprendieron a trabajar los metales.',
        hy: 'Մարդիկ սովորեցին մշակել մետաղները։'
      },
      {
        id: 'met-3',
        speaker: 'profesor',
        es: '¿Qué metales utilizaron?',
        hy: 'Ի՞նչ մետաղներ էին օգտագործում։'
      },
      {
        id: 'met-4',
        speaker: 'alumno',
        es: 'Primero cobre, después bronce y finalmente hierro.',
        hy: 'Սկզբում պղինձ, հետո բրոնզ, իսկ վերջում երկաթ։'
      },
      {
        id: 'met-5',
        speaker: 'profesor',
        es: '¿Para qué servían esos metales?',
        hy: 'Ինչի՞ համար էին օգտագործվում այդ մետաղները։'
      },
      {
        id: 'met-6',
        speaker: 'alumno',
        es: 'Para fabricar herramientas, armas y otros objetos resistentes.',
        hy: 'Դրանցից պատրաստում էին գործիքներ, զենքեր և ամուր առարկաներ։'
      },
      {
        id: 'met-7',
        speaker: 'profesor',
        es: '¿Qué cambios sociales hubo?',
        hy: 'Ի՞նչ հասարակական փոփոխություններ եղան։'
      },
      {
        id: 'met-8',
        speaker: 'alumno',
        es: 'Crecieron los poblados, aumentó el comercio y aparecieron nuevos oficios.',
        hy: 'Բնակավայրերը մեծացան, առևտուրն աճեց և նոր մասնագիտություններ առաջացան։'
      }
    ]
  },

  // 5. GEOSPHERE
  {
    id: 'geosphere',
    category: 'ciencias',
    categoryLabelEs: 'Ciencias e Historia',
    categoryLabelRu: 'История и Естествознание',
    titleEs: '5. GEOSPHERE',
    titleHy: 'ԳԵՈՍՖԵՐԱ',
    icon: '🌍',
    shortDesc: 'Твердая оболочка Земли: corteza, manto, núcleo',
    lines: [
      {
        id: 'geo-1',
        speaker: 'profesor',
        es: 'Vamos con ciencias. ¿Qué es la geosfera?',
        hy: 'Անցնենք բնագիտությանը։ Ի՞նչ է գեոսֆերան։'
      },
      {
        id: 'geo-2',
        speaker: 'alumno',
        es: 'Es la parte sólida de la Tierra.',
        hy: 'Դա Երկրի պինդ մասն է։'
      },
      {
        id: 'geo-3',
        speaker: 'profesor',
        es: '¿Cuáles son sus capas principales?',
        hy: 'Որո՞նք են դրա հիմնական շերտերը։'
      },
      {
        id: 'geo-4',
        speaker: 'alumno',
        es: 'Corteza, manto y núcleo.',
        hy: 'Երկրակեղև, մանթիա և միջուկ։'
      },
      {
        id: 'geo-5',
        speaker: 'profesor',
        es: '¿Dónde vivimos nosotros?',
        hy: 'Մենք որտե՞ղ ենք ապրում։'
      },
      {
        id: 'geo-6',
        speaker: 'alumno',
        es: 'Sobre la corteza terrestre.',
        hy: 'Երկրակեղևի վրա։'
      },
      {
        id: 'geo-7',
        speaker: 'profesor',
        es: '¿Y qué hay en el centro de la Tierra?',
        hy: 'Իսկ ի՞նչ կա Երկրի կենտրոնում։'
      },
      {
        id: 'geo-8',
        speaker: 'alumno',
        es: 'El núcleo.',
        hy: 'Միջուկը։'
      }
    ],
    extendedLines: [
      {
        id: 'geo-ext-1',
        speaker: 'profesor',
        es: 'Vamos a cambiar de tema. ¿Qué es la geosfera?',
        hy: 'Փոխենք թեման։ Ի՞նչ է գեոսֆերան։'
      },
      {
        id: 'geo-ext-2',
        speaker: 'alumno',
        es: 'La geosfera es la parte sólida de la Tierra.',
        hy: 'Գեոսֆերան Երկրի պինդ մասն է։'
      },
      {
        id: 'geo-ext-3',
        speaker: 'profesor',
        es: '¿Cuáles son las capas principales de la geosfera?',
        hy: 'Որո՞նք են գեոսֆերայի հիմնական շերտերը։'
      },
      {
        id: 'geo-ext-4',
        speaker: 'alumno',
        es: 'Son la corteza, el manto y el núcleo.',
        hy: 'Դրանք են երկրակեղևը, մանթիան և միջուկը։'
      },
      {
        id: 'geo-ext-5',
        speaker: 'profesor',
        es: '¿De qué está formada la corteza?',
        hy: 'Ինչի՞ց է կազմված երկրակեղևը։'
      },
      {
        id: 'geo-ext-6',
        speaker: 'alumno',
        es: 'Está formada principalmente por rocas y minerales.',
        hy: 'Այն հիմնականում կազմված է ապարներից և հանքանյութերից։'
      }
    ]
  },

  // 6. ATMOSPHERE
  {
    id: 'atmosphere',
    category: 'ciencias',
    categoryLabelEs: 'Ciencias e Historia',
    categoryLabelRu: 'История и Естествознание',
    titleEs: '6. ATMOSPHERE',
    titleHy: 'ՄԹՆՈԼՈՐՏ',
    icon: '☁️',
    shortDesc: 'Газовая оболочка Земли: кислород, азот, тропосфера',
    lines: [
      {
        id: 'atm-1',
        speaker: 'profesor',
        es: '¿Qué es la atmósfera?',
        hy: 'Ի՞նչ է մթնոլորտը։'
      },
      {
        id: 'atm-2',
        speaker: 'alumno',
        es: 'Es la capa de gases que rodea la Tierra.',
        hy: 'Դա Երկիրը շրջապատող գազերի շերտն է։'
      },
      {
        id: 'atm-3',
        speaker: 'profesor',
        es: '¿Cuál es el gas más abundante?',
        hy: 'Ո՞ր գազն է ամենաշատը։'
      },
      {
        id: 'atm-4',
        speaker: 'alumno',
        es: 'El nitrógeno.',
        hy: 'Ազոտը։'
      },
      {
        id: 'atm-5',
        speaker: 'profesor',
        es: '¿Y qué gas necesitamos para respirar?',
        hy: 'Իսկ ո՞ր գազն է մեզ անհրաժեշտ շնչելու համար։'
      },
      {
        id: 'atm-6',
        speaker: 'alumno',
        es: 'El oxígeno.',
        hy: 'Թթվածինը։'
      },
      {
        id: 'atm-7',
        speaker: 'profesor',
        es: '¿Dónde se producen la lluvia, el viento y las nubes?',
        hy: 'Որտե՞ղ են առաջանում անձրևը, քամին և ամպերը։'
      },
      {
        id: 'atm-8',
        speaker: 'alumno',
        es: 'En la troposfera.',
        hy: 'Տրոպոսֆերայում։'
      }
    ]
  },

  // 7. FUNCIONES DEL LENGUAJE (NEW!)
  {
    id: 'funciones_lenguaje',
    category: 'lengua',
    categoryLabelEs: 'Lengua Castellana',
    categoryLabelRu: 'Испанский язык и Грамматика',
    titleEs: '7. FUNCIONES DEL LENGUAJE',
    titleHy: 'ԼԵԶՎԻ ԳՈՐԾԱՌՈՒՅԹՆԵՐԸ',
    icon: '🗣️',
    shortDesc: 'Expresiva, apelativa, fática, metalingüística',
    lines: [
      {
        id: 'fl-1',
        speaker: 'profesor',
        es: '¿Qué son las funciones del lenguaje?',
        hy: 'Ի՞նչ են լեզվի գործառույթները։'
      },
      {
        id: 'fl-2',
        speaker: 'alumno',
        es: 'Son las distintas formas de usar la lengua según nuestra intención.',
        hy: 'Դրանք լեզուն օգտագործելու տարբեր ձևերն են՝ ըստ մեր նպատակի։'
      },
      {
        id: 'fl-3',
        speaker: 'profesor',
        es: 'Si digo “Estoy muy feliz”, ¿qué función utilizo?',
        hy: 'Եթե ասում եմ «Ես շատ ուրախ եմ», ո՞ր գործառույթն եմ օգտագործում։'
      },
      {
        id: 'fl-4',
        speaker: 'alumno',
        es: 'La función expresiva.',
        hy: 'Արտահայտչական գործառույթը։'
      },
      {
        id: 'fl-5',
        speaker: 'profesor',
        es: '¿Y “Cierra la puerta, por favor”?',
        hy: 'Իսկ «Փակի՛ր դուռը, խնդրում եմ»։'
      },
      {
        id: 'fl-6',
        speaker: 'alumno',
        es: 'La función apelativa.',
        hy: 'Դիմողական գործառույթը։'
      },
      {
        id: 'fl-7',
        speaker: 'profesor',
        es: '¿Qué función aparece en “¿Me escuchas?”?',
        hy: '«Ինձ լսո՞ւմ ես» նախադասության մեջ ո՞ր գործառույթն է։'
      },
      {
        id: 'fl-8',
        speaker: 'alumno',
        es: 'La función fática.',
        hy: 'Ֆատիկական գործառույթը։'
      },
      {
        id: 'fl-9',
        speaker: 'profesor',
        es: 'Si digo “Casa es un sustantivo”, ¿qué función es?',
        hy: 'Եթե ասում եմ «Casa-ն գոյական է», ո՞ր գործառույթն է։'
      },
      {
        id: 'fl-10',
        speaker: 'alumno',
        es: 'La metalingüística.',
        hy: 'Մետալեզվականը։'
      }
    ]
  },

  // 8. MODALIDADES ORACIONALES (NEW!)
  {
    id: 'modalidades_oracionales',
    category: 'lengua',
    categoryLabelEs: 'Lengua Castellana',
    categoryLabelRu: 'Испанский язык и Грамматика',
    titleEs: '8. MODALIDADES ORACIONALES',
    titleHy: 'ՆԱԽԱԴԱՍՈՒԹՅԱՆ ՏԵՍԱԿՆԵՐԸ',
    icon: '✍️',
    shortDesc: 'Interrogativa, exclamativa, exhortativa/imperativa, dubitativa',
    lines: [
      {
        id: 'mo-1',
        speaker: 'profesor',
        es: '¿Qué indican las modalidades oracionales?',
        hy: 'Ի՞նչ են ցույց տալիս նախադասության տեսակները։'
      },
      {
        id: 'mo-2',
        speaker: 'alumno',
        es: 'Indican la intención del hablante.',
        hy: 'Դրանք ցույց են տալիս խոսողի նպատակը։'
      },
      {
        id: 'mo-3',
        speaker: 'profesor',
        es: '¿Qué tipo es “¿Dónde vives?”?',
        hy: '«Որտե՞ղ ես ապրում» նախադասությունը ո՞ր տեսակն է։'
      },
      {
        id: 'mo-4',
        speaker: 'alumno',
        es: 'Interrogativa.',
        hy: 'Հարցական։'
      },
      {
        id: 'mo-5',
        speaker: 'profesor',
        es: '¿Y “¡Qué bonito!”?',
        hy: 'Իսկ «Ի՜նչ գեղեցիկ է»։'
      },
      {
        id: 'mo-6',
        speaker: 'alumno',
        es: 'Exclamativa.',
        hy: 'Բացականչական։'
      },
      {
        id: 'mo-7',
        speaker: 'profesor',
        es: '¿Qué tipo es “Ven aquí”?',
        hy: '«Արի այստեղ» նախադասությունը ո՞ր տեսակն է։'
      },
      {
        id: 'mo-8',
        speaker: 'alumno',
        es: 'Exhortativa o imperativa.',
        hy: 'Հրամայական կամ հորդորական։'
      },
      {
        id: 'mo-9',
        speaker: 'profesor',
        es: '¿Y “Quizá venga mañana”?',
        hy: 'Իսկ «Գուցե վաղը գա»։'
      },
      {
        id: 'mo-10',
        speaker: 'alumno',
        es: 'Dubitativa.',
        hy: 'Կասկածական։'
      }
    ]
  },

  // 9. ELEMENTOS DE LA COMUNICACIÓN (NEW!)
  {
    id: 'elementos_comunicacion',
    category: 'lengua',
    categoryLabelEs: 'Lengua Castellana',
    categoryLabelRu: 'Испанский язык и Грамматика',
    titleEs: '9. ELEMENTOS DE LA COMUNICACIÓN',
    titleHy: 'ՀԱՂՈՐԴԱԿՑՈՒԹՅԱՆ ՏԱՐՐԵՐԸ',
    icon: '📡',
    shortDesc: 'Emisor, receptor, canal, código, mensaje',
    lines: [
      {
        id: 'ec-1',
        speaker: 'profesor',
        es: '¿Quién es el emisor?',
        hy: 'Ո՞վ է ուղարկողը։'
      },
      {
        id: 'ec-2',
        speaker: 'alumno',
        es: 'La persona que envía el mensaje.',
        hy: 'Այն մարդը, ով ուղարկում է հաղորդագրությունը։'
      },
      {
        id: 'ec-3',
        speaker: 'profesor',
        es: '¿Y el receptor?',
        hy: 'Իսկ ստացողը։'
      },
      {
        id: 'ec-4',
        speaker: 'alumno',
        es: 'La persona que recibe el mensaje.',
        hy: 'Այն մարդը, ով ստանում է հաղորդագրությունը։'
      },
      {
        id: 'ec-5',
        speaker: 'profesor',
        es: '¿Qué es el canal?',
        hy: 'Ի՞նչ է կապուղին։'
      },
      {
        id: 'ec-6',
        speaker: 'alumno',
        es: 'Es el medio por el que se transmite el mensaje.',
        hy: 'Դա այն միջոցն է, որով հաղորդագրությունը փոխանցվում է։'
      },
      {
        id: 'ec-7',
        speaker: 'profesor',
        es: '¿Qué es el código?',
        hy: 'Ի՞նչ է կոդը։'
      },
      {
        id: 'ec-8',
        speaker: 'alumno',
        es: 'Es el sistema de signos que usamos para comunicarnos.',
        hy: 'Դա նշանների համակարգն է, որը օգտագործում ենք հաղորդակցվելու համար։'
      }
    ]
  },

  // 10. CATEGORÍAS GRAMATICALES (NEW!)
  {
    id: 'categorias_gramaticales',
    category: 'lengua',
    categoryLabelEs: 'Lengua Castellana',
    categoryLabelRu: 'Испанский язык и Грамматика',
    titleEs: '10. CATEGORÍAS GRAMATICALES',
    titleHy: 'ՔԵՐԱԿԱՆԱԿԱՆ ԿԱՐԳԵՐ',
    icon: '📚',
    shortDesc: 'Sustantivo, adjetivo, verbo, adverbio',
    lines: [
      {
        id: 'cg-1',
        speaker: 'profesor',
        es: '¿Qué es un sustantivo?',
        hy: 'Ի՞նչ է գոյականը։'
      },
      {
        id: 'cg-2',
        speaker: 'alumno',
        es: 'Una palabra que nombra personas, animales, lugares, objetos o ideas.',
        hy: 'Բառ, որը անվանում է մարդ, կենդանի, վայր, առարկա կամ գաղափար։'
      },
      {
        id: 'cg-3',
        speaker: 'profesor',
        es: '¿Qué hace un adjetivo?',
        hy: 'Ի՞նչ է անում ածականը։'
      },
      {
        id: 'cg-4',
        speaker: 'alumno',
        es: 'Describe al sustantivo.',
        hy: 'Նկարագրում է գոյականը։'
      },
      {
        id: 'cg-5',
        speaker: 'profesor',
        es: '¿Qué expresa un verbo?',
        hy: 'Ի՞նչ է արտահայտում բայը։'
      },
      {
        id: 'cg-6',
        speaker: 'alumno',
        es: 'Una acción, estado o proceso.',
        hy: 'Գործողություն, վիճակ կամ գործընթաց։'
      },
      {
        id: 'cg-7',
        speaker: 'profesor',
        es: 'Dame un ejemplo de adverbio.',
        hy: 'Մակբայի օրինակ ասա։'
      },
      {
        id: 'cg-8',
        speaker: 'alumno',
        es: 'Muy, rápidamente, bien.',
        hy: 'Muy, rápidamente, bien։'
      }
    ]
  },

  // 11. LA COMUNICACIÓN Y LOS TEXTOS (NEW!)
  {
    id: 'comunicacion_textos',
    category: 'lengua',
    categoryLabelEs: 'Lengua Castellana',
    categoryLabelRu: 'Испанский язык и Грамматика',
    titleEs: '11. LA COMUNICACIÓN Y LOS TEXTOS',
    titleHy: 'ՀԱՂՈՐԴԱԿՑՈՒԹՅՈՒՆԸ ԵՎ ՏԵՔՍՏԵՐԸ',
    icon: '📝',
    shortDesc: 'Определение текста, устный и письменный, когерентность (coherencia)',
    lines: [
      {
        id: 'ct-1',
        speaker: 'profesor',
        es: '¿Qué es la comunicación?',
        hy: 'Ի՞նչ է հաղորդակցությունը։'
      },
      {
        id: 'ct-2',
        speaker: 'alumno',
        es: 'Es el proceso de intercambio de información.',
        hy: 'Դա տեղեկության փոխանակման գործընթացն է։'
      },
      {
        id: 'ct-3',
        speaker: 'profesor',
        es: '¿Qué es un texto?',
        hy: 'Ի՞նչ է տեքստը։'
      },
      {
        id: 'ct-4',
        speaker: 'alumno',
        es: 'Un conjunto de enunciados que transmite un mensaje completo.',
        hy: 'Նախադասությունների ամբողջություն, որը փոխանցում է ամբողջական հաղորդագրություն։'
      },
      {
        id: 'ct-5',
        speaker: 'profesor',
        es: '¿Un texto puede ser oral?',
        hy: 'Տեքստը կարո՞ղ է բանավոր լինել։'
      },
      {
        id: 'ct-6',
        speaker: 'alumno',
        es: 'Sí, puede ser oral o escrito.',
        hy: 'Այո, կարող է լինել բանավոր կամ գրավոր։'
      },
      {
        id: 'ct-7',
        speaker: 'profesor',
        es: '¿Qué significa coherencia?',
        hy: 'Ի՞նչ է նշանակում տրամաբանական կապ։'
      },
      {
        id: 'ct-8',
        speaker: 'alumno',
        es: 'Que las ideas están relacionadas y tienen sentido.',
        hy: 'Որ գաղափարները կապված են և իմաստ ունեն։'
      }
    ]
  },

  // 12. LA LENGUA COMO SISTEMA (NEW!)
  {
    id: 'lengua_sistema',
    category: 'lengua',
    categoryLabelEs: 'Lengua Castellana',
    categoryLabelRu: 'Испанский язык и Грамматика',
    titleEs: '12. LA LENGUA COMO SISTEMA',
    titleHy: 'ԼԵԶՈՒՆ ՈՐՊԵՍ ՀԱՄԱԿԱՐԳ',
    icon: '🧩',
    shortDesc: 'Звуки (sonidos), слова (palabras), предложения (oraciones)',
    lines: [
      {
        id: 'ls-1',
        speaker: 'profesor',
        es: '¿Qué es una lengua?',
        hy: 'Ի՞նչ է լեզուն։'
      },
      {
        id: 'ls-2',
        speaker: 'alumno',
        es: 'Es un sistema organizado de signos.',
        hy: 'Դա նշանների կազմակերպված համակարգ է։'
      },
      {
        id: 'ls-3',
        speaker: 'profesor',
        es: '¿Para qué usamos la lengua?',
        hy: 'Ինչի՞ համար ենք օգտագործում լեզուն։'
      },
      {
        id: 'ls-4',
        speaker: 'alumno',
        es: 'Para comunicarnos.',
        hy: 'Հաղորդակցվելու համար։'
      },
      {
        id: 'ls-5',
        speaker: 'profesor',
        es: '¿Qué forman los sonidos?',
        hy: 'Ի՞նչ են կազմում հնչյունները։'
      },
      {
        id: 'ls-6',
        speaker: 'alumno',
        es: 'Forman palabras.',
        hy: 'Կազմում են բառեր։'
      },
      {
        id: 'ls-7',
        speaker: 'profesor',
        es: '¿Y las palabras?',
        hy: 'Իսկ բառե՞րը։'
      },
      {
        id: 'ls-8',
        speaker: 'alumno',
        es: 'Forman grupos y oraciones.',
        hy: 'Կազմում են բառակապակցություններ և նախադասություններ։'
      }
    ]
  },

  // 13. PALABRAS Y SIGNIFICADOS (NEW!)
  {
    id: 'palabras_significados',
    category: 'lengua',
    categoryLabelEs: 'Lengua Castellana',
    categoryLabelRu: 'Испанский язык и Грамматика',
    titleEs: '13. PALABRAS Y SIGNIFICADOS',
    titleHy: 'ԲԱՌԵՐ ԵՎ ԻՄԱՍՏՆԵՐ',
    icon: '🔍',
    shortDesc: 'Синонимы (sinónimos), антонимы (antónimos), полисемия (polisemia)',
    lines: [
      {
        id: 'ps-1',
        speaker: 'profesor',
        es: '¿Qué son los sinónimos?',
        hy: 'Ի՞նչ են հոմանիշները։'
      },
      {
        id: 'ps-2',
        speaker: 'alumno',
        es: 'Palabras que tienen un significado igual o parecido.',
        hy: 'Բառեր, որոնք ունեն նույն կամ նման իմաստ։'
      },
      {
        id: 'ps-3',
        speaker: 'profesor',
        es: 'Dame un ejemplo.',
        hy: 'Օրինակ ասա։'
      },
      {
        id: 'ps-4',
        speaker: 'alumno',
        es: 'Feliz y contento.',
        hy: 'Feliz և contento։'
      },
      {
        id: 'ps-5',
        speaker: 'profesor',
        es: '¿Qué son los antónimos?',
        hy: 'Ի՞նչ են հականիշները։'
      },
      {
        id: 'ps-6',
        speaker: 'alumno',
        es: 'Palabras con significados contrarios.',
        hy: 'Հակառակ իմաստ ունեցող բառեր։'
      },
      {
        id: 'ps-7',
        speaker: 'profesor',
        es: 'Por ejemplo…',
        hy: 'Օրինակ…'
      },
      {
        id: 'ps-8',
        speaker: 'alumno',
        es: 'Grande y pequeño.',
        hy: 'Grande և pequeño։'
      },
      {
        id: 'ps-9',
        speaker: 'profesor',
        es: '¿Qué significa polisemia?',
        hy: 'Ի՞նչ է նշանակում բազմիմաստություն։'
      },
      {
        id: 'ps-10',
        speaker: 'alumno',
        es: 'Que una palabra tiene varios significados.',
        hy: 'Որ մեկ բառը ունի մի քանի իմաստ։'
      }
    ]
  }
];

export const TEACHER_EXTRA_QUESTIONS: TeacherExtraQuestion[] = [
  {
    id: 1,
    teacherEs: '¿Puedes explicarlo con tus propias palabras?',
    teacherHy: 'Կարո՞ղ ես բացատրել քո բառերով։',
    studentEs: 'Sí. En pocas palabras…',
    studentHy: 'Այո։ Կարճ ասած՝…'
  },
  {
    id: 2,
    teacherEs: '¿Puedes darme un ejemplo?',
    teacherHy: 'Կարո՞ղ ես օրինակ բերել։',
    studentEs: 'Sí. Por ejemplo…',
    studentHy: 'Այո։ Օրինակ՝…'
  },
  {
    id: 3,
    teacherEs: '¿Por qué crees que era importante?',
    teacherHy: 'Քո կարծիքով ինչո՞ւ էր դա կարևոր։',
    studentEs: 'Porque ayudaba a las personas a vivir y sobrevivir mejor.',
    studentHy: 'Որովհետև դա մարդկանց օգնում էր ավելի լավ ապրել և գոյատևել։'
  },
  {
    id: 4,
    teacherEs: '¿Puedes repetirlo de una forma más sencilla?',
    teacherHy: 'Կարո՞ղ ես ավելի պարզ ձևով կրկնել։',
    studentEs: 'Sí. Quiero decir que…',
    studentHy: 'Այո։ Ուզում եմ ասել, որ…'
  },
  {
    id: 5,
    teacherEs: 'Muy bien. ¿Algo más?',
    teacherHy: 'Շատ լավ։ Ուրիշ բան կարո՞ղ ես ավելացնել։',
    studentEs: 'Sí. También es importante recordar que…',
    studentHy: 'Այո։ Կարևոր է նաև հիշել, որ…'
  }
];

export const RAPID_QUESTIONS: QuickQuestion[] = [
  {
    id: 1,
    topicCategory: 'ciencias',
    questionEs: '¿Qué es la geosfera?',
    questionHy: 'Ի՞նչ է գեոսֆերան։',
    answerEs: 'La parte sólida de la Tierra.',
    answerHy: 'Երկրի պինդ մասը։'
  },
  {
    id: 2,
    topicCategory: 'ciencias',
    questionEs: '¿Qué es la atmósfera?',
    questionHy: 'Ի՞նչ է մթնոլորտը։',
    answerEs: 'La capa de gases que rodea la Tierra.',
    answerHy: 'Երկիրը շրջապատող գազերի շերտը։'
  },
  {
    id: 3,
    topicCategory: 'ciencias',
    questionEs: '¿Cuáles son las capas de la geosfera?',
    questionHy: 'Որո՞նք են գեոսֆերայի շերտերը։',
    answerEs: 'Corteza, manto y núcleo.',
    answerHy: 'Երկրակեղև, մանթիա և միջուկ։'
  },
  {
    id: 4,
    topicCategory: 'ciencias',
    questionEs: '¿Qué significa nómada?',
    questionHy: 'Ի՞նչ է նշանակում «քոչվոր»։',
    answerEs: 'Una persona que se desplaza de un lugar a otro.',
    answerHy: 'Մարդ, որը տեղափոխվում է մի վայրից մյուսը։'
  },
  {
    id: 5,
    topicCategory: 'ciencias',
    questionEs: '¿Qué periodo es el más antiguo de la Prehistoria?',
    questionHy: 'Ո՞ր ժամանակաշրջանն է նախապատմության ամենահինը։',
    answerEs: 'El Paleolítico.',
    answerHy: 'Պալեոլիթը։'
  },
  {
    id: 6,
    topicCategory: 'ciencias',
    questionEs: '¿Qué cambia en el Neolítico?',
    questionHy: 'Ի՞նչ է փոխվում Նեոլիթում։',
    answerEs: 'Empiezan la agricultura, la ganadería y la vida sedentaria.',
    answerHy: 'Սկսվում են գյուղատնտեսությունը, անասնապահությունը և նստակյաց կյանքը։'
  },
  {
    id: 7,
    topicCategory: 'ciencias',
    questionEs: '¿Qué metales se usaron en la Edad de los Metales?',
    questionHy: 'Ի՞նչ մետաղներ էին օգտագործում Մետաղների դարում։',
    answerEs: 'Cobre, bronce y hierro.',
    answerHy: 'Պղինձ, բրոնզ և երկաթ։'
  },
  {
    id: 8,
    topicCategory: 'lengua',
    questionEs: '¿Quién es el emisor en la comunicación?',
    questionHy: 'Ո՞վ է ուղարկողը հաղորդակցության մեջ։',
    answerEs: 'La persona que envía el mensaje.',
    answerHy: 'Այն մարդը, ով ուղարկում է հաղորդագրությունը։'
  },
  {
    id: 9,
    topicCategory: 'lengua',
    questionEs: 'Si digo “Estoy muy feliz”, ¿qué función del lenguaje es?',
    questionHy: 'Եթե ասում եմ «Ես շատ ուրախ եմ», ո՞ր գործառույթն է։',
    answerEs: 'La función expresiva.',
    answerHy: 'Արտահայտչական գործառույթը։'
  },
  {
    id: 10,
    topicCategory: 'lengua',
    questionEs: '¿Qué son los antónimos?',
    questionHy: 'Ի՞նչ են հականիշները։',
    answerEs: 'Palabras con significados contrarios (ej. grande y pequeño).',
    answerHy: 'Հակառակ իմաստ ունեցող բառեր (օրինակ՝ մեծ և փոքր)։'
  }
];

export const EXAM_TOPICS_12: ExamTopicBlock[] = [
  {
    id: 'evolution',
    titleEs: '1. HUMAN EVOLUTION',
    titleHy: 'ՄԱՐԴՈՒ ԷՎՈԼՅՈՒՑԻԱ',
    icon: '🌱',
    questions: [
      {
        id: 1,
        questionEs: '¿Qué es la evolución humana?',
        questionHy: 'Ի՞նչ է մարդու էվոլյուցիան։',
        answerEs: 'Es el proceso de cambio y desarrollo de los seres humanos.',
        answerHy: 'Դա մարդկանց փոփոխության և զարգացման գործընթացն է։'
      },
      {
        id: 2,
        questionEs: '¿Cómo vivían los primeros seres humanos?',
        questionHy: 'Ինչպե՞ս էին ապրում առաջին մարդիկ։',
        answerEs: 'Vivían en pequeños grupos.',
        answerHy: 'Նրանք ապրում էին փոքր խմբերով։'
      },
      {
        id: 3,
        questionEs: '¿De qué dependían para sobrevivir?',
        questionHy: 'Ինչի՞ց էին կախված գոյատևելու համար։',
        answerEs: 'Dependían de la naturaleza.',
        answerHy: 'Նրանք կախված էին բնությունից։'
      },
      {
        id: 4,
        questionEs: '¿Qué buscaban para vivir?',
        questionHy: 'Ի՞նչ էին փնտրում ապրելու համար։',
        answerEs: 'Buscaban alimentos y lugares seguros.',
        answerHy: 'Նրանք փնտրում էին սնունդ և ապահով վայրեր։'
      },
      {
        id: 5,
        questionEs: '¿Qué aprendieron a fabricar?',
        questionHy: 'Ի՞նչ սովորեցին պատրաստել։',
        answerEs: 'Herramientas.',
        answerHy: 'Գործիքներ։'
      },
      {
        id: 6,
        questionEs: '¿Qué aprendieron a utilizar?',
        questionHy: 'Ի՞նչ սովորեցին օգտագործել։',
        answerEs: 'El fuego.',
        answerHy: 'Կրակը։'
      },
      {
        id: 7,
        questionEs: '¿Por qué era importante el fuego?',
        questionHy: 'Ինչո՞ւ էր կրակը կարևոր։',
        answerEs: 'Para cocinar, calentarse, iluminar y protegerse.',
        answerHy: 'Կերակուր պատրաստելու, տաքանալու, լուսավորելու և պաշտպանվելու համար։'
      },
      {
        id: 8,
        questionEs: '¿Para qué servían las herramientas?',
        questionHy: 'Ինչի՞ համար էին ծառայում գործիքները։',
        answerEs: 'Para cazar, cortar y trabajar.',
        answerHy: 'Որս անելու, կտրելու և աշխատելու համար։'
      },
      {
        id: 9,
        questionEs: '¿Qué desarrollaron los seres humanos con el tiempo?',
        questionHy: 'Ի՞նչ զարգացրին մարդիկ ժամանակի ընթացքում։',
        answerEs: 'El lenguaje, el pensamiento y nuevas formas de organización.',
        answerHy: 'Լեզուն, մտածողությունը և կազմակերպման նոր ձևերը։'
      },
      {
        id: 10,
        questionEs: '¿Por qué fue importante el lenguaje?',
        questionHy: 'Ինչո՞ւ էր լեզուն կարևոր։',
        answerEs: 'Porque les ayudaba a comunicarse.',
        answerHy: 'Որովհետև դա օգնում էր նրանց հաղորդակցվել։'
      },
      {
        id: 11,
        questionEs: '¿Cómo cambió la vida de los seres humanos con el tiempo?',
        questionHy: 'Ինչպե՞ս փոխվեց մարդկանց կյանքը ժամանակի ընթացքում։',
        answerEs: 'Aprendieron nuevas cosas y mejoraron su forma de vivir.',
        answerHy: 'Նրանք սովորեցին նոր բաներ և բարելավեցին իրենց ապրելակերպը։'
      },
      {
        id: 12,
        questionEs: 'Explícame la evolución humana con tus propias palabras.',
        questionHy: 'Բացատրի՛ր մարդու էվոլյուցիան քո բառերով։',
        answerEs: 'Respuesta libre con las ideas principales (cambio, desarrollo, adaptación).',
        answerHy: 'Ազատ պատասխան՝ հիմնական գաղափարներով (փոփոխություն, զարգացում, հարմարվողականություն)։'
      }
    ]
  },
  {
    id: 'paleolithic',
    titleEs: '2. PALEOLITHIC',
    titleHy: 'ՊԱԼԵՈԼԻԹ',
    icon: '🪨',
    questions: [
      {
        id: 1,
        questionEs: '¿Qué es el Paleolítico?',
        questionHy: 'Ի՞նչ է Պալեոլիթը։',
        answerEs: 'Es la etapa más antigua de la Prehistoria.',
        answerHy: 'Դա նախապատմության ամենահին ժամանակաշրջանն է։'
      },
      {
        id: 2,
        questionEs: '¿En qué etapa de la historia se encuentra?',
        questionHy: 'Պատմության ո՞ր փուլին է պատկանում։',
        answerEs: 'En la Prehistoria.',
        answerHy: 'Նախապատմությանը։'
      },
      {
        id: 3,
        questionEs: '¿Cómo vivían las personas en el Paleolítico?',
        questionHy: 'Ինչպե՞ս էին մարդիկ ապրում Պալեոլիթում։',
        answerEs: 'Vivían en pequeños grupos.',
        answerHy: 'Նրանք ապրում էին փոքր խմբերով։'
      },
      {
        id: 4,
        questionEs: '¿Eran sedentarios o nómadas?',
        questionHy: 'Նրանք նստակյա՞ց էին, թե՞ քոչվոր։',
        answerEs: 'Eran nómadas.',
        answerHy: 'Նրանք քոչվոր էին։'
      },
      {
        id: 5,
        questionEs: '¿Qué significa “nómada”?',
        questionHy: 'Ի՞նչ է նշանակում «քոչվոր»։',
        answerEs: 'Que se desplaza de un lugar a otro.',
        answerHy: 'Որը տեղափոխվում է մի վայրից մյուսը։'
      },
      {
        id: 6,
        questionEs: '¿Por qué se desplazaban de un lugar a otro?',
        questionHy: 'Ինչո՞ւ էին մի վայրից մյուսը տեղափոխվում։',
        answerEs: 'Para buscar comida, agua y lugares seguros.',
        answerHy: 'Սնունդ, ջուր և ապահով վայրեր փնտրելու համար։'
      },
      {
        id: 7,
        questionEs: '¿Cómo conseguían alimentos?',
        questionHy: 'Ինչպե՞ս էին սնունդ ձեռք բերում։',
        answerEs: 'Cazaban, pescaban y recolectaban.',
        answerHy: 'Որսում էին, ձուկ էին բռնում և հավաքչություն էին անում։'
      },
      {
        id: 8,
        questionEs: '¿Qué comían?',
        questionHy: 'Ի՞նչ էին ուտում։',
        answerEs: 'Carne, pescado, frutos y plantas.',
        answerHy: 'Միս, ձուկ, մրգեր և բույսեր։'
      },
      {
        id: 9,
        questionEs: '¿Con qué materiales fabricaban herramientas?',
        questionHy: 'Ի՞նչ նյութերից էին գործիքներ պատրաստում։',
        answerEs: 'Piedra, madera y hueso.',
        answerHy: 'Քար, փայտ և ոսկոր։'
      },
      {
        id: 10,
        questionEs: '¿Dónde vivían?',
        questionHy: 'Որտե՞ղ էին ապրում։',
        answerEs: 'En cuevas y refugios sencillos.',
        answerHy: 'Քարանձավներում և պարզ կացարաններում։'
      },
      {
        id: 11,
        questionEs: '¿Para qué utilizaban el fuego?',
        questionHy: 'Ինչի՞ համար էին օգտագործում կրակը։',
        answerEs: 'Para cocinar, calentarse, iluminar y protegerse.',
        answerHy: 'Կերակուր պատրաստելու, տաքանալու, լուսավորելու և պաշտպանվելու համար։'
      },
      {
        id: 12,
        questionEs: '¿Por qué era importante la naturaleza para ellos?',
        questionHy: 'Ինչո՞ւ էր բնությունը կարևոր նրանց համար։',
        answerEs: 'Porque obtenían de ella alimentos y recursos.',
        answerHy: 'Որովհետև այնտեղից ստանում էին սնունդ և ռեսուրսներ։'
      }
    ]
  },
  {
    id: 'geosphere',
    titleEs: '3. GEOSPHERE',
    titleHy: 'ԳԵՈՍՖԵՐԱ',
    icon: '🌍',
    questions: [
      {
        id: 1,
        questionEs: '¿Qué es la geosfera?',
        questionHy: 'Ի՞նչ է գեոսֆերան։',
        answerEs: 'Es la parte sólida de la Tierra.',
        answerHy: 'Դա Երկրի պինդ մասն է։'
      },
      {
        id: 2,
        questionEs: '¿De qué está formada principalmente?',
        questionHy: 'Ինչի՞ց է հիմնականում կազմված։',
        answerEs: 'De rocas y minerales.',
        answerHy: 'Ապարներից և հանքանյութերից։'
      },
      {
        id: 3,
        questionEs: '¿Cuántas capas principales tiene?',
        questionHy: 'Քանի՞ հիմնական շերտ ունի։',
        answerEs: 'Tres.',
        answerHy: 'Երեք։'
      },
      {
        id: 4,
        questionEs: '¿Cuáles son esas capas?',
        questionHy: 'Որո՞նք են այդ շերտերը։',
        answerEs: 'Corteza, manto y núcleo.',
        answerHy: 'Երկրակեղև, մանթիա և միջուկ։'
      },
      {
        id: 5,
        questionEs: '¿Cuál es la capa exterior de la Tierra?',
        questionHy: 'Ո՞րն է Երկրի արտաքին շերտը։',
        answerEs: 'La corteza.',
        answerHy: 'Երկրակեղևը։'
      },
      {
        id: 6,
        questionEs: '¿Dónde vivimos nosotros?',
        questionHy: 'Մենք որտե՞ղ ենք ապրում։',
        answerEs: 'Sobre la corteza terrestre.',
        answerHy: 'Երկրակեղևի վրա։'
      },
      {
        id: 7,
        questionEs: '¿Qué capa está debajo de la corteza?',
        questionHy: 'Ո՞ր շերտն է երկրակեղևի տակ։',
        answerEs: 'El manto.',
        answerHy: 'Մանթիան։'
      },
      {
        id: 8,
        questionEs: '¿Dónde está el núcleo?',
        questionHy: 'Որտե՞ղ է միջուկը։',
        answerEs: 'En el centro de la Tierra.',
        answerHy: 'Երկրի կենտրոնում։'
      },
      {
        id: 9,
        questionEs: '¿Cuál es la capa más profunda?',
        questionHy: 'Ո՞րն է ամենախոր շերտը։',
        answerEs: 'El núcleo.',
        answerHy: 'Միջուկը։'
      },
      {
        id: 10,
        questionEs: '¿Qué son las rocas y los minerales?',
        questionHy: 'Ի՞նչ են ապարներն ու հանքանյութերը։',
        answerEs: 'Son materiales que forman parte de la geosfera.',
        answerHy: 'Դրանք նյութեր են, որոնք կազմում են գեոսֆերայի մասը։'
      },
      {
        id: 11,
        questionEs: 'Si digo corteza, manto y núcleo, ¿de qué hablo?',
        questionHy: 'Եթե ասում եմ երկրակեղև, մանթիա և միջուկ, ինչի՞ մասին եմ խոսում։',
        answerEs: 'De las capas de la geosfera.',
        answerHy: 'Գեոսֆերայի շերտերի մասին։'
      },
      {
        id: 12,
        questionEs: 'Resume la geosfera en una frase.',
        questionHy: 'Մեկ նախադասությամբ ամփոփի՛ր գեոսֆերան։',
        answerEs: 'La geosfera es la parte sólida de la Tierra y tiene corteza, manto y núcleo.',
        answerHy: 'Գեոսֆերան Երկրի պինդ մասն է և ունի երկրակեղև, մանթիա և միջուկ։'
      }
    ]
  },
  {
    id: 'atmosphere',
    titleEs: '4. ATMOSPHERE',
    titleHy: 'ՄԹՆՈԼՈՐՏ',
    icon: '☁️',
    questions: [
      {
        id: 1,
        questionEs: '¿Qué es la atmósfera?',
        questionHy: 'Ի՞նչ է մթնոլորտը։',
        answerEs: 'Es la capa de gases que rodea la Tierra.',
        answerHy: 'Դա Երկիրը շրջապատող գազերի շերտն է։'
      },
      {
        id: 2,
        questionEs: '¿Qué rodea la atmósfera?',
        questionHy: 'Ի՞նչն է շրջապատում մթնոլորտը։',
        answerEs: 'La Tierra.',
        answerHy: 'Երկիրը։'
      },
      {
        id: 3,
        questionEs: '¿Por qué es importante la atmósfera?',
        questionHy: 'Ինչո՞ւ է մթնոլորտը կարևոր։',
        answerEs: 'Porque permite la vida y protege el planeta.',
        answerHy: 'Որովհետև այն հնարավոր է դարձնում կյանքը և պաշտպանում է մոլորակը։'
      },
      {
        id: 4,
        questionEs: '¿Cuál es el gas más abundante de la atmósfera?',
        questionHy: 'Ո՞ր գազն է ամենաշատը մթնոլորտում։',
        answerEs: 'El nitrógeno.',
        answerHy: 'Ազոտը։'
      },
      {
        id: 5,
        questionEs: '¿Qué gas necesitamos para respirar?',
        questionHy: 'Ո՞ր գազն է մեզ անհրաժեշտ շնչելու համար։',
        answerEs: 'El oxígeno.',
        answerHy: 'Թթվածինը։'
      },
      {
        id: 6,
        questionEs: '¿La atmósfera tiene una sola capa?',
        questionHy: 'Մթնոլորտն ունի՞ միայն մեկ շերտ։',
        answerEs: 'No, tiene varias capas.',
        answerHy: 'Ոչ, այն ունի մի քանի շերտեր։'
      },
      {
        id: 7,
        questionEs: '¿Cuál es la capa más cercana a la superficie terrestre?',
        questionHy: 'Ո՞ր շերտն է ամենամոտը Երկրի մակերևույթին։',
        answerEs: 'La troposfera.',
        answerHy: 'Տրոպոսֆերան։'
      },
      {
        id: 8,
        questionEs: '¿Dónde vivimos nosotros?',
        questionHy: 'Մենք ո՞ր շերտում ենք ապրում։',
        answerEs: 'En la troposfera.',
        answerHy: 'Տրոպոսֆերայում։'
      },
      {
        id: 9,
        questionEs: '¿Dónde se producen la lluvia, las nubes y el viento?',
        questionHy: 'Որտե՞ղ են առաջանում անձրևը, ամպերը և քամին։',
        answerEs: 'En la troposfera.',
        answerHy: 'Տրոպոսֆերայում։'
      },
      {
        id: 10,
        questionEs: '¿De qué nos protege la atmósfera?',
        questionHy: 'Ինչի՞ց է մեզ պաշտպանում մթնոլորտը։',
        answerEs: 'De parte de la radiación solar dañina.',
        answerHy: 'Վնասակար արևային ճառագայթման մի մասից։'
      },
      {
        id: 11,
        questionEs: '¿Qué pasaría si no hubiera atmósfera?',
        questionHy: 'Ի՞նչ կլիներ, եթե մթնոլորտ չլիներ։',
        answerEs: 'La vida sería muy difícil o imposible.',
        answerHy: 'Կյանքը շատ դժվար կամ անհնար կլիներ։'
      },
      {
        id: 12,
        questionEs: 'Resume la atmósfera en una frase.',
        questionHy: 'Մեկ նախադասությամբ ամփոփի՛ր մթնոլորտը։',
        answerEs: 'La atmósfera es la capa de gases que rodea y protege la Tierra.',
        answerHy: 'Մթնոլորտը գազերի շերտն է, որը շրջապատում և պաշտպանում է Երկիրը։'
      }
    ]
  }
];
