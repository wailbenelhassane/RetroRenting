## RetroRenting

## AVISO  
Para poder usar el repositorio es necesario que cuando se descargue se cambie el nombre del directorio raíz a "RetroRenting". 

## Nombre del Proyecto y Componentes del Grupo

**Proyecto:** RetroRenting  
**Grupo:** 41.7  
**Integrantes del Grupo:**
- Carlos Ruano Ramos.
- Wail Ben el Hassane Boudhar.
- Eduardo Marrero González.

## Descripción del Proyecto

RetroRenting es una plataforma para la gestión de alquileres con temática retro. La aplicación permite a los usuarios explorar un catálogo de artículos vintage, realizar reservas, gestionar sus pedidos y administrar pagos de manera segura.

## Requisitos Funcionales
- **Poder visualizar un cátalogo de coches:**  
  Permite a los usuarios visualizar la lista de vehículos disponibles, observando una imagen del vehículo y una serie de características básicas(motor, potencia y tiempo de 0-100km/h).
- **Poder ver una ficha detallada:**  
  Permite a los usuarios visualizar una ficha del vehículo con imágenes caracteristicas básicas del vehículo(motor, potencia y tiempo de 0-100km/h).
- **Poder realizar la reservar de un coche:**
  Permite a los usuarios realizar una reserva de un coche, ubicada en un lugar y tiempo (con fecha de inicio y fin).
- **Poder registrarse en la página web:**
  Permite a los usuarios registrarse en la página web con los siguientes datos: nombre, apellidos, dirección de correo email, nombre de usuario y contraseña.
- **Poder iniciar sesión en la página web:**
  Permite a los usuarios iniciar sesión en la página web con los siguientes datos: nombre de usuario y contraseña. 
-  **Información de la empresa:**  
  Permite a los usuarios conocer la filosofía y metodología de la empresa.
- **Integración de pagos:**  
  Procesamiento seguro de pagos en línea.
  
## Listado de páginas HTML y Mockup que implementan  
### 1. **Inicio (`index.html`)**
- **Mockup Implementado:** [LandingPage] [LandingPage - Tablet] [Landing - Mobile]  

---

### 2. **Cátalogo (`catalog.html`)**
- **Mockup Implementado:** [Catalog] [Catalog - Tablet] [Catalog - Mobile]  
  
---

### 3. **Sobre nosotros (`about-us.html`)**
- **Mockup Implementado:** [About Us] [About Us - Tablet] [About Us - Mobile]  
  
---

### 4. **Login (`login.html`)**
- **Mockup Implementado:** [Login] [Login - Tablet] [Login - Mobile]  
  
---

### 5. **Register (`register.html`)**
- **Mockup Implementado:** [Register] [Register - Tablet] [Register - Mobile]  
  
---

### 6. **Página del coche (`car-page.html`)**
- **Mockup Implementado:** [Car Page] [Car Page - Tablet] [Car Page - Mobile]  
  
---

### 7. **Datos de la reserva (`car-reservation-information.html`)**
- **Mockup Implementado:** [Car Reservation Information] [Car Reservation Information - Tablet] [Car Reservation Information - Mobile]  
  
---

### 8. **Confirmación de la reserva (`car-reservation-confirmation.html`)**
- **Mockup Implementado:** [Car Reservation Confirmation] [Car Reservation Confirmation - Tablet] [Car Reservation Confirmation - Mobile]  
  
---

## Archivos Templates Identificados
- **Templates de la Interfaz:**
### 1. **Header (`header.html`)**
- **Template Integrado en:** index.html, catalog.html, car-reservation-information.html, car-reservation-confirm.html, about-us.html, car-page.html.
  
### 2. **Footer (`footer.html`)**
- **Template Integrado en:** index.html, catalog.html, car-reservation-information.html, car-reservation-confirm.html, about-us.html, car-page.html  

### 3. **Car Catalog (`car-catalog.html`)**
- **Template Integrado en:** index.html  

### 4. **Booking bar (`booking-bar.html`)**
- **Template Integrado en:** index.html  

### 5. **Catalog Section (`catalog-section.html`)**
- **Template Integrado en:** catalog.html  
  
### 6. **Reviews (`reviews.html`)**
- **Template Integrado en:** about-us.html
  
 ### 7. **Team Carrousel (`team-carrousel.html`)**
