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

## Archivo PDF con Mockups y Storyboard
- **Nombre del archivo:** `Sprint_1_figma_sketchup_no_color.pdf`  
- **Nombre del archivo:** `Sprint_1_figma_sketchup_color.pdf`  
- **Nombre del archivo:** `Sprint_2_figma_mobile.pdf`
- **Nombre del archivo:** `Sprint_2_figma_tablet.pdf`  

  
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

- **Implementaciones con JavaScript:**  
  Se han desarrollado tareas interactivas y funcionalidades clave utilizando JavaScript:  
    - Script encargado de cargar los templates de HTML con su archivo CSS correspondiente.
    - Script encargado de realizar sugerencias en la barra de localización (booking-bar.html) -> implementación mediante console.log().
    - Script encargado de realizar un carrusel de imágenes.

- **Se ha desarrollado la carga dinámica de componentes mediante la inyección de JSON:**
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
  
- **Se ha desarrollado la validación de los siguientes formularios: (/public/js/utils/validationForm.js)**
    - Register (register.js):  
      * Name: Mínimo dos cáracteres y primera letra mayúscula.  
      * Surname: : Mínimo dos cáracteres y primera letra mayúscula.  
      * Email: Formato email: nombre@dominio.com.  
      * Username: Más de cinco cáracteres.  
      * Password: Más de ocho cáracteres y al menos una letra mayúscula.  
      * Confirm Password: Igual que el campo Password.  

    - Login (login.js):
      * Username: Más de cinco cáracteres.  
      * Password: Más de ocho cáracteres y al menos una letra mayúscula.  

    - Booking Bar (booking-bar.js):  
      * Location: Solo texto.  
      * Pick Up Date: No puede ser antes que el día actual.  
      * Return Date: No puedes ser antes que el día actual, ni el Pick Up Date.  

    - Main Driver Information (mainDriverInformation.js):
      * Name: Mínimo dos cáracteres y primera letra mayúscula.  
      * Surname: : Mínimo dos cáracteres y primera letra mayúscula.  
      * Email: Formato email: nombre@dominio.com.  
      * Phone: Sólo números con longitud de minimo nueve y máximo quince dígitos.
  

- **Organización de las Hojas de Estilo:**  
  Para la correcta gestión de las hojas de estilo se ha utilizado SASS.  

- **Distribución del código JavaScript:**  
Para el código JavaScript, se ha optado por distribuir las funciones entre los diferentes componentes que las requieren, siendo invocadas finalmente desde la vista que incorpora dichos componentes.
Con el objetivo de lograr una carga dinámica de los componentes a partir de un archivo JSON, permitiendo así una personalización máxima del contenido, se han implementado varias funciones básicas ubicadas en el archivo main.js, entre ellas fetchJSON y setMultiplesImages. La creación completa de cada componente HTML se ha llevado a cabo dentro de los scripts específicos de cada componente (por ejemplo, la carga y construcción del encabezado se encuentra en header.js).
Además, para la validación de los formularios, se han incluido funciones responsables de validar individualmente cada campo, así como una función que recorre y valida todos los campos de un formulario, y otra que gestiona la visualización de los mensajes de error. Estas funciones están centralizadas en el archivo /utils/validationForm.js. Por otro lado, en el archivo /service/authservices.js se encuentran todas las funciones relacionadas con la gestión de la sesión, como iniciar y cerrar sesión, entre otras.

      
  
  
- **Elección del estilo:**  
  Para la realización del diseño y de la consecuente implementación hemos decidido elegir una gama de colores elegante y seria, puesto que se ha buscado evocar la seriedad y elegancia que los coches retro transmiten.  


## Enlace a Figma
Accede al prototipo interactivo y a los diseños de la interfaz en el siguiente enlace:  
[Figma - RetroRenting](https://www.figma.com/design/3tJJktKu1mzKrl00TrFpcL/PWM-SKETCHUP?node-id=0-1&t=2qq8GJ8OPPS50LA7-1)  
[Figma - RetroRenting Prototype](https://www.figma.com/proto/3tJJktKu1mzKrl00TrFpcL/PWM-SKETCHUP?node-id=0-1&t=2qq8GJ8OPPS50LA7-1)  

## Enlace a Trello
Accede al tablero de Trello en el siguiente enlace:  
[Trello - RetroRenting](https://trello.com/invite/b/67a18f3fb9657c193acf4ff9/ATTI3a3925842578ad946f4ed8babcafac164807B3B7/pwm)

## Archivo PDF con Evolución de Trello
- **Nombre del archivo:** `Trello.pdf`
