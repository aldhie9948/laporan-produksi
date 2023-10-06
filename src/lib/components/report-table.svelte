<script lang="ts">
  import Icon from "@iconify/svelte";
  import ExcellentReport from "excellentexport";
  import moment from "moment";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { getReport } from "../services";
  import { selectedPlan } from "../store";
  import type { PlanReport, SelectItem } from "../types";
  let reports: PlanReport[] = [];
  let reportSample: PlanReport;
  let isDown: boolean = false;
  let startX: number;
  let scrollLeft: number;
  let parentTable: HTMLElement;
  let reportTable: HTMLTableElement;

  function utcToDate(dateString: string | undefined | null, format?: string) {
    if (!format) format = "DD/MM/YYYY";
    if (!dateString) return "-";
    return moment.utc(dateString).locale("id").format(format);
  }

  async function init(plan: SelectItem) {
    if (!plan) return;
    reports = await getReport(plan.value);
    if (reports.length > 0) reportSample = reports[0];
  }

  function onMouseDown(e: MouseEvent) {
    parentTable.style.cursor = "grabbing";
    isDown = true;
    startX = e.pageX - parentTable.offsetLeft;
    scrollLeft = parentTable.offsetLeft;
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - parentTable.offsetLeft;
    const walk = (x - startX) * 3;
    parentTable.scrollLeft = scrollLeft - walk;
  }

  function disableIsDown() {
    parentTable.style.cursor = "grab";
    isDown = false;
  }

  function exportToExcel(
    e: Event & { currentTarget: EventTarget & HTMLAnchorElement }
  ) {
    const target = e.currentTarget;
    ExcellentReport.excel(target, reportTable, "Sheet1");
  }

  function printReport() {
    window.print();
  }

  onMount(async () => {
    init($selectedPlan);
  });

  $: $selectedPlan, init($selectedPlan);
</script>

<div class="p-5 w-full" transition:slide>
  <div class="text-center uppercase lg:text-3xl text-lg font-bold">
    <h1>laporan produksi harian</h1>
    <h1>(kepala seksi)</h1>
  </div>
  <div
    class="flex items-center justify-between lg:flex-row flex-col lg:mb-0 mb-3"
  >
    <div class="lg:hidden block w-full mb-3">
      <div class="flex">
        <p class="w-20">Shift</p>
        <p class="font-bold">: {reportSample?.shift}</p>
      </div>
      <div class="flex">
        <p class="w-20">Bagian</p>
        <p class="font-bold">: {reportSample?.nama_area}</p>
      </div>
      <div class="flex">
        <p class="w-20">No. Plan</p>
        <p class="font-bold">: {reportSample?.lot}</p>
      </div>
      <div class="flex">
        <p class="w-20">Tanggal</p>
        <div class="font-bold flex">
          <p>: {utcToDate(reportSample?.start)}</p>
          <p class="mx-2">s/d</p>
          <p>{utcToDate(reportSample?.finish)}</p>
        </div>
      </div>
    </div>
    <table class="header">
      <tr>
        <td class="w-28">Shift</td>
        <td class="font-bold">: {reportSample?.shift}</td>
        <td class="w-28">Bagian</td>
        <td class="font-bold">: {reportSample?.nama_area}</td>
      </tr>
      <tr>
        <td class="w-28">No. Plan</td>
        <td class="font-bold">: {reportSample?.lot}</td>
        <td class="w-28">Tanggal</td>
        <td class="font-bold flex items-center">
          <p>: {utcToDate(reportSample?.start)}</p>
          <p class="mx-2">s/d</p>
          <p>{utcToDate(reportSample?.finish)}</p>
        </td>
      </tr>
    </table>
    <div class="flex items-center gap-2 hidden-print">
      <button on:click={printReport} class="btn">
        <Icon icon="material-symbols:print" width="1.2rem" />
        <p>Cetak</p>
      </button>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        href="#"
        download={`[${reportSample?.nama_area}] ` + reportSample?.lot + ".xls"}
        class="btn"
        on:click={exportToExcel}
      >
        <Icon icon="file-icons:microsoft-excel" width="1.2rem" />
        <p>Export Excel</p>
      </a>
    </div>
  </div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    bind:this={parentTable}
    on:mousedown={onMouseDown}
    on:mouseleave={disableIsDown}
    on:mouseup={disableIsDown}
    on:mousemove={onMouseMove}
    class="overflow-auto cursor-grab mb-2"
  >
    <table bind:this={reportTable} class="report">
      <thead>
        <th>No</th>
        <th>Nama Part</th>
        <th>Operator</th>
        <th>No. Mesin</th>
        <th>Start</th>
        <th>Finish</th>
        <th>I</th>
        <th>II</th>
        <th>III</th>
        <th>IV</th>
        <th>V</th>
        <th>VI</th>
        <th>VII</th>
        <th>OK</th>
        <th>NG</th>
        <th>TOTAL</th>
        <th>Keterangan</th>
        <th>LOT</th>
      </thead>
      <tbody>
        {#each reports as report, i (i)}
          <tr>
            <td>{i + 1}</td>
            <td class="!text-left"><p class="part">{report.barang}</p></td>
            <td class="!text-left operator"
              ><p class="operator">
                {report.nama_operator === " " ? "-" : report.nama_operator}
              </p></td
            >
            <td>{!report.kode_mesin ? "-" : report.kode_mesin}</td>
            <td>{utcToDate(report.start, "HH:mm")}</td>
            <td>{utcToDate(report.finish, "HH:mm")}</td>
            <td>{report["01"] < 1 ? "-" : report["01"]}</td>
            <td>{report["02"] < 1 ? "-" : report["02"]}</td>
            <td>{report["03"] < 1 ? "-" : report["03"]}</td>
            <td>{report["04"] < 1 ? "-" : report["04"]}</td>
            <td>{report["05"] < 1 ? "-" : report["05"]}</td>
            <td>{report["06"] < 1 ? "-" : report["06"]}</td>
            <td>{report["07"] < 1 ? "-" : report["07"]}</td>
            <td>{report.OK < 1 ? "-" : report.OK}</td>
            <td>{report.NG < 1 ? "-" : report.NG}</td>
            <td> {report.OK - report.NG < 1 ? "-" : report.OK - report.NG}</td>
            <td class="!text-left"
              ><p class="">
                {report.keterangan}
              </p></td
            >
            <td>{report.lot}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="flex justify-end">
    <table class="text-center lg:w-fit w-full">
      <tr class="no-border font-bold">
        <td class="border"><p class="lg:w-36">Disetujui</p></td>
        <td class="border"><p class="lg:w-36">Diperiksa</p></td>
        <td class="border"><p class="lg:w-36">Dibuat</p></td>
      </tr>
      <tr class="no-border">
        <td class="border"><div class="py-12" /></td>
        <td class="border"><div class="py-12" /></td>
        <td class="border"><div class="py-12" /></td>
      </tr>
      <tr class="no-border font-bold">
        <td class="border">Planner</td>
        <td class="border">Kasie. Produksi</td>
        <td class="border">Karu. Produksi</td>
      </tr>
    </table>
  </div>
</div>

<style lang="scss">
  .header {
    @apply lg:block hidden;
    td:nth-child(even) {
      @apply pr-10;
    }
  }

  .report {
    @apply w-full whitespace-nowrap my-1;
    th,
    tr,
    td {
      @apply border border-slate-100 py-1;
    }
    thead {
      @apply bg-red-800/50;
    }
    th {
      @apply px-4;
    }
    td {
      @apply text-center px-2;
    }
  }
</style>
