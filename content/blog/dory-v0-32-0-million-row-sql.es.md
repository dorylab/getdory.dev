---
title: "Cómo Dory te permite explorar millones de filas SQL sin bloquear el navegador"
description: "Dory v0.32.0 permite ejecutar SQL sin un límite automático, conservar resultados completos en Parquet y explorar millones de filas mediante DuckDB sin sobrecargar el navegador."
---

# Cómo Dory te permite explorar millones de filas SQL sin bloquear el navegador

![Dory v0.32.0 procesa grandes resultados SQL mediante un núcleo inspirado en DuckDB para convertirlos en datos Parquet que se pueden explorar con fluidez](/images/blog/dory-v0-32-0-no-limit-sql-cover-es.png)

La mayoría de los clientes SQL funcionan bien hasta que una consulta devuelve más datos de los que su tabla de resultados está preparada para manejar.

Unos cientos de filas son fáciles. Unos miles suelen funcionar bien. Pero cuando un resultado alcanza cientos de miles —o millones— de filas, la experiencia suele empezar a deteriorarse:

- El resultado tarda mucho tiempo en aparecer.
- Aumenta el uso de memoria del navegador.
- El desplazamiento se vuelve lento.
- Los filtros y la ordenación dejan de sentirse interactivos.
- El cliente trunca el resultado antes de que puedas analizarlo o exportarlo.

La solución habitual es añadir un `LIMIT` más pequeño, exportar los datos o moverlos a otra herramienta.

Dory v0.32.0 adopta un enfoque diferente.

Ahora puedes ejecutar consultas SQL sin límite de filas, conservar el resultado completo y seguir explorando, buscando, filtrando, ordenando, creando gráficos y exportando millones de filas directamente en Dory.

## Ejecuta consultas SQL sin un LIMIT automático

Los límites de filas son útiles durante la exploración diaria de una base de datos. Evitan que una consulta accidental extraiga una cantidad innecesariamente grande de datos.

Pero algunas veces necesitas realmente el resultado completo.

Puede que necesites:

- Exportar todos los pedidos coincidentes.
- Investigar anomalías en una tabla de eventos grande.
- Buscar un valor concreto en todo el resultado de una consulta.
- Crear un gráfico a partir del conjunto de datos completo.
- Guardar el resultado para continuar el análisis.

Dory incluye ahora una opción **No limit** en la configuración de consultas.

Cuando está activada, Dory deja de añadir automáticamente una cláusula `LIMIT` y ejecuta el SQL exactamente como fue escrito.

Puedes mantener un límite predeterminado seguro para la exploración normal y cambiar a **No limit** únicamente cuando la tarea requiera todos los datos.

## Devolver millones de filas solo resuelve la mitad del problema

Una base de datos puede ser capaz de devolver millones de filas, pero enviarlas todas directamente a una tabla del navegador crea un nuevo cuello de botella.

Las tablas de resultados tradicionales suelen intentar mantener demasiados datos en la memoria del navegador. A medida que crece el resultado, el renderizado se ralentiza y las operaciones interactivas se vuelven más costosas.

Dory v0.32.0 cambia la forma de almacenar y explorar los resultados SQL grandes.

En lugar de cargar el resultado completo en el navegador, Dory:

1. Ejecuta la consulta SQL completa.
2. Transmite el resultado a un archivo Parquet.
3. Utiliza DuckDB para consultar el resultado guardado.
4. Envía a la interfaz únicamente las filas necesarias para la vista actual.
5. Prepara los datos cercanos mientras navegas por el resultado.

El navegador nunca necesita mantener millones de filas al mismo tiempo.

Sin embargo, desde el punto de vista del usuario, el resultado sigue comportándose como una sola tabla completa.

Puedes:

- Navegar por resultados con millones de filas.
- Buscar y filtrar en todo el resultado.
- Ordenar por cualquier columna disponible.
- Crear gráficos a partir del conjunto de datos completo.
- Exportar el resultado completo o filtrado como CSV o Parquet.

El tamaño del conjunto de datos cambia, pero el flujo de trabajo no.

## Filtra y ordena el resultado completo con DuckDB

El renderizado virtualizado puede hacer más fluido el desplazamiento por una tabla grande, pero el renderizado por sí solo no resuelve todo el problema.

Filtrar u ordenar millones de filas en la memoria del navegador seguiría siendo lento y consumiría muchos recursos.

Por eso Dory ejecuta estas operaciones mediante DuckDB.

