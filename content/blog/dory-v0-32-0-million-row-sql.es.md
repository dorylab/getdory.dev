---
title: "Dory v0.32.0: explora millones de filas SQL sin perder fluidez"
description: "Dory v0.32.0 incorpora consultas SQL sin límite, resultados en Parquet y una arquitectura basada en DuckDB para explorar millones de filas con fluidez."
---

# Dory v0.32.0: explora millones de filas SQL sin perder fluidez

![Dory v0.32.0 procesa grandes resultados SQL mediante un núcleo inspirado en DuckDB para convertirlos en datos Parquet que se pueden explorar con fluidez](/images/blog/dory-v0-32-0-no-limit-sql-cover-es.png)

Dory v0.32.0 ya está disponible.

Esta versión resuelve un problema sencillo pero persistente en el trabajo con datos: **¿por qué deberías elegir entre obtener el resultado completo de una consulta y mantener una experiencia fluida?**

Con v0.32.0 puedes ejecutar **consultas SQL sin límite** y conservar el resultado completo. Incluso cuando una consulta devuelve millones de filas, puedes seguir explorando, filtrando, ordenando, creando gráficos y exportando los datos directamente en Dory.

Ya no necesitas recortar los datos para evitar que la interfaz se bloquee, ni mover el resultado a otra herramienta antes de continuar el análisis.

## Ve más allá de las primeras 200 filas

Un límite predeterminado es una protección útil cuando exploras una tabla grande. Pero cuando necesitas de forma intencionada el resultado completo, esa protección puede convertirse en una barrera.

Ahora puedes seleccionar **No limit** en la configuración de consultas de Dory. Dory dejará de añadir automáticamente una cláusula `LIMIT` y ejecutará el SQL tal como lo escribiste.

Ya sea para exportar todos los pedidos, investigar anomalías dispersas en una tabla grande o preparar un conjunto de datos completo para un análisis posterior, ya no tendrás que buscar formas de evitar el límite de resultados.

Puedes mantener un límite prudente para la exploración diaria y cambiar a No limit cuando el trabajo requiera todos los datos. La decisión entre rapidez y completitud está ahora en tus manos.

## Millones de filas que siguen siendo fáciles de explorar

Devolver un millón de filas es una cosa. Hacer que esas filas sean realmente utilizables es el reto más difícil.

Las tablas de resultados tradicionales suelen intentar cargar demasiados datos en el navegador de una sola vez. A medida que crece el resultado, aumenta la espera y el uso de memoria, mientras que el desplazamiento, los filtros y la ordenación se vuelven menos ágiles.

Dory v0.32.0 cambia la forma de cargar los resultados grandes. Cuando abres uno, Dory solo lee y renderiza la parte que estás viendo, y prepara los datos cercanos a medida que te desplazas.

Para ti, sigue comportándose como una única tabla completa:

- Desplázate y navega por resultados con millones de filas.
- Filtra, busca y ordena el resultado completo.
- Crea gráficos a partir de todos los datos, no solo de las primeras filas.
- Exporta en cualquier momento los datos filtrados como CSV o Parquet.

El volumen de datos puede crecer sin cambiar tu forma de trabajar. Ves el resultado completo mientras el navegador solo procesa la pequeña parte necesaria para la vista actual.

## El resultado sigue disponible cuando termina la consulta

Tradicionalmente, los resultados SQL han sido temporales. Si cierras una pestaña, actualizas la página o cambias de workspace, es posible que tengas que volver a ejecutar la consulta.

En v0.32.0, Dory guarda el ResultSet completo en Parquet. Cuando termina la consulta, el resultado permanece en tu workspace para que puedas volver a abrirlo y continuar donde lo dejaste.

Esto significa que puedes:

- Ejecutar una consulta hoy y continuar el análisis mañana.
- Cambiar entre pestañas SQL sin perder los resultados existentes.
- Conservar el estado de filtros, ordenación y selección.
- Seguir creando gráficos o exportaciones desde un resultado existente.

El resultado de una consulta deja de ser una respuesta desechable. Se convierte en un activo de datos reutilizable que puedes seguir explorando.

## DuckDB se está convirtiendo en el núcleo de la arquitectura de Dory

Para hacer posible esta experiencia, en v0.32.0 hemos incorporado DuckDB al núcleo de la arquitectura de la aplicación Dory.

DuckDB es mucho más que un acelerador de consultas en segundo plano y más que otra base de datos a la que Dory puede conectarse. Se está convirtiendo en una capa de cálculo común que conecta resultados de bases de datos, archivos y las capacidades de análisis que desarrollaremos a continuación.

Actualmente, Dory guarda los ResultSets completos en Parquet y utiliza DuckDB para leerlos y realizar cálculos sobre ellos.

Cuando filtras, ordenas o buscas en un resultado con millones de filas, Dory no envía primero todo el conjunto de datos al navegador. DuckDB realiza la operación directamente sobre el ResultSet en Parquet y Dory devuelve únicamente los datos que necesita la vista actual.

Esto permite que los resultados grandes sigan siendo rápidos de explorar, analizar, visualizar y exportar después de guardarlos.

No hay nada nuevo que configurar. No necesitas gestionar DuckDB ni los archivos Parquet. Funcionan dentro de Dory para que los resultados completos y una interfaz fluida puedan existir al mismo tiempo.

Más importante aún, esta arquitectura establece la base para la siguiente etapa del análisis de archivos en Dory. DuckDB está diseñado para consultar directamente formatos como Parquet y CSV. A partir de esta base ampliaremos la compatibilidad de Dory con archivos locales y nuevos formatos, para que puedas abrir archivos, ejecutar SQL, combinar datos y empezar a analizarlos sin tener que importarlo todo primero a una base de datos.

Los ResultSets con millones de filas son una de las primeras capacidades que ofrece esta nueva arquitectura. Con el tiempo, los resultados de bases de datos y los datos procedentes de archivos compartirán una experiencia de análisis más coherente en Dory.

## Un camino continuo desde la consulta hasta el análisis

Dory v0.32.0 conecta de principio a fin el flujo de trabajo con resultados grandes:

1. Ejecuta la consulta SQL completa con **No limit**.
2. Consulta una vista previa y el progreso en tiempo real durante la ejecución.
3. Guarda automáticamente el ResultSet completo en Parquet.
4. Explora millones de filas con fluidez en Dory.
5. Continúa filtrando, ordenando, creando gráficos o exportando el resultado.

Ya no tienes que interrumpir el trabajo porque un resultado sea demasiado grande, ni mover los datos entre varias herramientas antes de llegar a una respuesta.

Y con DuckDB en el núcleo de la arquitectura de Dory, este flujo no se detendrá en las consultas a bases de datos. A continuación llevaremos la misma experiencia de análisis directa y fluida a más datos basados en archivos.

## Dory v0.32.0 ya está disponible

Los datos no deberían dejar de ser utilizables solo porque haya más cantidad.

Dory v0.32.0 te permite conservar resultados completos sin renunciar a una experiencia de análisis rápida y fluida. También marca la llegada de DuckDB al núcleo de la arquitectura de Dory y prepara la base para la próxima generación de análisis de archivos.

La próxima vez que trabajes con una tabla grande, desactiva el `LIMIT` y descubre qué contiene el resultado completo.
