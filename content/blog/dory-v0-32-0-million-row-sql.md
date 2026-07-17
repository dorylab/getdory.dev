---
title: "How Dory Lets You Explore Millions of SQL Rows Without Freezing Your Browser"
description: "Dory v0.32.0 lets you run SQL without an automatic row limit, persist complete results in Parquet, and explore millions of rows through DuckDB without overloading your browser."
---

# How Dory Lets You Explore Millions of SQL Rows Without Freezing Your Browser

![Dory v0.32.0 routes large SQL result sets through a DuckDB-inspired compute core into Parquet-backed, smoothly browsable data](/images/blog/dory-v0-32-0-no-limit-sql-cover-en.png)

Most SQL clients work well until a query returns more data than their result table was designed to handle.

A few hundred rows are easy. A few thousand are usually fine. But once a result reaches hundreds of thousands—or millions—of rows, the experience often starts to break down:

- The result takes a long time to appear.
- Browser memory usage increases.
- Scrolling becomes sluggish.
- Filtering and sorting stop feeling interactive.
- The client truncates the result before you can analyze or export it.

The usual workaround is to add a smaller `LIMIT`, export the data, or move it into another tool.

Dory v0.32.0 takes a different approach.

You can now run SQL queries without a row limit, keep the complete result, and continue browsing, searching, filtering, sorting, charting, and exporting millions of rows directly inside Dory.

## Run SQL queries without an automatic LIMIT

Row limits are useful during everyday database exploration. They prevent an accidental query from pulling an unnecessarily large amount of data.

But sometimes you actually need the complete result.

You might need to:

- Export every matching order.
- Investigate anomalies across a large event table.
- Search an entire query result for a specific value.
- Build a chart from the full dataset.
- Save the result for further analysis.

Dory now includes a **No limit** option in the query settings.

When it is enabled, Dory stops automatically adding a `LIMIT` clause and executes the SQL exactly as written.

You can keep a safe default limit for normal exploration, then switch to **No limit** only when the task requires complete data.

## Returning millions of rows is only half the problem

A database may be capable of returning millions of rows, but sending all of them directly into a browser table creates a new bottleneck.

Traditional result grids often try to hold too much data in browser memory. As the result grows, rendering becomes slower and interactive operations become more expensive.

Dory v0.32.0 changes how large SQL result sets are stored and explored.

Instead of loading the entire result into the browser, Dory:

1. Executes the complete SQL query.
2. Streams the result into a Parquet file.
3. Uses DuckDB to query the stored result.
4. Sends only the rows required for the current view to the interface.
5. Prepares nearby data as you navigate through the result.

The browser never needs to hold millions of rows at once.

From the user's perspective, however, the result still behaves like one complete table.

You can:

- Navigate result sets containing millions of rows.
- Search and filter across the complete result.
- Sort by any available column.
- Create charts from the full dataset.
- Export the complete or filtered result as CSV or Parquet.

The size of the dataset changes, but the workflow does not.

## Filter and sort the full result with DuckDB

Virtualized rendering can make scrolling through a large table smoother, but rendering alone does not solve the complete problem.

Filtering or sorting millions of rows in browser memory would still be slow and resource-intensive.

Dory therefore runs these operations through DuckDB.

When you filter, search, or sort a large result, Dory does not first transfer the entire dataset into the browser. DuckDB performs the operation directly against the Parquet-backed result set, and Dory returns only the page of data required by the current view.

This architecture keeps interactive operations responsive while preserving access to the complete dataset.

You do not need to install, configure, or manage DuckDB separately. It runs as part of Dory's internal data layer.

## SQL results no longer disappear when the session ends

In many SQL clients, a query result is temporary.

Close the tab, refresh the application, or restart your computer, and you may need to run the query again. That becomes especially inconvenient when the original query was expensive or took several minutes to complete.

Dory now stores complete query results as persistent ResultSets backed by Parquet.

After a query finishes, you can reopen the result and continue working without querying the source database again.

That means you can:

- Run a large query today and continue tomorrow.
- Switch between SQL tabs without losing previous results.
- Reopen historical results after restarting Dory.
- Preserve filter, sort, and table state.
- Create new charts or exports from an existing result.
- Analyze data without repeatedly loading the source database.

A query result is no longer just temporary output. It becomes a reusable data asset inside your workspace.

## Why Dory uses Parquet for SQL result sets

Parquet is a columnar file format designed for analytical workloads.

It provides several useful properties for large query results:

- Efficient compression.
- Fast access to selected columns.
- Strong compatibility with analytical engines.
- Portable storage that can be queried again later.
- Better performance for filtering and aggregation than row-oriented text formats such as CSV.

Dory stores the complete result in Parquet, while DuckDB provides the computation layer used to explore it.

This separation also allows the interface to remain lightweight. The result can contain millions of rows, but Dory only retrieves the small slice needed for the current table view.

## DuckDB is becoming a core part of Dory

DuckDB was already available as one of the databases Dory could connect to. In v0.32.0, it takes on a broader role inside Dory's architecture.

It is becoming a shared computation layer for:

- SQL query results.
- Parquet datasets.
- CSV and other local files.
- Filtering, sorting, and searching.
- Charts and analytical transformations.
- Future agent-driven data workflows.

Today, this architecture makes million-row ResultSets practical.

Next, it will allow database results and local files to share the same analysis experience. You will be able to open a file, query it with SQL, combine it with other data, and begin exploring without first importing everything into a traditional database.

## One workflow from SQL query to complete analysis

The full large-result workflow in Dory now looks like this:

1. Write and run a SQL query.
2. Select **No limit** when you need the complete result.
3. Watch the preview and progress while the query runs.
4. Let Dory store the complete result automatically in Parquet.
5. Explore millions of rows through the ResultSet interface.
6. Search, filter, sort, chart, or export the data.
7. Reopen the saved result later without rerunning the query.

There is no separate export-and-import step and no need to move into another application just because the query returned more data than expected.

## Dory v0.32.0 is available now

Large SQL results should not become unusable simply because they contain more rows.

Dory v0.32.0 lets you keep complete query results while maintaining a responsive exploration experience. It also establishes DuckDB and Parquet as the foundation for a broader local data analysis layer inside Dory.

The next time you need more than the first 200 rows, turn off the `LIMIT` and explore the complete result.

Learn more and download Dory at [getdory.dev](https://getdory.dev/).
