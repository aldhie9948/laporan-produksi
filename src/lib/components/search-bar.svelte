<script lang="ts">
  import Select from "svelte-select";
  import { getSelectItems } from "../services";
  import { selectedPlan } from "../store";
  import { navigate } from "svelte-routing";

  const groupBy = (item: any) => item.group;
  const loadOptions = async (text: string) => {
    if (!text) return Promise.resolve([]);
    const data = await getSelectItems(text);
    return data;
  };
  function changePlan(plan?: string) {
    if (!plan) return;
    navigate(plan);
  }

  function onClear() {
    navigate(import.meta.env.VITE_BASEPATH);
  }

  $: changePlan($selectedPlan?.value);
</script>

<div
  class="flex items-center gap-2 lg:w-2/5 md:w-4/5 md:flex-row flex-col lg:mx-auto lg:px-0 px-5 hidden-print mb-5 w-full"
>
  <Select
    bind:value={$selectedPlan}
    {groupBy}
    {loadOptions}
    class="text-gray-800"
    placeholder="Cari nomor plan project"
    on:clear={onClear}
  />
</div>
