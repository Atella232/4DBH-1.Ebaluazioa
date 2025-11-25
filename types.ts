
export type Language = 'eu' | 'es' | 'en' | 'ar';

export interface Translation {
  title: string;
  subtitle: string;
  nav: {
    home: string;
    theory: string;
    rationalization: string;
    polynomials: string;
    logarithms: string;
    exams: string;
  };
  home: {
    welcome: string;
    description: string;
    start: string;
    features: {
      theory: string;
      practice: string;
      exams: string;
    };
    features_desc: {
      theory: string;
      practice: string;
      exams: string;
    };
    topics_subtitle: {
      poly: string;
      rat: string;
      log: string;
    };
  };
  theoryHub: {
      title: string;
      desc: string;
      sections: {
          rat: string;
          poly: string;
          log: string;
      };
      rat: {
          def: string;
          case1_title: string;
          case1_desc: string;
          case2_title: string;
          case2_desc: string;
          conjugate_def: string;
      };
      poly: {
          identities: string;
          ruffini_def: string;
          remainder_th_title: string;
          remainder_th_desc: string;
          factor_th_title: string;
          factor_th_desc: string;
          roots_desc: string;
      };
      log: {
          def: string;
          prop_title: string;
          prop_product: string;
          prop_quotient: string;
          prop_power: string;
          prop_root: string;
          base_change: string;
          special_logs: string;
      }
  };
  practiceHub: {
      title: string;
      desc: string;
      play: string;
  };
  exams: {
      title: string;
      desc: string;
      show_solution: string;
      hide_solution: string;
      step: string;
      correct_answer: string;
      questions: {
          rat_q1: string;
          rat_q2: string;
          rat_q3: string;
          rat_q4: string;
          poly_q1: string;
          poly_q2: string;
          poly_q3: string;
          poly_q4: string;
          log_q1: string;
          log_q2: string;
          log_q3: string;
          log_q4: string;
      }
  };
  rationalization: {
    title: string;
    tabs: {
        theory: string;
        quiz: string;
        game: string;
        extractor: string;
    };
    theory_title: string;
    conjugate_expl: string;
    game_title: string;
    game_desc: string;
    start_game: string;
    score: string;
    time: string;
    game_over: string;
  };
  polynomials: {
    title: string;
    tabs: {
        identities: string;
        ruffini: string;
        factorizer: string;
        theorem: string;
        quiz: string;
    };
    identities_title: string;
    identities_expl: string;
    identities_tools: {
        term_a: string;
        term_b: string;
        calc: string;
        step_by_step: string;
    };
    ruffini: {
        title: string;
        mode_example: string;
        mode_practice: string;
        example_title: string;
        example_step1: string;
        example_step2: string;
        example_step3: string;
        practice_title: string;
        practice_desc: string;
        new_poly: string;
        input_root: string;
        start_table: string;
        check_btn: string;
        feedback: {
            success: string;
            math_error: string;
            bad_root: string;
            intro: string;
        }
    };
    factorizer_title: string;
    factorizer_desc: string;
    solve_btn: string;
    steps: {
        common_factor: string;
        ruffini: string;
        quadratic: string;
        result: string;
        no_real_roots: string;
    }
  };
  logarithms: {
    title: string;
    tabs: {
        visualizer: string;
        quiz: string;
        explorer: string;
        scale: string;
    };
    def_title: string;
    def_expl: string;
    labels: {
        base: string;
        exponent: string;
        result: string;
        logarithm: string;
        exponential: string;
    };
    rules: {
        title: string;
        product: string;
        quotient: string;
        power: string;
    }
  };
}