Cuando filtras, buscas u ordenas un resultado grande, Dory no transfiere primero todo el conjunto de datos al navegador. DuckDB ejecuta la operación directamente sobre el ResultSet respaldado por Parquet, y Dory devuelve únicamente la página de datos necesaria para la vista actual.

Esta arquitectura mantiene la agilidad de las operaciones interactivas sin perder el acceso al conjunto de datos completo.

No necesitas instalar, configurar ni administrar DuckDB por separado. Se ejecuta como parte de la capa de datos interna de Dory.

## Los resultados SQL ya no desaparecen al terminar la sesión

En muchos clientes SQL, el resultado de una consulta es temporal.

Si cierras la pestaña, actualizas la aplicación o reinicias el ordenador, puede que tengas que volver a ejecutar la consulta. Esto resulta especialmente incómodo cuando la consulta original era costosa o tardó varios minutos en completarse.

Dory guarda ahora los resultados completos como ResultSets persistentes respaldados por Parquet.

Cuando termina una consulta, puedes volver a abrir el resultado y continuar trabajando sin consultar de nuevo la base de datos de origen.

Esto significa que puedes:

- Ejecutar una consulta grande hoy y continuar mañana.
- Cambiar entre pestañas SQL sin perder resultados anteriores.
- Volver a abrir resultados históricos después de reiniciar Dory.
- Conservar el estado de filtros, ordenación y tabla.
- Crear nuevos gráficos o exportaciones desde un resultado existente.
- Analizar datos sin cargar repetidamente la base de datos de origen.

El resultado de una consulta deja de ser una salida temporal. Se convierte en un activo de datos reutilizable dentro de tu workspace.

## Por qué Dory utiliza Parquet para los resultados SQL

Parquet es un formato de archivo columnar diseñado para cargas de trabajo analíticas.

Ofrece varias propiedades útiles para los resultados de consultas grandes:

- Compresión eficiente.
- Acceso rápido a las columnas seleccionadas.
- Gran compatibilidad con motores analíticos.
- Almacenamiento portátil que puede volver a consultarse más adelante.
- Mejor rendimiento para filtros y agregaciones que los formatos de texto orientados a filas, como CSV.

Dory almacena el resultado completo en Parquet, mientras que DuckDB proporciona la capa de cálculo utilizada para explorarlo.

Esta separación también permite que la interfaz se mantenga ligera. El resultado puede contener millones de filas, pero Dory solo recupera la pequeña parte necesaria para la vista actual de la tabla.

## DuckDB se está convirtiendo en una parte central de Dory

DuckDB ya estaba disponible como una de las bases de datos a las que Dory podía conectarse. En v0.32.0 asume un papel más amplio dentro de la arquitectura de Dory.

Se está convirtiendo en una capa de cálculo compartida para:

- Resultados de consultas SQL.
- Conjuntos de datos Parquet.
- CSV y otros archivos locales.
- Filtrado, ordenación y búsqueda.
- Gráficos y transformaciones analíticas.
- Futuros flujos de datos dirigidos por agentes.

Hoy, esta arquitectura hace prácticos los ResultSets de millones de filas.

A continuación, permitirá que los resultados de bases de datos y los archivos locales compartan la misma experiencia de análisis. Podrás abrir un archivo, consultarlo con SQL, combinarlo con otros datos y empezar a explorarlo sin tener que importarlo todo primero a una base de datos tradicional.

## Un solo flujo desde la consulta SQL hasta el análisis completo

El flujo completo de Dory para resultados grandes es ahora el siguiente:

1. Escribe y ejecuta una consulta SQL.
2. Selecciona **No limit** cuando necesites el resultado completo.
3. Observa la vista previa y el progreso mientras se ejecuta la consulta.
4. Deja que Dory almacene automáticamente el resultado completo en Parquet.
5. Explora millones de filas mediante la interfaz ResultSet.
6. Busca, filtra, ordena, crea gráficos o exporta los datos.
7. Vuelve a abrir el resultado guardado más tarde sin ejecutar de nuevo la consulta.

No hay un paso separado de exportación e importación, ni necesidad de cambiar a otra aplicación solo porque la consulta haya devuelto más datos de los esperados.

## Dory v0.32.0 ya está disponible

Los resultados SQL grandes no deberían dejar de ser utilizables simplemente porque contienen más filas.

Dory v0.32.0 permite conservar los resultados completos manteniendo una experiencia de exploración fluida. También establece DuckDB y Parquet como base para una capa de análisis local de datos más amplia dentro de Dory.

La próxima vez que necesites más que las primeras 200 filas, desactiva el `LIMIT` y explora el resultado completo.

Obtén más información y descarga Dory en [getdory.dev](https://getdory.dev/).
