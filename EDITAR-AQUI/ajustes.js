/*
=====================================================================
  AJUSTES DE LA PAGINA DE MISTIK
  Enlaces, horario, direccion, textos y donde aparece cada boton
=====================================================================
  Abre este archivo con el Bloc de notas
  (clic derecho  >  Abrir con  >  Bloc de notas). No hagas doble clic.

  Cambia SOLO lo que esta a la derecha de los dos puntos ( : ).
  No borres las comillas invertidas ` de abajo ni el punto y coma final.

  Las lineas que empiezan con # son notas: la pagina las ignora.
  Si una linea no existe o queda vacia, la pagina usa el texto original.
  Despues de guardar, actualiza la pagina en el navegador (F5).
=====================================================================
*/
window.MISTIK_AJUSTES = `

# ---------------------------------------------------------------
#  1. ENLACES  (para cambiar un enlace, pega el nuevo despues de los dos puntos)
#     Un solo cambio aqui actualiza TODOS los botones de la pagina.
# ---------------------------------------------------------------
rappi: https://rappi.sng.link/Ev50a/ynhb?pcn=RX_PE_AL_OR_MU_75899_ALL_RES_RAP_ALL_NA_00000&_dl=gbrappi%3A%2F%2Fcom.grability.rappi%3Fstore_type%3Drestaurant%26brand_id%3D75899&_ddl=gbrappi%3A%2F%2Fcom.grability.rappi%3Fstore_type%3Drestaurant%26brand_id%3D75899&_fallback_redirect=https%3A%2F%2Frappi.com.pe%2F&_force_redirect=true
maps: https://www.google.com/maps/place/Av.+Germ%C3%A1n+Aguirre+564,+San+Mart%C3%ADn+de+Porres+15103/data=!4m2!3m1!1s0x9105ceeed804b34b:0xd57b76acea88cf4c?sa=X&ved=1t:242&ictx=111
instagram: https://www.instagram.com/mistikrestaurante/
tiktok: https://www.tiktok.com/@mistikrestaurante

# Usuarios que se muestran escritos en la seccion de contacto
instagram usuario: @mistikrestaurante
tiktok usuario: @mistikrestaurante


# ---------------------------------------------------------------
#  2. DIRECCION Y HORARIO
#     En la direccion, el simbolo | es un salto de linea.
# ---------------------------------------------------------------
direccion: Av. Germán Aguirre 564 | Lima, Perú 15103

# Direccion que usa el mapa de la seccion Visita (como la escribirias en Google Maps)
direccion del mapa: Av. Germán Aguirre 564, San Martín de Porres 15103

dias corto: Lun a Dom
dias: Lunes a domingo
horas: 4:00 pm a 11:30 pm

# Hora de apertura y cierre, en formato 24 horas (16:00 = 4 pm, 23:30 = 11:30 pm).
# Con esto la portada dice "Abierto ahora" o "Cerrado ahora" segun la hora de Lima.
abre: 16:00
cierra: 23:30


# ---------------------------------------------------------------
#  3. TEXTOS PRINCIPALES
#     Entre dos asteriscos ** sale en negrita:  **Auraki Roll**
# ---------------------------------------------------------------
lema: Un refugio para compartir, disfrutar y reconectar
texto portada: Fondos, burgers, alitas, waffles y cócteles. Y los makis de **Auraki Roll**, servidos en MISTIK.

texto carta: Entradas, fondos, burgers, alitas, waffles, bebidas y cócteles, con sus precios. Aquí van algunas para abrir el apetito.

rappi titulo: ¿Hoy toca en casa? Pide MISTIK por Rappi
rappi texto: La misma carta, directo a tu puerta.

auraki texto: Los makis que se sirven en MISTIK son de Auraki Roll. En su carta: makis fríos y calientes, combos, barra libre, nigiri, gyozas, alitas, yakimeshi y poke bowls.


# ---------------------------------------------------------------
#  4. TARJETAS DE LA CARTA EN LA PAGINA DE INICIO
#     Formato:  Categoria | Descripcion | etiqueta del precio | precio | enlace
#     El enlace es el nombre de la categoria en la carta, en minusculas y
#     sin tildes (fondo, alitas, burgers, cocteles, postres, waffles...).
#     Para quitar una tarjeta, borra su linea o ponle # al inicio.
# ---------------------------------------------------------------
tarjeta 1: Fondos | Lomo saltado, mostrito crunch y bisteck a lo pobre | desde | S/ 10 | fondo
tarjeta 2: Alitas | 12 sabores, de BBQ a mango habanero | 6 unidades | S/ 23 | alitas
tarjeta 3: Burgers | Pan brioche y hamburguesa casera | desde | S/ 15 | burgers
tarjeta 4: Cócteles | Pisco sour, mojito, margaritas y más | desde | S/ 13 | cocteles


# ---------------------------------------------------------------
#  5. DONDE APARECE EL BOTON DE RAPPI    (escribe si  o  no)
#     Para "mover" el boton, apagalo en un lugar y enciendelo en otro.
# ---------------------------------------------------------------
boton rappi encabezado: si
boton rappi portada: si
boton rappi celular: si
boton rappi contacto: si
boton rappi pie: si


# ---------------------------------------------------------------
#  6. ORDEN DE LA PAGINA DE INICIO
#     Las secciones salen en el mismo orden de esta lista.
#     Para ocultar una seccion, borrala de la lista.
#     Nombres validos:
#       portada   cinta   carta   rappi   visita   auraki   contacto
# ---------------------------------------------------------------
orden inicio: portada, cinta, carta, rappi, visita, auraki, contacto

`;
