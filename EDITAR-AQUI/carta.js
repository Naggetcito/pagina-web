/*
=====================================================================
  LA CARTA DE MISTIK  -  AQUI SE CAMBIAN PLATOS Y PRECIOS
=====================================================================
  Abre este archivo con el Bloc de notas
  (clic derecho  >  Abrir con  >  Bloc de notas). No hagas doble clic.

  Cambia SOLO el texto que esta entre las dos comillas invertidas
  (el simbolo que esta al final de la linea "window.MISTIK_CARTA = ").
  No borres esas comillas ni el punto y coma del final.

  COMO SE ESCRIBE (una cosa por linea):

    Plato | precio | descripcion       Un plato. La descripcion es opcional.
    Plato | precio                     Un plato sin descripcion.
    Plato                              Un plato con varias opciones; las
       > Opcion | precio               opciones van en las lineas de abajo.
    -- Nombre de la categoria          Nueva categoria (Burgers, Postres...)
    == Titulo | Etiqueta | Frase | estilo
                                       Nuevo bloque grande. El estilo puede
                                       ser: claro, profundo u oscuro.
    ~ Vaso                             Un subtitulo dentro de una categoria.
    * Texto                            Una nota pequena bajo el titulo.
    $ Para llevar | Texto 1 | Texto 2  La barra de abajo (envases, etc.).

  EJEMPLOS RAPIDOS:

    Cambiar un precio ...... Cambia el numero:  Chuleta | 21 | ...
    Quitar un plato ........ Borra su linea.
    Ocultar sin borrar ..... Pon # al inicio de la linea:  # Chuleta | 21
    Agregar un plato ....... Copia una linea parecida, pegala y cambia el texto.
    Mover un plato ......... Corta su linea y pegala donde quieras.

  El precio se escribe solo con numeros (20 o 18.5); la pagina agrega "S/".
  Las lineas que empiezan con # son comentarios: la pagina las ignora.
  Despues de guardar el archivo, actualiza la pagina en el navegador (F5).
=====================================================================
*/
window.MISTIK_CARTA = `

== Para comer | Platos | Entradas, fondos, caldos y todo lo que va con papas fritas. | claro

-- Entradas
Chicken fingers | 20 | Pollo empanizado acompañado de una salsa a elección
Tequeño Mistik | 16 | Porción de 6 tequeños rellenos de queso y tocino
Tequeño clásico | 13 | Porción de 6 tequeños rellenos de queso
Boliyucas | 15 | Porción de 8 boliyucas rellenas de queso

-- Fondo
Mostrito crunch | 24 | Pieza de pollo broaster acompañado de arroz chaufa y papas fritas
Tallarín saltado | 23 | Tallarín acompañado de carne salteada con cebolla, tomate y culantro
Lomo saltado | 23 | Carne salteada con cebolla, tomate y culantro acompañado de papas fritas y arroz
Chuleta | 21 | Acompañado de papas fritas y arroz
Bisteck a lo pobre | 21 | Acompañado de huevo, plátano, papas fritas y arroz
Filete de pollo con chimichurri | 20 | Filete de pollo a la plancha acompañado de salsa chimichurri, papas fritas y arroz
Chicharrón de pollo | 20 | Pollo empanizado acompañado de papas fritas
Pollo al panko | 20 | Filete de pollo empanizado acompañado de papas fritas y arroz
Tallarín verde
   > Con chuleta | 21
   > Con bisteck o filete de pollo | 19
Filete de pollo | 15
Arroz chaufa | 15
Arroz a la cubana | 10

-- Caldos
Caldo de gallina
   > Con presa grande | 14
   > Con presa chica | 12
   > Sin presa | 10
Caldo de gallina acevichado | 15
Sopa a la minuta | 15
Consomé de pollo | 15
Consomé de carne | 15

-- Ensaladas
Mistik | 25 | Tiras de pechuga de pollo empanizada, lechuga, espinaca, tomate, queso fresco, palta, tocino ahumado, decorado con wantán frito en tiras y vinagreta de la casa
Tropical | 24 | Tiras de pechuga de pollo empanizada, lechuga, espinaca, trozos de durazno, aros de cebolla, zanahoria, pepino, pecanas y salsa honey mustard
César | 23 | Tiras de pechuga de pollo empanizada, lechuga, espinaca, queso parmesano, crutones, huevo sancochado, manzana, pecanas y vinagreta de la casa

-- Broaster
Pecho | 16
Entrepierna | 16
Pierna | 14
Alita | 12

-- Burgers
Mistik | 25 | Pan tipo brioche, doble hamburguesa casera, queso, tocino, lechuga, tomate y papas fritas
Parrillera | 22 | Pan tipo brioche, hamburguesa casera, chorizo parrillero, chimichurri, lechuga, tomate y papas fritas
BBQ | 19 | Pan tipo brioche, hamburguesa casera con salsa BBQ, lechuga, tomate y papas fritas
Chimichurri | 19 | Pan tipo brioche, hamburguesa casera con salsa chimichurri, lechuga, tomate y papas fritas
Bacon | 19 | Pan tipo brioche, hamburguesa casera, tocino, queso, lechuga, tomate y papas fritas
Cheese | 18 | Pan tipo brioche, hamburguesa casera, doble queso, lechuga, tomate y papas fritas
Royal | 18 | Pan tipo brioche, hamburguesa casera, jamón, queso, huevo, lechuga, tomate y papas fritas
A lo pobre | 18 | Pan tipo brioche, hamburguesa casera, plátano, huevo, lechuga, tomate y papas fritas
Clásica | 15 | Pan tipo brioche, hamburguesa casera, lechuga, tomate y papas fritas

-- Sándwiches
Club sandwich | 25 | Pan, jamón, queso, tocino, pollo deshilachado, huevo, lechuga, tomate, mayonesa de la casa y papas fritas
Crunchy | 20 | Pan tipo brioche, pollo al panko, lechuga, tomate y papas al hilo
Deshilachado royal | 16 | Pan tipo brioche, pollo deshilachado, jamón, queso, huevo, papas al hilo, lechuga y mayonesa casera
Filete de pollo | 14 | Pan tipo brioche, filete de pollo, papas al hilo, lechuga y tomate
Deshilachado | 13 | Pan tipo brioche, pollo deshilachado, apio, lechuga y mayonesa casera
Mixto | 13 | Pan molde, jamón y queso
Chorizo | 12 | Pan tipo brioche, chorizo, lechuga, tomate y papas al hilo

-- Salchipapas
Mistik | 25 | Hot dog ahumado, chorizo parrillero, trozos de pollo, huevo, queso, papas fritas y ensalada
Crunchy | 20 | Hot dog ahumado, trozos de pollo empanizado, papas fritas y ensalada
A lo pobre | 18 | Hot dog ahumado, huevo, plátano, papas fritas y ensalada
Clásica | 13 | Hot dog ahumado, papas fritas y ensalada

== Para compartir | A la mesa | Alitas en doce sabores, combos por cantidad y torres para el centro de la mesa. | profundo

-- Alitas
=> S/ 23 | por 6 unidades, a elección entre 12 sabores. Todas vienen con una porción de papas fritas.
sabores: BBQ, Acevichadas, Maracuyá, Chimichurri, Broaster, Búfalo, Maracumango hot, Mango habanero, Teriyaki, Coreana, Honey mustard, Ranch

-- Combos
* Todas las alitas vienen acompañadas de papas fritas. Válido para consumo en salón. A partir de 60 alitas, con anticipación de 1 hora.
24 alitas | 60 | 4 sabores de alitas a elección
30 alitas | 72 | 5 sabores de alitas a elección
50 alitas | 110 | 5 sabores de alitas a elección
80 alitas | 165 | 8 sabores de alitas a elección
100 alitas | 190 | 10 sabores de alitas a elección

-- Piqueos
Torre Mistik | 69 | 120 gr de chicharrón de pollo y 6 tequeños de queso con tocino, 12 alitas (3 sabores a elección) y 600 gr de papas fritas
Torre super crunch | 60 | 6 alitas chimichurri, 2 alas broaster y 2 piernas broaster, y 600 gr de papas fritas

== Para endulzar | Dulce | Waffles bañados, tortas y algo con helado para cerrar. | claro

-- Waffles
Mistik | 28 | Waffle bañado en nutella, fresa, plátano y pecanas con helado de vainilla
Teddy | 26 | Waffle bañado en fudge con oreo, brownie, chin chin, marshmellows y helado de vainilla
Chocolatísimo | 25 | Waffle bañado en fudge, brownie, fresa y chips de chocolate con helado de vainilla
Frutos del bosque | 24 | Waffle bañado con fudge, crema de chantilly, arándanos, fresas y frambuesas
Mapple | 22 | Waffle bañado en miel de mapple, mango, plátano y chantilly

-- Postres
Brownie con helado | 15
Torta de chocolate | 10
Tartaleta de fresa | 10
Crema volteada | 8

== Para beber | Bebidas | De la limonada frozen al pisco sour, pasando por café, frappes y jugos. | oscuro

-- Bebidas frías
~ Vaso
Maracumango frozen | 13
Limonada de fresa frozen | 13
Limonada pink frozen | 13
Limonada eléctrica frozen | 13
Limonada clásica frozen | 12
Maracuyá frozen | 12
Limonada hierbabuena | 11
Maracuyá | 9
Chicha morada | 9
Limonada clásica | 9
~ Jarra
Maracumango frozen | 18.5
Limonada de fresa frozen | 18.5
Limonada pink frozen | 18.5
Limonada eléctrica frozen | 18.5
Limonada frozen | 17.5
Maracuyá frozen | 17.5
Limonada hierbabuena | 15
Limonada clásica | 15
Maracuyá | 15
Chicha morada | 15

-- Jugos
Surtido | 12 | Papaya, piña, fresa
Fresa | 11
Mango | 11
Piña | 10
Papaya | 10

-- Jugos con leche
Especial | 14 | Papaya, leche, huevo, miel, algarrobina y vainilla
Mango | 13
Fresa | 13
Plátano | 11

-- Café
Iced caramel | 14
Iced latte | 12
Latte | 12
Mocaccino | 11
Capuccino | 10.5
Americano | 8.5
Espresso | 5

-- Frappes
Oreo | 16 | Frappe de café, oreo, leche y chantilly
Chips | 16 | Frappe de café, chips ahoy, leche y chantilly
Moka | 15 | Frappe de café, chocolate, leche y chantilly
Caramelo | 15 | Frappe de café, caramelo, leche y chantilly
Café | 12 | Frappe de café, leche y chantilly

-- Infusiones
Iced tea clásico | 10
Manzanilla | 5
Anís | 5
Jamaica | 5
Té | 5

-- Cócteles
Vodka tonic | 18 | Vodka, agua tónica, fresa y arándanos
Mai tai | 16 | Ron blanco, ron rubio, amaretto, jugo de piña, jugo de limón y jarabe de granadina
Godmother | 16 | Vodka y amaretto
Amaretto stone sour | 16 | Amaretto, jugo de limón, jugo de naranja y jarabe de goma
Planters punch | 15 | Ron rubio, triple sec, jugo de piña, jugo de naranja, jugo de limón y jarabe de granadina
Laguna azul | 15 | Vodka, curacao azul, jugo de limón, jarabe de goma y agua con gas
Electric lemonade | 15 | Vodka, blue curacao, jugo de limón, jarabe de goma y sprite
Daiquiri de durazno | 15 | Ron blanco, durazno, zumo de limón y hielo
Daiquiri de fresa | 15 | Ron blanco, fresa, zumo de limón y hielo
Pisco sour | 15 | Cóctel a base de zumo de limón, jarabe de goma y clara de huevo
Maracuyá sour | 15 | Cóctel a base de jugo de maracuyá, pisco, jarabe de goma y clara de huevo
Piña colada | 15 | Ron blanco, crema de coco y piña
Mojito | 13 | Ron blanco, azúcar blanca, hierbabuena, jugo de limón y agua con gas
Screwdriver | 13 | Vodka y jugo de naranja
Primavera | 13 | Pisco, jugo de naranja, jugo de piña y jarabe de granadina
Cuba libre | 13 | Ron y coca cola

-- Margaritas
Fresa | 20
Maracuyá | 20
Mango | 20
Piña | 20
Coco azul | 20
Corona sunrise | 26
Corona | 26

-- Gaseosas
~ Personal
Inka Cola | 5
Fanta | 5
Sprite | 5
Coca Cola | 5
~ 1.5 litros
Inka Cola | 10
Coca Cola | 10

$ Para llevar | Táper pequeño: + S/ 0.50 | Táper grande: + S/ 1.00 | Envase de bebida: + S/ 1.00
`;
