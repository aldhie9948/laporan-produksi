<script lang="ts">
  import "./app.css";
  import Footer from "./lib/components/footer.svelte";
  import Header from "./lib/components/header.svelte";
  import ReportTable from "./lib/components/report-table.svelte";
  import SearchBar from "./lib/components/search-bar.svelte";
  import { selectedPlan } from "./lib/store";
</script>

<svelte:head>
  <title>Laporan Produksi Harian</title>
</svelte:head>
<main class="flex flex-col items-center justify-center min-h-screen pb-10">
  <Header />
  <SearchBar />
  {#if $selectedPlan}
    <ReportTable />
  {/if}
  <Footer />
</main>
