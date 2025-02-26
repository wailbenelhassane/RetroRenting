## RetroRenting

## Nombre del Proyecto y Componentes del Grupo

**Proyecto:** RetroRenting  
**Grupo:** 41.7  
**Integrantes del Grupo:**
- Carlos Ruano Ramos.
- Wail Ben El Hassane Boudhar.
- Eduardo Marrero González.

## Descripción del Proyecto

RetroRenting es una plataforma para la gestión de alquileres con temática retro. La aplicación permite a los usuarios explorar un catálogo de artículos vintage, realizar reservas, gestionar sus pedidos y administrar pagos de manera segura.

## Requisitos Funcionales
- **Poder visualizar un cátologo de coches:**  
  Permite a los usuarios visualizar la flota de vehículos disponibles, observando una imagen del vehículo y una serie de características básicas(motor, potencia y tiempo de 0-100).
- **Poder ver una ficha detallada:**  
  Permite a los usuarios visualizar una ficha del vehículo con imágenes caracteristicas básicas del vehículo(motor, potencia y tiempo de 0-100).
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
- **Nombre del archivo:** `mockups_storyboard.pdf`
- **Ubicación:** `/docs/mockups_storyboard.pdf`

## Listado de páginas HTML y Mockup que implementan  
### 1. **Inicio (`index.html`)**
- **Mockup Implementado:** [LandingPage]  

---

### 2. **Cátologo (`catalog.html`)**
- **Mockup Implementado:** [Catalog]  
  
---

### 3. **Sobre nosotros (`about-us.html`)**
- **Mockup Implementado:** [About Us]  
  
---

### 4. **Login (`login.html`)**
- **Mockup Implementado:** [Login]  
  
---

### 5. **Register (`register.html`)**
- **Mockup Implementado:** [Register]  
  
---

### 6. **Página del coche (`car-page.html`)**
- **Mockup Implementado:** [Car Page]  
  
---

### 7. **Datos de la reserva (`car-reservation-information.html`)**
- **Mockup Implementado:** [Car Reservation Information]  
  
---

### 8. **Confirmación de la reserva (`car-reservation-confirmation.html`)**
- **Mockup Implementado:** [Car Reservation Final]  
  
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
- **Template Integrado en:** side-text-section.html
  
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
  
## Otros Aspectos a Considerar en la Evaluación

- **Implementaciones con JavaScript:**  
  Se han desarrollado tareas interactivas y funcionalidades clave utilizando JavaScript:  
    - Script encargado de cargar los templeates de HTML con su archivo CSS correspondiente.
    - Script encargado de cargar las imágenes mediante un JSON.
    - Script encargado de cargar contenido de información mediante un JSON.
    - Script encargado de realizar sugerencias en la barra de localización (booking-bar.html) -> implementación mediante console.log().
    - Script encargado de realizar un carrousel de imágenes.  

- **Organización de las Hojas de Estilo:**  
  Para la correcta gestión de las hojas de estilo se ha utilizado SASS.  

- **Buenas Prácticas y Convención de Código:**  
  Se ha mantenido una estructura coherente para facilitar la comprensión y futuras mejoras.  

## Enlace a Figma
Accede al prototipo interactivo y a los diseños de la interfaz en el siguiente enlace:  
[Figma - RetroRenting](https://www.figma.com/design/3tJJktKu1mzKrl00TrFpcL/PWM-SKETCHUP?node-id=0-1&t=2qq8GJ8OPPS50LA7-1)  
[Figma - RetroRenting Prototype](https://www.figma.com/proto/3tJJktKu1mzKrl00TrFpcL/PWM-SKETCHUP?node-id=0-1&t=2qq8GJ8OPPS50LA7-1)
