<script lang="ts">
  import "./app.css";
  import Footer from "./lib/components/footer.svelte";
  import Header from "./lib/components/header.svelte";
  import ReportTable from "./lib/components/report-table.svelte";
  import SearchBar from "./lib/components/search-bar.svelte";
  import { Route, Router } from "svelte-routing";
  let basepath = import.meta.env.VITE_BASEPATH;
</script>

<svelte:head>
  <title>Laporan Produksi Harian</title>
</svelte:head>
<main class="flex flex-col items-center justify-center min-h-screen pb-10">
  <Header />
  <SearchBar />

  <Router {basepath}>
    <Route path="/:planId" let:params>
      <ReportTable planId={params.planId} />
    </Route>
  </Router>

  <Footer />
</main>