- **Template Integrado en:** about-us.html
  
### 8. **Side Text Section (`side-text-section.html`)**
- **Template Integrado en:** about-us.html
  
### 9. **Center Text Section (`center-text-section.html`)**
- **Template Integrado en:** about-us.html
  
### 10. **Car Viewer (`car-viewer.html`)**
- **Template Integrado en:** car-page.html  

### 11. **Process Booking (`process-booking.html`)**
- **Template Integrado en:** car-reservation-information.html  

### 12. **Main Driver Form (`main-driver-form.html`)**
- **Template Integrado en:** car-reservation-information.html  

### 13. **Process Booking 2 (`process-booking-2.html`)**
- **Template Integrado en:** car-reservation-confirmation.html  

### 14. **Booking Bar 2 (`booking-bar-2.html`)**
- **Template Integrado en:** bar-car-details-booking.html  

### 15. **Car Details Bar (`car-details-bar.html`)**
- **Template Integrado en:** bar-car-details-booking.html  

### 16. **Bar Car Details Booking (`bar-car-details-booking.html`)**
- **Template Integrado en:** car-page.html

## Otros Aspectos a Considerar en la Evaluación

- **Implementaciones con Componentes Angular:**  
  Se han desarrollado tareas interactivas y funcionalidades clave utilizando Angular:  
    - Script encargado de cargar los templates de HTML con su archivo CSS correspondiente.
    - Script encargado de realizar sugerencias en la barra de localización (booking-bar.html) -> implementación mediante console.log().
    - Script encargado de realizar un carrusel de imágenes.

- **Se ha desarrollado la carga dinámica de componentes mediante la inyección desde Firebase:**
    - Header.
    - Footer.
    - Car Catalog.
    - Booking Bar.
    - Reviews.  
    - Car Viewer.
    - Car Details.
    - Login.
    - Register.
    - Side Text.
    - Center Text.
    - Country Selector.  
    - Además de cargar dinámicamente todas las imágenes.
  
- **Se ha desarrollado la validación de los siguientes formularios:**
    - Register:  
      * Name: Mínimo dos cáracteres y primera letra mayúscula.  
      * Surname: : Mínimo dos cáracteres y primera letra mayúscula.  
      * Email: Formato email: nombre@dominio.com.  
      * Username: Más de cinco cáracteres.  
      * Password: Más de ocho cáracteres y al menos una letra mayúscula.  
      * Confirm Password: Igual que el campo Password.  

    - Login:
      * Username: Más de cinco cáracteres.  
      * Password: Más de ocho cáracteres y al menos una letra mayúscula.  

    - Booking Bar:  
      * Location: Solo texto.  
      * Pick Up Date: No puede ser antes que el día actual.  
      * Return Date: No puedes ser antes que el día actual, ni el Pick Up Date.  

    - Main Driver Information:
      * Name: Mínimo dos cáracteres y primera letra mayúscula.  
      * Surname: : Mínimo dos cáracteres y primera letra mayúscula.  
      * Email: Formato email: nombre@dominio.com.  
      * Phone: Sólo números con longitud de minimo nueve y máximo quince dígitos.
  

- **Organización de las Hojas de Estilo:**  
  Para la correcta gestión de las hojas de estilo se ha utilizado SASS.  

- **Distribución del código:**  
Para la distribución del código se ha optado por distribuirlo usando la isguiente estructura:
  - components: Donde se almacaenan todos los componentes pertinentes.  
  - pages: Donde se almacenan las vistas que incorporan los componentes mencionados anteriormente.  
  - services: Donde se almacenan los servicios para cada uno de los componentes, conteniendo así la lógica del componente y su carga dinámica.  
  - models: Donde se almacenan los modelos de los componentes y estructuras utilizadas en nuestro proyecto, comentadas en la siguiente sección.
  - guards: Donde se almacena la lógica para restringir el acceso a ciertas secciones.

## Almacenamiento de Datos en Firebase – RetroRenting

RetroRenting utiliza *Firebase Firestore* como base de datos en la nube para manejar de forma eficiente los datos estructurados de la aplicación. Firestore nos permite organizar la información en *colecciones y documentos*, lo que favorece la escalabilidad, la flexibilidad y el acceso rápido desde el frontend.