export const content: Record<Language, Translation> = {
  eu: {
    title: "Matematika DBH 4",
    subtitle: "Azterketa Prestatzen",
    nav: {
      home: "Hasiera",
      theory: "Teoria",
      rationalization: "Arrazionalizazioa",
      polynomials: "Polinomioak",
      logarithms: "Logaritmoak",
      exams: "Azterketak"
    },
    home: {
      welcome: "Ongi etorri",
      description: "DBH 4ko matematika azterketa prestatzeko tresna aurreratuak. Aukeratu gai bat hasteko.",
      start: "Hasi Ikasten",
      features: {
        theory: "Teoria",
        practice: "Praktika",
        exams: "Azterketak"
      },
      features_desc: {
        theory: "Kontzeptu argiak eta zehatzak.",
        practice: "Jokoak eta simulagailu interaktiboak.",
        exams: "Azterketak pausoz pausoko ebazpenarekin."
      },
      topics_subtitle: {
        poly: "FAKTORIZAZIOA ETA RUFFINI",
        rat: "ERROAK ETA KONJUGATUAK",
        log: "BISTARATZAILEA ETA ARAUAK"
      }
    },
    theoryHub: {
        title: "Teoria Bilduma",
        desc: "Formula, definizio eta teorema guztiak leku bakarrean.",
        sections: {
            rat: "Arrazionalizazioa",
            poly: "Polinomioak",
            log: "Logaritmoak"
        },
        rat: {
            def: "Izendatzailean erroak dituen zatiki bat, erro gabeko baliokide batean bihurtzea da.",
            case1_title: "1. Kasua: Erroa bakarrik",
            case1_desc: "Izendatzailean erro karratu bat dagoenean, biderkatu zenbakitzailea eta izendatzailea erro berberarekin.",
            case2_title: "2. Kasua: Binomioa",
            case2_desc: "Izendatzailean batuketa edo kenketa bat dagoenean (erro batekin gutxienez), konjugatuarekin biderkatu behar da.",
            conjugate_def: "Konjugatua: Termino berdinak mantendu baina erdiko zeinua aldatu."
        },
        poly: {
            identities: "Identitate Nabarmenak",
            ruffini_def: "Ruffini-ren erregela polinomioak (x - a) motako binomioekin zatitzeko metodo azkarra da.",
            remainder_th_title: "Hondarraren Teorema",
            remainder_th_desc: "P(x) polinomioa (x - a)-rekin zatitzean lortzen den hondarra, P(a) balioaren berdina da.",
            factor_th_title: "Faktorearen Teorema",
            factor_th_desc: "(x - a) P(x)-ren faktorea da baldin eta soilik baldin P(a) = 0 bada.",
            roots_desc: "Polinomio baten erroak P(x) = 0 egiten duten balioak dira."
        },
        log: {
            def: "Logaritmoa berreketa baten alderantzizko eragiketa da. a oinarriko x-ren logaritmoa (y) da a^y = x betetzen duen zenbakia.",
            prop_title: "Propietateak",
            prop_product: "Biderkadura baten logaritmoa logaritmoen batuketa da.",
            prop_quotient: "Zatiketa baten logaritmoa logaritmoen kenketa da.",
            prop_power: "Berreketa baten logaritmoan, berretzailea biderkatzen pasatzen da.",
            prop_root: "Erro baten logaritmoa, zatiki bezala adieraz daiteke.",
            base_change: "Oinarri aldaketa",
            special_logs: "Logaritmo bereziak: Hamartarra (log) eta Nepertarra (ln)."
        }
    },
    practiceHub: {
        title: "Praktika Gunea",
        desc: "Aukeratu tresna bat trebatzeko.",
        play: "Jolastu / Probatu"
    },
    exams: {
        title: "Azterketa Ereduak",
        desc: "Probatu zure maila eta ikusi ebazpenak pausoz pauso.",
        show_solution: "Erakutsi Ebazpena",
        hide_solution: "Ezkutatu Ebazpena",
        step: "Urratsa",
        correct_answer: "Erantzun zuzena",
        questions: {
            rat_q1: "Arrazionalizatu (Sinplea)",
            rat_q2: "Arrazionalizatu (Binomioa)",
            rat_q3: "Eragiketa Erroekin",
            rat_q4: "Kasu Aurreratua",
            poly_q1: "Faktorizatu polinomioa",
            poly_q2: "Zatiki aljebraikoa sinplifikatu",
            poly_q3: "Ruffini aplikatu",
            poly_q4: "Identitate nabarmenak",
            log_q1: "Logaritmoen definizioa",
            log_q2: "Ekuazio logaritmikoa",
            log_q3: "Adierazpena garatu",
            log_q4: "Kalkulatu x"
        }
    },
    rationalization: {
      title: "Arrazionalizazioa",
      tabs: { theory: "Teoria", quiz: "Galdetegia", game: "Konjugatuen Jokoa", extractor: "Erroak Atera" },
      theory_title: "Zer da arrazionalizatzea?",
      conjugate_expl: "Izendatzailean erroak kentzeko prozesua da. Horretarako, konjugatuarekin biderkatu behar dugu.",
      game_title: "Konjugatu Blitz",
      game_desc: "Lotu adierazpena bere konjugatuarekin denbora agortu baino lehen!",
      start_game: "Hasi Jokoa",
      score: "Puntuak",
      time: "Denbora",
      game_over: "Joko Amaitua!"
    },
    polynomials: {
      title: "Polinomioak",
      tabs: { identities: "Identitateak", ruffini: "Ruffini", factorizer: "Faktorizatzailea", theorem: "Hondarraren T.", quiz: "Galdetegia" },
      identities_title: "Identitate Nabarmenak",
      identities_expl: "Sortu zure identitatea eta ikusi garapena.",
      identities_tools: {
          term_a: "A Gaia",
          term_b: "B Gaia",
          calc: "Kalkulatu",
          step_by_step: "Pausoz Pauso"
      },
      ruffini: {
          title: "Ruffiniren Erregela",
          mode_example: "Adibide Azaldua",
          mode_practice: "Praktika Interaktiboa",
          example_title: "Pausoz Pausoko Adibidea",
          example_step1: "Koefizienteak idatzi eta lehenengoa jaitsi.",
          example_step2: "Erroarekin biderkatu eta hurrengo zutabean jarri.",
          example_step3: "Batu eta prozesua errepikatu hondarra 0 izan arte.",
          practice_title: "Bilatu erro zuzena",
          practice_desc: "Polinomio honek soluzio osoa du. Probatu erroak eta bete taula.",
          new_poly: "Polinomio Berria",
          input_root: "Probatu Erroa:",
          start_table: "Hasi Taula",
          check_btn: "Egiaztatu",
          feedback: {
              intro: "Aukeratu zenbaki bat eta saiatu.",
              success: "Zorionak! Hondarra 0 da, erroa aurkitu duzu.",
              math_error: "Kontuz! Eragiketa matematikoren bat gaizki dago taulan.",
              bad_root: "Matematika ondo dago, baina hondarra ez da 0. Saiatu beste erro batekin."
          }
      },
      factorizer_title: "Polinomio Faktorizatzailea",
      factorizer_desc: "Idatzi koefizienteak eta ikusi pausoz pauso.",
      solve_btn: "Faktorizatu",
      steps: {
        common_factor: "Faktore Komuna",
        ruffini: "Ruffini",
        quadratic: "2. Mailako Ekuazioa",
        result: "Emaitza Finala",
        no_real_roots: "Erro errealik ez"
      }
    },
    logarithms: {
      title: "Logaritmoak",
      tabs: { visualizer: "Bistaratzailea", quiz: "Kalkulua", explorer: "Propietateak", scale: "Eskala Sismikoa" },
      def_title: "Definizioa",
      def_expl: "Logaritmoa berreketa baten alderantzizko eragiketa da.",
      labels: {
        base: "Oinarria (a)",
        exponent: "Berretzailea (b)",
        result: "Emaitza",
        logarithm: "Logaritmikoa",
        exponential: "Esponentziala"
      },
      rules: {
        title: "Logaritmoen Propietateak",
        product: "Biderkadura",
        quotient: "Zatiketa",
        power: "Berreketa"
      }
    }
  },
  es: {
    title: "Matemáticas 4º ESO",
    subtitle: "Preparación de Examen",
    nav: {
      home: "Inicio",
      theory: "Teoría",
      rationalization: "Racionalización",
      polynomials: "Polinomios",
      logarithms: "Logaritmos",
      exams: "Exámenes"
    },
    home: {
      welcome: "Bienvenido",
      description: "Herramientas avanzadas para preparar tu examen de 4º ESO. Elige un tema.",
      start: "Empezar",
      features: {
        theory: "Teoría",
        practice: "Práctica",
        exams: "Exámenes"
      },
      features_desc: {
        theory: "Conceptos claros y concisos.",
        practice: "Juegos y simuladores interactivos.",
        exams: "Exámenes con resolución paso a paso."
      },
      topics_subtitle: {
        poly: "FACTORIZACIÓN Y RUFFINI",
        rat: "RAÍCES Y CONJUGADOS",
        log: "VISUALIZADOR Y REGLAS"
      }
    },
    theoryHub: {
        title: "Centro de Teoría",
        desc: "Todas las fórmulas y conceptos en un solo lugar.",
        sections: {
            rat: "Racionalización",
            poly: "Polinomios",
            log: "Logaritmos"
        },
        rat: {
            def: "Proceso para eliminar raíces del denominador de una fracción.",
            case1_title: "Caso 1: Raíz única",
            case1_desc: "Si hay una raíz cuadrada en el denominador, multiplica numerador y denominador por la misma raíz.",
            case2_title: "Caso 2: Binomio",
            case2_desc: "Si hay una suma o resta, multiplica por el conjugado.",
            conjugate_def: "Conjugado: Mantener términos pero cambiar el signo central."
        },
        poly: {
            identities: "Identidades Notables",
            ruffini_def: "Regla para dividir polinomios entre binomios (x - a).",
            remainder_th_title: "Teorema del Resto",
            remainder_th_desc: "El resto de dividir P(x) entre (x-a) es igual a P(a).",
            factor_th_title: "Teorema del Factor",
            factor_th_desc: "(x-a) es factor de P(x) si P(a) = 0.",
            roots_desc: "Las raíces son los valores que hacen P(x) = 0."
        },
        log: {
            def: "Operación inversa a la exponenciación. Log base 'a' de 'x' es el número al que hay que elevar 'a' para obtener 'x'.",
            prop_title: "Propiedades",
            prop_product: "El log del producto es la suma de los logs.",
            prop_quotient: "El log del cociente es la resta de los logs.",
            prop_power: "El exponente sale multiplicando.",
            prop_root: "La raíz sale como fracción.",
            base_change: "Cambio de base",
            special_logs: "Logs especiales: Decimal (log) y Neperiano (ln)."
        }
    },
    practiceHub: {
        title: "Centro de Práctica",
        desc: "Elige una herramienta para entrenar.",
        play: "Jugar / Probar"
    },
    exams: {
        title: "Modelos de Examen",
        desc: "Pon a prueba tu nivel y ve la resolución paso a paso.",
        show_solution: "Ver Solución",
        hide_solution: "Ocultar Solución",
        step: "Paso",
        correct_answer: "Respuesta correcta",
        questions: {
            rat_q1: "Racionaliza (Simple)",
            rat_q2: "Racionaliza (Binomio)",
            rat_q3: "Operación con Raíces",
            rat_q4: "Caso Avanzado",
            poly_q1: "Factoriza el polinomio",
            poly_q2: "Simplifica la fracción",
            poly_q3: "Aplica Ruffini",
            poly_q4: "Identidades Notables",
            log_q1: "Definición de logaritmo",
            log_q2: "Ecuación logarítmica",
            log_q3: "Desarrolla la expresión",
            log_q4: "Calcula x"
        }
    },
    rationalization: {
      title: "Racionalización",
      tabs: { theory: "Teoría", quiz: "Test", game: "Juego Conjugados", extractor: "Extraer Raíces" },
      theory_title: "¿Qué es racionalizar?",
      conjugate_expl: "Proceso para eliminar raíces del denominador multiplicando por el conjugado.",
      game_title: "Conjugado Blitz",
      game_desc: "¡Une la expresión con su conjugado antes de que acabe el tiempo!",
      start_game: "Jugar",
      score: "Puntos",
      time: "Tiempo",
      game_over: "¡Fin del Juego!"
    },
    polynomials: {
      title: "Polinomios",
      tabs: { identities: "Identidades", ruffini: "Ruffini", factorizer: "Factorizador", theorem: "Teorema Resto", quiz: "Test" },
      identities_title: "Identidades Notables",
      identities_expl: "Construye tu identidad y ve el desarrollo.",
      identities_tools: {
          term_a: "Término A",
          term_b: "Término B",
          calc: "Calcular",
          step_by_step: "Paso a Paso"
      },
      ruffini: {
          title: "Regla de Ruffini",
          mode_example: "Ejemplo Explicado",
          mode_practice: "Práctica Interactiva",
          example_title: "Ejemplo Paso a Paso",
          example_step1: "Escribimos coeficientes y bajamos el primero.",
          example_step2: "Multiplicamos por la raíz y colocamos en la siguiente columna.",
          example_step3: "Sumamos y repetimos hasta que el resto sea 0.",
          practice_title: "Busca la raíz correcta",
          practice_desc: "Este polinomio tiene solución entera. Prueba raíces y rellena la tabla.",
          new_poly: "Nuevo Polinomio",
          input_root: "Prueba Raíz:",
          start_table: "Iniciar Tabla",
          check_btn: "Comprobar",
          feedback: {
              intro: "Elige un número (divisor del término indep.)",
              success: "¡Felicidades! El resto es 0, has encontrado la raíz.",
              math_error: "¡Cuidado! Hay algún error de cálculo en la tabla.",
              bad_root: "Cálculos bien, pero el resto no es 0. Prueba otra raíz."
          }
      },
      factorizer_title: "Factorizador de Polinomios",
      factorizer_desc: "Introduce coeficientes y ve paso a paso.",
      solve_btn: "Factorizar",
      steps: {
        common_factor: "Factor Común",
        ruffini: "Ruffini",
        quadratic: "Ecuación 2º Grado",
        result: "Resultado Final",
        no_real_roots: "Sin raíces reales"
      }
    },
    logarithms: {
      title: "Logaritmos",
      tabs: { visualizer: "Visualizador", quiz: "Quiz", explorer: "Propiedades", scale: "Escala Richter" },
      def_title: "Definición",
      def_expl: "El logaritmo es la operación inversa a la potenciación.",
      labels: {
        base: "Base (a)",
        exponent: "Exponente (b)",
        result: "Resultado",
        logarithm: "Logarítmico",
        exponential: "Exponencial"
      },
      rules: {
        title: "Propiedades de Logaritmos",
        product: "Producto",
        quotient: "Cociente",
        power: "Potencia"
      }
    }
  },
  en: {
    title: "Math Grade 10",
    subtitle: "Exam Prep",
    nav: {
      home: "Home",
      theory: "Theory",
      rationalization: "Rationalization",
      polynomials: "Polynomials",
      logarithms: "Logarithms",
      exams: "Exams"
    },
    home: {
      welcome: "Welcome",
      description: "Advanced tools to ace your Grade 10 exam. Pick a topic.",
      start: "Start",
      features: {
        theory: "Theory",
        practice: "Practice",
        exams: "Exams"
      },
      features_desc: {
        theory: "Clear and concise concepts.",
        practice: "Interactive games and simulators.",
        exams: "Exams with step-by-step solutions."
      },
      topics_subtitle: {
        poly: "FACTORIZATION & RUFFINI",
        rat: "ROOTS & CONJUGATES",
        log: "VISUALIZER & RULES"
      }
    },
    theoryHub: {
        title: "Theory Hub",
        desc: "All formulas and concepts in one place.",
        sections: {
            rat: "Rationalization",
            poly: "Polynomials",
            log: "Logarithms"
        },
        rat: {
            def: "Process of eliminating roots from the denominator.",
            case1_title: "Case 1: Single Root",
            case1_desc: "Multiply numerator and denominator by the same root.",
            case2_title: "Case 2: Binomial",
            case2_desc: "Multiply by the conjugate.",
            conjugate_def: "Conjugate: Change the sign in the middle."
        },
        poly: {
            identities: "Special Identities",
            ruffini_def: "Rule for dividing polynomials by (x - a).",
            remainder_th_title: "Remainder Theorem",
            remainder_th_desc: "The remainder of P(x) / (x-a) is P(a).",
            factor_th_title: "Factor Theorem",
            factor_th_desc: "(x-a) is a factor if P(a) = 0.",
            roots_desc: "Roots are values that satisfy P(x) = 0."
        },
        log: {
            def: "Inverse of exponentiation.",
            prop_title: "Properties",
            prop_product: "Log of product is sum of logs.",
            prop_quotient: "Log of quotient is diff of logs.",
            prop_power: "Exponent multiplies the log.",
            prop_root: "Root becomes a fraction.",
            base_change: "Change of Base",
            special_logs: "Common (log) and Natural (ln)."
        }
    },
    practiceHub: {
        title: "Practice Hub",
        desc: "Choose a tool to train.",
        play: "Play / Test"
    },
    exams: {
        title: "Mock Exams",
        desc: "Test your skills and see step-by-step solutions.",
        show_solution: "Show Solution",
        hide_solution: "Hide Solution",
        step: "Step",
        correct_answer: "Correct Answer",
        questions: {
            rat_q1: "Rationalize (Simple)",
            rat_q2: "Rationalize (Binomial)",
            rat_q3: "Operations with Roots",
            rat_q4: "Advanced Case",
            poly_q1: "Factorize polynomial",
            poly_q2: "Simplify algebraic fraction",
            poly_q3: "Apply Ruffini",
            poly_q4: "Special Identities",
            log_q1: "Logarithm Definition",
            log_q2: "Logarithmic Equation",
            log_q3: "Expand expression",
            log_q4: "Calculate x"
        }
    },
    rationalization: {
      title: "Rationalization",
      tabs: { theory: "Theory", quiz: "Quiz", game: "Conjugate Game", extractor: "Root Extractor" },
      theory_title: "What is rationalization?",
      conjugate_expl: "Removing roots from the denominator by multiplying by the conjugate.",
      game_title: "Conjugate Blitz",
      game_desc: "Match the expression with its conjugate before time runs out!",
      start_game: "Start Game",
      score: "Score",
      time: "Time",
      game_over: "Game Over!"
    },
    polynomials: {
      title: "Polynomials",
      tabs: { identities: "Identidades", ruffini: "Ruffini", factorizer: "Factorizer", theorem: "Remainder Th.", quiz: "Quiz" },
      identities_title: "Special Identities",
      identities_expl: "Build your identity and see the expansion.",
      identities_tools: {
          term_a: "Term A",
          term_b: "Term B",
          calc: "Calculate",
          step_by_step: "Step by Step"
      },
      ruffini: {
          title: "Ruffini's Rule",
          mode_example: "Explained Example",
          mode_practice: "Interactive Practice",
          example_title: "Step by Step Example",
          example_step1: "Write coefficients and drop the first one.",
          example_step2: "Multiply by root and place in next column.",
          example_step3: "Add and repeat until remainder is 0.",
          practice_title: "Find the correct root",
          practice_desc: "This polynomial has integer solutions. Try roots and fill the table.",
          new_poly: "New Polynomial",
          input_root: "Try Root:",
          start_table: "Start Table",
          check_btn: "Check",
          feedback: {
              intro: "Pick a number (divisor of independent term).",
              success: "Congrats! Remainder is 0, root found.",
              math_error: "Careful! There is a math error in the table.",
              bad_root: "Math is good, but remainder is not 0. Try another root."
          }
      },
      factorizer_title: "Polynomial Factorizer",
      factorizer_desc: "Enter coefficients and solve step-by-step.",
      solve_btn: "Factorize",
      steps: {
        common_factor: "Common Factor",
        ruffini: "Ruffini",
        quadratic: "Quadratic Formula",
        result: "Final Result",
        no_real_roots: "No real roots"
      }
    },
    logarithms: {
      title: "Logarithms",
      tabs: { visualizer: "Visualizer", quiz: "Quiz", explorer: "Properties", scale: "Richter Scale" },
      def_title: "Definition",
      def_expl: "Inverse operation to exponentiation.",
      labels: {
        base: "Base (a)",
        exponent: "Exponent (b)",
        result: "Result",
        logarithm: "Logarithmic",
        exponential: "Exponential"
      },
      rules: {
        title: "Logarithm Properties",
        product: "Product",
        quotient: "Quotient",
        power: "Power"
      }
    }
  },
  ar: {
    title: "الرياضيات الصف 10",
    subtitle: "التحضير للامتحان",
    nav: {
      home: "الرئيسية",
      theory: "نظرية",
      rationalization: "إنطاق المقام",
      polynomials: "كثيرات الحدود",
      logarithms: "اللغاريتمات",
      exams: "امتحانات"
    },
    home: {
      welcome: "أهلاً بك",
      description: "أدوات متقدمة للتحضير للامتحان. اختر موضوعاً.",
      start: "ابدأ",
      features: {
        theory: "نظرية",
        practice: "تطبيق",
        exams: "امتحانات"
      },
      features_desc: {
        theory: "مفاهيم واضحة وموجزة.",
        practice: "ألعاب ومحاكيات تفاعلية.",
        exams: "امتحانات مع حلول خطوة بخطوة."
      },
      topics_subtitle: {
        poly: "التحليل وروفيني",
        rat: "الجذور والمرافق",
        log: "المصور والقواعد"
      }
    },
    theoryHub: {
        title: "مركز النظرية",
        desc: "جميع القوانين والمفاهيم.",
        sections: {
            rat: "إنطاق المقام",
            poly: "كثيرات الحدود",
            log: "اللغاريتمات"
        },
        rat: {
            def: "عملية التخلص من الجذور في المقام.",
            case1_title: "الحالة 1: جذر وحيد",
            case1_desc: "اضرب البسط والمقام في نفس الجذر.",
            case2_title: "الحالة 2: ثنائي حد",
            case2_desc: "اضرب في المرافق.",
            conjugate_def: "المرافق: تغيير الإشارة الوسطى."
        },
        poly: {
            identities: "المتطابقات الشهيرة",
            ruffini_def: "قاعدة لقسمة كثيرات الحدود على (x-a).",
            remainder_th_title: "نظرية الباقي",
            remainder_th_desc: "باقي قسمة P(x) على (x-a) هو P(a).",
            factor_th_title: "نظرية العامل",
            factor_th_desc: "(x-a) هو عامل إذا كان P(a) = 0.",
            roots_desc: "الجذور هي القيم التي تجعل P(x) = 0."
        },
        log: {
            def: "العملية العكسية للأسس.",
            prop_title: "الخصائص",
            prop_product: "لوغاريتم الضرب هو جمع اللوغاريتمات.",
            prop_quotient: "لوغاريتم القسمة هو طرح اللوغاريتمات.",
            prop_power: "الأس يخرج كضرب.",
            prop_root: "الجذر يخرج ككسر.",
            base_change: "تغيير الأساس",
            special_logs: "لوغاريتمات خاصة: العشري (log) والطبيعي (ln)."
        }
    },
    practiceHub: {
        title: "مركز التدريب",
        desc: "اختر أداة للتدريب.",
        play: "ابدأ"
    },
    exams: {
        title: "نماذج امتحانات",
        desc: "اختبر مستواك وشاهد الحلول خطوة بخطوة.",
        show_solution: "أظهر الحل",
        hide_solution: "أخف الحل",
        step: "خطوة",
        correct_answer: "الإجابة الصحيحة",
        questions: {
            rat_q1: "أنطق المقام (بسيط)",
            rat_q2: "أنطق المقام (ثنائي)",
            rat_q3: "عمليات على الجذور",
            rat_q4: "حالة متقدمة",
            poly_q1: "حلل كثير الحدود",
            poly_q2: "بسط الكسر الجبري",
            poly_q3: "طبق قاعدة روفيني",
            poly_q4: "المتطابقات الشهيرة",
            log_q1: "تعريف اللوغاريتم",
            log_q2: "معادلة لوغاريتمية",
            log_q3: "انشر العبارة",
            log_q4: "احسب x"
        }
    },
    rationalization: {
      title: "إنطاق المقام",
      tabs: { theory: "نظرية", quiz: "اختبار", game: "لعبة المرافق", extractor: "تبسيط الجذور" },
      theory_title: "ما هو إنطاق المقام؟",
      conjugate_expl: "إزالة الجذور من المقام عن طريق الضرب في المرافق.",
      game_title: "تحدي المرافق",
      game_desc: "طابق التعبير مع مرافقه قبل انتهاء الوقت!",
      start_game: "ابدأ اللعبة",
      score: "النقاط",
      time: "الوقت",
      game_over: "انتهت اللعبة!"
    },
    polynomials: {
      title: "كثيرات الحدود",
      tabs: { identities: "المتطابقات", ruffini: "روفيني", factorizer: "المحلل", theorem: "نظرية الباقي", quiz: "اختبار" },
      identities_title: "المتطابقات الشهيرة",
      identities_expl: "قم ببناء المتطابقة وشاهد التوسع.",
      identities_tools: {
          term_a: "الحد أ",
          term_b: "الحد ب",
          calc: "احسب",
          step_by_step: "خطوة بخطوة"
      },
      ruffini: {
          title: "قاعدة روفيني",
          mode_example: "مثال مشروح",
          mode_practice: "تمرين تفاعلي",
          example_title: "مثال خطوة بخطوة",
          example_step1: "اكتب المعاملات وأنزل الأول.",
          example_step2: "اضرب في الجذر وضعه في العمود التالي.",
          example_step3: "اجمع وكرر حتى يصبح الباقي 0.",
          practice_title: "ابحث عن الجذر الصحيح",
          practice_desc: "هذا كثير الحدود له حلول صحيحة. جرب الجذور وأكمل الجدول.",
          new_poly: "كثير حدود جديد",
          input_root: "جرب الجذر:",
          start_table: "ابدأ الجدول",
          check_btn: "تحقق",
          feedback: {
              intro: "اختر رقماً (قاسم للحد الثابت).",
              success: "مبروك! الباقي 0، لقد وجدت الجذر.",
              math_error: "انتبه! يوجد خطأ حسابي في الجدول.",
              bad_root: "الحسابات صحيحة، لكن الباقي ليس 0. جرب جذراً آخر."
          }
      },
      factorizer_title: "محلل كثيرات الحدود",
      factorizer_desc: "أدخل المعاملات وشاهد الحل خطوة بخطوة.",
      solve_btn: "تحليل",
      steps: {
        common_factor: "العامل المشترك",
        ruffini: "روفيني",
        quadratic: "المعادلة التربيعية",
        result: "النتيجة النهائية",
        no_real_roots: "لا توجد جذور حقيقية"
      }
    },
    logarithms: {
      title: "اللغاريتمات",
      tabs: { visualizer: "المصور", quiz: "اختبار", explorer: "الخصائص", scale: "مقياس ريختر" },
      def_title: "تعريف",
      def_expl: "العملية العكسية للأسس.",
      labels: {
        base: "الأساس (a)",
        exponent: "الأس (b)",
        result: "النتيجة",
        logarithm: "لوغاريتمي",
        exponential: "أسي"
      },
      rules: {
        title: "قوانين اللغاريتمات",
        product: "الضرب",
        quotient: "القسمة",
        power: "القوة"
      }
    }
  }
};