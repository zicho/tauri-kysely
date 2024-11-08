<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.persons as u}
	{u.first_name}
{/each}