A continuación, se describe la estructura de las principales colecciones utilizadas:

###  carImages
Almacena imágenes de coches clásicos, organizadas por década (70, 80, 90).  
Cada documento representa un coche e incluye:
- mainImage: URL de la imagen principal.
- secondaryImages: Array de URLs con vistas adicionales del coche.

*Ejemplo:*  
chevrolet-camaro-70 → 1 imagen principal + 3 secundarias desde diferentes ángulos.

---

###  user
Contiene los datos del usuario.  
Cada documento incluye:
- name: Nombre del usuario (ej. "Pepe").
- surname: Apellido del usuario (ej. "González").
- email: Email del usuario (ej. "pepe@gmail.com").
- username: Nombre de usuario (ej. "pepe123").

---

###  booking
Contiene los datos del booking.  
Cada documento incluye:
- name: Nombre del usuario (ej. "Pepe").
- surname: Apellido del usuario (ej. "González").
- email: Email del usuario (ej. "pepe@gmail.com").
- username: Nombre de usuario (ej. "pepe123").

---

###  countrySelector
Contiene los datos de países para selección en formularios de usuario.  
Cada documento incluye:
- name: Nombre del país (ej. "Portugal").
- prefix: Código telefónico (ej. "+351").
- value: Abreviatura o identificador (ej. "POR").

---

###  centerText
Almacena contenido estático para secciones del sitio web como:
- contact
- philosophy  
Cada documento contiene:
- title: Título de la sección.
- content: Texto descriptivo.

---

### booking-bar
Lista los coches disponibles para reserva.  
Cada documento contiene:
- name: Nombre completo del coche (ej. "Chevrolet Camaro").
- value: Identificador del coche (ej. camaro-70).

---

###  carCatalog
Organiza las imágenes destacadas del catálogo, agrupadas por década (70, 80, 90).  
Cada documento contiene:
- image: URL de la imagen representativa de esa década.

---

###  catalogSection
Contiene la información detallada de los coches por década.  
Cada documento incluye:
- title: Década correspondiente (ej. "70’s").
- catalogCards: Arreglo de tarjetas con los siguientes datos por coche:
  - id: Identificador único.
  - title: Nombre del modelo.
  - image: Objeto con src y altText.
  - info: Especificaciones como tipo de motor, potencia, etc.

---

### footer
Almacena los enlaces del pie de página para navegación.  
Cada documento incluye:
- title: Texto del enlace (ej. "Policy").
- url: Ruta correspondiente.

---

### header
Define el contenido del encabezado de la aplicación:  
- logo: Objeto con src y alt para la imagen del logotipo.
- mainMenu: Elementos del menú principal (ej. "Home", "Catalog").
- authLinks: Accesos para autenticación (ej. "Login", "Sign up").

---

###  loginContent
Guarda la configuración visual de la página de inicio de sesión:  
- src: URL de la imagen de fondo.
- altText: Texto alternativo.
- selector: Información adicional o contexto.

---

Firestore, al ser una base de datos *NoSQL*, permite manejar esta jerarquía de forma ágil, ideal para aplicaciones modernas como RetroRenting, donde la presentación y rendimiento del frontend dependen de datos bien estructurados y fácilmente accesibles.
  
  
- **Elección del estilo:**  
  Para la realización del diseño y de la consecuente implementación hemos decidido elegir una gama de colores elegante y seria, puesto que se ha buscado evocar la seriedad y elegancia que los coches retro transmiten.  


## Enlace a Figma
Accede al prototipo interactivo y a los diseños de la interfaz en el siguiente enlace:  
[Figma - RetroRenting](https://www.figma.com/design/3tJJktKu1mzKrl00TrFpcL/PWM-SKETCHUP?node-id=0-1&t=2qq8GJ8OPPS50LA7-1)  
[Figma - RetroRenting Prototype](https://www.figma.com/proto/3tJJktKu1mzKrl00TrFpcL/PWM-SKETCHUP?node-id=0-1&t=2qq8GJ8OPPS50LA7-1)  

## Enlace a Trello
Accede al tablero de Trello en el siguiente enlace:  
[Trello - RetroRenting](https://trello.com/invite/b/67a18f3fb9657c193acf4ff9/ATTI3a3925842578ad946f4ed8babcafac164807B3B7/pwm)
