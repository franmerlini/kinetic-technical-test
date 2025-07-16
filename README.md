# Mechanic Store

Mechanic Store es una aplicación web frontend diseñada para gestionar el inventario de un taller mecánico. Este proyecto fue desarrollado como parte de una entrevista técnica para un puesto como desarrollador Angular Senior/Semi-Senior.

## Tecnologías utilizadas

Algunas tecnologias fueron requisitos mínimos de la entrevista técnica (marcadas con negrita), mientras que otras se incorporaron por decisión propia para mejorar la experiencia de desarrollo y del usuario

- Nx
- **Angular (v20)**
- **NgRx (Store, Effects, Entity, Router Store)**
- **PrimeNG**
- TailwindCSS
- **TypeScript**
- **RxJs**
- Chart.js
- Jest

## Funcionalidades principales

- Dashboard principal
    - Vista de resumen con indicadores clave
- Gestión de productos
    - Alta, baja, modificación y consulta de productos
    - 2 modos de visualización del listado de productos: tabla y cuadricula
    - Paginación y filtrado de productos

## Otras características

- Diseño responsive
- Modo claro/oscuro
- Validación de formularios

## Capturas de pantalla

![Dashboard principal modo oscuro](<Screenshot from 2025-07-16 00-56-20.png>)

![Dashboard principal modo claro](<Screenshot from 2025-07-16 00-56-30.png>)

![Listado de productos en cuadricula](<Screenshot from 2025-07-16 00-56-46.png>)

![Listado de productos en tabla](<Screenshot from 2025-07-16 00-56-53.png>)

![Filtrado de productos](<Screenshot from 2025-07-16 00-57-15.png>)

![Validacion de formularios](<Screenshot from 2025-07-16 00-57-41.png>)

![Detalle de producto](<Screenshot from 2025-07-16 00-58-11.png>)

## Instrucciones de ejecución

Para ejecutar la aplicación localmente, asegurarse de tener instaladas las siguientes herramientas:

- Git
- Node.js
- pnpm

Pasos a seguir:

1. Clonar el repositorio:

    ```sh 
    git clone https://github.com/franmerlini/kinetic-technical-test.git
    ```
2. Navegar al directorio del proyecto

    ```sh
    cd mechanic-store
    ```

3. Instalar dependencias:

    ```sh
    pnpm install
    ```

4. Ejecutar la aplicación:

    ```sh
    pnpx nx serve mechanic-stock
    ```

5. Acceder a la aplicación:

    En un navegador, acceder a la URL http://localhost:4200.
