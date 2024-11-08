<script lang="ts">
	import StandardPageLayout from '$lib/layouts/StandardPageLayout.svelte';
	import { getUiState } from '$lib/state/ui.svelte.js';
	let { data } = $props();
	let { persons } = $state(data);

  const uiState = getUiState();

  uiState.setPageTitle("People");
  console.dir(uiState.pageTitle)


</script>

<StandardPageLayout title="People">
  
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {#each persons as p}
        <tr>
          <th>{p.id}</th>
          <td>{p.first_name} {p.last_name}</td>
          <td>{p.gender}</td>
        </tr>
      {/each}
        
      </tbody>
    </table>
</StandardPageLayout>
